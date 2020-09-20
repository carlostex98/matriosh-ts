"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const Environment_1 = require("./Symbol/Environment");
const Errores_1 = require("./Errores");
const err_1 = require("./err");
const Function_1 = require("./Instruction/Function");
class App {
    constructor() {
        this.traduced = "";
        this.parser = require('./gram/grammar');
        this.gst = require("./ast/ast");
        this.intr = require("./Interpreter/interpreter");
        this.app = express_1.default();
        this.settings();
        this.routes();
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.render('index.ejs');
        });
        this.app.get('/traduced', (req, res) => {
            var m = {
                trd: this.traduced
            };
            res.render('traduced.ejs', m);
        });
        this.app.post('/', (req, res) => {
            //let n = this.gst.parser.parse(req.body.codigo);
            //let p = this.parser.parse(req.body.codigo);
            this.traduced = "ver consola";
            const ast = this.intr.parse(req.body.codigo);
            const env = new Environment_1.Environment(null);
            for (const instr of ast) {
                try {
                    if (instr instanceof Function_1.Function)
                        instr.execute(env);
                }
                catch (error) {
                    Errores_1.errores.push(error);
                }
            }
            for (const instr of ast) {
                if (instr instanceof Function_1.Function)
                    continue;
                try {
                    const actual = instr.execute(env);
                    if (actual != null || actual != undefined) {
                        Errores_1.errores.push(new err_1.Err(actual.line, actual.column, 'Semantico', actual.type + ' fuera de un ciclo'));
                    }
                }
                catch (error) {
                    Errores_1.errores.push(error);
                }
            }
            for (let index = 0; index < Errores_1.errores.length; index++) {
                console.log(Errores_1.errores[index]);
            }
            res.redirect('/traduced');
        });
    }
    settings() {
        this.app.set("view engine", "ejs");
        this.app.set("views", path_1.default.join(__dirname, "views"));
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(3000);
            console.log("Estamos al aire :p");
        });
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map