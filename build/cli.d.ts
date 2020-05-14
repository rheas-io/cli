import { ICommandHandler } from "./commandContract";
import { ClassOf } from "@rheas/contracts";
export declare class Cli {
    /**
     * Holds the array of handler classes by their command keyword.
     * For eg, the new project creator handler will have a 'new'
     * keyword.
     *
     * @var array
     */
    private _commands;
    constructor();
    /**
     * Handles all the cli command requests. All the cli commands are
     * of the form `rheas --command --option`. We will read the --command
     * option and perform the necessary actions.
     *
     * By default process.argv will have `node` and `script_file_path` as the first
     * two arguments. And the actual command will be the third one. So we check if
     * there are three arguments.
     */
    handleRequest(): void;
    /**
     * Adds a command to the command list.
     *
     * @param key
     * @param handlerClass
     */
    addCommand(key: string, handlerClass: ClassOf<ICommandHandler>): this;
    /**
     * Checks if a command of the given name is registered or not.
     *
     * @param key
     * @return boolean
     */
    hasCommand(key: string): boolean;
    /**
     * Returns an error response with commands list.
     *
     * @param message
     * @return string
     */
    private messageWithCommands;
    /**
     * Prints a list of application commands to the console. This lets user know,
     * which all commands are available on rheas cli.
     *
     * @returns string
     */
    getCommandsList(): string;
}
