/** 
 * getFileInputProps.ts
 * 
 * Purpose: Function checks if the user selected CVD and SystmOne combination and creates an object of input configurations that allows 
 * the user to select multiple files in a folder this is turned off they did not make this selection 
**/



import ClinicalSystems from "@/constants/clinicalSystems";
import SoftwareTools from "@/constants/softwareTools";

export default function getFileInputProps (selectedTools:SoftwareTools, selectedClinicalSytem:ClinicalSystems){
   const cvdWithSystmOne = selectedTools == SoftwareTools.cvd && selectedClinicalSytem == ClinicalSystems.SystmOne;

   return cvdWithSystmOne 
      ? {type : 'file', webkitdirectory : "true", directory: "true"}
      : {type : 'file', accept:'.csv'};

}