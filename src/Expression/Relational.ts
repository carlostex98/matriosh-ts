import { Expression } from "../Abstract/Expression";
import { Retorno, Type } from "../Abstract/ret_v";
import { Environment } from "../Symbol/Environment";

export enum RelationalOption {
    EQUAL,
    NOTEQUAL,
    LESS,
    LESSOREQUAL,
    GREATER,
    GREATEROREQUAL,
    AND,
    OR,
    NOT
}

export class Relational extends Expression {

    constructor(private left: Expression, private right: Expression, private type: RelationalOption, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment): Retorno {
        const leftValue = this.left.execute(environment);
        const rightValue = this.right.execute(environment);
        if (this.type == RelationalOption.EQUAL) {
            const result = leftValue.value == rightValue.value;
            return { value: result, type: Type.BOOLEAN };
        }
        else if (this.type == RelationalOption.NOTEQUAL) {
            const result = leftValue.value != rightValue.value;
            return { value: result, type: Type.BOOLEAN };
        }
        else if (this.type == RelationalOption.LESS) {
            const result = leftValue.value < rightValue.value;
            return { value: result, type: Type.BOOLEAN };
        }
        else if (this.type == RelationalOption.LESSOREQUAL) {
            const result = leftValue.value <= rightValue.value;
            return { value: result, type: Type.BOOLEAN };
        }
        else if (this.type == RelationalOption.GREATER) {
            const result = leftValue.value > rightValue.value;
            return { value: result, type: Type.BOOLEAN };
        }
        else if (this.type == RelationalOption.GREATEROREQUAL) {
            const result = leftValue.value >= rightValue.value;
            return { value: result, type: Type.BOOLEAN };
        }
        else if (this.type == RelationalOption.AND) {
            const result = leftValue.value && rightValue.value;
            return { value: result, type: Type.BOOLEAN };
        }
        else if (this.type == RelationalOption.OR) {
            const result = leftValue.value || rightValue.value;
            return { value: result, type: Type.BOOLEAN };
        }
        else if (this.type == RelationalOption.NOT) {
            const result = ! leftValue.value;
            return { value: result, type: Type.BOOLEAN };
        }
        return { value: 0, type: Type.NUMBER }
    }
}