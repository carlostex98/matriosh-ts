"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relational = exports.RelationalOption = void 0;
const Expression_1 = require("../Abstract/Expression");
const ret_v_1 = require("../Abstract/ret_v");
var RelationalOption;
(function (RelationalOption) {
    RelationalOption[RelationalOption["EQUAL"] = 0] = "EQUAL";
    RelationalOption[RelationalOption["NOTEQUAL"] = 1] = "NOTEQUAL";
    RelationalOption[RelationalOption["LESS"] = 2] = "LESS";
    RelationalOption[RelationalOption["LESSOREQUAL"] = 3] = "LESSOREQUAL";
    RelationalOption[RelationalOption["GREATER"] = 4] = "GREATER";
    RelationalOption[RelationalOption["GREATEROREQUAL"] = 5] = "GREATEROREQUAL";
    RelationalOption[RelationalOption["AND"] = 6] = "AND";
    RelationalOption[RelationalOption["OR"] = 7] = "OR";
    RelationalOption[RelationalOption["NOT"] = 8] = "NOT";
})(RelationalOption = exports.RelationalOption || (exports.RelationalOption = {}));
class Relational extends Expression_1.Expression {
    constructor(left, right, type, line, column) {
        super(line, column);
        this.left = left;
        this.right = right;
        this.type = type;
    }
    execute(environment) {
        const leftValue = this.left.execute(environment);
        const rightValue = this.right.execute(environment);
        if (this.type == RelationalOption.EQUAL) {
            const result = leftValue.value == rightValue.value;
            return { value: result, type: ret_v_1.Type.BOOLEAN };
        }
        else if (this.type == RelationalOption.NOTEQUAL) {
            const result = leftValue.value != rightValue.value;
            return { value: result, type: ret_v_1.Type.BOOLEAN };
        }
        else if (this.type == RelationalOption.LESS) {
            const result = leftValue.value < rightValue.value;
            return { value: result, type: ret_v_1.Type.BOOLEAN };
        }
        else if (this.type == RelationalOption.LESSOREQUAL) {
            const result = leftValue.value <= rightValue.value;
            return { value: result, type: ret_v_1.Type.BOOLEAN };
        }
        else if (this.type == RelationalOption.GREATER) {
            const result = leftValue.value > rightValue.value;
            return { value: result, type: ret_v_1.Type.BOOLEAN };
        }
        else if (this.type == RelationalOption.GREATEROREQUAL) {
            const result = leftValue.value >= rightValue.value;
            return { value: result, type: ret_v_1.Type.BOOLEAN };
        }
        else if (this.type == RelationalOption.AND) {
            const result = leftValue.value && rightValue.value;
            return { value: result, type: ret_v_1.Type.BOOLEAN };
        }
        else if (this.type == RelationalOption.OR) {
            const result = leftValue.value || rightValue.value;
            return { value: result, type: ret_v_1.Type.BOOLEAN };
        }
        else if (this.type == RelationalOption.NOT) {
            const result = !leftValue.value;
            //console.log(result);
            return { value: result, type: ret_v_1.Type.BOOLEAN };
        }
        return { value: 0, type: ret_v_1.Type.NUMBER };
    }
}
exports.Relational = Relational;
//# sourceMappingURL=Relational.js.map