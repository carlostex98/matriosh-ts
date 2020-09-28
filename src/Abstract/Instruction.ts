import { Environment } from "../Symbol/Environment";

export abstract class Instruction {

    public line: number;
    public column: number;

    constructor(line: number, column: number) {
        this.line = line;
        this.column = column;
    }

    public abstract execute(environment : Environment) : any;
    //abstraccion de execute

}

/**
 * 
 * \
 *  \
 *   \
 *    \
 *     \
 *      \
 *       \   |........|
 *       /   |........|
 *      /
 *     /
 *    /
 *   /
 *  /
 * /
 *
 */

 /**
 * 
 * Este codigo NO participo en plagio con los otros compañeros del curso
 * 
 * pongo esto porque quede traumado con algo asi en el pasado :(    
 * 
 */