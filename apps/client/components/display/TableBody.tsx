import React, { useEffect } from 'react'
import { useDisplay } from '@/context/DispayContext'
import { useState } from 'react'
import { SystmOneReportKeys } from '@/modules/cvd/constants/cvdDataEnums'
import { cvdTableConfig } from './TableHeader'
import { ColumnGroup } from './TableHeader'
import { hadUnsupportedValue } from 'next/dist/build/analysis/get-page-static-info'




// type ChildProps = {
//    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
// }


const TableBody = ({setIsModalOpen} : {setIsModalOpen : React.Dispatch<React.SetStateAction<boolean>>}) => {

   const { tableData, filterStates} = useDisplay()
   const [ filteredData, setFilteredData] = useState<string[][]>(tableData ?? [])

   useEffect(()=> {
    
      
   
      const filterConfig = tableData?.filter((row) => {
         // console.log(row[SystmOneReportKeys.Systolic_BP_Value_1])


         const ageIndex = parseInt(row[SystmOneReportKeys.Age])
         const houseboundIndex = row[SystmOneReportKeys.Housebound_Code_Term].trim()
         const smiIndex = row[SystmOneReportKeys.SMI_Code_Term].trim()
         const learningDisabilityIndex = row[SystmOneReportKeys.Learning_Difficulties_Code_Term].trim()
         const dementiaIndex = row[SystmOneReportKeys.Dementia_Code_Term].trim()

         //Comorbidities indexes
         const cvdIndex = row[SystmOneReportKeys.CVD]
         const hypertensionIndex = row[SystmOneReportKeys.Hypertension]
         const diabetesIndex = row[SystmOneReportKeys.Diabetes]
         const ckdIndex = row[SystmOneReportKeys.CKD_Code_Term]
         const afIndex = row[SystmOneReportKeys.AF_Code_Term]
         const cancerIndex = row[SystmOneReportKeys.Cancer_Code_Term]

         const adverseMedsIndex = row[SystmOneReportKeys.NSAID_Name_Dosage_Quantity]

         const filterByAge = 
            (filterStates.ageFilter.value as string[]).includes("lt65") && ageIndex < 65 ||
            (filterStates.ageFilter.value as string[]).includes("65-79") && (ageIndex >= 65 && ageIndex <= 79) ||
            (filterStates.ageFilter.value as string[]).includes("gte80") && (ageIndex >= 80) ||
            filterStates.ageFilter.value.length === 0 ;


         const filterByHousebound = 
            filterStates.houseboundCarehomeFilter.value.length === 0 ||
            filterStates.houseboundCarehomeFilter.value  === "Housebound"  && houseboundIndex === "13CA." ||
            filterStates.houseboundCarehomeFilter.value  === "Carehome"  && houseboundIndex === "13CA." ;

         const vulnerabilitiesFilter = 
            (filterStates.vulnerabilitiesFilter.value as string[]).includes("smi") && smiIndex ||
            (filterStates.vulnerabilitiesFilter.value as string[]).includes("learning") && learningDisabilityIndex ||
            (filterStates.vulnerabilitiesFilter.value as string[]).includes("dementia") && dementiaIndex ||
            filterStates.vulnerabilitiesFilter.value.length === 0 ;

         const comorbiditiesFilter = 
            (filterStates.comorbiditiesFilter.value as string[]).some(value => value === "cvd") && cvdIndex === "YES" ||
            (filterStates.comorbiditiesFilter.value as string[]).some(value => value === "hypertension") && hypertensionIndex === "YES" ||
            (filterStates.comorbiditiesFilter.value as string[]).some(value => value === "diabetes") && diabetesIndex === "YES" ||
            (filterStates.comorbiditiesFilter.value as string[]).some(value => value === "ckd") && ckdIndex  ||
            (filterStates.comorbiditiesFilter.value as string[]).some(value => value === "af") && afIndex  ||
            (filterStates.comorbiditiesFilter.value as string[]).some(value => value === "cancer") && cancerIndex  ||
            filterStates.comorbiditiesFilter.value.length === 0;
         
         const adverseMedsFilter = 
            (filterStates.adverseMedsFilter.value as string[]).some(value => value === "nsaids") && adverseMedsIndex ||
            filterStates.adverseMedsFilter.value.length === 0;


         //Antihypertensive Medication Filter
         //Antihypernsives( Group 1)

         
         const antihypertensiveMedsFilterGroupOne = () => {
            const aceiArb = filterStates.antihypertensiveMedsFilter.value[0].includes("acei/arb") && row[SystmOneReportKeys.ACEi_ARB_Name_Dosage_Quantity].trim();
            const caChannel = filterStates.antihypertensiveMedsFilter.value[0].includes("cachannel") && row[SystmOneReportKeys.Ca_Channel_Name_Dosage_Quantity].trim();
            const thiazides = filterStates.antihypertensiveMedsFilter.value[0].includes("thiazides") && row[SystmOneReportKeys.Thiazides_Name_Dosage_Quantity].trim();
            const betaBlockers = filterStates.antihypertensiveMedsFilter.value[0].includes("betablockers") && row[SystmOneReportKeys.Beta_Blocker_Name_Dosage_Quantity].trim()
            const others = filterStates.antihypertensiveMedsFilter.value[0].includes("others") && 
               (row[SystmOneReportKeys.Other_Diuretic_Name_Dosage_Quantity].trim() || row[SystmOneReportKeys.Other_Lipid_Lowering_Name_Dosage_Quantity].trim() || row[SystmOneReportKeys.Alpha_Blocker_Name_Dosage_Quantity].trim())

            return { aceiArb, caChannel, thiazides, betaBlockers, others }
         }

         const antihypertensiveMedsFilterGroupTwo = () => {
            const equalToZero = filterStates.antihypertensiveMedsFilter.value[1].includes("0") && parseInt(row[SystmOneReportKeys.AntiHptnMedicationCount]) === 0;
            const equalToOne = filterStates.antihypertensiveMedsFilter.value[1].includes("1") && parseInt(row[SystmOneReportKeys.AntiHptnMedicationCount]) === 1;
            const gteTwo = filterStates.antihypertensiveMedsFilter.value[1].includes("gte2") && parseInt(row[SystmOneReportKeys.AntiHptnMedicationCount]) >= 2;

            return { equalToZero, equalToOne, gteTwo }
         }

         
         const applyAntihypertensiveMedsFilter = () => {
            const { aceiArb, caChannel, thiazides, betaBlockers, others} = antihypertensiveMedsFilterGroupOne();
            const { equalToZero, equalToOne, gteTwo } = antihypertensiveMedsFilterGroupTwo();

            const antiHypertensiveMedsFilterCombinations = 
            //When nothing is selected
               (filterStates.antihypertensiveMedsFilter.value[0].length === 0 && filterStates.antihypertensiveMedsFilter.value[1].length === 0 ) ||

            //Value selected in first group ONLY
               (filterStates.antihypertensiveMedsFilter.value[0].length > 0
                  && (aceiArb || caChannel || thiazides || betaBlockers || others) 
                  && filterStates.antihypertensiveMedsFilter.value[1].length === 0) ||

            // Value selected in second group ONLY
               (filterStates.antihypertensiveMedsFilter.value[1].length > 0 
                  && (equalToZero || equalToOne || gteTwo)
                  && filterStates.antihypertensiveMedsFilter.value[0].length === 0
               ) ||

            //Values from both groups are selected
               (filterStates.antihypertensiveMedsFilter.value[0].length > 0
                  && (aceiArb || caChannel || thiazides || betaBlockers || others) ||
                  filterStates.antihypertensiveMedsFilter.value[1].length > 0 
                  && (equalToZero || equalToOne || gteTwo)
               )
            return antiHypertensiveMedsFilterCombinations
         }

         
         //LIPID MEDICATIONS FILTER
         const lipidMedicationsFilterGroupOne = () => {
      
            const highStatinIntensity = filterStates.lipidMedicationsFilter.value[0].includes("highIntensity") && row[SystmOneReportKeys.Statin_Intensity] === "High";
            const mediumLowStatinIntensity = filterStates.lipidMedicationsFilter.value[0].includes("mediumLow") && row[SystmOneReportKeys.Statin_Intensity] === "Med/Low";
            const notOnStatin = filterStates.lipidMedicationsFilter.value[0].includes("noStatin") && row[SystmOneReportKeys.Statin_Intensity] === "None"

            return { highStatinIntensity, mediumLowStatinIntensity, notOnStatin }
         }

         const onInclisiran = filterStates.lipidMedicationsFilter.value[1].includes("onInclisiran") && row[SystmOneReportKeys.Inclisiran] === "YES"
         const statinExclusions = filterStates.lipidMedicationsFilter.value[3].includes("statinExclusions") && (row[SystmOneReportKeys.Statin_Exclusion] === "Contra" || row[SystmOneReportKeys.Statin_Exclusion] === "Declined")


         const applyLipidMedicationsFilter = () => {
            const { highStatinIntensity, mediumLowStatinIntensity, notOnStatin } = lipidMedicationsFilterGroupOne()

            const lipidMedicationsFilterCombinations =
               //When nothing is selected
               (  
                  filterStates.lipidMedicationsFilter.value[0].length === 0  
                  && filterStates.lipidMedicationsFilter.value[1].length === 0  
                  && filterStates.lipidMedicationsFilter.value[2].length === 0   
                  && filterStates.lipidMedicationsFilter.value[3].length === 0  
               )  ||

               //Value selected in first group only 
               (
                  filterStates.lipidMedicationsFilter.value[0].length > 0 
                  && ( highStatinIntensity || mediumLowStatinIntensity || notOnStatin ) 
                  && filterStates.lipidMedicationsFilter.value[1].length === 0  
                  && filterStates.lipidMedicationsFilter.value[2].length === 0
                  && filterStates.lipidMedicationsFilter.value[3].length === 0 ) ||

               //Value selected in second group only (onInclisiran)
               
               (
                  filterStates.lipidMedicationsFilter.value[0].length === 0 
                  && (filterStates.lipidMedicationsFilter.value[1].length > 0 && onInclisiran) 
                  && (filterStates.lipidMedicationsFilter.value[2].length === 0 ) 
                  && (filterStates.lipidMedicationsFilter.value[3].length === 0 )  
               )  ||

               //Value selected in fourth group ONLY (statin exclusions)
               (
                  filterStates.lipidMedicationsFilter.value[0].length === 0 
                  && (filterStates.lipidMedicationsFilter.value[1].length === 0) 
                  && (filterStates.lipidMedicationsFilter.value[2].length === 0 ) 
                  && (filterStates.lipidMedicationsFilter.value[3].length > 0 && statinExclusions)  
               )  ||

               //Value combinationations

               (
                  (filterStates.lipidMedicationsFilter.value[0].length > 0 && (highStatinIntensity || mediumLowStatinIntensity || notOnStatin)) ||
                  (filterStates.lipidMedicationsFilter.value[1].length > 0 && onInclisiran) ||
                  (filterStates.lipidMedicationsFilter.value[3].length > 0 && statinExclusions)  
               )
               

            return lipidMedicationsFilterCombinations
               
         }

         //BLOOD PRESSURE FILTER CONFIGURATIONS
         //Split the blood pressure values 
         const splitBloodPressureValue = (value: string) => {
       
            const [systolic, diastolic] = value.split("/");
            return [systolic, diastolic];
         }

         const bloodPressureFilterGroupOne = () => {
            const [systolic , diastolic ] = splitBloodPressureValue(row[SystmOneReportKeys.BloodPressure]);
       

            const lowerBound = filterStates.bloodPressureFilter.value[0].includes("<140/90") && (parseInt(systolic) < 140 && parseInt(diastolic) < 90);
            const midBound = filterStates.bloodPressureFilter.value[0].includes("gte140/90") && (parseInt(systolic) >= 140 || parseInt(diastolic) >= 90);
            const upperBound = filterStates.bloodPressureFilter.value[0].includes(">150/90") && (parseInt(systolic) >= 150 && parseInt(diastolic) > 0);

            return { lowerBound, midBound, upperBound }
         }

         const applyBloodPressureFilter = () => {
            const { lowerBound, midBound, upperBound } = bloodPressureFilterGroupOne();

            // console.log(upperBound)
            const bloodPressureFilterCombinations = 
               // When no filter is selected
               (
                  filterStates.bloodPressureFilter.value[0].length === 0 
                  && filterStates.bloodPressureFilter.value[1].length === 0 
               ) ||

               //When blood pressure value is selected only 
               (
                  filterStates.bloodPressureFilter.value[0].length > 0 && (lowerBound || midBound || upperBound) &&
                  filterStates.bloodPressureFilter.value[1].length === 0
               )
               
               


            return bloodPressureFilterCombinations;
         }
 
         return filterByAge && filterByHousebound && vulnerabilitiesFilter && comorbiditiesFilter && adverseMedsFilter && applyAntihypertensiveMedsFilter() && applyLipidMedicationsFilter() && applyBloodPressureFilter()
      })   
        
      setFilteredData(filterConfig ?? [])
   }, [filterStates])
   
   // const columnGroup = () => {
   //    return (
   //       {

   //       }
   //    )
   // }






   return (
      <div className=" ">
         <table className="w-full table-fixed">
            <ColumnGroup />
            <tbody className=" ">
               {
                  filteredData.map((row, index) => {
                     return (
                        <tr className= "hover:bg-gray-100">
                           {
                           
                           cvdTableConfig.map((data, index) => {
                              return (
                                       data.id === "select"
                                       ?  <td className= " border text-center">
                                             <input type = "checkbox" />
                                          </td>
                                       :  <td className ={`w-[${data.width}]  border px-2 py-1 text-sm text-${data.align}`}>
                                             { row[data.id] === "Patient reference no." ? "0000" :  row[data.id] }
                                          </td>

                                    )
                              })
                           
                           }
                        
                        </tr>
                     )
                  })
               }
            </tbody>  
         </table>

      </div>
   )
}

export default TableBody






//  <tr>
                  {/* {
                     cvdTableConfig.map((data, index) => (
                        data.id === "select" 
                        ? <td><input type="checkbox"/><td/>
                        :  <td className ={` border px-2 py-1 text-sm `}>
                                          { row[tableItem.id] === "Patient reference no." ? "0000" :  row[tableItem.id] }
                           </td>
                     ))
                  } */}
               // </tr>
                  {/* {
                     filteredData.map((row, index)=> {
                        return (
                           <tr className="hover:bg-gray-100">
                              <td className="w-10 text-center">
                                 <input 
                                    type = "checkbox" 
                                 />
                              </td>
                              {
                                 cvdTableConfig.map((tableItem, index)=> {
                                    return (
                                       <td className ={`w-[${tableItem.width}] border px-2 py-1 text-sm `}>
                                          { row[tableItem.id] === "Patient reference no." ? "0000" :  row[tableItem.id] }
                                       </td>
                                    )
                                 })
                              }
                           </tr>
         
                        )
                     })
                  } */}


                  {/* {
                     filteredData.map((item, index)=> ( 
                        <tr className=" text-xs hover:bg-gray-100">
                           <td className="w-[4em] text-center">
                              <input 
                                 type="checkbox"
                              />
                           </td>
                           <td className="text-left border w-[10%] cursor-pointer" onClick={()=>setIsModalOpen(true)}>{item[SystmOneReportKeys.Full_Name]}</td>
                           <td className="text-center px-2">{item[SystmOneReportKeys.Age]}</td>
                           <td className="text-center px-6">{item[SystmOneReportKeys.Gender]}</td>
                           <td className="text-center px-6">0000</td>
                           <td className="text-center w-[2em]">{item[SystmOneReportKeys.Statin_Name_Dosage_Quantity]}</td>
                           <td className="text-center">{item[SystmOneReportKeys.Statin_Intensity]}</td>
                           <td className="text-center">{item[SystmOneReportKeys.Statin_Exclusion]}</td>
                           <td className="text-center">{item[SystmOneReportKeys.Inclisiran]}</td>
                           <td className="text-center">{item[SystmOneReportKeys.BloodPressure]}</td>
                           <td className="text-center">{item[SystmOneReportKeys.CVD]}</td>
                           <td className="text-center w-[4em]">{item[SystmOneReportKeys.CKD3_5]}</td>
                           <td className="text-center">{item[SystmOneReportKeys.Hypertension]}</td>
                           <td className="text-center">{item[SystmOneReportKeys.Diabetes]}</td>
                           <td className="text-center">{item[SystmOneReportKeys.Total_Cholestrol_Value]}</td>
                           <td className="text-center">{item[SystmOneReportKeys.LDL_Cholestrol_Value]}</td>
                           <td className="text-center">{item[SystmOneReportKeys.EGFR_Value]}</td>
                           <td className="text-center">{item[SystmOneReportKeys.AntiHptnMedicationCount]}</td>
                           <td className="text-center">{item[SystmOneReportKeys.Medication_Review_Date]}</td>

                        </tr>                           
                     ))
                  }  */}