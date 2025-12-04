import React, { ReactNode, useEffect, useState } from 'react'
import { useDisplay } from '@/context/DispayContext'
import { IndexMap } from '@/types/shared.types'
import useScreenWidth from "@/app/hooks/useScreenWidth";
type TableHeaderProps = {
   gridTemplateColumns: string,
   handleToggleSelectAll : ()=>void,
   filteredData : string[][],
   selectedForExport : Record<string, boolean>

}



const TableHeader = ({  handleToggleSelectAll, gridTemplateColumns, filteredData, selectedForExport   } : TableHeaderProps) => {
   const { importedData } = useDisplay()
   

   const screenWidth = useScreenWidth()
   return (
      <div 
         className={` border-b-6  border-[#21376A] rounded-t-lg pr-[11px]`}
         
      >
         <div className='flex' style = {{display:"grid", gridTemplateColumns:gridTemplateColumns}}>
               {  
                  importedData?.config?.tableConfig?.map((item, index)=> (
                  item.id == "select" 
                  ?  <div  className= "border-r-1 border-[#21376A] flex justify-center"><input type = "checkbox" 
                           checked = {Object.keys(selectedForExport).length === filteredData.length} onChange={handleToggleSelectAll} /> </div>
                  :  <div 
                        key = {index} 
                        className = {`${screenWidth < 1800 && item.priority !== "high" ? "hidden" : ""} text-center  font-bold flex text-sm  px-1 py-1     items-center justify-${item.align} ${item.header !== "Medication review latest date" ? "border-r-1 " : "" }   border-[#21376A] `}
                           style= {{minWidth: item.minWidth, maxWidth: item.maxWidth}}
                        >
                           {item.header}
                     
                     </div>
               ))}
         </div>
      </div>
   )
}

export default TableHeader
















































   // paddingValue, 
   // masterCheckbox, setMasterCheckbox, , setSelectedForExport, , , reportKeys





   // reportKeys : IndexMap
 // paddingValue: number,
   // masterCheckbox: boolean,
   // setMasterCheckbox:  React.Dispatch<React.SetStateAction<boolean>>
   // selectedForExport : Record<string, boolean>
   // setSelectedForExport: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
   // filteredData : string[][]

// export function ColumnGroup (){
//    const { importedData } = useDisplay()
//    //Function allows us to create a column group element that we use to align our table header and table body
//    return (
//       <colgroup>
//          {
//             importedData?.data?.tableConfig?.map((col) => {
//                return (
//                   <col key = {col.id} style ={{width: col.width}}/>
//                )
//             })
//          }
//       </colgroup>
//    )
// }





   // useEffect(() => {
   //    if (filteredData.length === Object.keys(selectedForExport).length){
   //       setMasterCheckbox(true)
   //    }
   //    else setMasterCheckbox(false)
   // }, [selectedForExport, filteredData])   


   // const handleMasterCheckBox = () => {
   //    setMasterCheckbox ((prev) => {
   //       const newMasterCheckboxState = !prev;
   
   //       if (newMasterCheckboxState){
   //          const patientsSelectedForExport = {}
   
   //          filteredData.forEach((patient) => {
   //             patientsSelectedForExport[patient[reportKeys!.Full_Name]] = true
   //          })
   //          setSelectedForExport(patientsSelectedForExport)
   //       }
   //       else {
   //          setSelectedForExport({})
   //       }
   //       return newMasterCheckboxState;
   //    })
   // }





{/* <table className="w-full table-fixed">
            <ColumnGroup />
            <thead>
               <tr className=''>
                     {  
                         importedData?.data?.tableConfig?.map((item, index)=> (
                           item.id == "select" 
                           ?  <th className= "border-r-1 border-[#21376A]"><input type = "checkbox" checked = {masterCheckbox} onChange={handleMasterCheckBox} /> </th>
                           :  <th key = {index} className={` text-sm  px-2 py-1 ${item.header !== "Medication review latest date" ? "border-r-1 " : "" }  top-0   border-[#21376A]`}>
                                 {item.header}
                              </th>
                     ))}
                  </tr>

            </thead>
         </table> */}










      // masterCheckbox, setMasterCheckbox, setSelectedForExportselectedForExport
// export const SystmOneTableConfig = [
//    {
//       id: "select",
//       header : "",
//       width : "2%",
//       align : "center",
//       colour : ""

//    },
//    {
//       id : SystmOneReportKeys.Full_Name,
//       header : "Full name",
//       width : "12%",
//       align : "left",
//       colour : "blue"
//    },
//   {
//       id : SystmOneReportKeys.Age,
//       header : "Age",
//       width : "2%",
//       align : "center",
//       colour : ""
//    },
//    {
//       id : SystmOneReportKeys.Gender,
//       header : "Gender",
//       width : "3%",
//       align : "center",
//       colour : ""
//    },
//    {
//       id : "Patient reference no.",
//       header : "Patient reference no.",
//       width : "5%",
//       align : "center",
//       colour : ""
//    },
//    {
//       id : SystmOneReportKeys.Statin_Name_Dosage_Quantity,
//       header : "Statin prescription",
//       width : "14%",
//       align : "center",
//       colour : ""
//    },
//    {
//       id : SystmOneReportKeys.Statin_Intensity,
//       header : "Statin intensity",
//       width : "4%",
//       align : "center",
//       colour : ""
//    },
//    {
//       id : SystmOneReportKeys.Statin_Exclusion,
//       header : "Statin exclusion",
//       width : "4%",
//       align : "center",
//       colour : ""
//    },
//    {
//       id : SystmOneReportKeys.Inclisiran,
//       header : "Inclisiran",
//       width : "4%",
//       align : "center",
//       colour : ""
//    },
   
//    {
//       id : SystmOneReportKeys.BloodPressure,
//       header : "Blood pressure",
//       width : "4%",
//       align : "center",
//       colour : ""
//    },
//    {
//       id : SystmOneReportKeys.CVD,
//       header : "CVD",
//       width : "3%",
//       align : "center",
//       colour : ""
//    },
//    {
//       id : SystmOneReportKeys.CKD3_5,
//       header : "CKD 3-5",
//       width : "4%",
//       align : "center",
//       colour : ""
//    },
//    {
//       id : SystmOneReportKeys.Hypertension,
//       header : "HTN",
//       width : "3%",
//       align : "center",
//       colour : ""
//    },
//    {
//       id : SystmOneReportKeys.Diabetes,
//       header : "Diabetes",
//       width : "4%",
//       align : "center",
//       colour : ""
//    },
//    {
//       id : SystmOneReportKeys.Total_Cholestrol_Value,
//       header : "Total cholestrol",
//       width : "4%",
//       align : "center",
//       colour : ""
//    },
//    {
//       id : SystmOneReportKeys.LDL_Cholestrol_Value,
//       header : "LDL",
//       width : "3%",
//       align : "center",
//       colour : ""
//    },
//    {
//       id : SystmOneReportKeys.EGFR_Value,
//       header : "eGFR",
//       width : "2%",
//       align : "center",
//       colour : ""
//    },
//    {
//       id : SystmOneReportKeys.AntiHptnMedicationCount,
//       header : "No. of anti-hptn meds",
//       width : "5%",
//       align : "center",
//       colour : ""
//    },
//    {
//       id : SystmOneReportKeys.Medication_Review_Date,
//       header : "Medication review latest date",
//       width : "6%",
//       align : "center",
//       colour : ""
//    },
// ];