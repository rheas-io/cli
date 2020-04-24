#!/usr/bin/env node

let fs = require('fs');
let path = require('path');

function Cli() {
    this.commands = ["new"];
}

/**
 * Prints the cli command lists.
 */
Cli.prototype.printCommandLists = function () {

    this.commands.forEach(function (value, index) {
        console.log(`[${index}] ${value}`);
    });
}

/**
 * Handles all the cli command requests.
 */
Cli.prototype.handleRequest = function () {

    // Check the argument length and raise error
    // if no command is provided
    if (process.argv.length < 3) {
        console.log("No command provided, please provide a valid command");
        this.printCommandLists();
        return;
    }

    let command = process.argv[2];

    if (!this[command] || !this.commands.includes(command) || typeof this[command] !== 'function') {
        console.log("Invalid command, please provide a valid command");
        this.printCommandLists();
        return;
    }

    // Executes the command request.
    this[command]();
}

/**
 * Handler for creating a new Laress project. Command format is
 * 
 * laress new <project-name>
 */
Cli.prototype.new = function () {

    let projectName = process.argv.length > 3 ? process.argv[3] : 'Laress';

    let projectCreator = new ProjectCreator(projectName);
    projectCreator.create();

    console.log(`Created new project - ${projectName}`);
    console.log("Install the dependencies using command 'npm install'");
}

/**
 * Project creator class for creating the project folder
 * template on the current working directory
 * 
 * @param {string} projectName 
 */
function ProjectCreator(projectName) {
    this.projectName = String(projectName || "laress").toLowerCase();

    this.ejs = require('ejs');
}

/**
 * Copies all the folders and files in the layout directory
 * to the current working directory.
 */
ProjectCreator.prototype.create = function () {

    let srcPath = path.resolve(__dirname, '..', 'layout');
    let destPath = process.cwd();

    this.createDirectoryContents(srcPath, destPath);
}

/**
 * Handles the file and folder creation.
 * 
 * Reads all the files in the srcPath file/dir and saves
 * it to the destPath. Files are read and template engine is 
 * used to replace any placeholders.
 */
ProjectCreator.prototype.createDirectoryContents = function (srcPath, destPath) {

    // read all files/folders from source folder
    const filesToCreate = fs.readdirSync(srcPath);

    filesToCreate.forEach(file => {
        const origFilePath = path.join(srcPath, file);

        // get stats about the current file
        const stats = fs.statSync(origFilePath);

        if (stats.isFile()) {
            let contents = fs.readFileSync(origFilePath, 'utf8');
            contents = this.ejs.render(contents, {
                projectName: this.projectName
            });

            let writePath = path.join(destPath, file);

            fs.writeFileSync(writePath, contents, 'utf8');
        }
        // If the file is a directory, create a new directory
        // and recurse over this function setting the srcPath as the
        // source folder and destPath the newly created folder.
        else if (stats.isDirectory()) {
            let newSrcPath = path.join(srcPath, file);
            let newDestPath = path.join(destPath, file);

            fs.mkdirSync(newDestPath);

            this.createDirectoryContents(newSrcPath, newDestPath);
        }
    });
}

// Handle the incoming cli request
new Cli().handleRequest();