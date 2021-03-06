"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const Instruction_1 = require("../Abstract/Instruction");
class Switch extends Instruction_1.Instruction {
    constructor(left, cases, line, column) {
        super(line, column);
        this.left = left;
        this.cases = cases;
    }
    /**
     *
     * recibe un arrays de casos y luego evalua uno por uno
     * haciendo uso de un for
     * si recibe un break, rompe el switch para evitar la ejecusion de
     * los demas casos :p
     *
     */
    execute(env) {
        for (let i = 0; i < this.cases.length; i++) {
            let casex = this.cases[i].execute(env);
            if (casex.tipo == 0) { //normal case
                let left = this.left.execute(env); //valor constante
                let right = casex.right.execute(env); //valor de cada caso
                if (left.value == right.value) {
                    let elementor = casex.code.execute(env);
                    if (elementor != null || elementor != undefined) {
                        if (elementor.type == 'Break')
                            break;
                    }
                    break;
                }
            }
            else {
                //default case
                let elementor = casex.code.execute(env);
                if (elementor != null || elementor != undefined) {
                    if (elementor.type == 'Break')
                        break;
                }
                break;
            }
        }
    }
}
exports.Switch = Switch;
/**
 *
 * Este codigo NO participo en plagio con los otros compañeros del curso
 *
 * pongo esto porque quede traumado con algo asi en el pasado :(
 *
 */ 
//# sourceMappingURL=Switch.js.map