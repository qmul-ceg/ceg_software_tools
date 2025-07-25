import { ValidationInterface } from "@/types/shared.types"
import { readFileHeaders, filterCSVFiles, validateCVDReportHeaders } from "../utils/cvdValidateHelpers"


export default async function validateCVDSystmOneReport(files:FileList){

   const validationResult: ValidationInterface ={
      status: "",
      info:""
   }

   const filesArray = filterCSVFiles(files)

   if(filesArray.length !== 3){
      validationResult['status'] = "failure";
      validationResult['info'] = "cvdImportError1";
      return validationResult
   }

   const headerReaderPromises: Promise<string[]>[] = [];

   for (let i = 0; i < filesArray.length; i++ ){
      headerReaderPromises.push(readFileHeaders(filesArray[i]));
   }

   const headerResults = await Promise.all(headerReaderPromises);

   const headerValidation = validateCVDReportHeaders(headerResults);

   if (headerValidation){
      validationResult['status'] = "success";
      validationResult['info'] = "All headers are correct";
   }
   else{
      validationResult['status'] = "failure";
      validationResult['info'] = "cvdImportError2";
   }
   
   return validationResult
}



