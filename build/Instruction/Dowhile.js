"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dowhile = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const ret_v_1 = require("../Abstract/ret_v");
class Dowhile extends Instruction_1.Instruction {
    constructor(condition, code, line, column) {
        super(line, column);
        this.condition = condition;
        this.code = code;
    }
    execute(envr) {
        let cond = this.condition.execute(envr);
        if (cond.type != ret_v_1.Type.BOOLEAN) {
            throw { error: "Not boolean expression", linea: this.line, columna: this.column };
        }
        do {
            const element = this.code.execute(envr);
            if (element != null || element != undefined) {
                console.log(element);
                if (element.type == 'Break')
                    break;
                else if (element.type == 'Continue')
                    continue;
            }
            cond = this.condition.execute(envr);
            if (cond.type != ret_v_1.Type.BOOLEAN) {
                throw { error: "Not boolean expression", linea: this.line, columna: this.column };
            }
        } while (cond.value == true);
    }
}
exports.Dowhile = Dowhile;
//# sourceMappingURL=Dowhile.js.map