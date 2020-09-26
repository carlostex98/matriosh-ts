"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Access = void 0;
const Expression_1 = require("../Abstract/Expression");
class Access extends Expression_1.Expression {
    constructor(id, line, column) {
        super(line, column);
        this.id = id;
    }
    execute(environment) {
        const value = environment.getVar(this.id);
        if (value == null)
            throw new Error("Variable inexistente");
        return { value: value.valor, type: value.type };
    }
}
exports.Access = Access;
//# sourceMappingURL=Access.js.map