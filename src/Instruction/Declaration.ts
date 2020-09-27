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
        //registro de la linea y columna en la tabla de simbolos
    }

    public execute(env: Environment) {
        const val = this.value.execute(env);
        env.guardar(this.id, val.value, val.type, this.line, this.column, this.tpx);
        //guardamos la variable en el enviroment actual
    }

}