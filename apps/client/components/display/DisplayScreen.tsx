"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import HeaderSection from './HeaderSection'
import FilterSection from './FilterSection'
import TableSection from './TableSection'
import FooterSection from './FooterSection'
import DisplayProvider, { DisplayContext } from '@/context/DispayContext'
import Modal from './Modal'
import TableBody from './TableBody'
import TableHeader from './TableHeader'
import { useDisplay } from '@/context/DispayContext'

const DisplayScreen = () => {
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
   const [scrollbarWidth, setScrollBarWidth] = useState<number>(0)

   const bodyRef = useRef<HTMLDivElement>(null)
   
   const {patientCount} = useDisplay()

   const getScrollbarWidth = (element : HTMLDivElement | null):number=>{
      if(element){
         const width = element.offsetWidth - element.clientWidth
         return width
      }
      return 0
      

   }

   useEffect(()=>{
      // console.log(getScrollbarWidth(bodyRef.current))
      setScrollBarWidth(getScrollbarWidth(bodyRef.current))
   },[])

   
   // console.log(scrollbarWidth)
   return (

      <div className = "flex flex-col  h-screen w-full overflow-hidden">
         <div>
            <HeaderSection />

         </div>
         
         <div className = "mt-6">
            <FilterSection /> 
         </div>

         <div className = " border mt-4 mb-2 ">
            <span className="font-bold">Patient count : {patientCount}</span>

         </div>
           
         <div className='flex flex-col flex-1 min-h-0 border border-[#21376A] rounded-t-lg '>
            <TableHeader paddingValue={scrollbarWidth}/>
            <div className="overflow-y-auto " ref={bodyRef}>
               <TableBody setIsModalOpen={setIsModalOpen}/>
            </div>
            
            
       
         </div>

         <div className="  mt-auto">
            <FooterSection />
         </div>

         {
            isModalOpen ?
               (
                  <div>
                     <Modal setIsModalOpen = {setIsModalOpen}/>
                  </div>
               ): null
         }
         
      </div>

  )
}

export default DisplayScreen
     {/* <TableSection setIsModalOpen={setIsModalOpen}/> */}