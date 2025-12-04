"use client"
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import HeaderSection from './HeaderSection';
import FilterSection from './FilterSection';
import FooterSection from './FooterSection';
import Modal from './Modal';
import TableHeader from './TableHeader';
import { useDisplay } from '@/context/DispayContext';
import { FilterStates } from '@/types/shared.types';
import { List } from "react-window";
import TableRow from './TableRow';
import useFilteredData from '../hooks/useFilteredData';
import useGridTemplateColumns from '../hooks/useGridTemplateColumns';
import useSelection from '../hooks/useSelection';





const DisplayScreen = () => {   

   
   const { importedData } = useDisplay();

   if (  !importedData.data || !importedData.config || !importedData.data.reportRunDate || !importedData.config.filterFunctionalityConfig  ){
      return null;
   }


   const bodyRef = useRef<HTMLDivElement>(null);
   const reportKeys = importedData.config.reportKeys;
   const filterFunctionalities = importedData.config.filterFunctionalityConfig;
   const relativeRunDate = importedData.data.reportRunDate;
   const masterReport = importedData.data.masterReport;
   const filterStatesConfig = importedData.config.filterStatesConfig;
   const tableConfig = importedData.config.tableConfig;

   // STATES FOR DISPLAY SCREEN
   const [  isModalOpen, setIsModalOpen   ] = useState<boolean>(false);
   const [  selectedPatientIndex, setSelectedPatientIndex   ] = useState<number>();
   const [  filterStates, setFilterStates ]= useState<FilterStates>(()=>structuredClone(filterStatesConfig));
   const [  activeFilters, setActiveFilters  ]= useState<string[]>([]);

   
   const filteredDataParameters = {masterReport, activeFilters, filterStates, reportKeys, relativeRunDate, filterFunctionalities}
   const filteredData = useFilteredData(filteredDataParameters);
   const gridTemplateColumns = useGridTemplateColumns(tableConfig);
   const { toggleSelectedPatient, selectedForExport,  handleToggleSelectAll} = useSelection({filteredData: filteredData, key:reportKeys.Full_Name});



   // console.log(gridTemplateColumns)
   
   
   //patient modal open functionality 
   const handlePatientClick = useCallback((index:number) => {
      setSelectedPatientIndex(index)
      setIsModalOpen(true)
   },[]);




type ExtraRowProps = {
  tableConfig: typeof tableConfig;          // or your TableConfig type
  reportKeys: typeof reportKeys;            // or a proper type
  selectedForExport: typeof selectedForExport;
};



function renderRow(props : ExtraRowProps & {index:number, style : React.CSSProperties}){
   const {index, style, tableConfig, reportKeys, selectedForExport } = props
   return <TableRow 
            row={filteredData[index]} tableConfig={tableConfig} 
            reportKeys={reportKeys} 
            selectedForExport={selectedForExport} 
            toggleSelectedPatient = {toggleSelectedPatient}
            handlePatientClick={handlePatientClick} index = {index}
            key={index} style={style} gridTemplateColumns = {gridTemplateColumns}
         />
}




   return (

      <div className = "flex flex-col  h-screen w-full overflow-hidden">
         <div className="mt-2">
            <HeaderSection exportObject={selectedForExport} data={filteredData} reportKeys={reportKeys}/>
         </div>
         
         <div className = "mt-4">
            <FilterSection filterStates={filterStates} setFilterStates={setFilterStates} activeFilters={activeFilters} setActiveFilters={setActiveFilters}/> 
         </div>

         <div className = "  mt-4 mb-2 flex justify-between">
            <span className="font-bold">Patient count : {   filteredData.length  }</span>
            <span className="font-bold">Relative run date : {  importedData.data.reportRunDate  }</span>
            
         </div>
           
         <div className='flex flex-col flex-1 min-h-0 border border-[#21376A] rounded-t-lg '>
            <TableHeader 
               handleToggleSelectAll = {handleToggleSelectAll}
               selectedForExport={selectedForExport}
               filteredData={filteredData}  
               gridTemplateColumns = {gridTemplateColumns} 
            />
            <div className="overflow-y-auto scroll-mt-20 " ref={bodyRef}>
               <List<ExtraRowProps> 
                  style={{ height: "100%", width: "100%" }}
                  
                  rowCount = {filteredData.length}
                  rowHeight={24}
                  rowComponent={renderRow}
                  rowProps={{ tableConfig, reportKeys, selectedForExport }}
               />
               
            </div>
         </div>

         <div className="mt-auto">
            <FooterSection />
         </div>

         {
            isModalOpen ?
               (
                  <Modal 
                     setIsModalOpen = {setIsModalOpen} 
                     selectedPatientIndex= {selectedPatientIndex} 
                     setSelectedPatientIndex={setSelectedPatientIndex} 
                     filteredData={filteredData} 
                     reportKeys={reportKeys}
                     toggleSelectedPatient={toggleSelectedPatient}
                     selectedForExport={selectedForExport}
                  />
               ): null
         } 
      </div>
  )
}


export default DisplayScreen








































   // const [  scrollbarWidth, setScrollBarWidth   ] = useState<number>(11);
   // const [  masterCheckbox, setMasterCheckbox   ] = useState<boolean>(false);

   // const getScrollbarWidth = (element : HTMLDivElement | null):number=>{
   //    if(element){
   //       const width = element.offsetWidth - element.clientWidth
   //       return width
   //    }
   //    return 0
   // };

   // useLayoutEffect(()=>{
   //    setScrollBarWidth(getScrollbarWidth(bodyRef.current))
   // },[])







   // const [  selectedForExport, setSelectedForExport   ]  = useState<Record<string, boolean>>({});  

               // setSelectedForExport={setSelectedForExport} 








        // masterCheckbox={masterCheckbox} 
               // setMasterCheckbox=   {setMasterCheckbox} 
// paddingValue={scrollbarWidth} 




   //patient 
   // const toggleSelectedPatient = useCallback((patientId: string) => {
   //    setSelectedForExport((prev)=> {
   //       const exists = patientId in prev; //Checks if our patientId is a key of 

   //       if (exists){
   //          const updated = {...prev};
   //          delete updated[patientId];
   //          return updated;
   //       }
   //       else {
   //          return {
   //             ...prev,
   //             [patientId] : true
   //          }
   //       }
   //    })

   // }, []);


   // useEffect on that stores all rows into an object when filtered data changes
   // useEffect(()=> {
   //    let patientsSelectedForExport = {}

   //    const updateSelectedForExport = () => {
   //       filteredData.forEach((patientRow) => {
   //          patientsSelectedForExport[patientRow[reportKeys?.Full_Name]] = true
   //       })
   //       setSelectedForExport(patientsSelectedForExport)
   //    }
   //    updateSelectedForExport()
   // }, [filteredData]);

   //function to filter data
   // const filteredData = useMemo(()=> {
   //    const tableData = Object.values(masterReport);
   //    return tableData.filter((row) => {
   //       return activeFilters.every((activeFilter) => {
   //          return filterFunctionalities[activeFilter](row, filterStates, reportKeys, relativeRunDate) === true 
   //       });
   //    });
   // }, [filterStates, importedData, activeFilters]);





{/* <TableBody 
                  filterStates={filterStates} setIsModalOpen={setIsModalOpen} 
                  activeFilters={activeFilters} setSelectedForExport={setSelectedForExport} selectedForExport={selectedForExport} 
                  setSelectedPatientIndex={setSelectedPatientIndex} filteredData={filteredData} reportKeys = {reportKeys} tableConfig={tableConfig}
               /> */}


   // const [displayScreen, setDisplayScreen] = useState<string[][]>([])


   // const [defaultFilters, setDefaultFilters] = useState<FilterStates>(structuredClone(cvdFilterStates))
   // THIS WILL EVENTUALLY COME FROM THE PARSER RESULT
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




   // selectedPatientRow : string []
   // setSelectedPatientRow : React.Dispatch<React.SetStateAction<string[]>>

   // selectedPatientIndex : number
   // setSelectedPatientIndex : React.Dispatch<React.SetStateAction<number>>

   // // reportKeys : IndexMap | null
   // // setReportKeys : React.Dispatch<React.SetStateAction<IndexMap | null>>

   // selectedForExport : Record<string, boolean>
   // setSelectedForExport : React.Dispatch<React.SetStateAction<Record<string, boolean>>>

   // masterCheckbox : boolean;
   // setMasterCheckbox : React.Dispatch<React.SetStateAction<boolean>> // const filterFunctionalityObject = { 
   //    antihypertensiveMedsFilter : (row: string[]) : boolean => {
   //        const antihypertensiveMedsFilterGroupOne = () => {
   //          const aceiArb = filterStates.antihypertensiveMedsFilter.value[0].includes("acei/arb") && row[reportKeys.ACEi_ARB_Name_Dosage_Quantity].trim();
   //          const noAceiArb = filterStates.antihypertensiveMedsFilter.value[0].includes("no_acei/arb") && !row[reportKeys.ACEi_ARB_Name_Dosage_Quantity].trim();

   //          const caChannel = filterStates.antihypertensiveMedsFilter.value[0].includes("cachannel") && row[reportKeys.Ca_Channel_Name_Dosage_Quantity].trim();
   //          const thiazides = filterStates.antihypertensiveMedsFilter.value[0].includes("thiazides") && row[reportKeys.Thiazides_Name_Dosage_Quantity].trim();
   //          const betaBlockers = filterStates.antihypertensiveMedsFilter.value[0].includes("betablockers") && row[reportKeys.Beta_Blocker_Name_Dosage_Quantity].trim()
   //          const others = filterStates.antihypertensiveMedsFilter.value[0].includes("others") 
   //             && (row[reportKeys.Other_Diuretic_Name_Dosage_Quantity].trim() 
   //             || row[reportKeys.Other_Lipid_Lowering_Name_Dosage_Quantity].trim() 
   //             || row[reportKeys.Alpha_Blocker_Name_Dosage_Quantity].trim())

   //          return { aceiArb, caChannel, thiazides, betaBlockers, others, noAceiArb }
   //       }

   //       const antihypertensiveMedsFilterGroupTwo = () => {
   //          const equalToZero = filterStates.antihypertensiveMedsFilter.value[1].includes("0") && parseInt(row[reportKeys.AntiHptnMedicationCount]) === 0;
   //          const equalToOne = filterStates.antihypertensiveMedsFilter.value[1].includes("1") && parseInt(row[reportKeys.AntiHptnMedicationCount]) === 1;
   //          const gteTwo = filterStates.antihypertensiveMedsFilter.value[1].includes("gte2") && parseInt(row[reportKeys.AntiHptnMedicationCount]) >= 2;

   //          return { equalToZero, equalToOne, gteTwo }
   //       }

   //       const { aceiArb, caChannel, thiazides, betaBlockers, others, noAceiArb} = antihypertensiveMedsFilterGroupOne();
   //       const { equalToZero, equalToOne, gteTwo } = antihypertensiveMedsFilterGroupTwo();
   //       const getMaxToleratedDose = filterStates.antihypertensiveMedsFilter.value[2].includes("dose") && (row[reportKeys.AntiHT_Max_Tol_Dose_Date])
            
   //       const getAntihypertensiveDeclined = filterStates.antihypertensiveMedsFilter.value[3].includes("declined") && (row[reportKeys.AntiHT_Decline_Date] && !recordedOverTwelveMonths(convertDate(row[reportKeys.AntiHT_Decline_Date]), convertDate(importedData.data?.reportRunDate ?? "")))

   //       const filterByAntihypertensiveMeds = 
   //       //When nothing is selected
   //       (  filterStates.antihypertensiveMedsFilter.value[0].length === 0 
   //          && filterStates.antihypertensiveMedsFilter.value[1].length === 0  
   //          && filterStates.antihypertensiveMedsFilter.value[2].length === 0  
   //          && filterStates.antihypertensiveMedsFilter.value[3].length === 0 ) ||

   //       //Value selected in first group ONLY
   //       (filterStates.antihypertensiveMedsFilter.value[0].length > 0
   //          && (aceiArb || caChannel || thiazides || betaBlockers || others || noAceiArb) 
   //          && filterStates.antihypertensiveMedsFilter.value[1].length === 0 
   //          && filterStates.antihypertensiveMedsFilter.value[2].length === 0  
   //          && filterStates.antihypertensiveMedsFilter.value[3].length === 0 )||

   //       // Value selected in second group ONLY
   //       (filterStates.antihypertensiveMedsFilter.value[1].length > 0 
   //          && (equalToZero || equalToOne || gteTwo)
   //          && filterStates.antihypertensiveMedsFilter.value[0].length === 0
   //          && filterStates.antihypertensiveMedsFilter.value[2].length === 0  
   //          && filterStates.antihypertensiveMedsFilter.value[3].length === 0 
   //       ) ||

   //       // Value selected from third group only 
   //       (  filterStates.antihypertensiveMedsFilter.value[0].length === 0 
   //          && filterStates.antihypertensiveMedsFilter.value[1].length === 0  
   //          && filterStates.antihypertensiveMedsFilter.value[2].length > 0 && getMaxToleratedDose  
   //          && filterStates.antihypertensiveMedsFilter.value[3].length === 0 ) ||

   //       //Value from fourth group only
   //       (  filterStates.antihypertensiveMedsFilter.value[1].length === 0 
   //          && filterStates.antihypertensiveMedsFilter.value[0].length === 0
   //          && filterStates.antihypertensiveMedsFilter.value[3].length >  0 && getAntihypertensiveDeclined 
   //       ) ||

   //       //Values from both groups are selected
   //       (  filterStates.antihypertensiveMedsFilter.value[0].length > 0
   //          && (aceiArb || caChannel || thiazides || betaBlockers || others || noAceiArb) ||
   //          filterStates.antihypertensiveMedsFilter.value[1].length > 0 
   //          && (equalToZero || equalToOne || gteTwo) ||
   //          filterStates.antihypertensiveMedsFilter.value[3].length > 0 
   //          && (getAntihypertensiveDeclined)
   //       )

   //       return filterByAntihypertensiveMeds;
   //    }, 
      
   //    bloodPressureFilter : (row:string[]): boolean => {
   //       const bloodPressureFilterGroupOne = () => {
   //          const [systolic , diastolic ] = splitBloodPressureValue(row[reportKeys.BloodPressure]);
       

   //          const lowerBound = filterStates.bloodPressureFilter.value[0].includes("<140/90") && (parseInt(systolic) < 140 && parseInt(diastolic) < 90);
   //          const midBound = filterStates.bloodPressureFilter.value[0].includes("gte140/90") && (parseInt(systolic) >= 140 || parseInt(diastolic) >= 90);
   //          const upperBound = filterStates.bloodPressureFilter.value[0].includes("gte150/90") && (parseInt(systolic) >= 150 || parseInt(diastolic) >= 90);

   //          return { lowerBound, midBound, upperBound }
   //       }

   //       const { lowerBound, midBound, upperBound } = bloodPressureFilterGroupOne();
   //       const recordedDateResult = recordedOverTwelveMonths(convertDate(row[reportKeys.Systolic_BP_Date_1]), convertDate(importedData.data?.reportRunDate ?? ""))
   //       const overTwelveMonths = filterStates.bloodPressureFilter.value[1].includes("<12m") && recordedDateResult
   //       const financialYearCheck = checkFinancialYear(convertDate(row[reportKeys.Systolic_BP_Date_1]))
   //       const notInFinancialYear = filterStates.bloodPressureFilter.value[1].includes("notInFinancialYear") && financialYearCheck

   //       const filterByBloodPressure = 
   //          // When no filter is selected
   //          (
   //             filterStates.bloodPressureFilter.value[0].length === 0 
   //             && filterStates.bloodPressureFilter.value[1].length === 0 
   //          ) ||

   //          //When blood pressure value is selected only 
   //          (
   //             filterStates.bloodPressureFilter.value[0].length > 0 && (lowerBound || midBound || upperBound) 
   //             && filterStates.bloodPressureFilter.value[1].length === 0
   //          ) ||

   //          // When date is selected only
   //          (
   //             filterStates.bloodPressureFilter.value[0].length === 0 
   //             && (filterStates.bloodPressureFilter.value[1].length > 0 && (overTwelveMonths || notInFinancialYear))
   //          ) ||

   //          //Value comibinations 
   //          (
   //             filterStates.bloodPressureFilter.value[0].length  > 0 && (lowerBound || midBound || upperBound ) 
   //             || (filterStates.bloodPressureFilter.value[1].length > 0  && (overTwelveMonths || notInFinancialYear))
   //          )
   //          return filterByBloodPressure;

   //    },

   //    houseboundCarehomeFilter : (row:string[]):boolean => {
   //       const houseboundIndex = row[reportKeys.HouseB_CareH_Code_Term].trim();

   //       const filterByHouseboundCarehome = 
   //          filterStates.houseboundCarehomeFilter.value.length === 0 ||
   //          (filterStates.houseboundCarehomeFilter.value as string[]).includes("housebound")  && houseboundIndex === "Housebound" ||
   //          (filterStates.houseboundCarehomeFilter.value as string[]).includes("carehome")  && (houseboundIndex.length > 0  && houseboundIndex !== "Housebound") ;
      
   //       return filterByHouseboundCarehome
   //    },

   //    lipidMedicationsFilter : (row:string[]) : boolean => {
   //       const lipidMedicationsFilterGroupOne = () => {
      
   //          const highStatinIntensity = filterStates.lipidMedicationsFilter.value[0].includes("highIntensity") && row[reportKeys.Statin_Intensity] === "High";
   //          const mediumLowStatinIntensity = filterStates.lipidMedicationsFilter.value[0].includes("mediumLow") && row[reportKeys.Statin_Intensity] === "Med/Low";
   //          const notOnStatin = filterStates.lipidMedicationsFilter.value[0].includes("noStatin") && row[reportKeys.Statin_Intensity] === "None"

   //          return { highStatinIntensity, mediumLowStatinIntensity, notOnStatin }
   //       }

   //       const onInclisiran = filterStates.lipidMedicationsFilter.value[1].includes("onInclisiran") && row[reportKeys.Inclisiran] === "YES"
   //       const statinExclusions = filterStates.lipidMedicationsFilter.value[3].includes("statinExclusions") 
   //       && (row[reportKeys.Statin_Exclusion] === "Contra" || row[reportKeys.Statin_Exclusion] === "Declined")

   //       const statinMaxToleratedDose = filterStates.lipidMedicationsFilter.value[2].includes("dose") && (row[reportKeys.Statin_Max_Tol_Dose_Date])
   //       const { highStatinIntensity, mediumLowStatinIntensity, notOnStatin } = lipidMedicationsFilterGroupOne()



   //       const filterByLipidMedications = 
   //       //  When nothing is selected
   //          (  
   //             filterStates.lipidMedicationsFilter.value[0].length === 0  
   //             && filterStates.lipidMedicationsFilter.value[1].length === 0  
   //             && filterStates.lipidMedicationsFilter.value[2].length === 0   
   //             && filterStates.lipidMedicationsFilter.value[3].length === 0  
   //          )  ||

   //          //Value selected in first group only 
   //          (
   //             filterStates.lipidMedicationsFilter.value[0].length > 0 
   //             && ( highStatinIntensity || mediumLowStatinIntensity || notOnStatin ) 
   //             && filterStates.lipidMedicationsFilter.value[1].length === 0  
   //             && filterStates.lipidMedicationsFilter.value[2].length === 0
   //             && filterStates.lipidMedicationsFilter.value[3].length === 0 ) ||

   //          //Value selected in second group only (onInclisiran)
            
   //          (
   //             filterStates.lipidMedicationsFilter.value[0].length === 0 
   //             && (filterStates.lipidMedicationsFilter.value[1].length > 0 && onInclisiran) 
   //             && (filterStates.lipidMedicationsFilter.value[2].length === 0 ) 
   //             && (filterStates.lipidMedicationsFilter.value[3].length === 0 )  
   //          )  ||

   //          //Value selected in thrid group only (max tolerated dose)
   //          (  
   //             filterStates.lipidMedicationsFilter.value[0].length === 0  
   //             && filterStates.lipidMedicationsFilter.value[1].length === 0  
   //             && filterStates.lipidMedicationsFilter.value[2].length > 0 && (statinMaxToleratedDose)   
   //             && filterStates.lipidMedicationsFilter.value[3].length === 0  
   //          )  ||

   //          //Value selected in fourth group ONLY (statin exclusions)
   //          (
   //             filterStates.lipidMedicationsFilter.value[0].length === 0 
   //             && (filterStates.lipidMedicationsFilter.value[1].length === 0) 
   //             && (filterStates.lipidMedicationsFilter.value[2].length === 0 ) 
   //             && (filterStates.lipidMedicationsFilter.value[3].length > 0 && statinExclusions)  
   //          )  ||

   //          //Value combinationations
   //          (
   //             (filterStates.lipidMedicationsFilter.value[0].length > 0 && (highStatinIntensity || mediumLowStatinIntensity || notOnStatin)) ||
   //             (filterStates.lipidMedicationsFilter.value[1].length > 0 && onInclisiran) ||
   //             filterStates.lipidMedicationsFilter.value[2].length > 0 && (statinMaxToleratedDose) ||
   //             (filterStates.lipidMedicationsFilter.value[3].length > 0 && statinExclusions)  
   //          )
               

   //          return filterByLipidMedications
   //    },
      


   //    comorbiditiesFilter : (row:string[]): boolean => {

   //       const cvdIndex = row[reportKeys.CVD]
   //       const hypertensionIndex = row[reportKeys.Hypertension]
   //       const diabetesIndex = row[reportKeys.Diabetes]
   //       const ckdIndex = row[reportKeys.CKD_Code_Term]
   //       const afIndex = row[reportKeys.AF_Code_Term]
   //       const cancerIndex = row[reportKeys.Cancer_Code_Term]
        

   //       const filterByComorbodities = 
   //          (filterStates.comorbiditiesFilter.value as string[]).includes("cvd") && cvdIndex === "YES" ||
   //          (filterStates.comorbiditiesFilter.value as string[]).includes("hypertension") && hypertensionIndex === "YES" ||
   //          (filterStates.comorbiditiesFilter.value as string[]).includes("noHypertension") && hypertensionIndex === "NO" ||
   //          (filterStates.comorbiditiesFilter.value as string[]).includes("diabetes") && diabetesIndex === "YES" ||
   //          (filterStates.comorbiditiesFilter.value as string[]).includes("ckd") && ckdIndex.length > 0  ||
   //          (filterStates.comorbiditiesFilter.value as string[]).includes("af") && afIndex.length > 0  ||
   //          (filterStates.comorbiditiesFilter.value as string[]).includes("cancer") && cancerIndex.length > 0  ||
   //          filterStates.comorbiditiesFilter.value.length === 0;

   //       return filterByComorbodities
   //    },

   //    cholestrolFilter : (row:string[]): boolean => {
   
   //       const ldlGreaterThanTwo = filterStates.cholestrolFilter.value[0].includes(">2.0") && parseInt(row[reportKeys.LDL_Cholestrol_Value]) > 2.0
   //       const recordedDateResult = recordedOverTwelveMonths(convertDate(row[reportKeys.LDL_Cholestrol_Date]), convertDate(importedData.data?.reportRunDate ?? ""))
   //       const overTwelveMonths = filterStates.cholestrolFilter.value[1].includes("<12m") && recordedDateResult
   //       const financialYearCheck = checkFinancialYear(convertDate(row[reportKeys.LDL_Cholestrol_Date]))
   //       const notInFinancialYear = filterStates.cholestrolFilter.value[1].includes("notInFinancialYear") && financialYearCheck

   //       const filterByCholestrol = 
   //          (
   //             filterStates.cholestrolFilter.value[0].length === 0 
   //             && filterStates.cholestrolFilter.value[1].length === 0       
   //          ) ||
   //          //Only value is selected
   //          (
   //             filterStates.cholestrolFilter.value[0].length > 0 && ldlGreaterThanTwo 
   //             && filterStates.cholestrolFilter.value[1].length === 0 
   //          ) ||

   //          //When only date is selected
   //          (
   //             filterStates.cholestrolFilter.value[0].length === 0 
   //             && filterStates.cholestrolFilter.value[1].length > 0 && (overTwelveMonths || notInFinancialYear)
   //          ) ||

   //          // combinations
   //          (
   //             filterStates.cholestrolFilter.value[0].length > 0 && ldlGreaterThanTwo 
   //             || filterStates.cholestrolFilter.value[1].length > 0 && (overTwelveMonths || notInFinancialYear)
   //          )

   //          return filterByCholestrol
   //    },

   //    qRiskFilter : (row:string[]):boolean => {
   //       const greaterThanTenPercent = filterStates.qRiskFilter.value[0].includes(">10") && (parseFloat(row[reportKeys.QRisk_Value]) > 10.0)
   //       const greaterThanTwentyPercent = filterStates.qRiskFilter.value[0].includes(">20") && (parseFloat(row[reportKeys.QRisk_Value]) > 20.0)

   //       const recordedDateResult = recordedOverTwelveMonths(convertDate(row[reportKeys.QRisk_Date]), convertDate(importedData.data?.reportRunDate ?? ""))
   //       const overTwelveMonths = filterStates.qRiskFilter.value[1].includes("<12m") && recordedDateResult

   //       const filterByQrisk = 
   //          (
   //             filterStates.qRiskFilter.value[0].length === 0  
   //             && filterStates.qRiskFilter.value[1].length === 0  
   //          ) ||

   //          //Selection at the top 
   //          (
   //             filterStates.qRiskFilter.value[0].length > 0 && (greaterThanTenPercent || greaterThanTwentyPercent)
   //             && filterStates.qRiskFilter.value[1].length === 0
   //          ) ||

   //          (
   //             filterStates.qRiskFilter.value[0].length === 0 
   //             && filterStates.qRiskFilter.value[1].length > 0 && overTwelveMonths

   //          ) ||

   //          (
   //             filterStates.qRiskFilter.value[0].length > 0 && (greaterThanTenPercent || greaterThanTwentyPercent)
   //             || filterStates.qRiskFilter.value[1].length > 0 && overTwelveMonths
   //          )

   //       return filterByQrisk
     
   //    },



   //    ageFilter : (row: string[] ): boolean => {
   //       const ageIndex = parseInt(row[reportKeys.Age]);

   //       const filterByAge = 
   //          (filterStates.ageFilter.value as string[]).includes("lt65") && ageIndex < 65 ||
   //          (filterStates.ageFilter.value as string[]).includes("65-79") && (ageIndex >= 65 && ageIndex <= 79) ||
   //          (filterStates.ageFilter.value as string[]).includes("gte80") && (ageIndex >= 80) ||
   //          filterStates.ageFilter.value.length === 0 ;

         
   //       return filterByAge
   //    },
   //    adverseMedsFilter : (row:string[]): boolean => {
   //       const adverseMedsIndex = row[reportKeys.NSAID_Name_Dosage_Quantity]

   //       const filterByAdverseMeds = 
   //          (filterStates.adverseMedsFilter.value as string[]).includes("nsaids") && adverseMedsIndex.length > 0 ||
   //          filterStates.adverseMedsFilter.value.length === 0;

   //       return filterByAdverseMeds
   //    },
   //    vulnerabilitiesFilter : (row:string[]):boolean => {
   //       const smiIndex = row[reportKeys.SMI_Code_Term].trim();
   //       const learningDisabilityIndex = row[reportKeys.Learning_Difficulties_Code_Term].trim();
   //       const dementiaIndex = row[reportKeys.Dementia_Code_Term].trim();


   //       const filterByVulnerabilites = 
   //          (filterStates.vulnerabilitiesFilter.value as string[]).includes("smi") && smiIndex.length > 0  ||
   //          (filterStates.vulnerabilitiesFilter.value as string[]).includes("learning") && learningDisabilityIndex.length > 0 ||
   //          (filterStates.vulnerabilitiesFilter.value as string[]).includes("dementia") && dementiaIndex.length > 0 ||
   //          filterStates.vulnerabilitiesFilter.value.length === 0 ;

   //       return filterByVulnerabilites

   //    },

   // }