import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { Retorno, Type } from "../Abstract/ret_v";
import {vars} from "../app";

export class Tsymbol extends Instruction {

    constructor( line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment) {
        const ff = environment.print_symbol();
        const ee = environment.print_func();
        //console.log(ee);
        for (let i = 0; i < ff.length; i++) {
            //console.log(ff[i]);
            vars.push(ff[i]); 
        }

        for (let i = 0; i < ee.length; i++) {
            vars.push(ee[i]); 
        }
    }
}