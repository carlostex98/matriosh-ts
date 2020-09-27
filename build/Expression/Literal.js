"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Literal = void 0;
const Expression_1 = require("../Abstract/Expression");
const ret_v_1 = require("../Abstract/ret_v");
class Literal extends Expression_1.Expression {
    constructor(value, line, column, type) {
        super(line, column);
        this.value = value;
        this.type = type;
    }
    execute() {
        if (this.type < 1) {
            return { value: Number(this.value), type: ret_v_1.Type.NUMBER };
        }
        else if (this.type == 1) {
            let z = this.value.substr(1, this.value.length - 2);
            return { value: z, type: this.type };
        }
        else {
            return { value: this.value, type: this.type };
        }
    }
}
exports.Literal = Literal;
//# sourceMappingURL=Literal.js.map