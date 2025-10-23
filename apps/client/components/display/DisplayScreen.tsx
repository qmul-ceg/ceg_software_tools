"use client"
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
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
   const [scrollbarWidth, setScrollBarWidth] = useState<number>(11)

   const bodyRef = useRef<HTMLDivElement>(null)
   
   const {patientCount, relativeRunDate} = useDisplay()

   const getScrollbarWidth = (element : HTMLDivElement | null):number=>{
      if(element){
         const width = element.offsetWidth - element.clientWidth
         return width
      }
      return 0
      

   }

   useLayoutEffect(()=>{
      // console.log(getScrollbarWidth(bodyRef.current))
      setScrollBarWidth(getScrollbarWidth(bodyRef.current))
      
   },[])

   
   // console.log(scrollbarWidth)

   return (

      <div className = "flex flex-col  h-screen w-full overflow-hidden">
         <div className="mt-2">
            <HeaderSection />
         </div>
         
         <div className = "mt-4">
            <FilterSection /> 
         </div>

         <div className = "  mt-4 mb-2 flex justify-between">
            <span className="font-bold">Patient count : {patientCount}</span>
            <span className="font-bold">Relative run date : {relativeRunDate}</span>
            
         </div>
           
         <div className='flex flex-col flex-1 min-h-0 border border-[#21376A] rounded-t-lg '>
            <TableHeader paddingValue={scrollbarWidth}/>
            <div className="overflow-y-auto scroll-mt-20" ref={bodyRef}>
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
