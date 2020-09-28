"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Function = void 0;
const Instruction_1 = require("../Abstract/Instruction");
class Function extends Instruction_1.Instruction {
    constructor(id, statment, parametros, line, column) {
        super(line, column);
        this.id = id;
        this.statment = statment;
        this.parametros = parametros;
    }
    execute(environment) {
        environment.guardarFuncion(this.id, this, this.line, this.column);
    }
}
exports.Function = Function;
/**
 *
 * Este codigo NO participo en plagio con los otros compañeros del curso
 *
 * pongo esto porque quede traumado con algo asi en el pasado :(
 *
 */ 
//# sourceMappingURL=Function.js.map