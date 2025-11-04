/** 
 * importService.ts.tsx
 * 
 * Purpose: This file holds the main Import functionality it accepts our user inpur payload 
 * and routes the data to the appropriate module. 
 
**/


import ClinicalSystems from "@/constants/clinicalSystems";
import ErrorMessages from "@/constants/messages";
import SoftwareTools from "@/constants/softwareTools";
import toolRouter from "@/services/toolRouter";
import { ImportPayload } from "@/types/importPayload";
import { ParserResult } from "@/types/shared.types";
import { ToolResultType } from "@/types/shared.types";


type ExecuteImportTypeResult = {
   importAttempt: "pass" | "fail",
   message : ErrorMessages,
   parsedResult?: ParserResult
}


export const executeImport = async (softwareTool:SoftwareTools, clinicalSystem:ClinicalSystems, importedReport:FileList):Promise<ExecuteImportTypeResult> => {
   if (!softwareTool || !clinicalSystem || !importedReport){
      return {
         importAttempt : "fail",
         message: ErrorMessages.MissingInput,
      }
   }


   const importPayload:ImportPayload = { tool: softwareTool, clinicalSystem: clinicalSystem, file : importedReport}
   const routerResult:ToolResultType = await toolRouter(importPayload)

   if(routerResult.validationResult?.status=== "pass" && routerResult.parserResult?.status === "success"){
      return   {  importAttempt : "pass", message: ErrorMessages.Success,  parsedResult : routerResult.parserResult  }   
   }

    else if (routerResult.validationResult?.status === "fail" ){
      
      return { importAttempt: "fail", message: ErrorMessages.UnsuccessfulValidation}
   }

   else {
      return { importAttempt : "fail", message: ErrorMessages.UnsuccessfulParsing}
   }
}







   // if (toolValidationResultArray[0] === "pass" && toolParserResultArray[0] === "success"){
   //    r
   // }