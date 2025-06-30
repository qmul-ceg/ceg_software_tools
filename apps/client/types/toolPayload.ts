import ClinicalSystems from "@/constants/clinicalSystems"
import SoftwareTools from "@/constants/softwareTools"

export interface ToolPayload{
   tool: SoftwareTools,
   clinicalSystem: ClinicalSystems,
   file: any
}