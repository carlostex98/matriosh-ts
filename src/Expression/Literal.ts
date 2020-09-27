import { Expression } from "../Abstract/Expression";
import { Retorno, Type } from "../Abstract/ret_v";

export class Literal extends Expression{
    
    constructor(private value : any, line : number, column: number, private type : number){
        super(line, column);
    }

    public execute() : Retorno{
        if(this.type < 1){
            return {value : Number(this.value), type : Type.NUMBER};
        } else if(this.type == 1){
            let z = this.value.substr(1,this.value.length-2);
            return {value : z, type : this.type};
        } else {
            return {value : this.value, type : this.type};
        }
            
    }
}