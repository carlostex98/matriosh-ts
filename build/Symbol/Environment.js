"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
const Symbol_1 = require("./Symbol");
const err_1 = require("../err");
class Environment {
    constructor(anterior) {
        this.anterior = anterior;
        this.variables = new Map();
        this.funciones = new Map();
        this.vary = new Map();
        this.varx = new Map();
        this.tpx = new Map();
    }
    guardar(id, valor, type, linea, columna, tpx) {
        //guarda las variaqbles
        let env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                //validamos
                //variable
                env.variables.set(id, new Symbol_1.Symbol(valor, id, type));
                env.vary.set(id, linea);
                env.varx.set(id, columna);
                env.tpx.set(id, tpx);
                return;
            }
            env = env.anterior;
            //recorremos los demas envs
        }
        this.variables.set(id, new Symbol_1.Symbol(valor, id, type));
        this.vary.set(id, linea);
        this.varx.set(id, columna);
        this.tpx.set(id, tpx);
    }
    //guarda func
    guardarFuncion(id, funcion, line, column) {
        if (this.funciones.has(id)) {
            //tiramos error si la funcion ya existe en el env
            throw new err_1.Err(line, column, "Semantico", "La funcion ya existe");
        }
        else {
            this.funciones.set(id, funcion);
        }
    }
    //obtiene var
    getVar(id) {
        let envior = this;
        while (envior != null) {
            if (envior.variables.has(id)) {
                return envior.variables.get(id);
            }
            envior = envior.anterior;
        }
        return null; //en acces tira error si no existe
    }
    //obtiene funccion
    getFuncion(id) {
        let envx = this;
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
    getGlobal() {
        let envg = this;
        while ((envg === null || envg === void 0 ? void 0 : envg.anterior) != null) {
            envg = envg.anterior;
        }
        return envg;
    }
    /*
    --------- imagen tabla de simbolos
    */
    //retorna la tabla de simbolos
    print_symbol() {
        let general = [];
        let env = this;
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
    print_func() {
        let env = this;
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
exports.Environment = Environment;
//# sourceMappingURL=Environment.js.map