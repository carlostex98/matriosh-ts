"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cases = void 0;
class Cases {
    //esta clase solo encapsula el codigo, no lo ejecuta
    constructor(tipo, right, code, line, column) {
        this.tipo = tipo;
        this.right = right;
        this.code = code;
        this.line = line;
        this.column = column;
        //super(line, column);
    }
    execute(env) {
        return { tipo: this.tipo, right: this.right, code: this.code, line: this.line, column: this.column };
    }
}
exports.Cases = Cases;
/**
 *
 * Este codigo NO participo en plagio con los otros compañeros del curso
 *
 * pongo esto porque quede traumado con algo asi en el pasado :(
 *
 */ 
//# sourceMappingURL=Cases.js.map