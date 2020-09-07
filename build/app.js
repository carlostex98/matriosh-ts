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
class App {
    constructor() {
        this.traduced = "";
        this.parser = require('./gram/grammar');
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
            let p = this.parser.parse(req.body.codigo);
            this.traduced = p;
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