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

export type ParserResult = {

   //Parsing error messages

   status: "success" | "failure" | ""
   info : string;

   //Settings that control UI / behaviour
   config?: {
      filters: Record<string, string[][]> ;
      quickFilters: string[];
   }

   //outputs for rendering and analysis

   data? : {
      toolName: string;
      tableHeader: string[];
      summaryTable: string[][];
      masterReport: string[][];
   }
}


type FilterStateEntries =  
   | {kind : "single", value: string } 
   | {kind : "multi", value : string[] }
   | {kind : "group", value : string [][]}


export type FilterStates = Record <string, FilterStateEntries>







// type FilterStateValues = string[] | string[][]