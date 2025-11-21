"use client";
import React from 'react'
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription } from '@/components/ui/card';

const ScreenWidth = () => {
   const [windowWidth, setWindowWidth ] = useState<number>(0);

   useEffect(()=> {
      if(typeof window !== "undefined"){
         const handleResize = () => setWindowWidth(window.innerWidth);
         window.addEventListener("resize", handleResize);
         return ()=> window.removeEventListener("resize", handleResize);

      }
      
   }, [])

  return (
   
    <>
    {
      windowWidth < 1024 ?
      <div className="h-[100vh] overflow-y-hidden fixed w-full top-0 left-0 z-99 bg-[#21376A]">
         <Card className="px-0 py-0 w-[60%] mx-auto mt-[25em] min-w-[20px] ">
            
            <CardContent className='text-center  px-2 py-4 text-black '>
               <CardDescription className='text-center text-xl font-bold text-black  '>Incompatible screen size!</CardDescription>
                This application is not available on smaller screen resolutions, please use a desktop or laptop to access this application.
            </CardContent>
         </Card>
      </div> 
      
      : null 
    }
    </>
  )
}

export default ScreenWidth
