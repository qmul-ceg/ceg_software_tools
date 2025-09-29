"use client"
import React, { useContext, useState } from 'react'
import HeaderSection from './HeaderSection'
import FilterSection from './FilterSection'
import TableSection from './TableSection'
import FooterSection from './FooterSection'
import DisplayProvider, { DisplayContext } from '@/context/DispayContext'
import Modal from './Modal'
import TableBody from './TableBody'
import TableHeader from './TableHeader'


const DisplayScreen = () => {
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

   return (

      <div className = "flex flex-col  h-screen w-full ">
         <div>
            <HeaderSection />

         </div>
         
         <div className = "mt-6">
            <FilterSection /> 
         </div>

         <div className = "border mt-6 ">
            Patient data ....

         </div>
            {/* overflow-y-auto */}
         <div className='flex flex-col flex-1 min-h-0 border border-[#21376A] rounded-t-lg dataTable'>
            <TableHeader />
            <div className="overflow-y-auto flex-1 min-h-0">
               <TableBody setIsModalOpen={setIsModalOpen}/>
            </div>
            
            
            {/* <TableSection setIsModalOpen={setIsModalOpen}/> */}
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
               // <Modal openModal={isModalOpen} onClose={()=> setIsModalOpen(!isModalOpen)}/>
         }
         
      </div>

  )
}

export default DisplayScreen
   // const sample = useContext(DisplayContext)