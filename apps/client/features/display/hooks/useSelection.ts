
import { useEffect, useState } from "react"

type SelectionPayload<EnumType extends number> = {
   filteredData: string[][],
   key : EnumType,



}


export default function useSelection<EnumType extends number>(selectionPayload: SelectionPayload<EnumType>){
   const [  selectedForExport, setSelectedForExport   ]  = useState<Record<string, boolean>>({}); 


   useEffect(()=> {
      let patientsSelectedForExport:Record<string, boolean> = {};

      const updateSelectedForExport = () => {
         selectionPayload.filteredData.forEach((patientRow) => {
            patientsSelectedForExport[patientRow[selectionPayload.key]] = true;
         })
         setSelectedForExport(patientsSelectedForExport)
      }
      updateSelectedForExport()
   }, [selectionPayload.filteredData]);


   const toggleSelectedPatient =(rowIndex: number) => {
      const patientRow = selectionPayload.filteredData[rowIndex] //We get the selected row from of the patient 

      setSelectedForExport((prev)=> {
         const exists = patientRow[selectionPayload.key] in prev; 

         if (exists){
            const updated = {...prev}
            delete updated[patientRow[selectionPayload.key]]
            return updated
         }
         else {
            return {
               ...prev,
               [patientRow[selectionPayload.key]]: true
            }
         }
      })
   };

   const handleToggleSelectAll = () => {

      if (Object.keys(selectedForExport).length !== selectionPayload.filteredData.length){
         let patientsSelectedForExport:Record<string, boolean> = {};
         selectionPayload.filteredData.forEach((patient) => {
            patientsSelectedForExport[patient[selectionPayload.key]] = true
         })
         setSelectedForExport(patientsSelectedForExport)
      }
      else {
         setSelectedForExport({})
      }
   }

   return { toggleSelectedPatient, selectedForExport, setSelectedForExport, handleToggleSelectAll }

}


