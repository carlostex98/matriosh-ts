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
        let env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                //validamos
                var f = env.tpx.get(id);
                if (f == 1) {
                    //variable
                    env.variables.set(id, new Symbol_1.Symbol(valor, id, type));
                    env.vary.set(id, linea);
                    env.varx.set(id, columna);
                    env.tpx.set(id, tpx);
                }
                else {
                    throw new err_1.Err(linea, columna, "Semantico", "No se puede reasignar una constante");
                }
                return;
            }
            env = env.anterior;
        }
        if (this.variables.has(id)) {
            var f = this.tpx.get(id);
            if (f == 1) {
                //variable
                this.variables.set(id, new Symbol_1.Symbol(valor, id, type));
                this.vary.set(id, linea);
                this.varx.set(id, columna);
                this.tpx.set(id, tpx);
            }
            else {
                throw new err_1.Err(linea, columna, "Semantico", "No se puede reasignar una constante");
            }
        }
        else {
            this.variables.set(id, new Symbol_1.Symbol(valor, id, type));
            this.vary.set(id, linea);
            this.varx.set(id, columna);
            this.tpx.set(id, tpx);
        }
    }
    guardarFuncion(id, funcion, line, column) {
        //TODO ver si la funcion ya existe, reportar error
        if (this.funciones.has(id)) {
            //tiramos error
            throw new err_1.Err(line, column, "Semantico", "La funcion ya existe");
        }
        else {
            this.funciones.set(id, funcion);
        }
    }
    getVar(id) {
        let env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                return env.variables.get(id);
            }
            env = env.anterior;
        }
        return null;
    }
    getFuncion(id) {
        let env = this;
        while (env != null) {
            if (env.funciones.has(id)) {
                return env.funciones.get(id);
            }
            env = env.anterior;
        }
        return undefined;
    }
    getGlobal() {
        let env = this;
        while ((env === null || env === void 0 ? void 0 : env.anterior) != null) {
            env = env.anterior;
        }
        return env;
    }
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
        //console.log(general);
        return general;
    }
    print_func() {
        let env = this;
        let general = [];
        while (env != null) {
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