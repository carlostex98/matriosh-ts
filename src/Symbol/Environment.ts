import { env } from "process"
import { Symbol } from "./Symbol";
import { Type } from "../Abstract/ret_v";
import { Function } from "../Instruction/Function";

export class Environment {

    private variables: Map<string, Symbol>;
    private vary: Map<string, number>;
    private varx: Map<string, number>;
    public funciones: Map<string, Function>;

    constructor(public anterior: Environment | null) {
        this.variables = new Map();
        this.funciones = new Map();
        this.vary = new Map();
        this.varx = new Map();
    }

    public guardar(id: string, valor: any, type: Type, linea: number, columna: number) {
        let env: Environment | null = this;
        while (env != null) {
            if (env.variables.has(id)) {
                env.variables.set(id, new Symbol(valor, id, type));
                env.vary.set(id, linea);
                env.varx.set(id, columna);
                return;
            }
            env = env.anterior;
        }
        this.variables.set(id, new Symbol(valor, id, type));
        this.vary.set(id, linea);
        this.varx.set(id, columna);
    }

    public guardarFuncion(id: string, funcion: Function) {
        //TODO ver si la funcion ya existe, reportar error
        this.funciones.set(id, funcion);
    }

    public getVar(id: string): Symbol | undefined | null {
        let env: Environment | null = this;
        while (env != null) {
            if (env.variables.has(id)) {
                return env.variables.get(id);
            }
            env = env.anterior;
        }
        return null;
    }

    public getFuncion(id: string): Function | undefined {
        let env: Environment | null = this;
        while (env != null) {
            if (env.funciones.has(id)) {
                return env.funciones.get(id);
            }
            env = env.anterior;
        }
        return undefined;
    }

    public getGlobal(): Environment {
        let env: Environment | null = this;
        while (env?.anterior != null) {

            env = env.anterior;
        }
        return env;
    }

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
                general.push([a[i], b[i],"Variable", c[i], d[i]]);
            }
            env = env.anterior;
        }        
        return general;
    }

    public print_func() {
        let env: Environment | null = this;
        let general = [];
        while (env != null) {

            for (let entry of env.funciones.entries()) {
                general.push([entry[0], "Codigo","Funcion",entry[1].line, entry[1].column]); 
            }
            
            env = env.anterior;
        }
        return general;
    }

    public setVar(id: string, valor: any, type: Type) {

    }
}
