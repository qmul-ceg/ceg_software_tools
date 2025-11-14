"use client"
import React, { useContext } from 'react'
import { Source_Sans_3 } from 'next/font/google'
import { useState } from 'react'
import Menu from './Menu'
import { DisplayContext } from '@/context/DispayContext'
import { useDisplay } from '@/context/DispayContext'

const sourceFont = Source_Sans_3({
   subsets:['latin'],
   weight:"500",
})
const HeaderSection = () => {

   const { importedData } = useDisplay();


   return (
      <div className = "flex  ">
         <div className= " lg:w-[24%] max-w-[250px]">
            <a href="https://www.qmul.ac.uk" target="_blank" rel="noopener noreferrer">
               <img 
                  src = '/icons/QMUL_Logo.png' 
                  alt = 'QMUL logo'
               />
            </a>
         </div>
         <div className="text-center w-full sm:w-auto  flex-row flex-1">
            <a href="https://www.qmul.ac.uk/ceg/" target = "_blank" rel ="noopener noreferrer"
               className="text-2xl 
               lg:text-xl xl:text-2xl 
               font-bold
               text-[#21376A]" 
            >Clinical Effectiveness Group</a>
            <h1 
               className="text-xl md:text-2xl 
               lg:text-3xl xl:text-4xl 
               2xl:text-4xl  font-sourceSans 
               font-bold
               text-[#21376A]"
            >{importedData?.data?.toolName}</h1>
 
         </div>
         <div>
            <Menu />
         </div>
         
      </div>
   )
}

export default HeaderSection
