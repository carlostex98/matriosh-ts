"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tsymbol = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const app_1 = require("../app");
class Tsymbol extends Instruction_1.Instruction {
    constructor(line, column) {
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
    execute(environment) {
        const ff = environment.print_symbol();
        const ee = environment.print_func();
        //console.log(ee);
        for (let i = 0; i < ff.length; i++) {
            //console.log(ff[i]);
            app_1.vars.push(ff[i]);
        }
        for (let i = 0; i < ee.length; i++) {
            app_1.vars.push(ee[i]);
        }
    }
}
exports.Tsymbol = Tsymbol;
/**
 *
 * Este codigo NO participo en plagio con los otros compañeros del curso
 *
 * pongo esto porque quede traumado con algo asi en el pasado :(
 *
 */ 
//# sourceMappingURL=Tsymbol.js.map