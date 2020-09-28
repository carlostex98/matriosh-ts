import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { Type } from "../Abstract/ret_v";

export class While extends Instruction{

    constructor(private condition : Expression, private code : Instruction, line : number, column : number){
        super(line, column);
    }


    /**
     * 
     * un while bonito
     * divide y venceras :p
     * 
     */
    public execute(env : Environment) {
        let condition = this.condition.execute(env);
        if(condition.type != Type.BOOLEAN){
            throw {error: "La expresion no es booleana", linea: this.line, columna : this.column};
        }
        while(condition.value == true){
            const element = this.code.execute(env);
            if(element != null || element != undefined){
                if(element.type == 'Break')
                    break;
                else if(element.type == 'Continue')
                    continue;
            }
            condition = this.condition.execute(env);
            if(condition.type != Type.BOOLEAN){
                throw {error: "La expresion no es booleana", linea: this.line, columna : this.column};
            }
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