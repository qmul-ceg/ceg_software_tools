import SoftwareTools from "@/constants/softwareTools"
import ClinicalSystems from "@/constants/clinicalSystems"
import { ToolPayload } from "@/types/toolPayload"

export default function validateCvdInput(payload:ToolPayload){
   if((payload.tool === SoftwareTools.cvd || payload.tool == SoftwareTools.af) 
      && (payload.clinicalSystem == ClinicalSystems.SystmOne || payload.clinicalSystem == ClinicalSystems.EMIS)
      && payload.file){
      return true;
   }
   else return false
};