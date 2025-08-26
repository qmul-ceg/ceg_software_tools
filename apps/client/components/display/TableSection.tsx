import React from 'react'
import { useDisplay } from '@/contexts/DispayContext'
import { SystmOneReportKeys } from '@/modules/cvd/constants/cvdDataEnums'

const TableSection = () => {
   const { tableHeader, tableData } = useDisplay()
  return (
      <div className="border border-dashed min-h-0 flex flex-col ">
         <table>
            <thead className='text-sm'>
               
                  <tr className=' '>
                     {tableHeader.map((item)=> (
                        <th className='w-[12em] border-2'>{item}</th>
                     ))}
                  </tr>

               
            </thead> 
            <tbody>
                  
                
                     {
                        tableData.map((item)=> (
                        <tr>
                           <td className="text-center">{item[SystmOneReportKeys.Full_Name]}</td>
                           <td className="text-center">{item[SystmOneReportKeys.Age]}</td>
                           <td className="text-center">{item[SystmOneReportKeys.Gender]}</td>
                           <td className="text-center">0000</td>
                           <td className="text-center">{item[SystmOneReportKeys.Statin_Contra_Code_Term]}</td>
                           <td className="text-center">-</td>
                           <td className="text-center">-</td>
                           <td className="text-center">-</td>
                           <td className="text-center">140/80</td>
                           <td className="text-center">-</td>
                           <td className="text-center">{item[SystmOneReportKeys.CKD_Code_Term]}</td>
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
         {/* <div className=" rounded-t-lg border border-[#21376A] h-[6em]">
            {tableHeader}
         </div>
         <div className="border border-red-400  flex-1">

         </div> */}
      </div>
  )
}

export default TableSection
