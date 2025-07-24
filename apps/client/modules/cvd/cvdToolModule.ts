import ClinicalSystems from "@/constants/clinicalSystems";
import { ImportPayload } from "@/types/importPayload";
import validateCVDSystmOneReport from "./reportValidators/validateCVDSystmOneReport";
import validateCVDEMISReport from "./reportValidators/validateCVDEMISReport";
import { ValidationInterface, ParserResultInterface } from "@/types/shared.types";
import parseCVDSystmOneReport from "./reportParsers/parseCVDSystmOneReport";
import parseCVDEMISReport from "./reportParsers/parseCVDEMISReport"
//This is the entry point of the module 
//We accept our payload here so we call this function    
// //Validate file based on clinical system in the payload - We can call separate functionalities one for sytmOne clinical systems and one for EMIS
   // If report is valid we process file to create a master report 
   // Master report is processed and we write functionlities to draw our specific data from master reposrt
   // These functionalities can be packed and sent to our display screen. 
   //We call the display screen with our packed results. 
export default async function cvdToolModule(payload:ImportPayload){
   // console.log(payload)
   //VALIDATE PAYLOAD
   const validateHandlers: Partial<Record< ClinicalSystems, (payload:FileList ) => Promise<ValidationInterface>>> ={
      [ClinicalSystems.EMIS] : validateCVDEMISReport,
      [ClinicalSystems.SystmOne] : validateCVDSystmOneReport
   }

   const parseHandlers: Partial<Record< ClinicalSystems, (payload: FileList) => Promise<ParserResultInterface>>> = {
      [ClinicalSystems.SystmOne] : parseCVDSystmOneReport,
      [ClinicalSystems.EMIS] : parseCVDEMISReport
   }


   const validateReport = validateHandlers[payload.clinicalSystem]
   const parseReport = parseHandlers[payload.clinicalSystem]
   
   let validationResult: ValidationInterface ={status: "", info: ""}
   let parserResult: ParserResultInterface = {status: "", info: "", masterReport: {}}

   if (validateReport){
      validationResult = await validateReport(payload.file)

      if(validationResult.status == "success"){
         if(parseReport){
            parserResult = await parseReport(payload.file)
            console.log(parserResult)
         }
      }
   }
   
   return {validationResult}

}