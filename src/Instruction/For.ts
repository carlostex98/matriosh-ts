import { Instruction } from "../Abstract/Instruction";
import { Expression } from "../Abstract/Expression";
import { Environment } from "../Symbol/Environment";
import { Type } from "../Abstract/ret_v";

export class For extends Instruction{

    constructor(private vars: Instruction, private cnd : Expression, private incr: Instruction,private code : Instruction, line : number, column : number){
        super(line, column);
    }

    public execute(env : Environment) {
        
        this.vars.execute(env);
        let condition = this.cnd.execute(env);
        if(condition.type != Type.BOOLEAN){
            throw {error: "Not boolean expression", linea: this.line, columna : this.column};
        }
        
        while(condition.value == true){
            //console.log("si");
            const element = this.code.execute(env);
            if(element != null || element != undefined){
                console.log(element);
                if(element.type == 'Break')
                    //suporting break
                    break;
                else if(element.type == 'Continue')
                    //suporting continue
                    continue;
            }
            condition = this.cnd.execute(env);
            if(condition.type != Type.BOOLEAN){
                throw {error: "Not boolean expression", linea: this.line, columna : this.column};
            }
            this.incr.execute(env);
        }
    }
}