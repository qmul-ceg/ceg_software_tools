"use client"
import ClinicalSystems from "@/constants/clinicalSystems";
import SoftwareTools from "@/constants/softwareTools";
import {  useRef, useState } from "react";
import ErrorMessages from "@/constants/messages"


export default function useFileImport(clinicalSystem:ClinicalSystems, softwareTool:SoftwareTools, onFileSelect : (file: FileList | null) => void){
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [importError, setImportError] = useState<ErrorMessages>(ErrorMessages.None);
   const [importedFile, setImportedFile] = useState<any | null>(null);

   const handleImportButtonClick = () => {

      setImportError(ErrorMessages.None)
      if (clinicalSystem == ClinicalSystems.NotSelected || softwareTool == SoftwareTools.NotSelected){
         console.log("hi")
         setImportError(ErrorMessages.MissingInput);
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
         onFileSelect(eventTargetFiles)
      }
   }

   return { fileInputRef, handleImportButtonClick, importError, setImportError, handleFileChange, importedFile }
};    


















   
   
   
   
   
   
   
   