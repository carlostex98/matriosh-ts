"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const ret_v_1 = require("../Abstract/ret_v");
class For extends Instruction_1.Instruction {
    constructor(vars, condition, incr, code, line, column) {
        super(line, column);
        this.vars = vars;
        this.condition = condition;
        this.incr = incr;
        this.code = code;
    }
    execute(env) {
        this.vars.execute(env);
        let condition = this.condition.execute(env);
        if (condition.type != ret_v_1.Type.BOOLEAN) {
            throw { error: "Not boolean expression", linea: this.line, columna: this.column };
        }
        while (condition.value == true) {
            //console.log("si");
            const element = this.code.execute(env);
            if (element != null || element != undefined) {
                console.log(element);
                if (element.type == 'Break')
                    break;
                else if (element.type == 'Continue')
                    continue;
            }
            condition = this.condition.execute(env);
            if (condition.type != ret_v_1.Type.BOOLEAN) {
                throw { error: "Not boolean expression", linea: this.line, columna: this.column };
            }
            this.incr.execute(env);
        }
    }
}
exports.For = For;
//# sourceMappingURL=For.js.map