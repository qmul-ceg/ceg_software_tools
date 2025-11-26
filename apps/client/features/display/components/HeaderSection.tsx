"use client"
import React, { useContext } from 'react'
import { Source_Sans_3 } from 'next/font/google';
import Menu from './Menu'
import { useDisplay } from '@/context/DispayContext'

const sourceFont = Source_Sans_3({
   subsets:['latin'],
   weight:"500",
})


import { SystmOneReportKeys, EMISReportKeys } from "@/modules/cvd/constants/cvdDataEnums"
type IndexMap = typeof SystmOneReportKeys | typeof EMISReportKeys

type HeaderProps= {
   exportObject: Record<string, boolean>,
   data : string [][],
   reportKeys :IndexMap
}
const HeaderSection = ({exportObject, data, reportKeys}:HeaderProps) => {

   const { importedData } = useDisplay();


   return (
      <div className = "flex  ">
         <div className= " w-[15%] max-w-[300px]">
            <a href="https://www.qmul.ac.uk" target="_blank" rel="noopener noreferrer">
               <img 
                  src = '/icons/QMUL_Logo.png' 
                  alt = 'QMUL logo'
               />
            </a>
         </div>
         <div className={`text-center w-full  flex-row flex-1  ${sourceFont.className}`}>
            <a 
               href="https://www.qmul.ac.uk/ceg/" target = "_blank" rel ="noopener noreferrer"
               className=" text-xl font-bold text-[#21376A] leading-4"
            >Clinical Effectiveness Group</a>
            <h1 className="text-3xl  font-bold text-[#21376A] leading-6">
               {importedData?.data?.toolName}
            </h1>
 
         </div>
         <div>
            <Menu exportObject = {exportObject} data={data} reportKeys={reportKeys}/>
         </div>
         
      </div>
   )
}

export default HeaderSection
