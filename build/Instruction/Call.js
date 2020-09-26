"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Call = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Environment_1 = require("../Symbol/Environment");
class Call extends Instruction_1.Instruction {
    constructor(id, expresiones, line, column) {
        super(line, column);
        this.id = id;
        this.expresiones = expresiones;
    }
    execute(environment) {
        const func = environment.getFuncion(this.id);
        if (func != undefined) {
            //console.log(this.expresiones.length);
            const newEnv = new Environment_1.Environment(environment.getGlobal());
            for (let i = 0; i < this.expresiones.length; i++) {
                const value = this.expresiones[i].execute(environment);
                newEnv.guardar(func.parametros[i], value.value, value.type, this.line, this.column, 1);
            }
            var f = func.statment.execute(newEnv);
            if (f != undefined) {
                return { value: f.value, type: f.type };
            }
        }
    }
}
exports.Call = Call;
//# sourceMappingURL=Call.js.map