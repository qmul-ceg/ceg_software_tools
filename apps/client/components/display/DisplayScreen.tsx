import React, { useContext } from 'react'
import HeaderSection from './HeaderSection'
import FilterSection from './FilterSection'
import TableSection from './TableSection'
import FooterSection from './FooterSection'
import DisplayProvider, { DisplayContext } from '@/contexts/DispayContext'

const DisplayScreen = ( {dataPayload} : { dataPayload : object}) => {
   // const sample = useContext(DisplayContext)

   return (
      <DisplayProvider>
         <div className = "border h-screen">
            <div>
               <HeaderSection />

            </div>
            
            <div className = "mt-6">
               <FilterSection /> 
            </div>

            <div className = "border mt-6 ">
               Patient data ....

            </div>
            
            <div>
               <TableSection />
            </div>

            <div className="mt-auto">
               <FooterSection />
            </div>

            
         </div>
   </DisplayProvider>
  )
}

export default DisplayScreen
