"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arithmetic = exports.ArithmeticOption = void 0;
const Expression_1 = require("../Abstract/Expression");
const ret_v_1 = require("../Abstract/ret_v");
const err_1 = require("../err");
var ArithmeticOption;
(function (ArithmeticOption) {
    ArithmeticOption[ArithmeticOption["PLUS"] = 0] = "PLUS";
    ArithmeticOption[ArithmeticOption["MINUS"] = 1] = "MINUS";
    ArithmeticOption[ArithmeticOption["BY"] = 2] = "BY";
    ArithmeticOption[ArithmeticOption["DIV"] = 3] = "DIV";
    ArithmeticOption[ArithmeticOption["MOD"] = 4] = "MOD";
    ArithmeticOption[ArithmeticOption["POW"] = 5] = "POW";
})(ArithmeticOption = exports.ArithmeticOption || (exports.ArithmeticOption = {}));
class Arithmetic extends Expression_1.Expression {
    constructor(left, right, type, line, column) {
        super(line, column);
        this.left = left;
        this.right = right;
        this.type = type;
    }
    execute(environment) {
        const leftValue = this.left.execute(environment);
        const rightValue = this.right.execute(environment);
        let result;
        const tipoDominante = this.tipoDominante(leftValue.type, rightValue.type);
        if (this.type == ArithmeticOption.PLUS) {
            if (tipoDominante == ret_v_1.Type.STRING) {
                //console.log(leftValue.value.toString());
                result = { value: (leftValue.value.toString().concat(rightValue.value.toString())), type: ret_v_1.Type.STRING };
            }
            else if (tipoDominante == ret_v_1.Type.NUMBER) {
                result = { value: (leftValue.value + rightValue.value), type: ret_v_1.Type.NUMBER };
            }
            else {
                throw new err_1.Err(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' _ ' + rightValue.type);
            }
        }
        else if (this.type == ArithmeticOption.MINUS) {
            if (tipoDominante == ret_v_1.Type.STRING)
                throw new err_1.Err(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' _ ' + rightValue.type);
            result = { value: (leftValue.value - rightValue.value), type: ret_v_1.Type.BOOLEAN };
        }
        else if (this.type == ArithmeticOption.BY) {
            result = { value: (leftValue.value * rightValue.value), type: ret_v_1.Type.NUMBER };
        }
        else if (this.type == ArithmeticOption.MOD) {
            result = { value: (leftValue.value % rightValue.value), type: ret_v_1.Type.NUMBER };
        }
        else if (this.type == ArithmeticOption.POW) {
            result = { value: (Math.pow(leftValue.value, rightValue.value)), type: ret_v_1.Type.NUMBER };
        }
        else {
            if (rightValue.value == 0) {
                throw new err_1.Err(this.line, this.column, "Semantico", "No se puede dividir entre 0");
            }
            result = { value: (leftValue.value / rightValue.value), type: ret_v_1.Type.NUMBER };
        }
        return result;
    }
}
exports.Arithmetic = Arithmetic;
//# sourceMappingURL=Arithmetic.js.map