import { Color } from './colors';
import { GenerateKeys } from './commands/keys';
import { IApp } from '@rheas/contracts/core/app';
import { NewProject } from './commands/newProject';
import { KeyValue, ClassOf } from '@rheas/contracts';
import { ICli, ICommand } from '@rheas/contracts/cli';

export class Cli implements ICli {
    /**
     * Application instance.
     *
     * @var IApp
     */
    protected _app: IApp;

    /**
     * Holds the array of handler classes by their command keyword.
     * For eg, the new project creator handler will have a 'new'
     * keyword.
     *
     * @var array
     */
    private _commands: KeyValue<ClassOf<ICommand>> = {};

    /**
     * Creates a new command line processer.
     *
     * @param app
     */
    constructor(app: IApp) {
        this._app = app;

        this.registerBaseCommands();
    }

    /**
     * Registers the frameworks core commands like new project, model, service
     * etc.
     *
     */
    protected registerBaseCommands() {
        this.addCommand('new', NewProject);
        this.addCommand('keys', GenerateKeys);
    }

    /**
     * Handles all the cli command requests. All the cli commands are
     * of the form `rheas --command --option`. We will read the --command
     * option and perform the necessary actions.
     *
     * By default process.argv will have `node` and `script_file_path` as the first
     * two arguments. And the actual command will be the third one. So we check if
     * there are three arguments.
     */
    public async handleRequest() {
        // Check if there are three argument values.
        if (process.argv.length < 3) {
            this.exit('No command provided, please provide a valid command', true);
        }
        const command = process.argv[2];

        if (!this.hasCommand(command)) {
            this.exit('Invalid command, please provide a valid command', true);
        }

        try {
            const commandHandler = new this._commands[command](this._app);
            await commandHandler.handle();
        } catch (error) {
            this.exit(error.message || 'Error processing command. Contact the development team.');
        }
    }

    /**
     * Exits the application with an error code. Prints the command list if
     * the second argument is set true.
     *
     * @param message
     * @param showCommandList
     */
    private exit(message: string, showCommandList: boolean = false) {
        console.log(Color.pattern('red', 'bold'), message);

        if (showCommandList) {
            Object.keys(this._commands).forEach(function (value, index) {
                console.log(Color.pattern('yellow'), `[${index + 1}] ${value}`);
            });
        }
        process.exit(1);
    }

    /**
     * Adds a command to the command list.
     *
     * @param key
     * @param handlerClass
     */
    public addCommand(key: string, handlerClass: ClassOf<ICommand>): ICli {
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
}
