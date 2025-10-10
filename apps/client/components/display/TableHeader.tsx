import React, { ReactNode } from 'react'
import { useDisplay } from '@/context/DispayContext'
import { SystmOneReportKeys } from '@/modules/cvd/constants/cvdDataEnums'


export const cvdTableConfig = [
   {
      id: "select",
      header : "",
      width : "2%",
      align : "center",
      colour : ""

   },
   {
      id : SystmOneReportKeys.Full_Name,
      header : "Full name",
      width : "11%",
      align : "left",
      colour : "blue"
   },
  {
      id : SystmOneReportKeys.Age,
      header : "Age",
      width : "2%",
      align : "center",
      colour : ""
   },
   {
      id : SystmOneReportKeys.Gender,
      header : "Gender",
      width : "3%",
      align : "center",
      colour : ""
   },
   {
      id : "Patient reference no.",
      header : "Patient reference no.",
      width : "5%",
      align : "center",
      colour : ""
   },
   {
      id : SystmOneReportKeys.Statin_Name_Dosage_Quantity,
      header : "Statin prescription",
      width : "14%",
      align : "center",
      colour : ""
   },
   {
      id : SystmOneReportKeys.Statin_Intensity,
      header : "Statin intensity",
      width : "4%",
      align : "center",
      colour : ""
   },
   {
      id : SystmOneReportKeys.Statin_Exclusion,
      header : "Statin exclusion",
      width : "4%",
      align : "center",
      colour : ""
   },
   {
      id : SystmOneReportKeys.Inclisiran,
      header : "Inclisiran",
      width : "4%",
      align : "center",
      colour : ""
   },
   
   {
      id : SystmOneReportKeys.BloodPressure,
      header : "Blood pressure",
      width : "4%",
      align : "center",
      colour : ""
   },
   {
      id : SystmOneReportKeys.CVD,
      header : "CVD",
      width : "3%",
      align : "center",
      colour : ""
   },
   {
      id : SystmOneReportKeys.CKD3_5,
      header : "CKD 3-5",
      width : "4%",
      align : "center",
      colour : ""
   },
   {
      id : SystmOneReportKeys.Hypertension,
      header : "HTN",
      width : "3%",
      align : "center",
      colour : ""
   },
   {
      id : SystmOneReportKeys.Diabetes,
      header : "Diabetes",
      width : "4%",
      align : "center",
      colour : ""
   },
   {
      id : SystmOneReportKeys.Total_Cholestrol_Value,
      header : "Total cholestrol",
      width : "4%",
      align : "center",
      colour : ""
   },
   {
      id : SystmOneReportKeys.LDL_Cholestrol_Value,
      header : "LDL",
      width : "3%",
      align : "center",
      colour : ""
   },
   {
      id : SystmOneReportKeys.EGFR_Value,
      header : "eGFR",
      width : "2%",
      align : "center",
      colour : ""
   },
   {
      id : SystmOneReportKeys.AntiHptnMedicationCount,
      header : "No. of anti-hptn meds",
      width : "5%",
      align : "center",
      colour : ""
   },
   {
      id : SystmOneReportKeys.Medication_Review_Date,
      header : "Medication review latest date",
      width : "6%",
      align : "center",
      colour : ""
   },
];


export function ColumnGroup (){
   //Function allows us to create a column group element that we use to align our table header and table body
   return (
      <colgroup>
         {
            cvdTableConfig.map((col) => {
               return (
                  <col key = {col.id} style ={{width: col.width}}/>
               )
            })
         }
      </colgroup>
   )
}


const TableHeader = ({ paddingValue } : { paddingValue : number }) => {
   const { tableHeader } = useDisplay()
  
   return (
      <div 
         className={` border-b-6 border-[#21376A] rounded-t-lg pr-[${paddingValue}px]`}
         style = {{paddingRight : `${paddingValue}px` }}
      
      >



         <table className="w-full table-fixed">
            <ColumnGroup />
            <thead>
               <tr className=''>
                     {  
                        cvdTableConfig.map((item, index)=> (
                           item.id == "select" 
                           ?  <th className= "border-r-1 border-[#21376A]"><input type = "checkbox" /> </th>
                           :  <th key = {index} className={` text-sm  px-2 py-1 ${item.header !== "Medication review latest date" ? "border-r-1 " : "" }  top-0   border-[#21376A]`}>
                                 {item.header}
                              </th>
                     ))}
                  </tr>

            </thead>
         </table>
      </div>
   )
}

export default TableHeader
