"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tsymbol = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const app_1 = require("../app");
class Tsymbol extends Instruction_1.Instruction {
    constructor(line, column) {
        super(line, column);
    }
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
//# sourceMappingURL=Tsymbol.js.map