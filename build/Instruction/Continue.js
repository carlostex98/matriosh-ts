"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Continue = void 0;
const Instruction_1 = require("../Abstract/Instruction");
class Continue extends Instruction_1.Instruction {
    constructor(line, column) {
        super(line, column);
    }
    execute(environment) {
        return { line: this.line, column: this.column, type: 'Continue' };
    }
}
exports.Continue = Continue;
/**
 *
 * Este codigo NO participo en plagio con los otros compañeros del curso
 *
 * pongo esto porque quede traumado con algo asi en el pasado :(
 *
 */ 
//# sourceMappingURL=Continue.js.map