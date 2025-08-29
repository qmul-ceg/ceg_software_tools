import React, { useState } from 'react'
import { useDisplay } from '@/contexts/DispayContext'
import { SystmOneReportKeys } from '@/modules/cvd/constants/cvdDataEnums'

type ChildProps = {
   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const TableSection = ({setIsModalOpen} : ChildProps) => {
   const { tableHeader, tableData } = useDisplay()
   // const [openModal, setOpenModal] = useState<boolean>(true)
  return (
      <div className="border border-dashed min-h-0 flex flex-col ">
         <table>
            <thead className='text-sm'>
               
                  <tr className=' '>
                     {tableHeader.map((item)=> (
                        <th className=' border-2'>{item}</th>
                     ))}
                  </tr>

               
            </thead> 
            <tbody>

                     {
                        tableData.map((item)=> (
                           <tr className="border text-xs">
                              <td className="text-left w-[14em] px-2 cursor-pointer" onClick={()=>setIsModalOpen(true)}>{item[SystmOneReportKeys.Full_Name]}</td>
                              <td className="text-center">{item[SystmOneReportKeys.Age]}</td>
                              <td className="text-center">{item[SystmOneReportKeys.Gender]}</td>
                              <td className="text-center">0000</td>
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
         {/* <div className=" rounded-t-lg border border-[#21376A] h-[6em]">
            {tableHeader}
         </div>
         <div className="border border-red-400  flex-1">

         </div> */}
      </div>
  )
}

export default TableSection
