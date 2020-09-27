import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import {cons} from "../app"

export class Print extends Instruction{

    constructor(private value : Expression, line : number, column : number){
        super(line, column);
    }

    public execute(envx : Environment) {
        const v = this.value.execute(envx);
        //console.log(value.value);
        //console.log(v);
        cons.push(v.value);//hacemos un push de lo que se mostrara en consoleax
    }
}