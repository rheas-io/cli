import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import { Color } from '../colors';
import { FileManager } from '@rheas/files';
import { ICommand } from '@rheas/contracts/cli';

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
    public handle(): void {
        let projectName = process.argv.length > 3 ? process.argv[3] : 'Rheas';

        this.setProjectName(projectName);
        this.create();

        console.log(Color.pattern('green', 'bold'), `Created new project - ${projectName}`);
        console.log(Color.pattern('yellow'), `Generate application keys using "node rheas keys"`);
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
    private create() {
        // Gets the layouts folder path.
        let srcPath = path.resolve(__dirname, 'layout');

        // Gets the current working directory
        let destPath = process.cwd();

        this.copyDirectory(srcPath, destPath);
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
    private copyDirectory(srcDir: string, destDir: string) {
        // read all files/folders from source folder
        const filesToCreate = fs.readdirSync(srcDir);

        filesToCreate.forEach(this.copyFile.bind(this, srcDir, destDir));
    }

    /**
     * Copy file/dir with the name `file` in the `srcDir` to the `destDir`.
     *
     * @param srcDir
     * @param destDir
     * @param file
     */
    private copyFile(srcDir: string, destDir: string, file: string) {
        const srcFile = path.join(srcDir, file);
        const destFile = path.join(destDir, file);

        const stats = this._fs.fileStatsSync(srcFile);

        if (stats && stats.isFile()) {
            this.createFile(srcFile, destFile);
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
