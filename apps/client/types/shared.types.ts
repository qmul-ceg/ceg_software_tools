export interface ValidationInterface{
   status : string,
   info? : string
}

export interface ParserResultInterface{
   status : string,
   info?: string,
   masterReport? : Object
   toolConfig ? : Object
}