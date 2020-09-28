"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const ret_v_1 = require("../Abstract/ret_v");
class For extends Instruction_1.Instruction {
    constructor(vars, cnd, incr, code, line, column) {
        super(line, column);
        this.vars = vars;
        this.cnd = cnd;
        this.incr = incr;
        this.code = code;
    }
    execute(env) {
        this.vars.execute(env);
        let condition = this.cnd.execute(env);
        if (condition.type != ret_v_1.Type.BOOLEAN) {
            throw { error: "Not boolean expression", linea: this.line, columna: this.column };
        }
        /**
         * es un while solo que al final de cada iteracion executa el incremento
         *
         *
         */
        while (condition.value == true) {
            //console.log("si");
            const element = this.code.execute(env);
            if (element != null || element != undefined) {
                console.log(element);
                if (element.type == 'Break')
                    //suporting break
                    break;
                else if (element.type == 'Continue')
                    //suporting continue
                    continue;
            }
            condition = this.cnd.execute(env);
            if (condition.type != ret_v_1.Type.BOOLEAN) {
                throw { razon: "La expresion no es booleana", linea: this.line, columna: this.column, tipo: "semantico" };
            }
            this.incr.execute(env); //ejecuta incremento
        }
    }
}
exports.For = For;
/**
 *
 * Este codigo NO participo en plagio con los otros compañeros del curso
 *
 * pongo esto porque quede traumado con algo asi en el pasado :(
 *
 */ 
//# sourceMappingURL=For.js.map