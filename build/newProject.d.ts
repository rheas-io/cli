import { ICommandHandler } from "./commandContract";
export declare class NewProject implements ICommandHandler {
    /**
     * The project name of the new application.
     *
     * @var string
     */
    private projectName;
    /**
     * Creates a new project on the current directory ie the
     * directory from which the command is executed. This will copy
     * all the layout files on to the directory.
     */
    handle(): void;
    /**
     * Sets the new project name that has to be created.
     *
     * @param name
     */
    private setProjectName;
    /**
     * Copies all the folders and files in the layout directory to the
     * current working directory. All the directory will be created in the current
     * working directory recursively.
     */
    private create;
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
    private createDirectoryContents;
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
    private createFile;
}
