import { Instruction } from "../Abstract/Instruction";
import { Environment } from "../Symbol/Environment";
import { Expression } from "../Abstract/Expression";
import { Retorno, Type } from "../Abstract/ret_v";
import {vars} from "../app";

export class Tsymbol extends Instruction {

    constructor( line: number, column: number) {
        super(line, column);
    }
    /**
     * 
     * recibimos una camptura de la tabla de simbolos
     * para hecer push a la que se mostrara en el navegador
     * si vienen varios graficar_ts 
     * hara push de las variables que esten al alcance del contexto
     * en donde fue llamado el graficar_ts
     * 
     */
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