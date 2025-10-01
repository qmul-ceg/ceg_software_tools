import React from 'react'
import { useDisplay } from '@/context/DispayContext'
import { useState } from 'react'
import { SystmOneReportKeys } from '@/modules/cvd/constants/cvdDataEnums'

type ChildProps = {
   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}


const TableBody = ({setIsModalOpen} : ChildProps) => {
   const { tableHeader, tableData, } = useDisplay()
   const [ filteredData, setFilteredData] = useState<string[][]>(tableData)

   return (
               <div className=" border">
                  <table>
                     <tbody className="">
                           
                           {
                              filteredData.map((item, index)=> ( 
                                 <tr className=" text-xs hover:bg-gray-100">
                                    <td className="w-[4em] text-center">
                                       <input 
                                          type="checkbox"
                                       />
                                    </td>
                                    <td className="text-left w-[14em] cursor-pointer" onClick={()=>setIsModalOpen(true)}>{item[SystmOneReportKeys.Full_Name]}</td>
                                    <td className="text-center px-2">{item[SystmOneReportKeys.Age]}</td>
                                    <td className="text-center px-6">{item[SystmOneReportKeys.Gender]}</td>
                                    <td className="text-center px-6">0000</td>
                                    <td className="text-center w-[2em]">{item[SystmOneReportKeys.Statin_Name_Dosage_Quantity]}</td>
                                    <td className="text-center">{item[SystmOneReportKeys.Statin_Intensity]}</td>
                                    <td className="text-center">{item[SystmOneReportKeys.Statin_Exclusion]}</td>
                                    <td className="text-center">{item[SystmOneReportKeys.Inclisiran]}</td>
                                    <td className="text-center">{item[SystmOneReportKeys.BloodPressure]}</td>
                                    <td className="text-center">{item[SystmOneReportKeys.CVD]}</td>
                                    <td className="text-center w-[4em]">{item[SystmOneReportKeys.CKD3_5]}</td>
                                    <td className="text-center">{item[SystmOneReportKeys.Hypertension]}</td>
                                    <td className="text-center">{item[SystmOneReportKeys.Diabetes]}</td>
                                    <td className="text-center">{item[SystmOneReportKeys.Total_Cholestrol_Value]}</td>
                                    <td className="text-center">{item[SystmOneReportKeys.LDL_Cholestrol_Value]}</td>
                                    <td className="text-center">{item[SystmOneReportKeys.EGFR_Value]}</td>
                                    <td className="text-center">{item[SystmOneReportKeys.AntiHptnMedicationCount]}</td>
                                    <td className="text-center">{item[SystmOneReportKeys.Medication_Review_Date]}</td>
      
                                 </tr>                           
                              ))
                           } 
                  </tbody>  
                  </table>
      
               </div>
   )
}

export default TableBody
