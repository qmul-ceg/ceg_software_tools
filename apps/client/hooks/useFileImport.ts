import ClinicalSystems from "@/constants/clinicalSystems";
import SoftwareTools from "@/constants/softwareTools";
import { useEffect, useRef, useState } from "react";
import ErrorMessages from "@/constants/messages"
import toolRouter from "@/services/toolRouter";
import { ToolPayload } from "@/types/toolPayload";


export default function useFileImport(clinicalSystem:ClinicalSystems, softwareTool:SoftwareTools){

   const fileInputRef = useRef<HTMLInputElement>(null);

   const [importError, setImportError] = useState<ErrorMessages>(ErrorMessages.None);
   const [importedFile, setImportedFile] = useState<any | null>(null);
   

   const handleImportButtonClick = () => {
      setImportError(ErrorMessages.None)
      if (clinicalSystem == ClinicalSystems.NotSelected || softwareTool == SoftwareTools.NotSelected){
         console.log("button clicked")
         setImportError(ErrorMessages.ImportError);
         return
      }
      else{
         if(fileInputRef.current){
            fileInputRef.current.value="";
            fileInputRef.current.click();

         }
      }
   }

   const routePayload = ()=> {
      const newPayload: ToolPayload = {
         tool: softwareTool,
         clinicalSystem: clinicalSystem,
         file: importedFile
      }

      toolRouter(newPayload)

   }


   const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>) =>{

      const eventTarget = event.target as HTMLInputElement
      const eventTargetFiles = eventTarget.files

      if (eventTargetFiles){
         setImportedFile(eventTargetFiles)
      }
  
   }
   
   useEffect(() => {
      routePayload()
   }, [importedFile])


   return { fileInputRef, handleImportButtonClick, importError, setImportError, handleFileChange, importedFile }
};    

