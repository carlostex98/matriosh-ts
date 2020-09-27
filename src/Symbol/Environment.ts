import { env } from "process"
import { Symbol } from "./Symbol";
import { Type } from "../Abstract/ret_v";
import { Function } from "../Instruction/Function";
import { Err } from "../err";

export class Environment {

    private variables: Map<string, Symbol>;//variables
    private vary: Map<string, number>;//pos y var
    private varx: Map<string, number>; //pos x var
    public funciones: Map<string, Function>; //unciones
    public tpx: Map<string, number>; //tipo func

    constructor(public anterior: Environment | null) {
        this.variables = new Map();
        this.funciones = new Map();
        this.vary = new Map();
        this.varx = new Map();
        this.tpx = new Map();
    }

    public guardar(id: string, valor: any, type: Type, linea: number, columna: number, tpx: number) {
        //guarda las variaqbles
        let env: Environment | null = this;
        while (env != null) {
            if (env.variables.has(id)) {
                //validamos
                var f = env.tpx.get(id);
                if (f == 1) {
                    //variable
                    env.variables.set(id, new Symbol(valor, id, type));
                    env.vary.set(id, linea);
                    env.varx.set(id, columna);
                    env.tpx.set(id, tpx);
                } else {
                    throw new Err(linea, columna, "Semantico", "No se puede reasignar una constante");
                }
                return;
            }
            env = env.anterior;
            //recorremos los demas envs
        }

        //es el env principal, el main
        if (this.variables.has(id)) {
            var f = this.tpx.get(id);
            if (f == 1) {
                //variable
                this.variables.set(id, new Symbol(valor, id, type));
                this.vary.set(id, linea);
                this.varx.set(id, columna);
                this.tpx.set(id, tpx);
            } else {
                throw new Err(linea, columna, "Semantico", "No se puede reasignar una constante");
            }
        }else{
            this.variables.set(id, new Symbol(valor, id, type));
            this.vary.set(id, linea);
            this.varx.set(id, columna);
            this.tpx.set(id, tpx);
        }



    }

    //guarda func
    public guardarFuncion(id: string, funcion: Function, line: number, column: number) {
        if (this.funciones.has(id)) {
            //tiramos error si la funcion ya existe en el env
            throw new Err(line, column, "Semantico", "La funcion ya existe");
        } else {
            this.funciones.set(id, funcion);
        }

    }

    //obtiene var
    public getVar(id: string): Symbol | undefined | null {
        let envior: Environment | null = this;
        while (envior != null) {
            if (envior.variables.has(id)) {
                return envior.variables.get(id);
            }
            envior = envior.anterior;
        }
        return null;//en acces tira error si no existe
    }

    //obtiene funccion
    public getFuncion(id: string): Function | undefined {
        let envx: Environment | null = this;
        while (envx != null) {
            if (envx.funciones.has(id)) {
                //detecta la func en el map
                return envx.funciones.get(id);
            }
            envx = envx.anterior;
        }
        return undefined;
    }

    //env global
    public getGlobal(): Environment {
        let envg: Environment | null = this;
        while (envg?.anterior != null) {

            envg = envg.anterior;
        }
        return envg;
    }

    /*
    --------- imagen tabla de simbolos
    */

    //retorna la tabla de simbolos
    public print_symbol() {

        let general = [];
        let env: Environment | null = this;
        while (env != null) {
            let a = [];
            let b = [];
            let c = [];
            let d = [];
            for (let entry of env.variables.entries()) {
                a.push(entry[0]);
                b.push(entry[1].valor);
            }

            for (let entry of env.varx.entries()) {
                c.push(entry[1]);
            }

            for (let entry of env.vary.entries()) {
                d.push(entry[1]);
            }

            for (let i = 0; i < a.length; i++) {
                general.push([a[i], b[i], "Variable", c[i], d[i]]);
            }
            env = env.anterior;
        }
        return general;
    }

    //retorna las funciones
    public print_func() {
        let env: Environment | null = this;
        let general = [];
        while (env != null) {
            //el valor del map ya contiene la ln y col
            for (let entry of env.funciones.entries()) {
                general.push([entry[0], "Codigo", "Funcion", entry[1].line, entry[1].column]);
            }

            env = env.anterior;
        }
        return general;
    }

}
