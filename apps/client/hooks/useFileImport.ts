"use client"
import ClinicalSystems from "@/constants/clinicalSystems";
import SoftwareTools from "@/constants/softwareTools";
import { useEffect, useRef, useState } from "react";
import ErrorMessages from "@/constants/messages"
import toolRouter from "@/services/toolRouter";
import { ImportPayload } from "@/types/importPayload";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { DisplayContext } from "@/contexts/DispayContext";
// import { useDisplayContext } from "@/contexts/DispayContext";

export default function useFileImport(clinicalSystem:ClinicalSystems, softwareTool:SoftwareTools){
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [importError, setImportError] = useState<ErrorMessages>(ErrorMessages.None);
   const [importedFile, setImportedFile] = useState<any | null>(null);
   const [displayScreen, setDisplayScreen] = useState<string>("");
   const isMounted = useRef(false);

   
   // const ctx = useContext(DisplayContext)
   // if(!ctx) return null;
   // const {setToolName } = ctx
   // const example = useContext(DisplayContext)
   // const check = useContext(DisplayContext)
   // if(check){
   //       let { setToolName } = useContext(DisplayContext)
   // }
   // const {setToolName} = useDisplayContext();

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

      if(displayScreen){
         
      }
   }

   const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
      const eventTarget = event.target as HTMLInputElement
      const eventTargetFiles = eventTarget.files
      if (eventTargetFiles){
         setImportedFile(eventTargetFiles)
      }
   }
   
   
   const routePayload = async ()=> {
      const newPayload: ImportPayload = {
         tool: softwareTool,
         clinicalSystem: clinicalSystem,
         file: importedFile
      }
      
      const routerResult = await toolRouter(newPayload);
      const validationResult = Object.values(routerResult)[0]
      const parserResult = Object.values(routerResult)[1]
      // const validation
      // console.log(Object.values(parserResult))

      const validationResultArray = Object.values(validationResult)
      const parserResultArray = Object.values(parserResult)
      
      
      // const resultDetails = Object.values(routerResult.validationResult)[0]

      if (validationResultArray[0] === "success" && parserResultArray[0] === "success"){
         // setToolName("CVD")


         setDisplayScreen("/display")
         //Check if the parser is also successful 
         //we want to alert 
         console.log("confirming validation & parsing")
      }

      if(validationResultArray[0] === "failure"){
         const validationErrorMessage = validationResultArray[1]
         setImportError(ErrorMessages[validationErrorMessage as keyof typeof ErrorMessages])
      }
   }


   useEffect(() => {
      if(isMounted.current){
          routePayload()
      }else{
         isMounted.current = true
      }
   }, [importedFile])

   

   return { fileInputRef, handleImportButtonClick, importError, setImportError, handleFileChange, importedFile, displayScreen }
};    




















      // if (!payloadResult){
      //    setImportError(ErrorMessages.ClinicalSystemError)
      // }      
      // if(result['validationResult'] == True){

      // }  // console.log()