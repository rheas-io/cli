"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cli_1 = __importDefault(require("./cli"));
// Handle the incoming cli request
new cli_1.default().handleRequest();