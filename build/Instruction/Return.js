"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Return = void 0;
const Instruction_1 = require("../Abstract/Instruction");
class Return extends Instruction_1.Instruction {
    constructor(value, line, column) {
        super(line, column);
        this.value = value;
    }
    execute(environment) {
        const value = this.value.execute(environment);
        return { value: value.value, type: value.type };
    }
}
exports.Return = Return;
//# sourceMappingURL=Return.js.map