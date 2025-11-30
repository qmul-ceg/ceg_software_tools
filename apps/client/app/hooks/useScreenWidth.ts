import React from 'react';
import { useState, useEffect } from 'react';

export default function  useScreenWidth (){
   const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

   useEffect(()=>{
      const getCurrentScreenWidth = () => {
         const currentWidth = window.innerWidth;
         setScreenWidth(currentWidth);
         return;
      }

      window.addEventListener("resize", getCurrentScreenWidth)
      return ()=>window.removeEventListener("resize", getCurrentScreenWidth)

   }, [])

   return screenWidth
}


