import express, {Application} from 'express';
import path from "path";
import ejs from 'ejs';

export class App{
    private app: Application;

    constructor () {
        this.app = express();
        this.settings();
        this.routes();
    }

    routes(){
        this.app.get('/', (req, res)=>{
            res.render('index.ejs');
        });
    }
    settings(){
        this.app.set( "view engine", "ejs" );
        this.app.set( "views", path.join( __dirname, "views" ) );
    }


    async listen(){
        await this.app.listen(3000);
        console.log("Estamos al aire :p")
    }

}