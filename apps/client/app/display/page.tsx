"use client";
import React from 'react'
import DisplayScreen from '@/features/display/components/DisplayScreen';
import { useScreenWidth } from "@/context/ScreenWidthContext";
import ScreenWidth from "@/features/display/components/ScreenWidth";


const Display = () => {
   const screenWidth  = useScreenWidth();
   if(screenWidth && screenWidth< 1024){
      return (
         <ScreenWidth />
      )
   }
   return (
      <div className= "max-w-[2400px] m-auto px-4 ">
         <DisplayScreen />
      </div>
  )
}

export default Display
