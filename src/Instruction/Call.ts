import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { Retorno, Type } from "../Abstract/ret_v";
import { Err } from "../err";

export class Call extends Instruction {

    constructor(private id: string, private expresiones: Array<Expression>, line: number, column: number) {
        super(line, column);
    }

    public execute(env: Environment): Retorno | undefined {
        const func = env.getFuncion(this.id);
        if (func != undefined) {
            const newEnv = new Environment(env.getGlobal());//atraemos el env general
            for (let i = 0; i < this.expresiones.length; i++) {
                //se guaradan la variables de la funcion en el enviroment para poder usarlas
                const v = this.expresiones[i].execute(env);
                newEnv.guardar(func.parametros[i], v.value, v.type, this.line, this.column, 1);
            }
            //area return, si tiene el statement de return
            var f=func.statment.execute(newEnv);
            if(f!=undefined){
                return {value : f.value, type : f.type};
            }

        }else{
            //throw func no existe
            throw new Err(this.line, this.column, "Semantico", "La funcion no existe");
        }
    }
}

/**
 * 
 * Este codigo NO participo en plagio con los otros compañeros del curso
 * 
 * pongo esto porque quede traumado con algo asi en el pasado :(    
 * 
 */