%{
    
    let rs = "";//donde habita el reporte
    let nodos = [];
    let relacion = [];
    let nx = 0;

    function nuevoNodo(contenido){
        nx++;
        var tt = "nodo"+nx.toString()+'[ label=\"'+contenido+ '\"];' ;
        nodos.push(tt);
        return nx;
    }

    function creaRelaciones(padre, hijos){
        for (i = 0; i < hijos.length; i++) {
            relacion.push("nodo"+padre.toString()+" -> nodo"+hijos[i].toString());
        }
    }

%}

%lex
%options case-insensitive
number  [0-9]+
decimal {entero}"."{entero}
string  (\"[^"]*\")
string2  (\'[^"]*\')
%%
\s+                   /* skip whitespace */
[/][/].*                                {}  //una linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]	    {} //multilinea
{number}                return 'NUMBER'
{decimal}               return 'DECIMAL'
{string}                return 'STRING'
{string2}               return 'STRING'
"*"                     return '*'
"/"                     return '/'
";"                     return ';'
","                     return ','
"-"                     return '-'
"+"                     return '+'
"^"                     return '^'
"."                     return '.'
"%"                     return '%'

"<"                   return '<'
">"                   return '>'
"<="                  return '<='
">="                  return '>='
"=="                  return '=='
"!="                  return '!='
"||"                  return '||'
"&&"                  return '&&'
"!"                   return '!'
"="                   return '='
":"                   return ':'

"["                     return '['
"]"                     return ']'

"("                     return '('
")"                     return ')' 
"{"                     return '{'
"}"                     return '}'
"if"                    return 'IF'
"else"                  return 'ELSE'
"while"                 return 'WHILE'
"print"                 return 'PRINT'
"break"                 return 'BREAK'
"do"                    return 'DO'
"for"                   return 'FOR'
"switch"                return 'SWITCH'
"case"                  return 'CASE'
"default"               return 'DEFAULT'
"continue"              return 'CONTINUE'
"return"                return 'RETURN'
"console"               return 'CONSOLE'
"log"                   return 'LOG'
"function"              return 'FUNCTION'

"let"                   return 'LET'
"const"                 return 'CONST'
"var"                   return 'VAR'
"of"                    return 'OF'
"in"                    return 'IN'

/*value types*/
"string"                return "T_STRING"
"number"                return "T_NUMBER"
"boolean"               return "T_BOOLEAN"
"void"                  return "T_VOID"
"graficar_ts"           return "GP_TS"

/*array*/
"push"                  return 'PUSH'
"pop"                   return 'POP'

([a-zA-Z_])[a-zA-Z0-9_ñÑ]*	return 'ID';
<<EOF>>		                return 'EOF'

/lex

%left '||'
%left '&&'
%left '==', '!='
%left '>=', '<=', '<', '>'
%left '+' '-'
%left '*' '/'

%start Startup 

%%

Startup
    : Instructions EOF{
        return formater($1);
    }
;

Instructions
    : Instructions instruction {$1.push($2); $$ = $1;}
    | instruction {$$=[$1];}
;

instruction
    : statIf           { $$ = $1; }
    | statWhile        { $$ = $1; }
    | statDo           { $$ = $1; }
    | statFor          { $$ = $1; }
    | statSwitch       { $$ = $1; }
    | statBreak        { $$ = $1; }
    | statContinue     { $$ = $1; }
    | statConsole      { $$ = $1; }
    | statFunc         { $$ = $1; }
    | statGraph        { $$ = $1; }
    | statCreateVar    { $$ = $1; }
    | statConsole      { $$ = $1; }
    | statCall         { $$ = $1; }
    | statIncremento   { $$ = $1; }
    | varDefinition    { $$ = $1; }
    | statReturn       { $$ = $1; }
    | varAsig          { $$ = $1; }
;

statReturn
    : RETURN genExpr ';'    { $$ = sr([$1,$2,$3]);}
    | RETURN varArray ';'   { $$ = sr([$1,$2,$3]); }
    | RETURN  ';'           { $$ = sr([$1,$2]);}
;

varDefinition
    : LET ID '=' genExpr ';'    {$$ = sr([$1,$2,$3,$4,$5]);}
    | CONST ID '=' genExpr ';'  {$$ = sr([$1,$2,$3,$4,$5]);}
    | LET ID ';'                {$$ = sr([$1,$2,$3]);}
    | LET ID '=' varArray ';'   { $$ = sr([$1,$2,$3,$4,$5]); }
;


varArray
    : '[' paramsCall ']' { $$ = $1 + $2 + $3;}
    | '[' ']' { $$ = $1 + $2; }
;

statArray
    : ID '.' PUSH '(' genExpr ')' ';'   { $$ = sr([$1,$2,$3,$4,$5,$6,$7]); }
    | ID '.' POP '(' genExpr ')' ';'    { $$ = sr([$1,$2,$3,$4,$5,$6,$7]); }
;

varAsig
    : ID '=' genExpr ';' {$$ = sr([$1,$2,$3,$4]);}
    : ID '=' varArray ';' {$$ = sr([$1,$2,$3,$4]);}
;

statGraph
    : 'GP_TS' ';' { $$ = nuevoNodo("SYMBOL"); }
;
statIf
    : IF '(' genExpr ')' '{' Instructions '}' moreIf 
    {
        $$=nuevoNodo("IF"); 
        let aux3=nx; 
        creaRelaciones(aux3, [nuevoNodo("INSTR")]); 
        creaRelaciones(nx, $6);
        creaRelaciones(aux3, [nuevoNodo("LOGIC")]);
        creaRelaciones(nx, [$3]);
        creaRelaciones(aux3, [nuevoNodo("EXT")]);
        creaRelaciones(nx, [$8]);
    }
;

moreIf
    : ELSE '{' Instructions '}'     {$$=nuevoNodo("ELSE"); creaRelaciones(nx, [nuevoNodo("INSTR")]); creaRelaciones(nx, $3);}
    | ELSE statIf                   {$$=nuevoNodo("ELSE-IF"); creaRelaciones(nx, [$2]);}
    | /* empty */                   {}
;

statWhile 
    : WHILE '(' genExpr ')' '{' Instructions '}' 
    {
        $$=nuevoNodo("WHILE"); 
        let aux3=nx; 
        creaRelaciones(aux3, [nuevoNodo("INSTR")]); 
        creaRelaciones(nx, $6);
        creaRelaciones(aux3, [nuevoNodo("LOGIC")]);
        creaRelaciones(nx, [$3]);
    }
;

statDo
    : DO '{' Instructions '}' WHILE '(' genExpr ')' ';'  
    {
        $$=nuevoNodo("DO WHILE"); 
        let aux3=nx; 
        creaRelaciones(aux3, [nuevoNodo("INSTR")]); 
        creaRelaciones(nx, $3);
        creaRelaciones(aux3, [nuevoNodo("LOGIC")]);
        creaRelaciones(nx, [$7]);
    }
;

statFor
    : FOR '(' forVariant ')' '{' Instructions '}' 
    { 
        $$=nuevoNodo("FOR"); let aux3=nx; 
        creaRelaciones(nx, [$3]);  
        creaRelaciones(aux3, [nuevoNodo("INSTR")]); 
        creaRelaciones(nx, $6);
    }
;

forVariant
    : VAR ID OF ID                      { $$ = nuevoNodo("STEP"); creaRelaciones(nx,[nuevoNodo($2), nuevoNodo("OF"), nuevoNodo($4)]);}
    | VAR ID IN ID                      { $$ = nuevoNodo("STEP"); creaRelaciones(nx,[nuevoNodo($2), nuevoNodo("IN"), nuevoNodo($4)]); }
    | varFor ';' genExpr ';' pasoFor    { $$ = nuevoNodo("LOGIC"); creaRelaciones(nx, [$1, $3, $5]);}
;

pasoFor
    : ID '+''+'         { $$ = nuevoNodo("INCR: "+ $1); }
    | ID '-''-'         { $$ = nuevoNodo("DECR: "+ $1);}
    | ID '=' genExpr    { $$ = nuevoNodo("STEP"); creaRelaciones(nx, [$1, nuevoNodo("="), $3]); }
;


varFor
    : LET ID '=' genExpr    { $$ = nuevoNodo("VAR"); creaRelaciones(nx, [$2, nuevoNodo("="), $4]);}
    | ID '=' genExpr        { $$ = nuevoNodo("VAR"); creaRelaciones(nx, [$1, nuevoNodo("="), $3]); }
;

unarOpr
    : ID '+''+'';' { $$ = nuevoNodo("INCR: "+ $1); }
    | ID '-''-'';' { $$ = nuevoNodo("DECR: "+ $1); }
;

statSwitch
    : SWITCH '(' genExpr ')' '{' swCases '}'  
    {
        $$ = nuevoNodo("SWITCH");
        let aux2 = nx;
        creaRelaciones(nx, [nuevoNodo("VALOR")]); 
        creaRelaciones(nx, [$3]);
        creaRelaciones(aux2,nuevoNodo("CASES"));
        creaRelaciones(nx, $5);
    }
;

/*fix pusher*/
swCases 
    : swCase swCases {$1.push($2); $$=$1;}
    | swCase {$$=[$1];}
;

swCase
    : CASE genExpr ':' '{' Instructions '}' 
    { 
        $$ = nuevoNodo("CASE"); 
        let aux2 = nx;
        creaRelaciones(nx, [nuevoNodo("VALOR")]); 
        creaRelaciones(nx, [$2]);
        creaRelaciones(aux2,nuevoNodo("INSTR"));
        creaRelaciones(nx, $5);
    }
    | DEFAULT ':' '{' Instructions '}' { $$ = nuevoNodo("DEFAULT"); creaRelaciones(nx, $4);} 
;

statBreak 
    : BREAK ';' { $$ = nuevoNodo("BREAK"); }
;

statContinue
    : CONTINUE ';' { $$ = nuevoNodo("CONTINUE"); }
;

/* here comes the magic */
statFunc 
    : FUNCTION ID '(' paramsFunc ')' ':' typeReturn '{' Instructions '}'  
        { 
            $$=nuevoNodo("FUNC"); 
            let aux1 = nx;
            creaRelaciones(aux, [nuevoNodo("NOMB: "+$2) ]);
            creaRelaciones(aux, [nuevoNodo("PARAMS") ]);
            creaRelaciones(nx, $4);
            creaRelaciones(aux, [nuevoNodo("RETURN": $7) ]);
            creaRelaciones(aux, nuevoNodo("INSTR"));
            creaRelaciones(nx, $9);
            
        }
    | FUNCTION ID '('  ')' ':' typeReturn '{' Instructions '}'  
        {
            $$=nuevoNodo("FUNC"); 
            let aux1 = nx;
            creaRelaciones(aux, [nuevoNodo("NOMB: "+$2) ]);
            creaRelaciones(aux, [nuevoNodo("RETURN": $6) ]);
            creaRelaciones(aux, nuevoNodo("INSTR"));
            creaRelaciones(nx, $8);
        }  
;

paramsFunc
    : paramsFunc ',' tpf    { $1.push($3); $$=$1;}
    | tpf                   { $$ = [$1]; }
;

tpf
    : ID ':' typeVar{ $$ = nuevoNodo("TYPE"); creaRelaciones(nx, [nuevoNodo($1), nuevoNodo($3)]); }
;

typeReturn
    : T_VOID    { $$ = $1; }
    | T_NUMBER  { $$ = $1; }
    | T_BOOLEAN { $$ = $1; }
    | T_STRING  { $$ = $1; }
;

typeVar
    : T_NUMBER  { $$ = $1; }
    | T_BOOLEAN { $$ = $1; }
    | T_STRING  { $$ = $1; }
;


statConsole
    : CONSOLE '.' LOG '(' genExpr ')' ';' { $$=nuevoNodo("PRINT"); creaRelaciones(nx, [$5]);}
;

genExpr 
    : genExpr '+' genExpr   { $$ = nuevoNodo("EXPR"); creaRelaciones(nx, [$1, nuevoNodo($2), $3]); }
    | genExpr '-' genExpr   { $$ = nuevoNodo("EXPR"); creaRelaciones(nx, [$1, nuevoNodo($2), $3]); }
    | genExpr '*' genExpr   { $$ = nuevoNodo("EXPR"); creaRelaciones(nx, [$1, nuevoNodo($2), $3]); }
    | genExpr '/' genExpr   { $$ = nuevoNodo("EXPR"); creaRelaciones(nx, [$1, nuevoNodo($2), $3]); }
    | genExpr '^' genExpr   { $$ = nuevoNodo("EXPR"); creaRelaciones(nx, [$1, nuevoNodo($2), $3]); }
    | genExpr '<' genExpr   { $$ = nuevoNodo("EXPR"); creaRelaciones(nx, [$1, nuevoNodo($2), $3]); }
    | genExpr '>' genExpr   { $$ = nuevoNodo("EXPR"); creaRelaciones(nx, [$1, nuevoNodo($2), $3]); }
    | genExpr '<=' genExpr  { $$ = nuevoNodo("EXPR"); creaRelaciones(nx, [$1, nuevoNodo($2), $3]); }
    | genExpr '>=' genExpr  { $$ = nuevoNodo("EXPR"); creaRelaciones(nx, [$1, nuevoNodo($2), $3]); }
    | genExpr '==' genExpr  { $$ = nuevoNodo("EXPR"); creaRelaciones(nx, [$1, nuevoNodo($2), $3]); }
    | genExpr '!=' genExpr  { $$ = nuevoNodo("EXPR"); creaRelaciones(nx, [$1, nuevoNodo($2), $3]); }
    | genExpr '&&' genExpr  { $$ = nuevoNodo("EXPR"); creaRelaciones(nx, [$1, nuevoNodo($2), $3]); }
    | genExpr '%' genExpr   { $$ = nuevoNodo("EXPR"); creaRelaciones(nx, [$1, nuevoNodo($2), $3]); }
    | genExpr '||' genExpr  { $$ = nuevoNodo("EXPR"); creaRelaciones(nx, [$1, nuevoNodo($2), $3]); }
    | otro                  { $$ = $1; }
;

otro
    : '(' genExpr ')'   { $$ = nuevoNodo("PAR"); creaRelaciones(nx,[nuevoNodo("("),$2],nuevoNodo(')')); }
    | NUMBER            { $$ = nuevoNodo($1+" (val)"); }
    | DECIMAL           { $$ = nuevoNodo($1+" (val)"); }
    | STRING            { $$ = nuevoNodo($1+" (val)");}
    | ID                { $$ = nuevoNodo($1+" (ID)"); }
    | '!' genExpr       { $$ = nuevoNodo("NOT"); creaRelaciones(nx,[$2]);}
    | statCall          { $$ = nuevoNodo("CALL"); creaRelaciones(nx,[$1]); }
;

statCall 
    : ID '(' ')'            { $$ = nuevoNodo($1); }
    | ID '(' paramsCall ')' { $$ = [nuevoNodo($1), nuevoNodo("PARAMS")]; creaRelaciones(nx, $3)}
;

paramsCall
    : paramsCall ',' genExpr    { $1.push($3); $$=$1;}
    | genExpr                   {$$=[$1];}
;
