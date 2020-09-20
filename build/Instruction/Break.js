"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Break = void 0;
const Instruction_1 = require("../Abstract/Instruction");
class Break extends Instruction_1.Instruction {
    constructor(line, column) {
        super(line, column);
    }
    execute(environment) {
        return { line: this.line, column: this.column, type: 'Break' };
    }
}
exports.Break = Break;
//# sourceMappingURL=Break.js.map