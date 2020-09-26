import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { env } from "process";

export class Declaration extends Instruction{

    private id : string;
    private value : Expression;
    private tpx : number;

    constructor(id: string, value : Expression, line : number, column: number, tpx: number){
        super(line, column);
        this.id = id;
        this.value = value;
        this.tpx=tpx;
    }

    public execute(environment: Environment) {
        //console.log(environment);
        const val = this.value.execute(environment);
        environment.guardar(this.id, val.value, val.type, this.line, this.column, this.tpx);
    }

}