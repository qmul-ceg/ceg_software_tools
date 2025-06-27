import ClinicalSystems from "@/constants/clinicalSystems";
import SoftwareTools from "@/constants/softwareTools";

export default function getFileInputProps (selectedTools:SoftwareTools, selectedClinicalSytem:ClinicalSystems){
   const cvdWithSystmOne = selectedTools == SoftwareTools.cvd && selectedClinicalSytem == ClinicalSystems.SystmOne;

   return cvdWithSystmOne 
      ? {type : 'file', webkitdirectory : "true", directory: "true"}
      : {type : 'file', accept:'.csv'};

}