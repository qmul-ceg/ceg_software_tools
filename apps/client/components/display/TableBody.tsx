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
                                    <td className="text-center w-[2em]">{item[SystmOneReportKeys.Statin_Contra_Code_Term]}</td>
                                    <td className="text-center">-</td>
                                    <td className="text-center">-</td>
                                    <td className="text-center">-</td>
                                    <td className="text-center">140/80</td>
                                    <td className="text-center">-</td>
                                    <td className="text-center w-[4em]">{item[SystmOneReportKeys.CKD_Code_Term]}</td>
                                    <td className="text-center">{item[SystmOneReportKeys.Hypertension_Code_Term]}</td>
                                    <td className="text-center">{item[SystmOneReportKeys.Diabetes_Code_Term]}</td>
                                    <td className="text-center">{item[SystmOneReportKeys.Total_Cholestrol_Value]}</td>
                                    <td className="text-center">{item[SystmOneReportKeys.LDL_Cholestrol_Value]}</td>
                                    <td className="text-center">{item[SystmOneReportKeys.EGFR_Value]}</td>
                                    <td className="text-center">{item[SystmOneReportKeys.Hypertension_Code_Term]}</td>
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
