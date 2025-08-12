import React from 'react'
import HeaderSection from './HeaderSection'
import FilterSection from './FilterSection'
import TableSection from './TableSection'
import FooterSection from './FooterSection'


const DisplayScreen = () => {
   // console.log(QMUL_Logo_Blue_RBG)
   return (
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
  )
}

export default DisplayScreen
