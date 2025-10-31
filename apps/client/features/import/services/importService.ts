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
   const routerResult = await toolRouter(importPayload)

   const toolValidationResult = Object.values(routerResult)[0]

   const toolParserResult = Object.values(routerResult)[1]

   const toolValidationResultArray = Object.values(toolValidationResult)
   const toolParserResultArray:any[] = Object.values(toolParserResult)
      
 

   if (toolValidationResultArray[0] === "pass" && toolParserResultArray[0] === "success"){
      return   {  importAttempt : "pass", message: ErrorMessages.Success,  parsedResult : toolParserResult  }   
   }

   else if (toolValidationResultArray[0] === "fail" ){
      
      return { importAttempt: "fail", message: ErrorMessages.UnsuccessfulValidation}
   }
   else {
      return { importAttempt : "fail", message: toolParserResultArray[1]}
   }
}

