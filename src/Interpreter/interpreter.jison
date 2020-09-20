%{
    const {Arithmetic, ArithmeticOption} = require('../Expression/Arithmetic');
    const {Relational, RelationalOption} = require('../Expression/Relational');
    const {Access} = require('../Expression/Access');
    const {Literal} = require('../Expression/Literal');
    const {If} = require('../Instruction/If');
    const {Print} = require('../Instruction/Print');
    const {Statement} = require('../Instruction/Statement');
    const {While} = require('../Instruction/While');
    const {Dowhile} = require('../Instruction/Dowhile');
    const {Declaration} = require('../Instruction/Declaration');
    const {Break} = require('../Instruction/Break');
    const {Continue} = require('../Instruction/Continue');
    const {Call} = require('../Instruction/Call');
    const {Function} = require('../Instruction/Function');
    const {Return} = require('../Instruction/Return');
    const {For} = require('../Instruction/For');
    let tv = null;
    let t1 = null;
    let t2 = null;

%}

%lex
%options case-insensitive
number  [0-9]+
decimal {number}[.]{number}
string  (\"[^"]*\")
string2  (\'[^"]*\')
%%
\s+                   /* skip whitespace */
[/][/].*                                {}  //una linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]	    {} //multilinea
{decimal}               return 'DECIMAL'
{number}                return 'NUMBER'
{string}                return 'STRING'
{string2}               return 'STRING'
"**"                     return '**'
"*"                     return '*'
"/"                     return '/'
";"                     return ';'
","                     return ','
"-"                     return '-'
"+"                     return '+'
"."                     return '.'
"%"                     return '%'

"<="                  return '<='
">="                  return '>='
"<"                   return '<'
">"                   return '>'
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

%left '!'
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
        return $1;
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
    | statArray        { $$ = $1; }
    | unarOpr          { $$ = $1; }
;

statReturn
    : RETURN genExpr ';'    { $$ = new Return($2, @1.first_line, @1.first_column);}
    | RETURN varArray ';'   { $$ = null; }
    | RETURN  ';'           { $$ = new Return(null, @1.first_line, @1.first_column);}
;

varDefinition
    : LET ID '=' genExpr ';'    {$$ = new Declaration($2, $4, @1.first_line, @1.first_column);}
    | CONST ID '=' genExpr ';'  {$$ = new Declaration($2, $4, @1.first_line, @1.first_column);}
    | LET ID ';'                {$$ = null;}
    | LET ID '=' varArray ';'   { $$ = null; }
    | LET ID ':' typeVar '=' genExpr  ';'{$$ = new Declaration($2, $6, @1.first_line, @1.first_column);}
;

subStat
    : '{' Instructions '}'  { $$ = new Statement($2, @1.first_line, @1.first_column); }
;

varArray
    : '[' paramsCall ']' { $$ = $1 + $2 + $3;}
    | '[' ']' { $$ = $1 + $2; }
;

statArray
    : ID '.' PUSH '(' genExpr ')' ';'   { $$ = $1+$2+$3+$4+$5+$6+$7; }
    | ID '.' POP '(' genExpr ')' ';'    { $$ = $1+$2+$3+$4+$5+$6+$7; }
;

varAsig
    : ID '=' genExpr ';' {$$ = new Declaration($1, $3, @1.first_line, @1.first_column);}
    | ID '=' varArray ';' {$$ = null;}
;

statGraph
    : 'GP_TS' ';' { $$ = sr([$1,$2]); }
;
statIf
    : IF '(' genExpr ')' subStat moreIf 
    {
        $$ = new If($3, $5, $6, @1.first_line, @1.first_column);
    }
;

moreIf
    : ELSE subStat     { $$=$2; }
    | ELSE statIf                   { $$=$2; }
    | /* empty */                   { $$=null; }
;

statWhile 
    : WHILE '(' genExpr ')' subStat { $$ = new While($3, $5, @1.first_line, @1.first_column); }
;

statDo
    : DO subStat WHILE '(' genExpr ')' ';'  { $$ = new Dowhile($5, $2, @1.first_line, @1.first_column); }
;

statFor
    : FOR '(' varFor ';' genExpr ';' pasoFor ')' subStat { $$ = new For($3, $5, $7,$9, @1.first_line, @1.first_column); }
;

forVariant
    : VAR ID OF ID                      { $$ = null; }
    | VAR ID IN ID                      { $$ = null; }
    | varFor ';' genExpr ';' pasoFor    { $$ = null; }
;

pasoFor
    : ID '+''+'         
    {
        tv = new Literal(1, @1.first_line, @1.first_column, 0);
        t1 = new Access($1, @1.first_line, @1.first_column);
        t2 =  new Arithmetic(t1, tv, ArithmeticOption.PLUS, @1.first_line,@1.first_column);
        $$ = new Declaration($1, t2, @1.first_line, @1.first_column);
    }
    | ID '-''-'         
    {
        tv = new Literal(1, @1.first_line, @1.first_column, 0);
        t1 = new Access($1, @1.first_line, @1.first_column);
        t2 =  new Arithmetic(t1, tv, ArithmeticOption.MINUS, @1.first_line,@1.first_column);
        $$ = new Declaration($1, t2, @1.first_line, @1.first_column);
    }
    | ID '=' genExpr    { $$ = new Declaration($2, $3, @1.first_line, @1.first_column); }
;


varFor
    : LET ID '=' genExpr    { $$ = new Declaration($2, $4, @1.first_line, @1.first_column);}
    | ID '=' genExpr        { $$ = new Declaration($2, $3, @1.first_line, @1.first_column);}
    | LET ID ':' typeVar '=' genExpr  {$$ = new Declaration($2, $6, @1.first_line, @1.first_column);}
;

unarOpr
    : ID '+''+'';' 
    {
        tv = new Literal(1, @1.first_line, @1.first_column, 0);
        t1 = new Access($1, @1.first_line, @1.first_column);
        t2 =  new Arithmetic(t1, tv, ArithmeticOption.PLUS, @1.first_line,@1.first_column);
        $$ = new Declaration($1, t2, @1.first_line, @1.first_column);
    }
    | ID '-''-'';' 
    {
        tv = new Literal(1, @1.first_line, @1.first_column, 0);
        t1 = new Access($1, @1.first_line, @1.first_column);
        t2 =  new Arithmetic(t1, tv, ArithmeticOption.MINUS, @1.first_line,@1.first_column);
        $$ = new Declaration($1, t2, @1.first_line, @1.first_column);
    }
;

statSwitch
    : SWITCH '(' genExpr ')' '{' swCases '}'  { $$ = null;}
;

/*fix pusher*/
swCases 
    : swCases swCase {$1.push($2); $$=$1;}
    | swCase {$$=[$1];}
;

swCase
    : CASE genExpr ':'  Instructions  { $$ = null; }
    | DEFAULT ':'  Instructions  { $$ = null; } 
;

statBreak 
    : BREAK ';' { $$ = new Break(@1.first_line, @1.first_column); }
;

statContinue
    : CONTINUE ';' { $$ = new Continue(@1.first_line, @1.first_column); }
;

/* here comes the magic */
statFunc 
    : FUNCTION ID '(' paramsFunc ')' ':' typeReturn subStat  
    {
        $$ = new Function($2, $8, $4, @1.first_line, @1.first_column);
    } 

    | FUNCTION ID '(' paramsFunc ')'  subStat  
    {
        $$ = new Function($2, $6, $4, @1.first_line, @1.first_column);
    }
;

paramsFunc
    : paramsFunc ',' tpf    { $1.push($3); $$=$1;}
    | tpf                   { $$ = [$1]; }
    | /* empty */           { $$ = []; }
;

tpf
    : ID ':' typeVar{ $$ = $1; }
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
    : CONSOLE '.' LOG '(' genExpr ')' ';' { $$ = new Print($5, @1.first_line, @1.first_column); }
;

genExpr 
    : genExpr '+' genExpr { $$ = new Arithmetic($1, $3, ArithmeticOption.PLUS, @1.first_line,@1.first_column); }
    | genExpr '-' genExpr { $$ = new Arithmetic($1, $3, ArithmeticOption.MINUS, @1.first_line,@1.first_column); }
    | genExpr '**' genExpr { $$ = new Arithmetic($1, $3, ArithmeticOption.POW, @1.first_line,@1.first_column); }
    | genExpr '*' genExpr { $$ = new Arithmetic($1, $3, ArithmeticOption.BY, @1.first_line,@1.first_column); }
    | genExpr '/' genExpr { $$ = new Arithmetic($1, $3, ArithmeticOption.DIV, @1.first_line,@1.first_column);}
    | genExpr '<=' genExpr { $$ = new Relational($1, $3,RelationalOption.LESSOREQUAL, @1.first_line, @1.first_column); }
    | genExpr '>=' genExpr { $$ = new Relational($1, $3,RelationalOption.GREATEROREQUAL, @1.first_line, @1.first_column); }
    | genExpr '<' genExpr { $$ = new Relational($1, $3,RelationalOption.LESS, @1.first_line, @1.first_column); }
    | genExpr '>' genExpr { $$ = new Relational($1, $3,RelationalOption.GREATER, @1.first_line, @1.first_column); }
    | genExpr '==' genExpr { $$ = new Relational($1, $3,RelationalOption.EQUAL, @1.first_line, @1.first_column); }
    | genExpr '!=' genExpr { $$ = new Relational($1, $3,RelationalOption.NOTEQUAL, @1.first_line, @1.first_column); }
    | genExpr '&&' genExpr { $$ = new Relational($1, $3,RelationalOption.AND, @1.first_line, @1.first_column); }
    | genExpr '%' genExpr { $$ = new Arithmetic($1, $3, ArithmeticOption.MOD, @1.first_line,@1.first_column); }
    | genExpr '||' genExpr { $$ = new Relational($1, $3,RelationalOption.OR, @1.first_line, @1.first_column); }
    | otro { $$ = $1; }
;

otro
    : '(' genExpr ')'   { $$ = $2; }
    | NUMBER            { $$ = new Literal($1, @1.first_line, @1.first_column, 0); }
    | DECIMAL           { $$ = new Literal($1, @1.first_line, @1.first_column, 1); }
    | STRING            { $$ = new Literal($1, @1.first_line, @1.first_column, 2); }
    | ID                { $$ = new Access($1, @1.first_line, @1.first_column); }
    | '!' genExpr       { $$ = new Relational($1, $1, RelationalOption.NOT, @1.first_line, @1.first_column); }
    | statCall2          { $$ = $1; }
;

statCall2
    : ID '(' paramsCall ')'  { $$ = new Call($1, $3, @1.first_line, @1.first_column); }
;
statCall 
    : ID '(' paramsCall ')' ';' { $$ = new Call($1, $3, @1.first_line, @1.first_column); }
;

paramsCall
    : paramsCall ',' genExpr    { $1.push($3); $$=$1; }
    | genExpr                   { $$=[$1]; }
    | /* empty */               { $$=[]; }
;