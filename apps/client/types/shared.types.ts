export type ValidationType = {
   status : string,
   info? : string
}

export type ParserResultType = {
   status : string,
   info?: string,
   masterReport? : Object
   toolConfig ? : Object
}