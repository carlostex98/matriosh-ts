import express, { Application, request, response } from 'express';
import path from "path";
import bodyParser from "body-parser";
import ejs from 'ejs';


import { Instruction } from "./Abstract/Instruction";
import { Environment } from "./Symbol/Environment";
import { errores } from './Errores';
import { Err } from "./err";
import { Function } from "./Instruction/Function";






export class App {
    private app: Application;
    private traduced: String = "";
    public parser = require('./gram/grammar');
    public gst = require("./ast/ast");
    public intr = require("./Interpreter/interpreter");

    constructor() {
        this.app = express();
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
            }
            res.render('traduced.ejs', m);
        });

        this.app.post('/', (req, res) => {
            //let n = this.gst.parser.parse(req.body.codigo);
            //let p = this.parser.parse(req.body.codigo);
            this.traduced = "ver consola";
            const ast = this.intr.parse(req.body.codigo);
            const env = new Environment(null);
            for(const instr of ast){
                try {
                    if(instr instanceof Function)
                        instr.execute(env);
                } catch (error) {
                    errores.push(error);  
                }
            }

            for(const instr of ast){
                if(instr instanceof Function)
                    continue;
                try {
                    const actual = instr.execute(env);
                    if(actual != null || actual != undefined){
                        errores.push(new Err(actual.line, actual.column, 'Semantico', actual.type + ' fuera de un ciclo'));
                    }
                } catch (error) {
                    errores.push(error);  
                }
            }

            for (let index = 0; index < errores.length; index++) {
                console.log(errores[index]);
            }
            
            res.redirect('/traduced');
        });

    }
    settings() {
        this.app.set("view engine", "ejs");
        this.app.set("views", path.join(__dirname, "views"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }


    async listen() {
        await this.app.listen(3000);
        console.log("Estamos al aire :p")
    }

}