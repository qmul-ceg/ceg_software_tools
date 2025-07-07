import { ImportPayload } from "@/types/importPayload"
import SoftwareTools from "@/constants/softwareTools"
import cvdToolModule from "@/tools/cvdToolModule/cvdToolModule"



export default function toolRouter(payload:ImportPayload){
   const routePayload = {
      [SoftwareTools.cvd] : cvdToolModule
   }
   //Tool router will call whichever tool we want to route our payload to 
   //How do we know which router to check . 
      // console.log(payload)
   console.log(routePayload[payload.tool])
}