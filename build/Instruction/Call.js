"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Call = void 0;
const Instruction_1 = require("../Abstract/Instruction");
const Environment_1 = require("../Symbol/Environment");
const err_1 = require("../err");
class Call extends Instruction_1.Instruction {
    constructor(id, expresiones, line, column) {
        super(line, column);
        this.id = id;
        this.expresiones = expresiones;
    }
    execute(env) {
        const func = env.getFuncion(this.id);
        if (func != undefined) {
            const newEnv = new Environment_1.Environment(env.getGlobal()); //atraemos el env general
            for (let i = 0; i < this.expresiones.length; i++) {
                //se guaradan la variables de la funcion en el enviroment para poder usarlas
                const v = this.expresiones[i].execute(env);
                newEnv.guardar(func.parametros[i], v.value, v.type, this.line, this.column, 1);
            }
            //area return, si tiene el statement de return
            var f = func.statment.execute(newEnv);
            if (f != undefined) {
                return { value: f.value, type: f.type };
            }
        }
        else {
            //throw func no existe
            throw new err_1.Err(this.line, this.column, "Semantico", "La funcion no existe");
        }
    }
}
exports.Call = Call;
//# sourceMappingURL=Call.js.map