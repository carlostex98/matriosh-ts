import express, { Application, request, response } from 'express';
import path from "path";
import bodyParser from "body-parser";
import ejs from 'ejs';

export class App {
    private app: Application;
    private traduced: String = "";
    public parser = require('./gram/grammar');

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
            let p = this.parser.parse(req.body.codigo);
            this.traduced = p;
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