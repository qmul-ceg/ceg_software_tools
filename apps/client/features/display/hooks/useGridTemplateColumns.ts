"use client";
import { tableConfig, TableConfig } from "@/types/shared.types";
import { useEffect, useState } from "react";
import useScreenWidth from "@/app/hooks/useScreenWidth";

// export default function (tableConfig:TableConfig ):string{
//    return tableConfig.map((item) => item.width).join(' ')
// }


export default function useGridTemplateColumns(tableConfig:tableConfig){

   const [  gridTemplateColumns, setGridTemplateColumns  ] = useState<string>("");

   const screenWidth = useScreenWidth();

   useEffect(()=> {

      const getGridTemplateColumns = () => {
         if(screenWidth < 1800){
            return tableConfig.filter((item) => item.priority === "high").map((value) => value.width).join(' ')
         }
         return tableConfig.map((item)=> item.width).join(' ')
      }
 
      setGridTemplateColumns(getGridTemplateColumns())
      
   }, [screenWidth])

   return gridTemplateColumns

}
// Create a custom hook that accepts the tableConfig and the priority 
// Create useEffect so that when the screen changes width the function is called 
// the result from the function is stored in state. 
// that state is what we use to update our gridtemplateColumn props