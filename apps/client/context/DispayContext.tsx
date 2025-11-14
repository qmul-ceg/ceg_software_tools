"use client"
import React, { useContext, useState } from 'react';
import { createContext } from 'react';
import { ParserResult} from '@/types/shared.types';


type Data = {
   importedData : ParserResult;
   setImportedData : React.Dispatch<React.SetStateAction<ParserResult>>
}


export const DisplayContext = createContext<Data | null>(null);



export default function DisplayProvider ({children} : {children : React.ReactNode }){

   const [importedData, setImportedData] = useState<ParserResult>({status : "", info: ""})



   return (
      <DisplayContext.Provider value = {{
         // filterStates, setFilterStates, 
         importedData,  setImportedData, 
        

      }}
      >
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










 // filteredData, 
         // setFilteredData, 



   // const [filteredData, setFilteredData] = useState<string[][]>( [])





   // filteredData : string[][];
   // setFilteredData : React.Dispatch<React.SetStateAction<string[][]>>



   // selectedPatientRow : string []
   // setSelectedPatientRow : React.Dispatch<React.SetStateAction<string[]>>

   // selectedPatientIndex : number
   // setSelectedPatientIndex : React.Dispatch<React.SetStateAction<number>>

   // reportKeys : IndexMap | null
   // setReportKeys : React.Dispatch<React.SetStateAction<IndexMap | null>>

   // selectedForExport : Record<string, boolean>
   // setSelectedForExport : React.Dispatch<React.SetStateAction<Record<string, boolean>>>

   // masterCheckbox : boolean;
   // setMasterCheckbox : React.Dispatch<React.SetStateAction<boolean>>

   // activeFilters : ActiveFilters[];
   // setActiveFilters: React.Dispatch<React.SetStateAction<ActiveFilters[]>>




   // filterStates: FilterStates;
   // setFilterStates: React.Dispatch<React.SetStateAction<FilterStates>>






   // const [selectedPatientRow, setSelectedPatientRow] = useState<string[]>([])
   // const [selectedPatientIndex, setSelectedPatientIndex] = useState<number>(0)


   // const [selectedForExport, setSelectedForExport] = useState<Record<string, boolean>>({})
   // const [masterCheckbox, setMasterCheckbox] = useState<boolean>(false);








         // selectedPatientRow, setSelectedPatientRow, 
         // setSelectedPatientIndex, selectedPatientIndex, 
         // reportKeys, setReportKeys, activeFilters, setActiveFilters 

         // selectedForExport, setSelectedForExport, masterCheckbox, setMasterCheckbox,  




// const cvdFilterStates:FilterStates = {
//    antihypertensiveMedsFilter : {kind: "grouped", value: [[],[], [], []]},
//    bloodPressureFilter: {kind: "grouped", value: [[],[]]},
//    houseboundCarehomeFilter : {kind: "multi", value: []},
//    lipidMedicationsFilter: {kind: "grouped", value: [[],[],[],[]]},
//    comorbiditiesFilter: {kind: "multi", value: []},
//    cholestrolFilter: {kind: "grouped", value: [[], []]},
//    qRiskFilter: {kind: "grouped", value: [[],[]]},
//    vulnerabilitiesFilter: {kind: "multi", value: []},
//    ethnicityFilter: {kind: "multi", value: []},
//    ageFilter: {kind: "multi", value: []},
//    adverseMedsFilter: {kind: "multi", value: []},

//    //For quick filters
//    hptnDiagnosis: {kind: "multi", value: []},
//    aceiArbFilter : {kind : "multi", value : []}
// }



// type IndexMap = typeof SystmOneReportKeys | typeof EMISReportKeys

// type ActiveFilters = "ageFilter" | "comorbiditiesFilter" 



// import { SystmOneReportKeys, EMISReportKeys } from '@/modules/cvd/constants/cvdDataEnums'
   // const [activeFilters, setActiveFilters] = useState<ActiveFilters[]>([])

   // const [filterStates, setFilterStates] = useState<FilterStates>({});
   // const [reportKeys, setReportKeys] = useState<IndexMap | null>(null)





   // useEffect(() => {
     
   //       if (importedData){
   //          console.log(importedData)
   //          if (importedData.data && importedData.config && importedData.data?.masterReport){
               
              

   //             // setFilterStates(cvdFilterStates)
   //             // setReportKeys(importedData.config.reportKeys ?? null)
               
   //          }
   //       }

   // }, [importedData])


// type quickFilter = {
//    id : number,
//    label : string
//    payload : FilterStates
// }



// type Options = Record<string, { groupName : string; groupOptions: { value: string; label: string }[]}>


// type MultiFilter = {
//    id : string,
//    label : string,
//    ui : { width : number, bgColour: string},
//    kind : "multi",
//    options : {value : string, label : string}[],
//    emptyBehaviour : []
// }

// type GroupedFilter = {
//    id : string,
//    label : string,
//    ui : { width : number, bgColour: string},
//    kind : "grouped",
//    options : Options,
//    emptyBehaviour : [][]
// }





   // const [tableData, setTableData] = useState<string[][]>([])  
   // setTableData(Object.values(importedData.data.masterReport) ?? [])
   // setTableData, tableData, 


   // const [filterItems, setFilterItems] = useState<Record <string, MultiFilter | GroupedFilter>>({})

   // filterItems: Record <string, MultiFilter | GroupedFilter>;
   // setFilterItems: React.Dispatch<React.SetStateAction<Record <string, MultiFilter | GroupedFilter>>>;

   // filterItems, setFilterItems,
   // const [patientCount, setPatientCount] = useState<number>(0)
   // patientCount, setPatientCount, 

   // patientCount : number;
   // setPatientCount : React.Dispatch<React.SetStateAction<number>>

   // useEffect(() => {
   //    // console.log(selectedForExport)
   // }, [selectedForExport])



   // const [tableConfig, setTableConfig] = useState<tableConfig | null>(null)
   // const [relativeRunDate, setRelativeRunDate] = useState<string>("")
      // setFilterItems(importedData.config.filters)
      // setQuickFilters(importedData.config.quickFilters)

   // const [test, setTest] = useState<boolean>(false)
   // const [toolName, setToolName] = useState<string>("")


   // const [summaryTable, setSummaryTable] = useState<string[][]>([])
   // const [tableHeader, setTableHeader] = useState<string[]>([])
   // relativeRunDate, setRelativeRunDate, 
   // quickFilters, setQuickFilters, 


   // selectedFilter: string;
   // setSelectedFilter: React.Dispatch<React.SetStateAction<string>>

   //age, setAge, 
   // selectedFilter, setSelectedFilter, 


    // summaryTable, setSummaryTable, 

   // quickFilters: Record <string, quickFilter>;
   // setQuickFilters: React.Dispatch<React.SetStateAction<Record <string, quickFilter>>>




// setTableConfig(importedData.data.tableConfig)
               // setRelativeRunDate(importedData.data.reportRunDate ?? "")


   // toolName: string;
   // setToolName: React.Dispatch<React.SetStateAction<string>>;


   // age : string[];
   // setAge: React.Dispatch<React.SetStateAction<string[]>>


   // toolEventHandlers: object;
   // setToolEventHandlers: React.Dispatch<React.SetStateAction<object>>






// ADD THIS BACK WHEN DIFINING FILTERS











// setToolName(importedData.data.toolName ?? "")
               // setTableHeader(importedData.data.tableHeader ?? [])
               // setSummaryTable(importedData.data.summaryTable ?? [])







 // if (importedData){
         // console.log(importedData)




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
// 

//   type ActiveFilters =  'antihypertensiveMedsFilter' |
//    'bloodPressureFilter' |
//    "houseboundCarehomeFilter" |
//    "lipidMedicationsFilter" |
//    "comorbiditiesFilter" |
//    "cholestrolFilter" |
//    "qRiskFilter" |
//     "vulnerabilitiesFilter" |
//    "ethnicityFilter" |
//    "ageFilter" |
//    "adverseMedsFilter" |

//    //For quick filters
//    "hptnDiagnosis" |
//    "aceiArbFilter" 


   // summaryTable: string[][];
   // setSummaryTable: React.Dispatch<React.SetStateAction<string[][]>>

   // tableHeader: string[];
   // setTableHeader: React.Dispatch<React.SetStateAction<string[]>>

      // tableConfig : tableConfig | null;
   // setTableConfig : React.Dispatch<React.SetStateAction<tableConfig | null>>

   // relativeRunDate : string;
   // setRelativeRunDate : React.Dispatch<React.SetStateAction<string>>