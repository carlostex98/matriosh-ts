import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";

export class Break extends Instruction{

    constructor(line : number, column : number){
        super(line, column);
    }

    public execute(environment : Environment) {
        return {line : this.line, column: this.column, type : 'Break'};
    }
    //un break sencillo
}

/**
 * 
 * Este codigo NO participo en plagio con los otros compañeros del curso
 * 
 * pongo esto porque quede traumado con algo asi en el pasado :(    
 * 
 */