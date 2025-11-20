"use client";
import React from 'react'
import { useState, useEffect } from 'react'

const ScreenWidth = () => {
   const [windowWidth, setWindowWidth ] = useState<number>(window.innerWidth);

   useEffect(()=> {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return ()=> window.removeEventListener("resize", handleResize);

   }, [])

  return (
   
    <>
    {
      windowWidth < 1024 ?
      <div className="h-[100vh] overflow-y-hidden"> Hi </div> 
      
      : null 
    }
    </>
  )
}

export default ScreenWidth
