import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { Retorno, Type } from "../Abstract/ret_v";

export class Call extends Instruction {

    constructor(private id: string, private expresiones: Array<Expression>, line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment): Retorno | undefined {
        const func = environment.getFuncion(this.id);
        if (func != undefined) {
            //console.log(this.expresiones.length);
            const newEnv = new Environment(environment.getGlobal());
            for (let i = 0; i < this.expresiones.length; i++) {
                const value = this.expresiones[i].execute(environment);
                newEnv.guardar(func.parametros[i], value.value, value.type, this.line, this.column);
            }
            var f=func.statment.execute(newEnv);
            if(f!=undefined){
                return {value : f.value, type : f.type};
            }

        }
    }
}
