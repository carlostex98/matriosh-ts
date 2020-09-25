"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
const Symbol_1 = require("./Symbol");
class Environment {
    constructor(anterior) {
        this.anterior = anterior;
        this.variables = new Map();
        this.funciones = new Map();
        this.vary = new Map();
        this.varx = new Map();
    }
    guardar(id, valor, type, linea, columna) {
        let env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                env.variables.set(id, new Symbol_1.Symbol(valor, id, type));
                env.vary.set(id, linea);
                env.varx.set(id, columna);
                return;
            }
            env = env.anterior;
        }
        this.variables.set(id, new Symbol_1.Symbol(valor, id, type));
        this.vary.set(id, linea);
        this.varx.set(id, columna);
    }
    guardarFuncion(id, funcion) {
        //TODO ver si la funcion ya existe, reportar error
        this.funciones.set(id, funcion);
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
    setVar(id, valor, type) {
    }
}
exports.Environment = Environment;
//# sourceMappingURL=Environment.js.map