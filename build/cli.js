"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = __importDefault(require("os"));
var newProject_1 = require("./newProject");
var Cli = /** @class */ (function () {
    function Cli() {
        /**
         * Holds the array of handler classes by their command keyword.
         * For eg, the new project creator handler will have a 'new'
         * keyword.
         *
         * @var array
         */
        this._commands = {};
        this.addCommand('new', newProject_1.NewProject);
    }
    /**
     * Handles all the cli command requests. All the cli commands are
     * of the form `laress --command --option`. We will read the --command
     * option and perform the necessary actions.
     *
     * By default process.argv will have `node` and `script_file_path` as the first
     * two arguments. And the actual command will be the third one. So we check if
     * there are three arguments.
     */
    Cli.prototype.handleRequest = function () {
        try {
            // Check if there are three argument values.
            if (process.argv.length < 3) {
                throw new Error(this.messageWithCommands("No command provided, please provide a valid command"));
            }
            var command = process.argv[2];
            if (!this.hasCommand(command)) {
                throw new Error(this.messageWithCommands("Invalid command, please provide a valid command"));
            }
            // Creates an instance of the handler and send the request.
            var commandHandler = new this._commands[command](this);
            commandHandler.handle();
        }
        // All error will print a list of command list by default. This is on
        // the assumption that the handler won't be throwing any errors.
        catch (error) {
            console.log(error.message || "Error processing command. Contact the development team.");
        }
    };
    /**
     * Adds a command to the command list.
     *
     * @param key
     * @param handlerClass
     */
    Cli.prototype.addCommand = function (key, handlerClass) {
        this._commands[key] = handlerClass;
        return this;
    };
    /**
     * Checks if a command of the given name is registered or not.
     *
     * @param key
     * @return boolean
     */
    Cli.prototype.hasCommand = function (key) {
        return !!this._commands[key];
    };
    /**
     * Returns an error response with commands list.
     *
     * @param message
     * @return string
     */
    Cli.prototype.messageWithCommands = function (message) {
        return message + os_1.default.EOL + this.getCommandsList();
    };
    /**
     * Prints a list of application commands to the console. This lets user know,
     * which all commands are available on laress cli.
     *
     * @returns string
     */
    Cli.prototype.getCommandsList = function () {
        var commands = "";
        Object.keys(this._commands).forEach(function (value, index) {
            index = index + 1;
            commands += "[" + index + "] " + value + os_1.default.EOL;
        });
        return commands;
    };
    return Cli;
}());
exports.Cli = Cli;
