import ErrorMessages from "@/constants/messages"
import { SystmOneReportKeys, EMISReportKeys } from "@/modules/cvd/constants/cvdDataEnums"


export type ValidationType = {
   status : "pass" | "fail",
   message : ErrorMessages
}

export type ParserResultType = {
   status : string,
   info?: string,
   masterReport? : Object
   toolConfig ? : Object
}




type tableConfigDetails = {
   id : any;
   header : string;
   width: string;
   align: string;
   colour: string;
}

export type tableConfig = tableConfigDetails[]



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


type IndexMap = typeof SystmOneReportKeys | typeof EMISReportKeys
export type ParserResult = {

   //Parsing error messages

   status: "success" | "failure" | ""
   info : string;

   //Settings that control UI / behaviour
   config?: {
      // filters: Record<string, string[][]> ;
      filters: Record <string, MultiFilter | GroupedFilter >
      quickFilters: string[];
      reportKeys? : IndexMap
   }

   //outputs for rendering and analysis

   data? : {
      toolName?: string ;
      reportRunDate? : string;
      tableConfig?: tableConfig;
      tableHeader?: string[] ; //Change to table config
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