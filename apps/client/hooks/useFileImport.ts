import ClinicalSystems from "@/constants/clinicalSystems";
import SoftwareTools from "@/constants/softwareTools";
import { useEffect, useRef, useState } from "react";
import ErrorMessages from "@/constants/messages"
import toolRouter from "@/services/toolRouter";
import { ImportPayload } from "@/types/importPayload";


export default function useFileImport(clinicalSystem:ClinicalSystems, softwareTool:SoftwareTools){
   // console.log("hi")
   const fileInputRef = useRef<HTMLInputElement>(null);

   const [importError, setImportError] = useState<ErrorMessages>(ErrorMessages.None);
   const [importedFile, setImportedFile] = useState<any | null>(null);
   const isMounted = useRef(false)

   const handleImportButtonClick = () => {
      setImportError(ErrorMessages.None)
      if (clinicalSystem == ClinicalSystems.NotSelected || softwareTool == SoftwareTools.NotSelected){
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


   



   const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
      const eventTarget = event.target as HTMLInputElement
      const eventTargetFiles = eventTarget.files
      if (eventTargetFiles){
         setImportedFile(eventTargetFiles)
      }
   }
   
   
   const routePayload = ()=> {

      const newPayload: ImportPayload = {
         tool: softwareTool,
         clinicalSystem: clinicalSystem,
         file: importedFile
      }
      const payloadResult = toolRouter(newPayload)
      if (!payloadResult){
         setImportError(ErrorMessages.ClinicalSystemError)
      }
   }


   useEffect(() => {
      if(isMounted.current){
          routePayload()
      }else{
         isMounted.current = true
      }
   }, [importedFile])

   

   return { fileInputRef, handleImportButtonClick, importError, setImportError, handleFileChange, importedFile }
};    

