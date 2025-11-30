"use client";
import { createContext, useContext, useEffect, useState } from "react";



const ScreenWidthContext = createContext<number | null>(null);

export default function ScreenWidthProvider ({children}: {children:React.ReactNode}){
   const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)

   useEffect(()=> {
      const getScreenWidth = ()=> {
         const currentWidth = window.innerWidth;
         setScreenWidth(currentWidth);
         return;
      }

      window.addEventListener("resize", getScreenWidth);

      return ()=>window.removeEventListener("resize", getScreenWidth)

   }, [])


   return (
      <ScreenWidthContext.Provider value = {screenWidth}>
         {children}
      </ScreenWidthContext.Provider>
   )
}


export function useScreenWidth(){
   const screenWidth = useContext(ScreenWidthContext)
   if(!screenWidth) throw new Error ("Screen width not available for use")
   return screenWidth
}