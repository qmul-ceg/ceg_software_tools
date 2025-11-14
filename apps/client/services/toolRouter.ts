import { ImportPayload } from "@/types/importPayload";
import SoftwareTools from "@/constants/softwareTools";
import cvdToolModule from "@/modules/cvd/cvdToolModule";
import afToolModule from "@/modules/af/afToolModule";
import { ToolResultType } from "@/types/shared.types";





export default async function toolRouter(payload:ImportPayload):Promise<ToolResultType>{

   const payloadHandlers: Partial<Record<SoftwareTools, (payload: ImportPayload) => any >> = {
      
      [SoftwareTools.cvd]: cvdToolModule,
      [SoftwareTools.af] : afToolModule
   };

   const handlePayload = payloadHandlers[payload.tool];
   let toolResult:ToolResultType = {};

   if(handlePayload){ 
      toolResult =  await handlePayload(payload)
   }

   return toolResult

}


