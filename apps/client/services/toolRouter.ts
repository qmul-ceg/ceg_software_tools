import { ImportPayload } from "@/types/importPayload";
import SoftwareTools from "@/constants/softwareTools";
import cvdToolModule from "@/modules/cvd/cvdToolModule";




export default async function toolRouter(payload:ImportPayload){

   const payloadHandlers: Partial<Record<SoftwareTools, (payload: ImportPayload) => any >> = {
      [SoftwareTools.cvd]: cvdToolModule,
   };

   const handlePayload = payloadHandlers[payload.tool];
   let toolResult:Object = {}

   if(handlePayload){ 
      toolResult =  await handlePayload(payload)
      // console.log(toolResult)
   }


   return toolResult

}


