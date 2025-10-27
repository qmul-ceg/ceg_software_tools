"use client"
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { SystmOneReportKeys, EMISReportKeys } from '@/modules/cvd/constants/cvdDataEnums'
import { ParserResult, FilterStates, tableConfig } from '@/types/shared.types'


type Options = Record<string, { groupName : string; groupOptions: { value: string; label: string }[]}>

type MultiFilter = {
   id : string,
   label : string,
   ui : { width : number, bgColour: string},
   kind : "multi",
   options : {value : string, label : string}[],
   emptyBehaviour : []
}

type GroupedFilter = {
   id : string,
   label : string,
   ui : { width : number, bgColour: string},
   kind : "grouped",
   options : Options,
   emptyBehaviour : [][]
}

const cvdFilterStates:FilterStates = {
   antihypertensiveMedsFilter : {kind: "grouped", value: [[],[], [], []]},
   bloodPressureFilter: {kind: "grouped", value: [[],[]]},
   houseboundCarehomeFilter : {kind: "multi", value: []},
   lipidMedicationsFilter: {kind: "grouped", value: [[],[],[],[]]},
   comorbiditiesFilter: {kind: "multi", value: []},
   cholestrolFilter: {kind: "grouped", value: [[], []]},
   qRiskFilter: {kind: "grouped", value: [[],[]]},
   vulnerabilitiesFilter: {kind: "multi", value: []},
   ethnicityFilter: {kind: "multi", value: []},
   ageFilter: {kind: "multi", value: []},
   adverseMedsFilter: {kind: "multi", value: []},

   //For quick filters
   hptnDiagnosis: {kind: "multi", value: []},
   aceiArbFilter : {kind : "multi", value : []}
}

type quickFilter = {
   id : number,
   label : string
   payload : FilterStates
}



type IndexMap = typeof SystmOneReportKeys | typeof EMISReportKeys






type Data = {

   importedData : ParserResult;
   setImportedData : React.Dispatch<React.SetStateAction<ParserResult>>

   toolName: string;
   setToolName: React.Dispatch<React.SetStateAction<string>>;

   filterItems: Record <string, MultiFilter | GroupedFilter>;
   setFilterItems: React.Dispatch<React.SetStateAction<Record <string, MultiFilter | GroupedFilter>>>;

   quickFilters: Record <string, quickFilter>;
   setQuickFilters: React.Dispatch<React.SetStateAction<Record <string, quickFilter>>>

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

   patientCount : number;
   setPatientCount : React.Dispatch<React.SetStateAction<number>>

   filteredData : string[][];
   setFilteredData : React.Dispatch<React.SetStateAction<string[][]>>

   selectedPatientRow : string []
   setSelectedPatientRow : React.Dispatch<React.SetStateAction<string[]>>

   selectedPatientIndex : number
   setSelectedPatientIndex : React.Dispatch<React.SetStateAction<number>>

   reportKeys : IndexMap | null
   setReportKeys : React.Dispatch<React.SetStateAction<IndexMap | null>>

   tableConfig : tableConfig | null;
   setTableConfig : React.Dispatch<React.SetStateAction<tableConfig | null>>

   relativeRunDate : string;
   setRelativeRunDate : React.Dispatch<React.SetStateAction<string>>

   selectedForExport : Record<string, boolean>
   setSelectedForExport : React.Dispatch<React.SetStateAction<Record<string, boolean>>>

   masterCheckbox : boolean;
   setMasterCheckbox : React.Dispatch<React.SetStateAction<boolean>>

   
}









export const DisplayContext = createContext<Data | null>(null);

export default function DisplayProvider ({children} : {children : React.ReactNode }){

   const [importedData, setImportedData] = useState<ParserResult>({status : "", info: ""})
   const [test, setTest] = useState<boolean>(false)
   const [toolName, setToolName] = useState<string>("")
   const [filterItems, setFilterItems] = useState<Record <string, MultiFilter | GroupedFilter>>({})
   const [quickFilters, setQuickFilters] = useState<Record <string, quickFilter>>({})
   const [summaryTable, setSummaryTable] = useState<string[][]>([])
   const [tableHeader, setTableHeader] = useState<string[]>([])
   const [tableData, setTableData] = useState<string[][]>([])  
   const [filterStates, setFilterStates] = useState<FilterStates>({});
   const [patientCount, setPatientCount] = useState<number>(0)
   const [ filteredData, setFilteredData] = useState<string[][]>( [])
   const [selectedPatientRow, setSelectedPatientRow] = useState<string[]>([])
   const [selectedPatientIndex, setSelectedPatientIndex] = useState<number>(0)
   const [reportKeys, setReportKeys] = useState<IndexMap | null>(null)
   const [tableConfig, setTableConfig] = useState<tableConfig | null>(null)
   const [relativeRunDate, setRelativeRunDate] = useState<string>("")
   const [selectedForExport, setSelectedForExport] = useState<Record<string, boolean>>({})
   const [masterCheckbox, setMasterCheckbox] = useState<boolean>(false)




   //DELETE THIS 
   const [age, setAge] = useState<string[]>([])
   const [selectedFilter, setSelectedFilter] = useState<string>("")



   //Check box functionality

   // console.log(filteredData)



   useEffect(() => {
      // if (importedData){
         // console.log(importedData)
         if (importedData){
            if (importedData.data && importedData.config && importedData.data?.masterReport){
               setToolName(importedData.data.toolName ?? "")
               setTableHeader(importedData.data.tableHeader ?? [])
               setSummaryTable(importedData.data.summaryTable ?? [])
               setTableData(Object.values(importedData.data.masterReport) ?? [])
               setFilterItems(importedData.config.filters)
               setQuickFilters(importedData.config.quickFilters)
               setFilterStates(cvdFilterStates)
               setReportKeys(importedData.config.reportKeys ?? null)
               setTableConfig(importedData.data.tableConfig)
               setRelativeRunDate(importedData.data.reportRunDate ?? "")
               setTest(true) //Testing to allow us to move to display screen 
            }
         }
      // }  
   }, [importedData])



   useEffect(()=> {
      let patientsSelectedForExport = {}

      const updateSelectedForExport = () => {
         filteredData.forEach((patientRow) => {
            patientsSelectedForExport[patientRow[reportKeys?.Full_Name]] = true
         })
         setSelectedForExport(patientsSelectedForExport)
      }

      updateSelectedForExport()
   }, [filteredData])


   useEffect(() => {
      if (filteredData.length === Object.keys(selectedForExport).length){
         setMasterCheckbox(true)
      }
      else setMasterCheckbox(false)
   }, [selectedForExport, filteredData])

   useEffect(() => {
      // console.log(selectedForExport)
   }, [selectedForExport])


   return (
      <DisplayContext.Provider value = {{ toolName, setToolName, quickFilters, setQuickFilters, summaryTable, setSummaryTable, tableHeader, setTableHeader, filterItems, setFilterItems,
            setTableData, tableData, age, setAge, selectedFilter, setSelectedFilter, filterStates, setFilterStates, importedData,  setImportedData, test, setTest, patientCount, setPatientCount, filteredData, setFilteredData, selectedPatientRow, setSelectedPatientRow, setSelectedPatientIndex, selectedPatientIndex, reportKeys, setReportKeys, tableConfig, setTableConfig, relativeRunDate, setRelativeRunDate, selectedForExport, setSelectedForExport, masterCheckbox, setMasterCheckbox,  }}>
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