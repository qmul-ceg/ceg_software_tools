import React, { useEffect, useState } from 'react'
import { useDisplay } from '@/context/DispayContext'
import { SystmOneReportKeys } from '@/modules/cvd/constants/cvdDataEnums'
import { table } from 'console'

type ChildProps = {
   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
type Filters = {
   name: string;
   age: string
}
const TableSection = ({setIsModalOpen} : ChildProps) => {
   // const { tableHeader, tableData, age  , selectedFilter, filterStates} = useDisplay()
   const { tableHeader, tableData,selectedFilter, filterStates, age} = useDisplay()
   const [ filteredData, setFilteredData] = useState<string[][]>(tableData)

//    useEffect(()=> {

//       const filterConfig = tableData.filter((row) => {
//          const ageIndex = parseInt(row[SystmOneReportKeys.Age])
//          const houseboundIndex = row[SystmOneReportKeys.Housebound_Code_Term].trim()
      
//          const filterByAge = 
//             filterStates.ageFilter.some(value => value === "65 or under") && ageIndex <= 65 ||
//             filterStates.ageFilter.some(value => value === "65 - 79") && (ageIndex > 65 && ageIndex <= 79) ||
//             filterStates.ageFilter.some(value => value === "above 80") && ageIndex > 80 ||
//             filterStates.ageFilter.length === 0 

//          // const filterByHousebound = 
//          //    filterStates.houseboundCarehomeFilter === "" ||
//          //    filterStates.houseboundCarehomeFilter === "Housebound"  && houseboundIndex === "13CA."

         
//          return filterByAge 
// // && filterByHousebound
//       })

//       // const filteredAge = tableData.filter((row) => {
//       //    const rowAge = parseInt(row[SystmOneReportKeys.Age])

//       //    const sixtyFiveOrUnderGroup = filterStates.ageFilter.some(value => value === "65 or under") && rowAge <= 65;
//       //    const sixtyFiveToSeventyNineGroup = filterStates.ageFilter.some(value => value === "65 - 79") && (rowAge > 65 && rowAge <= 79);
//       //    const aboveEightyGroup = filterStates.ageFilter.some(value => value === "above 80") && rowAge > 80;
//       //    const noAge = filterStates.ageFilter.length === 0 

//       //    return sixtyFiveOrUnderGroup || sixtyFiveToSeventyNineGroup || aboveEightyGroup || noAge
//       // })

//       setFilteredData(filterConfig)
   
//    }, [filterStates])

   



   
   //CONTINUE THIS 
   // useEffect(()=> {
   //    const cvdFilterLogic = (dataToFilter: string[][]) => {
   //       return dataToFilter.filter((row) => {
   //          const rowAge = parseInt(row[SystmOneReportKeys.Age])

   //          const ageFilter = 
   //             age.some(value => value === "65 or under") && rowAge < 65 ||
   //             age.some(value => value === "65 - 79") && (rowAge >= 65 &&  rowAge <= 79) ||
   //             age.some(value => value === "above 80") && rowAge >= 80 ||
   //             age.length === 0;

   //       })
   //    }
   // }, [age, tableData])
   
   
   
   
   
   // console.log('tableData isArray?', Array.isArray(tableData), tableData);
   // console.log('filteredData isArray?', Array.isArray(filteredData), filteredData);



   

  return (
      <div className="border border-dashed min-h-0 flex flex-col ">
         <table>
            <thead className='text-sm'>
               
                  <tr className=' '>
                     {tableHeader.map((item)=> (
                        <th className=' border-2'>{item}</th>
                     ))}
                  </tr>
            </thead> 
            <tbody >
               
                     {
                        filteredData.map((item, index)=> ( 
                           <tr className="border text-xs hover:bg-gray-100">
                              <td className="text-left w-[14em] px-2 cursor-pointer" onClick={()=>setIsModalOpen(true)}>{item[SystmOneReportKeys.Full_Name]}</td>
                              <td className="text-center">{item[SystmOneReportKeys.Age]}</td>
                              <td className="text-center">{item[SystmOneReportKeys.Gender]}</td>
                              <td className="text-center">0000</td>
                              <td className="text-center w-[2em]">{item[SystmOneReportKeys.Statin_Contra_Code_Term]}</td>
                              <td className="text-center">-</td>
                              <td className="text-center">-</td>
                              <td className="text-center">-</td>
                              <td className="text-center">140/80</td>
                              <td className="text-center">-</td>
                              <td className="text-center w-[4em]">{item[SystmOneReportKeys.CKD_Code_Term]}</td>
                              <td className="text-center">{item[SystmOneReportKeys.Hypertension_Code_Term]}</td>
                              <td className="text-center">{item[SystmOneReportKeys.Diabetes_Code_Term]}</td>
                              <td className="text-center">{item[SystmOneReportKeys.Total_Cholestrol_Value]}</td>
                              <td className="text-center">{item[SystmOneReportKeys.LDL_Cholestrol_Value]}</td>
                              <td className="text-center">{item[SystmOneReportKeys.EGFR_Value]}</td>
                              <td className="text-center">{item[SystmOneReportKeys.Hypertension_Code_Term]}</td>
                              <td className="text-center">{item[SystmOneReportKeys.Medication_Review_Date]}</td>

                           </tr>                           
                        ))
                     } 
            </tbody>  
         </table>
      </div>
  )
}

export default TableSection







         {/* <div className=" rounded-t-lg border border-[#21376A] h-[6em]">
            {tableHeader}
         </div>
         <div className="border border-red-400  flex-1">

         </div> */}

   // console.log(testData) 
   // const testFunction = (data:string[][]) => {
   //    //Manipulates data 
   //    const newData: string[][] = []
   //    data.map((item) => {

   //       if (item[SystmOneReportKeys.Gender].trim() === 'Male' ){
   //          newData.push(item)
   //       }
   //    })
   //    // setTestData(newData)
   //    return newData
   //    //updates the state
   // }

   // const updateTable = () =>{

   //    setTestData(testFunction(tableData))
   // }
   
   
   
   
   // age.some(value => 
         //    (value === "65 or under" && parseInt(row[SystmOneReportKeys.Age]) < 65) ||
         //    (age.some(value => value === "65 - 79" && (parseInt(row[SystmOneReportKeys.Age]) >= 65 && parseInt(row[SystmOneReportKeys.Age]) <= 79)  )) ||
         //    (age.some(value => value === "above 80" && parseInt(row[SystmOneReportKeys.Age]) >=  80) )
         // )
   // useEffect(()=> {
      

   //    const filteredAge = testData.filter(row => 
   //       (age.some(value => value === "65 or under" && parseInt(row[SystmOneReportKeys.Age]) < 65) )  ||
   //       (age.some(value => value === "65 - 79" && (parseInt(row[SystmOneReportKeys.Age]) >= 65 && parseInt(row[SystmOneReportKeys.Age]) <= 79)  )) ||
   //       (age.some(value => value === "above 80" && parseInt(row[SystmOneReportKeys.Age]) >=  80) )  || 
   //       age.length === 0
         
   //    )
   //    setTestData(filteredAge)
   // }, [age])


   
//go through each value 
      // filter out the people who have their values 
      // const updatedTableData = []
      // setTestData(testData.filter((row)=> age.includes(row[SystmOneReportKeys.Age])))
      // if (age.length > 0 ){
      //    const filteredAge = testData.filter(row => age.includes(row[SystmOneReportKeys.Age]))
      //    // setTestData(filteredAge)
      //    console.log(filteredAge)
      // }else {
      //    setTestData(tableData)
      // }
   // useEffect(()=> {

      
   //    if(age){
   //       const updatedTableData: string[][] = [];
   //       tableData.map((item)=> {
   //          if (age === "65 or under"){
   //             if(parseInt(item[SystmOneReportKeys.Age]) <= 65){
   //                updatedTableData.push(item)
   //             }
   //          }
   //          else if (age === "above 80"){
   //             if(parseInt(item[SystmOneReportKeys.Age]) > 80){
   //             updatedTableData.push(item)
   //             }
   //          }
   //          else if (age === "65 - 79"){
   //             if((parseInt(item[SystmOneReportKeys.Age]) >= 65) && parseInt(item[SystmOneReportKeys.Age]) < 79){
   //                updatedTableData.push(item)
   //             }
   //          }
   //       })
   //       setTestData(updatedTableData)

   //    }else {
   //       setTestData(tableData)
   //    }

   // }, [age])






   // useEffect(()=> {
      
   //    if(filterStates){
   //       const updatedTableData: string[][] = []
   //       testData.map((item) => {
   //          if (filterStates.age === "65 or under"){
   //             if(parseInt(item[SystmOneReportKeys.Age]) <= 65){
   //                updatedTableData.push(item)
   //             }
   //          }
   //          else if (filterStates.age === "above 80"){
   //             if(parseInt(item[SystmOneReportKeys.Age]) > 80){
   //             updatedTableData.push(item)
   //             }
   //          }
   //          else if (filterStates.age === "65 - 79"){
   //             if((parseInt(item[SystmOneReportKeys.Age]) >= 65) && parseInt(item[SystmOneReportKeys.Age]) < 79){
   //                updatedTableData.push(item)
   //             }
   //          }
   //       })
   //       setTestData(updatedTableData)            
   //       }else{
   //          setTestData(tableData)
   //       }
      
   // }, [filterStates])














   // useEffect(()=> {
   //    if(selectedFilter){
         
   //       const updatedTableData: string[][] = []
   //       testData.map((item) => {

   //          if(selectedFilter === "65 or under"){
   //             if(parseInt(item[SystmOneReportKeys.Age]) <= 65){
   //                updatedTableData.push(item)
   //             }
   //          }
   //          else if (selectedFilter === "above 80"){
   //              if(parseInt(item[SystmOneReportKeys.Age]) > 80){
   //                updatedTableData.push(item)
   //             }
   //          }
   //          else if (selectedFilter === "65 - 79"){
   //              if((parseInt(item[SystmOneReportKeys.Age]) >= 65) && parseInt(item[SystmOneReportKeys.Age]) < 79){
   //                updatedTableData.push(item)
   //             }
   //          }
   //       })
   //       setTestData(updatedTableData)
   //    }else{
   //       setTestData(tableData)
//}

   // }, [selectedFilter])







 // If selected Filter is true

      // Take the table data loop through it 
      // find the data that 
      // 
      // console.log(selectedFilter)


      
   // useEffect(()=> {


   //    const filteredAge = tableData.filter((row) => {
   //       const rowAge = parseInt(row[SystmOneReportKeys.Age])

   //       const sixtyFiveOrUnderGroup = age.some(value => value === "65 or under") && rowAge <= 65;
   //       const sixtyFiveToSeventyNineGroup = age.some(value => value === "65 - 79") && (rowAge > 65 && rowAge <= 79);
   //       const aboveEightyGroup = age.some(value => value === "above 80") && rowAge > 80;
   //       const noAge = age.length === 0 

   //       return sixtyFiveOrUnderGroup || sixtyFiveToSeventyNineGroup || aboveEightyGroup || noAge
   //    })

   //    setFilteredData(filteredAge)
   
   // }, [age])