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
import { CVD_Measures } from "./utils/cvdMeasures";
import { CVD_Metrics } from "./types/cvdMetrics";




// This is the entry point of the module 
// We accept our payload here so we call this function    
// // Validate file based on clinical system in the payload - We can call separate functionalities one for sytmOne clinical systems and one for EMIS
   // If report is valid we process file to create a master report 
   // Master report is processed and we write functionlities to draw our specific data from master reposrt
   // These functionalities can be packaged and sent to our display screen. 
   // We call the display screen with our packaged results. 

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
   let parserResult: ParserResult = {  status: "", info: "" }

   if (validateReport){
      validationResult = await validateReport(payload.file)

      if(validationResult.status == "success"){
         if(parseReport){
            parserResult = await parseReport(payload.file)
            // console.log(parserResult)

            if (parserResult.status === "success"){
               let parsedDataObject = Object.values(parserResult.data.masterReport as object);
               if (parsedDataObject.length > 0) {

                  let reportKeys : typeof EMISReportKeys | typeof SystmOneReportKeys = EMISReportKeys;

                  if (payload.clinicalSystem === ClinicalSystems.SystmOne) {
                     reportKeys = SystmOneReportKeys;
                     TransformCVDS1Data(parsedDataObject); //Transform S1 data
                  }
                  //Add calculated properties/fields
                  CVDaddCalculatedFields(parsedDataObject, reportKeys);

                  //Calculate CVD KPI/metrices
                  let CVD_summary_data: CVD_Metrics =  CVD_Measures(parsedDataObject, reportKeys);                  

                  cvdConfig.summaryTable.forEach((summaryMetric : any[], index) => {

                     if (Object.entries(CVD_summary_data)[index]) {

                        summaryMetric[1] = Object.entries(CVD_summary_data)[index][1].Denominator;
                        summaryMetric[2] = Object.entries(CVD_summary_data)[index][1].Numerator;
                        summaryMetric[3] = Object.entries(CVD_summary_data)[index][1].Percentage;
                     }
                  });
               } 

               return { validationResult, parserResult}
          
            }
         }
      }
   }
   console.log(parserResult)   
   

}     















// THE BELOW CODE IS JUST FOR POC,  TO BE DELETED



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