#!/usr/bin/env node
export default class Cli {
    /**
     * Handles all the cli command requests. All the cli commands are
     * of the form `laress --command --option`. We will read the --command
     * option and perform the necessary actions.
     *
     * By default process.argv will have `node` and `script_file_path` as the first
     * two arguments. And the actual command will be the third one. So we check if
     * there are three arguments.
     */
    handleRequest(): void;
    /**
     *
     */
    printCommandLists(): void;
}
