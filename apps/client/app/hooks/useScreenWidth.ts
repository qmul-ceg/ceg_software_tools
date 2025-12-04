import React from 'react';
import { useState, useEffect } from 'react';

export default function  useScreenWidth (){
   const [screenWidth, setScreenWidth] = useState<number>(1900);

   useEffect(()=>{
      const getCurrentScreenWidth = () => {
         const currentWidth = window.innerWidth;
         setScreenWidth(currentWidth);
         return;
      }
      getCurrentScreenWidth()
      window.addEventListener("resize", getCurrentScreenWidth)
      return ()=>window.removeEventListener("resize", getCurrentScreenWidth)

   }, [])

   return screenWidth
}


