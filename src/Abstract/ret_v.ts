export enum Type{
    NUMBER = 0,
    STRING = 1,
    BOOLEAN = 2,
    ARRAY = 3,
    NULL = 4
}

export type Retorno ={
    value : any,
    type : Type
}