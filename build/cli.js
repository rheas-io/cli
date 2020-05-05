#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cli = /** @class */ (function () {
    function Cli() {
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
        // Check if there are three argument values.
        if (process.argv.length < 3) {
            console.log("No command provided, please provide a valid command");
            this.printCommandLists();
            return;
        }
    };
    /**
     *
     */
    Cli.prototype.printCommandLists = function () {
    };
    return Cli;
}());
exports.default = Cli;
