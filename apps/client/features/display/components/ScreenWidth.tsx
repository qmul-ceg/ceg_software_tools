"use client";
import React from 'react'
import { Card, CardContent, CardDescription } from '@/components/ui/card';

const ScreenWidth = () => {


  return (
   
      <div className="h-[100vh] overflow-y-hidden fixed w-full top-0 left-0 z-99 bg-[#21376A] flex items-center">
         <Card className="px-0 py-0 w-[60%] mx-auto  min-w-[300px] ">
            
            <CardContent className='text-center   py-3 text-black leading-tight'>
               <CardDescription className='text-center text-xl font-bold text-black'>Incompatible screen size!</CardDescription>
                This application is not available on smaller screen resolutions, please use a desktop or laptop to access this application.
            </CardContent>
         </Card>
      </div> 

  )
}

export default ScreenWidth
