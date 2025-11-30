"use client";
import React from 'react'
import DisplayScreen from '@/features/display/components/DisplayScreen';
import useScreenWidth from '../hooks/useScreenWidth';
import ScreenWidth from "@/features/display/components/ScreenWidth";


const Display = () => {
   const screenWidth = useScreenWidth()
   return (
      <>
        {
         screenWidth < 1024 && (
            <ScreenWidth />
         ) 

      }
         <div className= "max-w-[2400px] m-auto px-4 ">
            <DisplayScreen />
         </div>


      </>
  )
}

export default Display
