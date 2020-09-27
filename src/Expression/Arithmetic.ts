import { Expression } from "../Abstract/Expression";
import { Retorno, Type } from "../Abstract/ret_v";
import { Environment } from "../Symbol/Environment";
import { env } from "process";
import { Err } from "../err";

export enum ArithmeticOption {
    PLUS,
    MINUS,
    BY,
    DIV,
    MOD,
    POW
}

export class Arithmetic extends Expression {

    constructor(private left: Expression, private right: Expression, private type: ArithmeticOption, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment): Retorno {
        const leftValue = this.left.execute(environment);
        const rightValue = this.right.execute(environment);
        let result: Retorno;
        const tipoDominante = this.tipoDominante(leftValue.type, rightValue.type);

        if (this.type == ArithmeticOption.PLUS) {
            if (tipoDominante == Type.STRING) {
                //console.log(leftValue.value.toString());
                result = { value: (leftValue.value.toString().concat(rightValue.value.toString())), type: Type.STRING };

            } else if (tipoDominante == Type.NUMBER) {
                result = { value: (leftValue.value + rightValue.value), type: Type.NUMBER };
            } else {
                throw new Err(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' _ ' + rightValue.type);
            }
        }
        else if (this.type == ArithmeticOption.MINUS) {
            if (tipoDominante == Type.STRING)
                throw new Err(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' _ ' + rightValue.type);
            result = { value: (leftValue.value - rightValue.value), type: Type.BOOLEAN };
        }
        else if (this.type == ArithmeticOption.BY) {
            result = { value: (leftValue.value * rightValue.value), type: Type.NUMBER };
        }
        else if (this.type == ArithmeticOption.MOD) {
            result = { value: (leftValue.value % rightValue.value), type: Type.NUMBER };
        }
        else if (this.type == ArithmeticOption.POW) {
            result = { value: (leftValue.value ** rightValue.value), type: Type.NUMBER };
        }
        else {
            if (rightValue.value == 0) {
                throw new Err(this.line, this.column, "Semantico", "No se puede dividir entre 0");
            }
            result = { value: (leftValue.value / rightValue.value), type: Type.NUMBER };
        }
        return result;
    }
}

