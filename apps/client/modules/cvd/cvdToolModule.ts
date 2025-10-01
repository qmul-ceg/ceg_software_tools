import ClinicalSystems from "@/constants/clinicalSystems";
import { ImportPayload } from "@/types/importPayload";
import validateCVDSystmOneReport from "./reportValidators/validateCVDSystmOneReport";
import validateCVDEMISReport from "./reportValidators/validateCVDEMISReport";
import { ValidationType, ParserResultType, ParserResult } from "@/types/shared.types";
import parseCVDSystmOneReport from "./reportParsers/parseCVDSystmOneReport";
import parseCVDEMISReport from "./reportParsers/parseCVDEMISReport"
import { cvdConfig } from "./utils/cvdConfig";
import { EMISReportKeys, SystmOneReportKeys } from "./constants/cvdDataEnums";
import { CVDaddCalculatedFields } from "./utils/cvdAddCalculatedFields";
import { TransformCVDS1Data } from "./utils/cvdS1DataTransform";




// This is the entry point of the module 
// We accept our payload here so we call this function    
// // Validate file based on clinical system in the payload - We can call separate functionalities one for sytmOne clinical systems and one for EMIS
   // If report is valid we process file to create a master report 
   // Master report is processed and we write functionlities to draw our specific data from master reposrt
   // These functionalities can be packed and sent to our display screen. 
   // We call the display screen with our packed results. 

export default async function cvdToolModule(payload:ImportPayload){
   // console.log(payload)
   //VALIDATE PAYLOAD
   const validateHandlers: Partial<Record< ClinicalSystems, (payload:FileList ) => Promise<ValidationType>>> ={
      [ClinicalSystems.EMIS] : validateCVDEMISReport,
      [ClinicalSystems.SystmOne] : validateCVDSystmOneReport
   }

   const parseHandlers: Partial<Record< ClinicalSystems, (payload: FileList) => Promise<ParserResult>>> = {
      [ClinicalSystems.SystmOne] : parseCVDSystmOneReport,
      [ClinicalSystems.EMIS] : parseCVDEMISReport
   }


   const validateReport = validateHandlers[payload.clinicalSystem]
   const parseReport = parseHandlers[payload.clinicalSystem]
   
   let validationResult: ValidationType = {status: "", info: ""}
   // let parserResult: ParserResultType = {status: "", info: "", masterReport: {}}
   let parserResult: ParserResult = {status: "", info: ""}

   if (validateReport){
      validationResult = await validateReport(payload.file)

      if(validationResult.status == "success"){
         if(parseReport){
            parserResult = await parseReport(payload.file)

            if (parserResult.status === "success"){
               let parsedDataObject = Object.values(parserResult.data.masterReport as object);
               if (parsedDataObject.length > 0) {

                  let reportKeys : typeof EMISReportKeys | typeof SystmOneReportKeys;

                  if (payload.clinicalSystem === ClinicalSystems.EMIS) {
                     reportKeys = EMISReportKeys;
                  }
                  else if (payload.clinicalSystem === ClinicalSystems.SystmOne) {
                     reportKeys = SystmOneReportKeys;
                     TransformCVDS1Data(parsedDataObject); //Transform S1 data
                  }
                  //Add calculated properties/fields
                  CVDaddCalculatedFields(parsedDataObject, reportKeys)
               } 
               
               return { validationResult, parserResult}
          
            }
         }
      }
   }
   console.log(parserResult)   
   

}     







// if (parserResult.config && parserResult.data){
               //    parserResult.config.filters = cvdConfig.filters;
               //    parserResult.config.quickFilters = cvdConfig.quickFilters
               //    parserResult.data.toolName = cvdConfig.toolName;
               //    parserResult.data.tableHeader = cvdConfig.tableHeader;
               //    parserResult.data.summaryTable = cvdConfig.summaryTable;
               // }
               
               // // parserResult.config.filters = cvdConfig.filters
               // // parserResult.toolConfig = cvdConfig
               // console.log(parserResult)