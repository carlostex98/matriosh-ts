import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { Retorno } from "../Abstract/ret_v";

export class Return extends Instruction{

    constructor(private value : Expression, line : number, column : number){
        super(line, column);
    }

    public execute(environment : Environment): Retorno {
        const value = this.value.execute(environment);
        //console.log(value);
        return {value: value.value, type: value.type};
    }
    //pos un return bro
}