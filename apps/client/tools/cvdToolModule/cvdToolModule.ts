import ClinicalSystems from "@/constants/clinicalSystems";
import { ImportPayload } from "@/types/importPayload";
import validateCvdSystmOneReport from "./reportValidators/validateCvdSystmOneReport";



//This is the entry point of the module 
//We accept our payload here so we call this function 
export default function cvdToolModule(payload:ImportPayload){
   //Validate file based on clinical system in the payload - We can call separate functionalities one for sytmOne clinical systems and one for EMIS
   // If report is valid we process file to create a master report 
   // Master report is processed and we write functionlities to draw our specific data from master reposrt
   // These functionalities can be packed and sent to our display screen. 
   //We call the display screen with our packed results. 

   //VALIDATE PAYLOAD
   const validateHandlers: Partial<Record< ClinicalSystems, (payload:FileList) => void>> ={
      // [ClinicalSystems.EMIS] = validateCvdEMISReport,
      [ClinicalSystems.SystmOne] : validateCvdSystmOneReport
   }
   const validateReport = validateHandlers[payload.clinicalSystem]

   if (validateReport){
      validateReport(payload.file)
   }
   // console.log(validateReport)
}