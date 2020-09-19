import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import { Color } from '../colors';
import { FileManager } from '@rheas/files';
import { ICommand } from '@rheas/contracts/cli';

interface IPackage {
    build?: string;
    scripts?: { [key: string]: string };
    devDependencies?: { [key: string]: string };
}

export class NewProject implements ICommand {
    /**
     * File manager.
     *
     * @var FileManager
     */
    protected _fs: FileManager;

    /**
     * The project name of the new application.
     *
     * @var string
     */
    private projectName: string = 'Rheas';

    /**
     *
     * @param app
     */
    constructor() {
        this._fs = new FileManager();
    }

    /**
     * Creates a new project on the current directory ie the directory from
     * which the command is executed. This will copy all the layout files on
     * to the application root directory.
     */
    public async handle(): Promise<void> {
        let projectName = process.argv.length > 3 ? process.argv[3] : 'Rheas';

        this.setProjectName(projectName);

        console.log(Color.pattern('yellow'), 'Copying files...');
        await this.create();

        console.log(Color.pattern('yellow'), 'Updating package.json file...');
        await this.updatePackageFile();

        console.log(
            Color.pattern('green', 'bold'),
            'Updated package.json file. Run "npm install" to install dev dependenices.',
        );

        console.log(Color.pattern('green', 'bold'), `Created new project - ${projectName}`);
        console.log(Color.pattern('yellow'), `Generate application keys using "node rheas keys"`);
    }

    /**
     * Updates tha application package.json file with the package.json file in the
     * layouts diretory. We just update the `scripts`, `build` and `devDependencies`.
     * All the other fields will be set as it is.
     */
    private async updatePackageFile() {
        let srcPackageFile = path.resolve(__dirname, '..', 'layout', 'package.json');
        let destPackageFile = path.resolve(process.cwd(), 'package.json');

        try {
            const [srcPkg, destPkg] = await Promise.all([this._fs.readTextFile(srcPackageFile)]);

            const srcJson: IPackage = JSON.parse(srcPkg);
            const destJson: IPackage = JSON.parse(destPkg);

            destJson.scripts = Object.assign({}, srcJson.scripts, destJson.scripts);
            destJson.build = srcJson.build;
            destJson.devDependencies = Object.assign(
                {},
                srcJson.devDependencies,
                destJson.devDependencies,
            );

            await this._fs.writeToFile(destPackageFile, JSON.stringify(destJson));
        } catch (err) {
            console.log(Color.pattern('red', 'bold'), 'Error updating package.json file.');

            console.log(Color.pattern('yellow'), `[1] Set "main": "./build/server.js"`);
            console.log(Color.pattern('yellow'), `[2] Add script "tsc": "tsc"`);
            console.log(
                Color.pattern('yellow'),
                `[3] Add script "start": "node ./build/server.js"`,
            );
        }
    }

    /**
     * Sets the new project name that has to be created.
     *
     * @param name
     */
    private setProjectName(name: string) {
        this.projectName = name;
    }

    /**
     * Copies all the folders and files in the layout directory to the
     * current working directory. All the directory will be created in the current
     * working directory recursively.
     */
    private async create() {
        // Gets the layouts folder path.
        let srcPath = path.resolve(__dirname, '..', 'layout');

        // Gets the current working directory
        let destPath = process.cwd();

        await this.copyDirectory(srcPath, destPath);
    }

    /**
     * Copies all the files/directories in the `srcDir` to the `destDir`.
     * We are not making an os level copy. Instead we read every file contents
     * and writes the content in to destination. This allows us to replace
     * any template strings using `ejs`.
     *
     * @param srcDir
     * @param destDir
     */
    private async copyDirectory(srcDir: string, destDir: string) {
        // read all files/folders from source folder
        const filesToCreate = fs.readdirSync(srcDir);

        const promises = filesToCreate.map(this.copyFile.bind(this, srcDir, destDir));

        await Promise.all(promises);
    }

    /**
     * Copy file/dir with the name `file` in the `srcDir` to the `destDir`.
     *
     * @param srcDir
     * @param destDir
     * @param file
     */
    private async copyFile(srcDir: string, destDir: string, file: string) {
        const srcFile = path.join(srcDir, file);
        const destFile = path.join(destDir, file);

        const stats = this._fs.fileStatsSync(srcFile);

        if (stats && stats.isFile()) {
            await this.createFile(srcFile, destFile);
        }
        // If the file is a directory, create a directory and
        else if (stats && stats.isDirectory()) {
            this._fs.mkDirSync(destFile);
            this.copyDirectory(srcFile, destFile);
        }
    }

    /**
     * Creates a new file at destPath - the full file path and copies the
     * contents of the srcPath file into it. We have to do it this way because
     * we may have to replace any placeholders. So file copying is not feasible.
     *
     * Files are created using UTF8 encoding.
     *
     * @param srcPath
     * @param destPath
     */
    private async createFile(srcPath: string, destPath: string) {
        if (await this._fs.fileExists(destPath)) {
            return;
        }
        let contents = await this._fs.readTextFile(srcPath, 'utf8');

        contents = ejs.render(contents, { projectName: this.projectName });

        await this._fs.writeToFile(destPath, contents, 'utf8');
    }
}
