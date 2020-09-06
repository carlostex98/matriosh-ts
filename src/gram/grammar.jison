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
"case"                  return 'CASE'
"default"               return 'DEFAULT'
"continue"              return 'CONTINUE'
"return"                return 'RETURN'
"console"               return 'CONSOLE'
"log"                   return 'LOG'
"function"              return 'FUNCTION'

"let"                   return 'LET'
"const"                 return 'CONST'

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
    | instruction {$$=[$1];}
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
    | statConsole      { $$ = $1; }
    | statCall         { $$ = $1; }
    | varDefinition    { $$ = $1; }
;

varDefinition
    : LET ID '=' genExpr ';'{}
    | CONST ID '=' genExpr ';'{}
    | LET ID ';'{}
    | CONST ID ';'{}
;

statGraph
    : 'GP_TS' ';' { $$ = $1 + $2; }
;
statIf
    : IF '(' genExpr ')' '{' Instructions '}' moreIf {$$ = $1+$2+$3+$4+$5+$6+$7+$8;}
;

moreIf
    : ELSE '{' Instructions '}' {$$=$1 + $2 + $4;}
    | ELSE statIf {$$=$1 + $2;}
    | /* empty */   {$$="";}
;

statWhile 
    : WHILE '(' genExpr ')' '{' Instructions '}' { $$ = $1+$2+$3+$4+$5+$6+$7; }
;

statDo
    : DO '{' Instructions '}' WHILE '(' genExpr ')' ';'  { $$ = $1+$2+$3+$4+$5+$6+$7+$9; }
;

statFor
    : FOR '(' forVariant ')' '{' Instructions '}' { $$ = $1+$2+$3+$4+$5+$6+$7; }
;

statSwitch
    : SWITCH '(' genExpr ')' '{' swCases '}'  { $$ = $1+$2+$3+$4+$5+$6+$7;}
;

swCases 
    : swCase swCases {$1.push($2);}
    | swCase {$$=[$1];}
;
swCase
    : CASE genExpr ':' '{' Instructions '}' { $$ = $1+$2+$3+$4+$5+$6; }
    | DEFAULT '{' Instructions '}' {$$ = $1+$2+$3+$4;} 
;

statBreak 
    : BREAK ';' { $$ = $1 + $2; }
;

statContinue
    : CONTINUE ';' { $$ = $1 + $2; }
;

/* here comes the magic */
statFunc 
    : FUNCTION '(' paramsFunc ')' '{' Instructions '}'  {$$ = $1+$2+$3+$4+$5+$6+$7;} 
    | FUNCTION '(' paramsFunc ')' ':' typeReturn '{' Instructions '}'  {$$ = $1+$2+$3+$4+$5+$6+$7+$8+$9;} 
;

statConsole
    : CONSOLE '.' LOG '(' genExpr ')' ';' { $$=$1+$2 }
;

genExpr 
    : genExpr '+' genExpr {}
    | genExpr '-' genExpr {}
    | genExpr '*' genExpr {}
    | genExpr '/' genExpr {}
    | genExpr '^' genExpr {}
    | genExpr '<' genExpr {}
    | genExpr '>' genExpr {}
    | genExpr '<=' genExpr {}
    | genExpr '>=' genExpr {}
    | genExpr '==' genExpr {}
    | genExpr '!=' genExpr {}
    | genExpr '&&' genExpr {}
    | genExpr '||' genExpr {}
    | otro {}
;

otro
    : '(' genExpr ')' {}
    | NUMBER {}
    | DECIMAL {}
    | STRING {}
    | ID {}
    | statCall {}
;

statCall 
    : ID '(' ')' {}
    | ID '(' paramsCall ')' {}
;

paramsCall
    : paramsCall ',' genExpr {}
    | genExpr {}
;
