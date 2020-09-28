"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.While = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const ret_v_1 = require("../Abstract/ret_v");
class While extends Instruction_1.Instruction {
    constructor(condition, code, line, column) {
        super(line, column);
        this.condition = condition;
        this.code = code;
    }
    /**
     *
     * un while bonito
     * divide y venceras :p
     *
     */
    execute(env) {
        let condition = this.condition.execute(env);
        if (condition.type != ret_v_1.Type.BOOLEAN) {
            throw { error: "La expresion no es booleana", linea: this.line, columna: this.column };
        }
        while (condition.value == true) {
            const element = this.code.execute(env);
            if (element != null || element != undefined) {
                if (element.type == 'Break')
                    break;
                else if (element.type == 'Continue')
                    continue;
            }
            condition = this.condition.execute(env);
            if (condition.type != ret_v_1.Type.BOOLEAN) {
                throw { error: "La expresion no es booleana", linea: this.line, columna: this.column };
            }
        }
    }
}
exports.While = While;
/**
 *
 * Este codigo NO participo en plagio con los otros compañeros del curso
 *
 * pongo esto porque quede traumado con algo asi en el pasado :(
 *
 */ 
//# sourceMappingURL=While.js.map