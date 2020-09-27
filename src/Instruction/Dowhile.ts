import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { Type } from "../Abstract/ret_v";

export class Dowhile extends Instruction {

    constructor(private condition: Expression, private code: Instruction, line: number, column: number) {
        super(line, column);
    }

    //sigue la misma logica que el while solo que con un dowhile :p
    public execute(envr: Environment) {
        let cond = this.condition.execute(envr);
        if (cond.type != Type.BOOLEAN) {
            throw { error: "La expresion no es booleana", linea: this.line, columna: this.column };
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
            if (cond.type != Type.BOOLEAN) {
                throw { error: "La expresion no es booleana", linea: this.line, columna: this.column };
            }
        } while (cond.value == true);//evalua :p
    }
}