import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { Type } from "../Abstract/ret_v";

export class Cases {

    //esta clase solo encapsula el codigo, no lo ejecuta
    constructor(private tipo: number, private right : Expression, private code : Instruction, private line : number, private column : number){
        //super(line, column);
    }

    public execute(env : Environment) {
        return {tipo: this.tipo, right: this.right, code: this.code, line: this.line, column: this.column};
    }
}

/**
 * 
 * Este codigo NO participo en plagio con los otros compañeros del curso
 * 
 * pongo esto porque quede traumado con algo asi en el pasado :(    
 * 
 */