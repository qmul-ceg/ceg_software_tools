"use client"
import ClinicalSystems from "@/constants/clinicalSystems";
import SoftwareTools from "@/constants/softwareTools";
import {  useRef, useState } from "react";
import ErrorMessages from "@/constants/messages"


export default function useFileImport(clinicalSystem:ClinicalSystems, softwareTool:SoftwareTools, onFileSelect : (file: FileList | null) => void, errorSetter : (error: ErrorMessages ) => void){
   const fileInputRef = useRef<HTMLInputElement>(null);

   const handleImportButtonClick = () => {
      errorSetter(ErrorMessages.None)
      if (clinicalSystem == ClinicalSystems.NotSelected || softwareTool == SoftwareTools.NotSelected){
         console.log("hi")
         errorSetter(ErrorMessages.MissingInput)
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
         onFileSelect(eventTargetFiles)
      }
   }

   return { fileInputRef, handleImportButtonClick, handleFileChange,  }
};    




















   
   
   
   
   
   
   
   