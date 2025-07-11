import { ImportPayload } from "@/types/importPayload";
import SoftwareTools from "@/constants/softwareTools";
import cvdToolModule from "@/tools/cvdToolModule/cvdToolModule";





export default function toolRouter(payload:ImportPayload){

   const payloadHandlers: Partial<Record<SoftwareTools, (payload: ImportPayload) => void >> = {
      [SoftwareTools.cvd]: cvdToolModule,
   };

   const handlePayload = payloadHandlers[payload.tool];
  
   if(handlePayload){
      handlePayload(payload)
      return true
   }
   else {
      return false
      //Log error message to user. 
      //Should cantain fallback or error handling for unsupported tool-system combinations
   }



}






// const payloadHandlers: Partial<Record <SoftwareTools, (payload:ImportPayload) => void>> = {
   //    [SoftwareTools.cvd] : cvdToolModule
   // }
   // //Tool router will call whichever tool we want to route our payload to 
   // //How do we know which router to check . 
   //    // console.log(payload)
   // const handlePayload = payloadHandlers[payload.tool];
   // if(handlePayload){
   //    handlePayload(payload)
   // }
   // else{
   //    console.log("Selected tool is not registered")
   // }