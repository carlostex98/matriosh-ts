"use strict";
exports.__esModule = true;
var shell = require("shelljs");
var first = 123;
// Copy all the view templates
shell.cp("-R", "src/views", "build/");
shell.cp("-R", "src/gram", "build/");
shell.cp("-R", "src/Interpreter", "build/");
shell.cp("-R", "src/ast", "build/");
