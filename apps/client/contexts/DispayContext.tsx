"use client"
import React, { useContext, useState } from 'react'
import { createContext } from 'react'

type Data = {
   toolName: string;
   setToolName: React.Dispatch<React.SetStateAction<string>>;

   filterItems: Object;
   setFilterItems: React.Dispatch<React.SetStateAction<Object>>;

   quickFilters: string[];
   setQuickFilters: React.Dispatch<React.SetStateAction<string[]>>

   summaryTable: string[][];
   setSummaryTable: React.Dispatch<React.SetStateAction<string[][]>>

   tableHeader: string[];
   setTableHeader: React.Dispatch<React.SetStateAction<string[]>>

   tableData: string[][];
   setTableData: React.Dispatch<React.SetStateAction<string[][]>>

}


export const DisplayContext = createContext<Data | null>(null);

export default function DisplayProvider ({children} : {children : React.ReactNode }){
   const [toolName, setToolName] = useState("")
   const [filterItems, setFilterItems] = useState<Object>({})
   const [quickFilters, setQuickFilters] = useState<string[]>([])
   const [summaryTable, setSummaryTable] = useState<string[][]>([])
   const [tableHeader, setTableHeader] = useState<string[]>([])
   const [tableData, setTableData] = useState<string[][]>([])
   
   return (
      <DisplayContext.Provider value = {{ toolName, setToolName, filterItems, setFilterItems, 
         quickFilters, setQuickFilters, summaryTable, setSummaryTable, tableHeader, setTableHeader, setTableData, tableData  }}>
            {children}

      </DisplayContext.Provider>
   )


}

export function useDisplay() {
  const ctx = useContext(DisplayContext);
  if (!ctx) throw new Error("useDisplay must be used within DisplayProvider");
  return ctx; // now ctx is Data, not Data | null
}



// export function useDisplayContext(){
//    const test = useContext(DisplayContext)
//    if(!test){
//       throw new Error("not working ")
//    }
//    return test
// }

// export const DisplayContext = createContext<Data | null>(null);
   // const cvdData:Data = {toolName: "CVD"}