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





//TYPES FOR PARSER RESULT
type Options = Record<string, { groupName : string; groupOptions: { value: string; label: string }[]}>
type MultiFilter = {
   id : string,
   label : string,
   ui : { width : number, bgColour: string},
   kind : "multi",
   options : {value : string, label : string}[],
   emptyBehaviour : []
} 

type GroupedFilter = {
   id : string,
   label : string,
    ui : { width : number, bgColour: string},
   kind : "grouped",
   options : Options,
   emptyBehaviour : [][]
}  



export type ParserResult = {

   //Parsing error messages

   status: "success" | "failure" | ""
   info : string;

   //Settings that control UI / behaviour
   config?: {
      // filters: Record<string, string[][]> ;
      filters: Record <string, MultiFilter | GroupedFilter >
      quickFilters: string[];
   }

   //outputs for rendering and analysis

   data? : {
      toolName?: string ;
      tableHeader?: string[] ;
      summaryTable?: string[][];
      masterReport?: Record<string, string[]>;
   }
}




//FILTER STATE TYPE
type FilterStateEntries =  
   | {kind : "single", value: string } 
   | {kind : "multi", value : string[] }
   | {kind : "grouped", value : string [][]}


export type FilterStates = Record <string, FilterStateEntries>







// type FilterStateValues = string[] | string[][]