"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaration = void 0;
const Instruction_1 = require("../Abstract/Instruction");
class Declaration extends Instruction_1.Instruction {
    constructor(id, value, line, column, tpx) {
        super(line, column);
        this.id = id;
        this.value = value;
        this.tpx = tpx;
    }
    execute(environment) {
        //console.log(environment);
        const val = this.value.execute(environment);
        environment.guardar(this.id, val.value, val.type, this.line, this.column, this.tpx);
    }
}
exports.Declaration = Declaration;
//# sourceMappingURL=Declaration.js.map