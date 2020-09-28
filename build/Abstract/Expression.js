"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expression = void 0;
const TablaTipos_1 = require("../Util/TablaTipos");
class Expression {
    constructor(line, column) {
        this.line = line;
        this.column = column;
    }
    tipoDominante(t1, t2) {
        const calcType = TablaTipos_1.tipos[t1][t2];
        return calcType;
    }
}
exports.Expression = Expression;
/**
 *
 * Este codigo NO participo en plagio con los otros compañeros del curso
 *
 * pongo esto porque quede traumado con algo asi en el pasado :(
 *
 */ 
//# sourceMappingURL=Expression.js.map