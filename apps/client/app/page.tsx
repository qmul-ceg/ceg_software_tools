"use client";
import ImportScreen from "@/features/import/components/ImportScreen";
import useScreenWidth from "./hooks/useScreenWidth";
import ScreenWidth from "@/features/display/components/ScreenWidth";

export default function Home() {
   const screenWidth = useScreenWidth()
   return (
      <>
      {
         screenWidth < 1024 && (
            <ScreenWidth />
         ) 

      }
      <div>
         <ImportScreen />
      </div>
   </>
  );
  
}


