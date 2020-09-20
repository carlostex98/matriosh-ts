"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
const Instruction_1 = require("../Abstract/Instruction");
class Print extends Instruction_1.Instruction {
    constructor(value, line, column) {
        super(line, column);
        this.value = value;
    }
    execute(environment) {
        const value = this.value.execute(environment);
        console.log(value.value);
    }
}
exports.Print = Print;
//# sourceMappingURL=Print.js.map