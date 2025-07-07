import ClinicalSystems from "@/constants/clinicalSystems"
import SoftwareTools from "@/constants/softwareTools"

export interface ImportPayload{
   tool: SoftwareTools,
   clinicalSystem: ClinicalSystems,
   file: FileList[]
}