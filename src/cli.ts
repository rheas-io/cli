import os from "os";
import { NewProject } from "./newProject";
import { ICommandHandler } from "./commandContract";
import { KeyValue, ClassOf } from "@laress/contracts";

export class Cli {

    /**
     * Holds the array of handler classes by their command keyword.
     * For eg, the new project creator handler will have a 'new' 
     * keyword.
     * 
     * @var array
     */
    private _commands: KeyValue<ClassOf<ICommandHandler>> = {};

    constructor() {
        this.addCommand('new', NewProject);
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
    public handleRequest() {
        try {
            // Check if there are three argument values.
            if (process.argv.length < 3) {
                throw new Error(this.messageWithCommands("No command provided, please provide a valid command"));
            }
            const command = process.argv[2];

            if (!this.hasCommand(command)) {
                throw new Error(this.messageWithCommands("Invalid command, please provide a valid command"));
            }

            // Creates an instance of the handler and send the request.
            const commandHandler = new this._commands[command](this);
            commandHandler.handle();
        }
        // All error will print a list of command list by default. This is on
        // the assumption that the handler won't be throwing any errors.
        catch (error) {
            console.log(error.message || "Error processing command. Contact the development team.");
            throw error;
        }
    }

    /**
     * Adds a command to the command list.
     * 
     * @param key 
     * @param handlerClass 
     */
    public addCommand(key: string, handlerClass: ClassOf<ICommandHandler>) {
        this._commands[key] = handlerClass;

        return this;
    }

    /**
     * Checks if a command of the given name is registered or not.
     * 
     * @param key 
     * @return boolean
     */
    public hasCommand(key: string): boolean {
        return !!this._commands[key];
    }

    /**
     * Returns an error response with commands list.
     * 
     * @param message 
     * @return string
     */
    private messageWithCommands(message: string): string {
        return message + os.EOL + this.getCommandsList();
    }

    /**
     * Prints a list of application commands to the console. This lets user know,
     * which all commands are available on laress cli.
     * 
     * @returns string
     */
    public getCommandsList(): string {
        let commands = "";

        Object.keys(this._commands).forEach(function (value, index) {
            index = index + 1;
            commands += `[${index}] ${value}` + os.EOL;
        });

        return commands;
    }
}