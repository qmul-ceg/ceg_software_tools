"use client"
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { SystmOneReportKeys } from '@/modules/cvd/constants/cvdDataEnums'
import { ParserResult, FilterStates } from '@/types/shared.types'




const cvdFilterStates:FilterStates ={
   antihypertensiveFilter : {kind: "single", value: ""},
   bloodPressureFilter: {kind: "single", value: ""},
   houseboundCarehomeFilter : {kind: "single", value: ""},
   lipidMedicationsFilter: {kind: "single", value: ""},
   comorbiditiesFilter: {kind: "single", value: ""},
   cholestrolFilter: {kind: "single", value: ""},
   qRiskFilter: {kind: "group", value: [[],[]]},
   vulnerabilitiesFilter: {kind: "single", value: ""},
   ethnicityFilter: {kind: "single", value: ""},
   ageFilter: {kind: "multi", value: []},
   adverseMedsFilter: {kind: "single", value: ""},
}


type toolConfig = {

}




type Data = {

   importedData : ParserResult;
   setImportedData : React.Dispatch<React.SetStateAction<ParserResult>>




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

   tableData: string[][] | undefined;
   setTableData: React.Dispatch<React.SetStateAction<string[][]>>

   age : string[];
   setAge: React.Dispatch<React.SetStateAction<string[]>>

   selectedFilter: string;
   setSelectedFilter: React.Dispatch<React.SetStateAction<string>>

   filterStates: FilterStates;
   setFilterStates: React.Dispatch<React.SetStateAction<FilterStates>>

   // toolEventHandlers: object;
   // setToolEventHandlers: React.Dispatch<React.SetStateAction<object>>

   test: boolean;
   setTest: React.Dispatch<React.SetStateAction<boolean>>



}


export const DisplayContext = createContext<Data | null>(null);

export default function DisplayProvider ({children} : {children : React.ReactNode }){

   const [importedData, setImportedData] = useState<ParserResult>({status : "", info: ""})
   const [test, setTest] = useState<boolean>(false)
   const [toolName, setToolName] = useState<string>("")
   const [filterItems, setFilterItems] = useState<Object>({})
   const [quickFilters, setQuickFilters] = useState<string[]>([])
   const [summaryTable, setSummaryTable] = useState<string[][]>([])
   const [tableHeader, setTableHeader] = useState<string[]>([])
   const [tableData, setTableData] = useState<string[][]>([])  
   const [filterStates, setFilterStates] = useState<FilterStates>({});


   //DELETE THIS 
   const [age, setAge] = useState<string[]>([])
   const [selectedFilter, setSelectedFilter] = useState<string>("")




   useEffect(() => {
      if (importedData){
         console.log(importedData)
         if (importedData){
            if (importedData.data && importedData.config && importedData.data?.masterReport){
               setToolName(importedData.data.toolName ?? "")
               setTableHeader(importedData.data.tableHeader ?? [])
               setSummaryTable(importedData.data.summaryTable ?? [])
               setTableData(Object.values(importedData.data.masterReport) ?? [])
               setFilterItems(importedData.config.filters)
               setQuickFilters(importedData.config.quickFilters)
               setFilterStates(cvdFilterStates)
               setTest(true) //Testing to allow us to move to display screen 
            }
            
            console.log(importedData.info)
         }
      }  
   }, [importedData])


   return (
      <DisplayContext.Provider value = {{ toolName, setToolName,  
         quickFilters, setQuickFilters, summaryTable, setSummaryTable, tableHeader, setTableHeader, filterItems, setFilterItems,
          setTableData, tableData, age, setAge, selectedFilter, setSelectedFilter, filterStates, setFilterStates, importedData,  setImportedData, test, setTest  }}>
         {children}

      </DisplayContext.Provider>
   )
}


export function useDisplay() {

   // COME BACK TO THIS 
  const ctx = useContext(DisplayContext);
  if (!ctx) throw new Error("useDisplay must be used within DisplayProvider");
  return ctx; // now ctx is Data, not Data | null
}

// ADD THIS BACK WHEN DIFINING FILTERS
























// export function useDisplayContext(){
//    const test = useContext(DisplayContext)
//    if(!test){
//       throw new Error("not working ")
//    }
//    return test
// }

// export const DisplayContext = createContext<Data | null>(null);
   // const cvdData:Data = {toolName: "CVD"}  
   // 
   
   
   // let ageTest: string[][] = []
   // for(let item of tableData){
      
   //    if (parseInt(item[SystmOneReportKeys.Age], 10) > 65){
   //       ageTest.push(item)
   //    }

   // }   
   
   
   
   // const importedDataArray:any[] = Object.values(importedData)
         // const importedDataToolName = importedDataArray[3].toolName
         // console.log(importedDataToolName)
         // 
         
         
// type cvdFilterTypes = {
//   antihypertensiveFilter: string;
//   bloodPressureFilter: string;
//   houseboundCarehomeFilter: string;
//   lipidMedicationsFilter: string;
//   comorbiditiesFilter: string;
//   cholestrolFilter: string;
//   qRiskFilter: string;
//   vulnerabilitiesFilter: string;
//   ethnicityFilter: string;
//   ageFilter: string[];
//   adverseMedsFilter: string;
// };