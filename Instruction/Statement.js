"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statement = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Environment_1 = require("../Symbol/Environment");
const Errores_1 = require("../Errores");
class Statement extends Instruction_1.Instruction {
    constructor(code, line, column) {
        super(line, column);
        this.code = code;
    }
    execute(env) {
        const newEnv = new Environment_1.Environment(env);
        for (const instr of this.code) {
            try {
                const element = instr.execute(newEnv);
                if (element != undefined || element != null)
                    return element;
            }
            catch (error) {
                Errores_1.errores.push(error);
            }
        }
    }
}
exports.Statement = Statement;
//# sourceMappingURL=Statement.js.map