"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.If = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const ret_v_1 = require("../Abstract/ret_v");
class If extends Instruction_1.Instruction {
    constructor(condition, code, elsSt, line, column) {
        super(line, column);
        this.condition = condition;
        this.code = code;
        this.elsSt = elsSt;
    }
    execute(env) {
        var _a;
        const condition = this.condition.execute(env);
        if (condition.type != ret_v_1.Type.BOOLEAN) {
            throw { error: "La condicion no es booleana", linea: this.line, columna: this.column };
        }
        if (condition.value == true) {
            return this.code.execute(env);
        }
        else {
            return (_a = this.elsSt) === null || _a === void 0 ? void 0 : _a.execute(env);
        }
    }
}
exports.If = If;
//# sourceMappingURL=If.js.map