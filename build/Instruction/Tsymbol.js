"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tsymbol = void 0;
const Instruction_1 = require("../Abstract/Instruction");
class Tsymbol extends Instruction_1.Instruction {
    constructor(line, column) {
        super(line, column);
    }
    execute(environment) {
        const func = environment.print_symbol();
        const f2 = environment.print_func();
        console.log(func);
        console.log(f2);
    }
}
exports.Tsymbol = Tsymbol;
//# sourceMappingURL=Tsymbol.js.map