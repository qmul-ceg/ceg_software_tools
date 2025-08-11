import React from 'react'
import HeaderSection from './HeaderSection'
import FilterSection from './FilterSection'

const DisplayScreen = () => {
   // console.log(QMUL_Logo_Blue_RBG)
   return (
      <div className = "border">
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

         </div>

         
      </div>
  )
}

export default DisplayScreen
