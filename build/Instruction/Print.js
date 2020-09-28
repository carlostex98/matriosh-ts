"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const app_1 = require("../app");
class Print extends Instruction_1.Instruction {
    constructor(value, line, column) {
        super(line, column);
        this.value = value;
    }
    execute(envx) {
        const v = this.value.execute(envx);
        if (v != undefined) {
            app_1.cons.push(v.value);
        }
        //hacemos un push de lo que se mostrara en consoleax
    }
}
exports.Print = Print;
/**
 *
 * Este codigo NO participo en plagio con los otros compañeros del curso
 *
 * pongo esto porque quede traumado con algo asi en el pasado :(
 *
 */ 
//# sourceMappingURL=Print.js.map