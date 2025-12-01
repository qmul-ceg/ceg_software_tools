import ErrorMessages from "@/constants/messages"
import { SystmOneReportKeys, EMISReportKeys } from "@/modules/cvd/constants/cvdDataEnums"


export type ValidationType = {
   status : "pass" | "fail",
   message : ErrorMessages
}

// export type ParserResultType = {
//    status : string,
//    info?: string,
//    masterReport? : Object
//    toolConfig ? : Object
// }


export type TableConfigItem = {
   id : string | number,
   header : string,
   width : string,
   align : string,
   colour : string,
};

export type TableConfig = TableConfigItem[];









export type ToolResultType = {

   status?: "pass" | "fail",
   info?: ErrorMessages


   validationResult?: ValidationType,
   parserResult? : ParserResult
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


export type IndexMap = typeof SystmOneReportKeys | typeof EMISReportKeys


type summaryHeaders = string[];
type summaryRow = { description: string, denominator: number, numerator: number, percentage: string}
export type SummaryTableType = {
   headers: summaryHeaders,
   summaryContent : summaryRow[]
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
      reportKeys : IndexMap;
      filterStatesConfig: FilterStates;
      filterFunctionalityConfig: Record<string, (row:string[], filterStates: FilterStates, reportKeys:IndexMap, relativeDate:string)=> boolean>
      tableConfig: tableConfig;
   }

   //outputs for rendering and analysis

   data? : {
      toolName?: string ;
      reportRunDate : string;
      
      tableHeader?: string[] ; //Change to table config
      // summaryTable?: summaryTable
      summaryTable?: summaryTable
      masterReport: Record<string, string[]>;
   }
}




//FILTER STATE TYPE
type FilterStateEntries =  
   | {kind : "single", value: string } 
   | {kind : "multi", value : string[] }
   | {kind : "grouped", value : string [][]}


export type FilterStates = Record <string, FilterStateEntries>







// type FilterStateValues = string[] | string[][]