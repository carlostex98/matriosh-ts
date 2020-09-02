%{
    //const {Arithmetic, ArithmeticOption} = require('../Expression/Arithmetic');
    //import of all the needs
%}

%lex
%options case-insensitive
number  [0-9]+
decimal {entero}"."{entero}
string  (\"[^"]*\")
string2  (\'[^"]*\')
%%
\s+                   /* skip whitespace */

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
"continue"              return 'CONTINUE'
"return"                return 'RETURN'
"console"               return 'CONSOLE'
"log"                   return 'LOG'
"function"              return 'FUNCTION'
/*value types*/
"string"                return "T_STRING"
"number"                return "T_NUMBER"
"boolean"               return "T_BOOLEAN"
"void"                  return "T_VOID"
"graficar_ts"           return "GP_TS"

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
        return $1;
    }
;

Instructions
    : instruction Instructions {$1.push($2);}
    | instruction {$$=$1;}
;

instruccion
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
;

statGraph
    : 

statIf
    : IF '(' genExpr ')'

statWhile 
    : WHILE '(' genExpr ')' '{' Instructions '}' { }
;

statDo
    : DO '{' Instructions '}' WHILE '(' genExpr ')' ';'  { }
;

statFor
    : FOR '(' forVariant ')' '{' Instructions '}' { }
;

statSwitch
    : SWITCH '(' genExpr ')' '{' sw-cases '}'  { }
;

statBreak 
    : BREAK ';' { $$ = $1 + $2; }
;

statContinue
    : CONTINUE ';' { $$ = $1 + $2; }
;

/* here comes the magic */
statFunc 
    : FUNCTION '(' paramsFunc ')' '{' Instructions '}'  {} 
    | FUNCTION '(' paramsFunc ')' ':' typeReturn '{' Instructions '}'  {} 
;

statFonsole
    : CONSOLE '.' LOG '(' Instructions ')' ';' {}
; 
