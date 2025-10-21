import { ImportPayload } from "@/types/importPayload";
import SoftwareTools from "@/constants/softwareTools";
import cvdToolModule from "@/modules/cvd/cvdToolModule";
import afToolModule from "@/modules/af/afToolModule";





export default async function toolRouter(payload:ImportPayload){

   const payloadHandlers: Partial<Record<SoftwareTools, (payload: ImportPayload) => any >> = {
      
      [SoftwareTools.cvd]: cvdToolModule,
      [SoftwareTools.af] : afToolModule
   };



   const handlePayload = payloadHandlers[payload.tool];
   let toolResult:Object = {}

   if(handlePayload){ 
      toolResult =  await handlePayload(payload)
      // console.log(toolResult)
   }


   return toolResult

}


