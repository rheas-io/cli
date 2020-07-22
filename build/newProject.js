"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewProject = void 0;
const fs_1 = __importDefault(require("fs"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
class NewProject {
    constructor() {
        /**
         * The project name of the new application.
         *
         * @var string
         */
        this.projectName = "Rheas";
    }
    /**
     * Creates a new project on the current directory ie the
     * directory from which the command is executed. This will copy
     * all the layout files on to the directory.
     */
    handle() {
        let projectName = process.argv.length > 3 ? process.argv[3] : 'Rheas';
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
    setProjectName(name) {
        this.projectName = name;
    }
    /**
     * Copies all the folders and files in the layout directory to the
     * current working directory. All the directory will be created in the current
     * working directory recursively.
     */
    create() {
        // Gets the layouts folder path.
        let srcPath = path_1.default.resolve(__dirname, 'layout');
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
    createDirectoryContents(srcPath, destPath) {
        // read all files/folders from source folder
        const filesToCreate = fs_1.default.readdirSync(srcPath);
        filesToCreate.forEach(file => {
            const origFilePath = path_1.default.join(srcPath, file);
            const destFilePath = path_1.default.join(destPath, file);
            // get stats about the current file
            const stats = fs_1.default.statSync(origFilePath);
            if (stats.isFile()) {
                this.createFile(origFilePath, destFilePath);
            }
            // If the file is a directory, create a new directory
            // and recurse over this function setting the srcPath as the
            // source folder and destPath the newly created folder. 
            else if (stats.isDirectory()) {
                fs_1.default.mkdirSync(destFilePath);
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
    createFile(srcPath, destPath) {
        let contents = fs_1.default.readFileSync(srcPath, 'utf8');
        contents = ejs_1.default.render(contents, {
            projectName: this.projectName
        });
        fs_1.default.writeFileSync(destPath, contents, 'utf8');
    }
}
exports.NewProject = NewProject;
