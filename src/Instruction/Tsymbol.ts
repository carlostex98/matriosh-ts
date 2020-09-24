import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { Retorno, Type } from "../Abstract/ret_v";

export class Tsymbol extends Instruction {

    constructor( line: number, column: number) {
        super(line, column);
    }

    public execute(environment: Environment) {
        const func = environment.print_symbol();
        const f2 = environment.print_func();
        console.log(func);
        console.log(f2);
    }
}