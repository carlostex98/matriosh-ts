import express, { Application, request, response } from 'express';
import path from "path";
import bodyParser from "body-parser";
import ejs from 'ejs';


import { Instruction } from "./Abstract/Instruction";
import { Environment } from "./Symbol/Environment";
import { errores } from './Errores';
import { Err } from "./err";
import { Function } from "./Instruction/Function";
export let cons : Array<any> = new Array();





export class App {
    private app: Application;
    private traduced: String = "";
    private console_out: String = "";
    private grafo: String = "";

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

        this.app.get('/compiled', (req, res) => {
            var m = {
                consola: this.console_out,
                grafo: this.grafo
            }
            res.render('compiled.ejs', m);
        });

        

        this.app.post('/', (req, res) => {
            let n = this.gst.parser.parse(req.body.codigo);
            let p = this.parser.parse(req.body.codigo);
            
            this.traduced = p[0];
            this.grafo = n;
            if(req.body.opt==1){
                res.redirect('/traduced');
            }else{
                this.interpreter(p[0]);
                this.cons_join();
                res.redirect('/compiled');
            }
            
        });

    }
    settings() {
        this.app.set("view engine", "ejs");
        this.app.set("views", path.join(__dirname, "views"));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    public cons_join(){
        this.console_out="";
        for(let i = 0; i<cons.length; i++){
            this.console_out+=cons[i].toString()+"\n";
        }
        cons = [];
    }

    public interpreter(codigo: string){
        const ast = this.intr.parse(codigo);
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
    }


    async listen() {
        await this.app.listen(3000);
        console.log("Estamos al aire :p")
    }

}