import { ImportPayload } from "@/types/importPayload";
import SoftwareTools from "@/constants/softwareTools";
import cvdToolModule from "@/tools/cvdToolModule/cvdToolModule";




export default async function toolRouter(payload:ImportPayload){

   const payloadHandlers: Partial<Record<SoftwareTools, (payload: ImportPayload) => any >> = {
      [SoftwareTools.cvd]: cvdToolModule,
   };

   const handlePayload = payloadHandlers[payload.tool];
   let validationResult:Object = {}

   if(handlePayload){ 
      validationResult =  await handlePayload(payload)
   }


   return {validationResult}

}


