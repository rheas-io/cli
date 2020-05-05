#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cli_1 = require("./cli");
// Handle the incoming cli request
new cli_1.Cli().handleRequest();
