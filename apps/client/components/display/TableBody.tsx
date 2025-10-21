import React, { useEffect } from 'react'
import { useDisplay } from '@/context/DispayContext'
import { useState } from 'react'
import { SystmOneReportKeys } from '@/modules/cvd/constants/cvdDataEnums'
// import { SystmOneTableConfig } from './TableHeader'
import { ColumnGroup } from './TableHeader'






const TableBody = ({setIsModalOpen} : {setIsModalOpen : React.Dispatch<React.SetStateAction<boolean>>}) => {

   const { tableData, filterStates, setPatientCount, patientCount, filteredData, setFilteredData, selectedPatientRow, setSelectedPatientRow, setSelectedPatientIndex, selectedPatientIndex, reportKeys, tableConfig} = useDisplay()

   const handlePatientClick = (index:number) => {
      setSelectedPatientIndex(index)
      setIsModalOpen(true)
   }


   useEffect(()=> {
      const filterConfig = tableData?.filter((row) => {
        


         const ageIndex = parseInt(row[reportKeys.Age]);
         const houseboundIndex = row[reportKeys.Housebound_Code_Term];
         const smiIndex = row[reportKeys.SMI_Code_Term].trim();
         const learningDisabilityIndex = row[reportKeys.Learning_Difficulties_Code_Term].trim();
         const dementiaIndex = row[reportKeys.Dementia_Code_Term].trim();

         //Comorbidities indexes
         const cvdIndex = row[reportKeys.CVD]
         const hypertensionIndex = row[reportKeys.Hypertension]
         const diabetesIndex = row[reportKeys.Diabetes]
         const ckdIndex = row[reportKeys.CKD_Code_Term]
         const afIndex = row[reportKeys.AF_Code_Term]
         const cancerIndex = row[reportKeys.Cancer_Code_Term]

         const adverseMedsIndex = row[reportKeys.NSAID_Name_Dosage_Quantity]

         //Create the financial year functionality
         const checkFinancialYear = (dateString: string):boolean => {
            // get start of financial year
            const dateToCheck = new Date(dateString)

            const monthToCheck= dateToCheck.getMonth()

            const currentYear = new Date().getFullYear()
            const financialYearStartWindow1 = new Date(`April 1, ${currentYear}`)
            const financialYearEndWindow1 = new Date(`December 31, ${currentYear}`)

            const financialYearStartWindow2 = new Date(`January 1, ${currentYear + 1}`)
            const financialYearEndWindow2 = new Date(`March 31, ${currentYear + 1 }`)



            if (monthToCheck >= financialYearStartWindow1.getMonth() && monthToCheck <= financialYearEndWindow1.getMonth()){
               if (dateToCheck >= financialYearStartWindow1 && dateToCheck <= financialYearEndWindow1){
                  return false
               }
            }
            else if (monthToCheck >= financialYearStartWindow2.getMonth() && monthToCheck <= financialYearEndWindow2.getMonth()){
               if(dateToCheck >= financialYearStartWindow2 && dateToCheck <= financialYearEndWindow2){
                  return false
               }
            }
            return true        
          
         }
         




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
            const aceiArb = filterStates.antihypertensiveMedsFilter.value[0].includes("acei/arb") && row[reportKeys.ACEi_ARB_Name_Dosage_Quantity].trim();
            const caChannel = filterStates.antihypertensiveMedsFilter.value[0].includes("cachannel") && row[reportKeys.Ca_Channel_Name_Dosage_Quantity].trim();
            const thiazides = filterStates.antihypertensiveMedsFilter.value[0].includes("thiazides") && row[reportKeys.Thiazides_Name_Dosage_Quantity].trim();
            const betaBlockers = filterStates.antihypertensiveMedsFilter.value[0].includes("betablockers") && row[reportKeys.Beta_Blocker_Name_Dosage_Quantity].trim()
            const others = filterStates.antihypertensiveMedsFilter.value[0].includes("others") && 
               (row[reportKeys.Other_Diuretic_Name_Dosage_Quantity].trim() || row[reportKeys.Other_Lipid_Lowering_Name_Dosage_Quantity].trim() || row[reportKeys.Alpha_Blocker_Name_Dosage_Quantity].trim())

            return { aceiArb, caChannel, thiazides, betaBlockers, others }
         }

         const antihypertensiveMedsFilterGroupTwo = () => {
            const equalToZero = filterStates.antihypertensiveMedsFilter.value[1].includes("0") && parseInt(row[reportKeys.AntiHptnMedicationCount]) === 0;
            const equalToOne = filterStates.antihypertensiveMedsFilter.value[1].includes("1") && parseInt(row[reportKeys.AntiHptnMedicationCount]) === 1;
            const gteTwo = filterStates.antihypertensiveMedsFilter.value[1].includes("gte2") && parseInt(row[reportKeys.AntiHptnMedicationCount]) >= 2;

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
      
            const highStatinIntensity = filterStates.lipidMedicationsFilter.value[0].includes("highIntensity") && row[reportKeys.Statin_Intensity] === "High";
            const mediumLowStatinIntensity = filterStates.lipidMedicationsFilter.value[0].includes("mediumLow") && row[reportKeys.Statin_Intensity] === "Med/Low";
            const notOnStatin = filterStates.lipidMedicationsFilter.value[0].includes("noStatin") && row[reportKeys.Statin_Intensity] === "None"

            return { highStatinIntensity, mediumLowStatinIntensity, notOnStatin }
         }

         const onInclisiran = filterStates.lipidMedicationsFilter.value[1].includes("onInclisiran") && row[reportKeys.Inclisiran] === "YES"
         const statinExclusions = filterStates.lipidMedicationsFilter.value[3].includes("statinExclusions") 
         && (row[reportKeys.Statin_Exclusion] === "Contra" || row[reportKeys.Statin_Exclusion] === "Declined")


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
         //Split the blood pressure values MOVE THESE FUNCTIONALITIES POSSIBLY TO SHARED FUNCTIONALITIES FOR OTHER TOOLS 
         const splitBloodPressureValue = (value: string) => {
       
            const [systolic, diastolic] = value.split("/");
            return [systolic, diastolic];
         }


         //Relative run date and blood pressure

         const convertDate = (dateString : string) => {
            if (dateString){
               const [day, month, year] = dateString.split('-');
               const months = { "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06", "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12" };
               return `20${year}-${months[month]}-${day}`; 
            }
            else return ""
         }


         const recordedOverTwelveMonths = (recordedDate: string, relativeRunDate: string):boolean => {
            if(!recordedDate){
               // console.log(recordedDate, relativeRunDate)
               return false
            }
            
            //Function returns a boolean value that let's us know if a specific data was recorded 12 months prior to relative run date
            const parsedRecordedDate = new Date(recordedDate)
            const parsedRelativeRunDate = new Date(relativeRunDate)
            
            const cutOffDate = new Date (parsedRelativeRunDate.setFullYear(parsedRelativeRunDate.getFullYear() - 1))
            
            return parsedRecordedDate <= cutOffDate
            
           
         }

         const bloodPressureFilterGroupOne = () => {
            const [systolic , diastolic ] = splitBloodPressureValue(row[reportKeys.BloodPressure]);
       

            const lowerBound = filterStates.bloodPressureFilter.value[0].includes("<140/90") && (parseInt(systolic) < 140 && parseInt(diastolic) < 90);
            const midBound = filterStates.bloodPressureFilter.value[0].includes("gte140/90") && (parseInt(systolic) >= 140 || parseInt(diastolic) >= 90);
            const upperBound = filterStates.bloodPressureFilter.value[0].includes("gte150/90") && (parseInt(systolic) >= 150 || parseInt(diastolic) >= 90);

            return { lowerBound, midBound, upperBound }
         }

         const applyBloodPressureFilter = () => {
            const { lowerBound, midBound, upperBound } = bloodPressureFilterGroupOne();
            const recordedDateResult = recordedOverTwelveMonths(convertDate(row[reportKeys.Systolic_BP_Date_1]), convertDate("07-Aug-25"))
            const overTwelveMonths = filterStates.bloodPressureFilter.value[1].includes("<12m") && recordedDateResult
            const financialYearCheck = checkFinancialYear(convertDate(row[reportKeys.Systolic_BP_Date_1]))
            const notInFinancialYear = filterStates.bloodPressureFilter.value[1].includes("notInFinancialYear") && financialYearCheck

            

            // console.log(upperBound)
            const bloodPressureFilterCombinations = 
               // When no filter is selected
               (
                  filterStates.bloodPressureFilter.value[0].length === 0 
                  && filterStates.bloodPressureFilter.value[1].length === 0 
               ) ||

               //When blood pressure value is selected only 
               (
                  filterStates.bloodPressureFilter.value[0].length > 0 && (lowerBound || midBound || upperBound) 
                  && filterStates.bloodPressureFilter.value[1].length === 0
               ) ||

               // When date is selected only
               (
                  filterStates.bloodPressureFilter.value[0].length === 0 
                  && (filterStates.bloodPressureFilter.value[1].length > 0 && (overTwelveMonths || notInFinancialYear))
               ) ||
               //Only financial year selected
               // (

               // )||

               //Value comibinations 
               (
                  filterStates.bloodPressureFilter.value[0].length  > 0 && (lowerBound || midBound || upperBound ) 
                  || (filterStates.bloodPressureFilter.value[1].length > 0  && (overTwelveMonths || notInFinancialYear))
               )
           
            return bloodPressureFilterCombinations;
         }



         //CHOLESTROL READING
         const applyCholestrolReadingFilter = () => {
            const ldlGreaterThanTwo = filterStates.cholestrolFilter.value[0].includes(">2.0") && parseInt(row[reportKeys.LDL_Cholestrol_Value]) > 2.0
            const recordedDateResult = recordedOverTwelveMonths(convertDate(row[reportKeys.LDL_Cholestrol_Date]), convertDate("07-Aug-25"))
            const overTwelveMonths = filterStates.cholestrolFilter.value[1].includes("<12m") && recordedDateResult
            const financialYearCheck = checkFinancialYear(convertDate(row[reportKeys.LDL_Cholestrol_Date]))
            const notInFinancialYear = filterStates.cholestrolFilter.value[1].includes("notInFinancialYear") && financialYearCheck



          
            const cholestrolReadingCombinations = 
            // //Nothing selected
               (
                  filterStates.cholestrolFilter.value[0].length === 0 
                  && filterStates.cholestrolFilter.value[1].length === 0 
                  
               ) ||
               //Only value is selected
               (
                  filterStates.cholestrolFilter.value[0].length > 0 && ldlGreaterThanTwo 
                  && filterStates.cholestrolFilter.value[1].length === 0 
               ) ||

               //When only date is selected
               (
                  filterStates.cholestrolFilter.value[0].length === 0 
                  && filterStates.cholestrolFilter.value[1].length > 0 && (overTwelveMonths || notInFinancialYear)
               ) ||

               // combinations
               (
                  filterStates.cholestrolFilter.value[0].length > 0 && ldlGreaterThanTwo 
                  || filterStates.cholestrolFilter.value[1].length > 0 && (overTwelveMonths || notInFinancialYear)
               )

            return cholestrolReadingCombinations
         }

         //QRISK FILTER
         const applyQriskFilter = () => {
            
            const greaterThanTenPercent = filterStates.qRiskFilter.value[0].includes(">10") && (parseFloat(row[reportKeys.QRisk_Value]) > 10.0)
            const greaterThanTwentyPercent = filterStates.qRiskFilter.value[0].includes(">20") && (parseFloat(row[reportKeys.QRisk_Value]) > 20.0)

            const recordedDateResult = recordedOverTwelveMonths(convertDate(row[reportKeys.QRisk_Date]), convertDate("07-Aug-25"))
            const overTwelveMonths = filterStates.qRiskFilter.value[1].includes("<12m") && recordedDateResult
            
            
            
            const qRiskFilterCombinations = 
            //no selections
            (
               filterStates.qRiskFilter.value[0].length === 0  
               && filterStates.qRiskFilter.value[1].length === 0  
            ) ||

            //Selection at the top 
            (
               filterStates.qRiskFilter.value[0].length > 0 && (greaterThanTenPercent || greaterThanTwentyPercent)
               && filterStates.qRiskFilter.value[1].length === 0
            ) ||

            (
               filterStates.qRiskFilter.value[0].length === 0 
               && filterStates.qRiskFilter.value[1].length > 0 && overTwelveMonths

            ) ||

            (
               filterStates.qRiskFilter.value[0].length > 0 && (greaterThanTenPercent || greaterThanTwentyPercent)
               || filterStates.qRiskFilter.value[1].length > 0 && overTwelveMonths
            )

            return qRiskFilterCombinations
            // 
         }

         const applyHptnDiagnosisFilter = () => {
            const noHptnDiagnosis = (filterStates.hptnDiagnosis.value as string[]).includes("no") && (row[reportKeys.Hypertension] === "NO")

            const hptnCombination = 
               filterStates.hptnDiagnosis.value.length === 0 || 
               filterStates.hptnDiagnosis.value.length > 0 && noHptnDiagnosis

            return hptnCombination
         }

         const applyAceiArbFilter = () => {
            const noAceiArbValue = (filterStates.aceiArbFilter.value as string[]).includes("no") && (row[reportKeys.ACEi_ARB_Name_Dosage_Quantity].trim() === "")
         
            const aceiArbFilterCombination = 
               filterStates.aceiArbFilter.value.length === 0 ||
               filterStates.aceiArbFilter.value.length > 0 && noAceiArbValue 

            return aceiArbFilterCombination
         }

         return filterByAge && filterByHousebound && vulnerabilitiesFilter && comorbiditiesFilter && adverseMedsFilter && applyAntihypertensiveMedsFilter() && applyLipidMedicationsFilter() && applyBloodPressureFilter() && applyCholestrolReadingFilter() && applyQriskFilter() && applyQriskFilter() && applyHptnDiagnosisFilter() && applyAceiArbFilter()
      })   
        
      setFilteredData(filterConfig ?? [])

   }, [filterStates])
   

   setPatientCount(filteredData.length)



   return (
      <div className=" ">
         <table className="w-full table-fixed">
            <ColumnGroup />
            <tbody className=" ">
               {
                  filteredData.map((row, patientIndex) => {
                     return (
                        <tr className= "hover:bg-gray-100">
                           {
                           
                              tableConfig.map((data, index) => {
                                 return (
                                          data.id === "select"
                                          ?  <td className= " border-b text-center">
                                                <input type = "checkbox" />
                                             </td>
                                          :  <td 
                                                className ={`w-[${data.width}]  border-gray-150 border-b border-l px-2 py-1 text-sm text-${data.align} ${data.id === reportKeys.Full_Name ? "cursor-pointer text-[#21376A]": undefined}`}
                                                onClick={   data.id === reportKeys.Full_Name ? () => handlePatientClick(patientIndex) : undefined  }
                                             >
                                                {/* { row[data.id] === "Patient reference no."   ?  "0000" :  row[data.id] } */}
                                                {row[data.id]}
                                                
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