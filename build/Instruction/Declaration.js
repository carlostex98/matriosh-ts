"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaration = void 0;
const Instruction_1 = require("../Abstract/Instruction");
class Declaration extends Instruction_1.Instruction {
    constructor(id, value, line, column, tpx) {
        super(line, column);
        this.id = id;
        this.value = value;
        this.tpx = tpx;
        //registro de la linea y columna en la tabla de simbolos
    }
    execute(env) {
        const val = this.value.execute(env);
        env.guardar(this.id, val.value, val.type, this.line, this.column, this.tpx);
        //guardamos la variable en el enviroment actual
    }
}
exports.Declaration = Declaration;
//# sourceMappingURL=Declaration.js.map