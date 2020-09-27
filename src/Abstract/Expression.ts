import { Retorno, Type } from "./ret_v";
import { Environment } from "../Symbol/Environment";
import { tipos } from "../Util/TablaTipos";

export abstract class Expression {

    public line: number;
    public column: number;

    constructor(line: number, column: number) {
        this.line = line;
        this.column = column;
    }

    public abstract execute(environment: Environment) : Retorno;

    public tipoDominante(t1 : Type, t2 : Type) : Type{//se calcula el tipo dominate
        const calcType = tipos[t1][t2];
        return calcType;
    }

}

