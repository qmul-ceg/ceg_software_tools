import ClinicalSystems from "@/constants/clinicalSystems";
import SoftwareTools from "@/constants/softwareTools";
import { useRef, useState } from "react";
import ErrorMessages from "@/constants/messages"


export default function useFileImport(clinicalSystem:ClinicalSystems, softwareTool:SoftwareTools){

   const fileInputRef = useRef<HTMLInputElement>(null);

   const [importError, setImportError] = useState<string>("");
   const [importedFile, setImportedFile] = useState<any | null>(null);
   

   const handleImportButtonClick = () => {
      setImportError("")
      if (clinicalSystem == ClinicalSystems.NotSelected || softwareTool == SoftwareTools.NotSelected){
         console.log("button clicked")
         setImportError(ErrorMessages.import);
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
      // console.log("hello")

      const eventTarget = event.target as HTMLInputElement
      const eventTargetFiles = eventTarget.files

      if (eventTargetFiles){
         setImportedFile(eventTargetFiles)
      }
      // setImportedFile(eventTargetFiles[0])
      console.log(eventTargetFiles)
   }



   return { fileInputRef, handleImportButtonClick, importError, setImportError, handleFileChange, importedFile }
};