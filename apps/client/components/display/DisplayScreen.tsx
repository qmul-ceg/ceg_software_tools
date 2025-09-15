"use client"
import React, { useContext, useState } from 'react'
import HeaderSection from './HeaderSection'
import FilterSection from './FilterSection'
import TableSection from './TableSection'
import FooterSection from './FooterSection'
import DisplayProvider, { DisplayContext } from '@/contexts/DispayContext'
import Modal from './Modal'

const DisplayScreen = () => {
   const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

   return (

      <div className = "flex flex-col border h-screen">
         <div>
            <HeaderSection />

         </div>
         
         <div className = "mt-6">
            <FilterSection /> 
         </div>

         <div className = "border mt-6 ">
            Patient data ....

         </div>
         
         <div className=' border rounded-t-lg  overflow-y-auto'>
            <TableSection setIsModalOpen={setIsModalOpen}/>
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