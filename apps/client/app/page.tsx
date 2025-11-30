"use client";
import ImportScreen from "@/features/import/components/ImportScreen";
import { useScreenWidth } from "@/context/ScreenWidthContext";
import ScreenWidth from "@/features/display/components/ScreenWidth";
export default function Home() {

   const screenWidth  = useScreenWidth()

   console.log(screenWidth)
   if(screenWidth && screenWidth< 1024){
      return (
         <ScreenWidth />
      )
   }

   return (
      <div>
         <ImportScreen />
      </div>
  );
}


