import fs from "fs";
import ejs from "ejs";
import path from "path";
import { ICommandHandler } from "./commandContract";

export class NewProject implements ICommandHandler {

    /**
     * The project name of the new application.
     * 
     * @var string
     */
    private projectName: string = "Laress";

    /**
     * Creates a new project on the current directory ie the
     * directory from which the command is executed. This will copy
     * all the layout files on to the directory.
     */
    public handle(): void {
        let projectName = process.argv.length > 3 ? process.argv[3] : 'Laress';

        this.setProjectName(projectName);
        this.create();

        console.log(`Created new project - ${projectName}`);
        console.log("Install the dependencies using command 'npm install'");
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

        this.createDirectoryContents(srcPath, destPath);
    }

    /**
     * Handles the file and folder creation.
     * 
     * Reads all the files in the srcPath file/dir and saves it to the 
     * destPath. Files are read and template engine is used to replace any 
     * placeholders.
     * 
     * @param srcPath 
     * @param destPath 
     */
    private createDirectoryContents(srcPath: string, destPath: string) {

        // read all files/folders from source folder
        const filesToCreate = fs.readdirSync(srcPath);

        filesToCreate.forEach(file => {
            const origFilePath = path.join(srcPath, file);
            const destFilePath = path.join(destPath, file);

            // get stats about the current file
            const stats = fs.statSync(origFilePath);

            if (stats.isFile()) {
                this.createFile(origFilePath, destFilePath);
            }
            // If the file is a directory, create a new directory
            // and recurse over this function setting the srcPath as the
            // source folder and destPath the newly created folder. 
            else if (stats.isDirectory()) {
                fs.mkdirSync(destFilePath);
                this.createDirectoryContents(origFilePath, destFilePath);
            }
        });
    }

    /**
     * Creates a new file at destPath - the full file path and copies the
     * contents of the srcPath file into it. We have to do it this way because
     * we may have to replace any placeholders. So file copying is not feasible.
     * 
     * Files are created uses UTF8 encoding.
     * 
     * @param srcPath 
     * @param destPath 
     */
    private createFile(srcPath: string, destPath: string): void {

        let contents = fs.readFileSync(srcPath, 'utf8');

        contents = ejs.render(contents, {
            projectName: this.projectName
        });

        fs.writeFileSync(destPath, contents, 'utf8');
    }
}