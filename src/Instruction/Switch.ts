import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { Cases } from "../Instruction/Cases"
import { Type } from "../Abstract/ret_v";

export class Switch extends Instruction {

    constructor(private left: Expression, private cases: Array<Cases>, line: number, column: number) {
        super(line, column);
    }

    /**
     * 
     * recibe un arrays de casos y luego evalua uno por uno
     * haciendo uso de un for
     * si recibe un break, rompe el switch para evitar la ejecusion de
     * los demas casos :p 
     * 
     */

    public execute(env: Environment) {

        for (let i = 0; i < this.cases.length; i++) {
            let casex = this.cases[i].execute(env);
            if (casex.tipo == 0) {//normal case
                let left = this.left.execute(env);//valor constante
                let right = casex.right.execute(env);//valor de cada caso
                if (left.value == right.value) {
                    let elementor = casex.code.execute(env);
                    if (elementor != null || elementor != undefined) {
                        if (elementor.type == 'Break')
                            break;
                    }
                    break;
                }
            } else {
                //default case
                let elementor = casex.code.execute(env);
                if (elementor != null || elementor != undefined) {
                    if (elementor.type == 'Break')
                        break;
                }
                break;
            }


        }
    }
}