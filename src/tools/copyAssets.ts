import * as shell from "shelljs";



let first:number = 123
// Copy all the view templates
shell.cp( "-R", "src/views", "build/" );
shell.cp( "-R", "src/gram", "build/" );
shell.cp( "-R", "src/Interpreter", "build/" );
shell.cp( "-R", "src/ast", "build/" );