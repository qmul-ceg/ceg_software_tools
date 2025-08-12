import React from 'react'
import QMUL_Logo_Blue_RBG from './images_icons/QMUL_Logo_Blue_RGB.png'
import Image from 'next/image'
import DisplayScreen from '@/components/display/DisplayScreen'
const Display = () => {
   // console.log(QMUL_Logo_Blue_RBG)
   return (
      <div className= "max-w-[2000px] m-auto">
         <DisplayScreen />
      </div>
  )
}

export default Display
