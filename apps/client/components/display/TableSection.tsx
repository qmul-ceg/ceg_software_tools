import React, { useEffect, useState } from 'react'
import { useDisplay } from '@/contexts/DispayContext'
import { SystmOneReportKeys } from '@/modules/cvd/constants/cvdDataEnums'
import { table } from 'console'

type ChildProps = {
   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const TableSection = ({setIsModalOpen} : ChildProps) => {
   const { tableHeader, tableData, age  , selectedFilter} = useDisplay()

   const [ testData, setTestData] = useState<string[][]>(tableData)

   useEffect(()=> {

      
      // If selected Filter is true

      // Take the table data loop through it 
      // find the data that 
      if(selectedFilter){
         const updatedTableData: string[][] = []
         testData.map((item) => {

            if(selectedFilter === "65 or under"){
               if(parseInt(item[SystmOneReportKeys.Age]) <= 65){
                  updatedTableData.push(item)
               }
            }
            else if (selectedFilter === "above 80"){
                if(parseInt(item[SystmOneReportKeys.Age]) > 80){
                  updatedTableData.push(item)
               }
            }
            else if (selectedFilter === "65 - 79"){
                if((parseInt(item[SystmOneReportKeys.Age]) >= 65) && parseInt(item[SystmOneReportKeys.Age]) < 79){
                  updatedTableData.push(item)
               }
            }
         })
         setTestData(updatedTableData)
      }else{
         setTestData(tableData)
      }

   }, [selectedFilter])






   

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
                        
                        testData.map((item, index)=> (
                          
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