"use client"
import React from 'react'
import { Source_Sans_3 } from 'next/font/google'
import { useState } from 'react'
import Menu from './Menu'

const sourceFont = Source_Sans_3({
   subsets:['latin'],
   weight:"500",
})
const HeaderSection = () => {
   const [toolName, setToolName] = useState<string>("")


   return (
      <div className = "flex border">
         <div className= " lg:w-[24%] max-w-[250px]">
            <a href="https://www.qmul.ac.uk" target="_blank" rel="noopener noreferrer">
               <img 
                  src = '/icons/QMUL_Logo.png' 
                  alt = 'QMUL logo'
               />
            </a>
         </div>
         <div className="text-center w-full sm:w-auto  flex-row flex-1">
            <h1 
               className="text-2xl 
               lg:text-xl xl:text-2xl 
               font-bold
               text-[#21376A]" 
            >Clinical Effectiveness Group</h1>
            <h1 
               className="text-xl md:text-2xl 
               lg:text-3xl xl:text-4xl 
               2xl:text-4xl  font-sourceSans 
               font-bold
               text-[#21376A]"
            >{toolName} tool </h1>
 
         </div>
         <div>
            <Menu />
         </div>
         
      </div>
   )
}

export default HeaderSection
