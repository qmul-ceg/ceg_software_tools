import ClinicalSystems from "@/constants/clinicalSystems";
import { ImportPayload } from "@/types/importPayload";
import validateCvdSystmOneReport from "./reportValidators/validateCvdSystmOneReport";

import ErrorMessages from "@/constants/messages";

//This is the entry point of the module 
//We accept our payload here so we call this function    
// //Validate file based on clinical system in the payload - We can call separate functionalities one for sytmOne clinical systems and one for EMIS
   // If report is valid we process file to create a master report 
   // Master report is processed and we write functionlities to draw our specific data from master reposrt
   // These functionalities can be packed and sent to our display screen. 
   //We call the display screen with our packed results. 
export default async function cvdToolModule(payload:ImportPayload){

   //VALIDATE PAYLOAD
   const validateHandlers: Partial<Record< ClinicalSystems, (payload:FileList) => Promise<Object>>> ={
      // [ClinicalSystems.EMIS] = validateCvdEMISReport,
      [ClinicalSystems.SystmOne] : validateCvdSystmOneReport
   }
   const validateReport = validateHandlers[payload.clinicalSystem]
   let validationResult: Object = {}

   if (validateReport){
      validationResult = await validateReport(payload.file)
   }
   
   return {validationResult}

}