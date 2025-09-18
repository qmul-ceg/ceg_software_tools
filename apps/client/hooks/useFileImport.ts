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
import { useDisplay } from "@/contexts/DispayContext";
import { dummy_data } from "./dummy_data";



export default function useFileImport(clinicalSystem:ClinicalSystems, softwareTool:SoftwareTools){
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [importError, setImportError] = useState<ErrorMessages>(ErrorMessages.None);
   const [importedFile, setImportedFile] = useState<any | null>(null);
   const [displayScreen, setDisplayScreen] = useState<string>("");
   const isMounted = useRef(false);

   const router = useRouter();

   const { toolName, setToolName, setFilterItems, setQuickFilters, setSummaryTable, summaryTable, setTableHeader, setTableData, setFilterStates } = useDisplay();

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
      const parserResultArray:any[] = Object.values(parserResult)
      
      console.log(parserResultArray)
      // const resultDetails = Object.values(routerResult.validationResult)[0]

      if (validationResultArray[0] === "success" && parserResultArray[0] === "success"){
         setToolName(parserResultArray[3].toolName)
         setFilterItems(parserResultArray[3].filters)
         setQuickFilters(parserResultArray[3].quickFilters)
         
         setSummaryTable (parserResultArray[3].summaryTable)

         setTableHeader(parserResultArray[3].tableHeader)

         console.log(parserResultArray[2])
       
         setTableData(Object.values(parserResultArray[2]))

         const sampleFilters = {
            name: "",
            age : "",

         }
         setFilterStates(sampleFilters)
         
         
         
         
         // setTableData(dummy_data)
         // const patientDataArray:string[][] = []
         // patientDataArray.push(Object.values(parserResultArray[2]))
         // // console.log(patientDataArray)
         
         // setTableData((prev)=> {
         //       let patientDataArray = []
         //       // for (const [key, value] of Object.entries(parserResultArray[2])){
         //       //    patientDataArray.push(value)
         //       // }
         //       return [...prev, Object.values(parserResultArray[2])]
               
         //    }
         // )



         setDisplayScreen("/display")
         // console.log(displayScreen)
         //Check if the parser is also successful 
         //we want to alert 
         console.log("confirming validation & parsing")

      }

      if(validationResultArray[0] === "failure"){
         const validationErrorMessage = validationResultArray[1]
         setImportError(ErrorMessages[validationErrorMessage as keyof typeof ErrorMessages])
      }
   }

   useEffect(()=> {
      console.log(toolName, displayScreen)
      if(toolName){
         setDisplayScreen("/display")
      }
      router.push(displayScreen)
   }, [toolName])


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

// }  // console.log()   // const ctx = useContext(DisplayContext)
// if(!ctx) return null;
// const {setToolName } = ctx
// const example = useContext(DisplayContext)
// const check = useContext(DisplayContext)
// if(check){
//       let { setToolName } = useContext(DisplayContext)
// }// import { useDisplayContext } from "@/contexts/DispayContext";         // useEffect(()=> {
   //    if(displayScreen){
   //    router.push(displayScreen)
   // }
   // },[displayScreen])         
   // 
   // 
// setFilterItems(["Antihypertensive meds", "Blood pressure readings", "Housebound/Care home", "Lipid medications", "Vulnerabilities",  "Cholestrol readings", "QRisk score", "Co-morbidities", "Ethnicity", "Adverse meds", "Age" ])
// setFilterItems(
   //    {
   //       "Antihypertensive meds" : 
   //          [  ["", "ACEi/ARB", "Ca-Channel", "Thiazides", "Beta-blockers","Others"], 
   //             ["No.of Antihypertensives", "0", "1", "2 or more"], ["", "Max tolerated dose"], 
   //             ["", "Antihypertensives declined (12m)"]],
   //       "Blood pressure readings":
   //          [  ["", "Under 140/90", "Over 140/90", "Over 150/90"], 
   //             ["", "Not in last 12m", "Not in financial year"]],
   //       "Housebound/Care home":
   //          [  ["", "Housebound", "Care home"]],
   //       "Lipid medications":
   //          [  ["Statin", "High intensity Statin", "medium or low intensity", "Not on Statin"], 
   //             ["", "On inclisiran"],
   //             ["", "Max tolerated dose"],
   //             ["", "Statin exlusions (Valid* contraindicated/declined"]],
   //       "Co-morbidities":
   //          [  ["", "CVD (IHD/Stroke/TIA/PAD)", "Hypertension", "Diabetes", "CKD 3-5", "Atrial Fibrillation", "Cancer"]],
   //       "Cholestrol readings":
   //          [  ["LDL", "> 2.0"], ["", "Not in last 12m", "Not in financial year"]],
   //       "QRisk score":
   //          [  ["", "10% or more", "20% or more"], ["", "Not recorded in last 12m"]],
   //       "Vulnerabilities":
   //          [ ["", "Severe mental illness", "Learning disability", "Dementia"]],
   //       "Ethnicity":
   //          [ ["", "Asian/Asian British", "Black/Black British", "Mixed or multiple ethnic groups", "White", "Other/Not specified"]],
   //       "Age":
   //          [  ["", "65 or under", "65 - 79", "above 80"]],
   //       "Adverse meds":
   //          [ ["", "NSAIDs (excl. aspirin)"]],

   // });