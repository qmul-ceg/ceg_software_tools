import { useDisplay } from '@/context/DispayContext'
import React, { useState } from 'react'
import { SystmOneReportKeys } from '@/modules/cvd/constants/cvdDataEnums'
type ChildProps = {
   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const Modal = ({ setIsModalOpen }: ChildProps) => {
   // const [openModal, setOpenModal] = useState<boolean>(true)
   const {selectedPatientRow, selectedPatientIndex, setSelectedPatientIndex, setSelectedPatientRow, filteredData} = useDisplay()


   const handleNextPatient = (direction: "previous" | "next" ) => {
      let nextPatientIndex = 0 
      if(direction === "next"){
         nextPatientIndex = (selectedPatientIndex + 1) % filteredData.length;
      }
      else if(direction === "previous"){
         if(selectedPatientIndex === 0 ){
            nextPatientIndex = filteredData.length - 1
         }
         else nextPatientIndex = selectedPatientIndex - 1
      }
      setSelectedPatientIndex(nextPatientIndex)
      // setSelectedPatientRow(filteredData[nextPatientIndex])
   }



   console.log(selectedPatientIndex)

   return (
      <>
         <div className="overlay">
            <div className="overlayBackground">
               <div className="overlayContainer ">
                  <div className="flex justify-between items-center  w-full h-12 px-4 rounded-t-lg bg-[#21376A] text-white">
                     <strong>Patient information</strong>
                     <button className = "cursor-pointer"onClick={()=>setIsModalOpen(false)}>
                        &#10005;
                     </button>
                  </div>

                  {/* GET PREVIOUS AND NEXT PATIENT */}
                  <div className='border flex justify-center gap-6 p-2'>
                     {/* <button className=" " onClick={handlePreviousPatient}> */}
                     <button className="cursor-pointer border">
                        <div className="flex flex-col text-sm hover:font-medium">
                           <button onClick={()=>handleNextPatient("previous")}>Previous patient</button>
                           <span className="">&larr;</span>
                        </div>
                     </button>
                     {/* <button className=" " onClick={handleNextPatient}> */}
                     <button className="cursor-pointer border">
                        <div className="flex flex-col text-sm hover:font-medium">
                           <span onClick={()=>handleNextPatient("next")}>Next patient</span>
                           <span className="">&rarr;</span>
                        </div>  
                     </button>
                  </div>



                  {/* PATIENT DEMOGRAPHIC DATA*/}
                  <div className='border text-xs px-2 flex '>
                     {/* TABLE 1 */}
                     <div className="border w-[50%]">
                        <div className="flex flex-col gap-2   text-left">
                           <div className="flex ">
                              <h2 className=" w-[30%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg">Full name</h2>
                              <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1">{filteredData[selectedPatientIndex][SystmOneReportKeys.Full_Name]}</div>
                           </div>
                           <div className="flex">
                              <h2 className=" w-[30%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg">Date of birth</h2>
                              <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1">{filteredData[selectedPatientIndex][SystmOneReportKeys.Date_Of_Birth]}</div>
                           </div>
                           <div className="flex">
                              <h2 className=" w-[30%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg">NHS number</h2>
                              <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1"></div>
                           </div>
                           <div className="flex h-14">
                              <h2 className=" w-[30%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg">Ethnicity</h2>
                              <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1 ">{filteredData[selectedPatientIndex][SystmOneReportKeys.Ethnicity]}</div>
                           </div>
                        </div>
                     </div>
                     


                     {/* TABLE 2 */}
                     <div className="border w-[50%]">
                        <div className="flex flex-col gap-2  text-left">
                           <div className="flex">
                              <h2 className="w-[36%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg whitespace-nowrap">Patient record #</h2>
                              <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1">?????</div>
                           </div>
                           <div className="flex">
                              <h2 className="w-[36%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg">Gender</h2>
                              <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1">{filteredData[selectedPatientIndex][SystmOneReportKeys.Gender]}</div>
                           </div>
                           <div className="flex">
                              <h2 className="w-[36%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg">Age</h2>
                              <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1">{filteredData[selectedPatientIndex][SystmOneReportKeys.Age]}</div>
                           </div>
                           <div className="flex h-6">
                              <h2 className="w-[36%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg">Mobile telephone</h2>
                              <div className="border border-gray-400 w-[65%]  rounded-r-lg pl-2 py-1">{filteredData[selectedPatientIndex][SystmOneReportKeys.Mobile_Number]}</div>
                           </div>
                           <div className="text-left text-sm ml-1">
                              <label className=" inline-flex gap-2 items-center cursor-pointer font-bold" htmlFor="modalCheckBox">
                                 Select for export
                                 <input
                                    type="checkbox"
                                    id="modalCheckBox"
                                    // checked = {!!selectedForExport[selectedPatientData[AFibColumns.NHS_Number]]}
                                    // onChange={()=>toggleSelectedPatient(selectedPatientData[AFibColumns.NHS_Number])}
                                    className="ml-2 modal_checkbox"
                                 //onclick toggle the select for export;
                                 />
                                 <div className = "custom_modal_checkbox "></div>
                              </label>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* TABLES */}
                  <div className=" h-[36em] px-2 text-sm mt-4 border overflow-auto">
                     {/* BLOOD PRESSURE CHART TABLE */}
                     <table className=' w-full'>
                        <thead>
                           <tr className=' flex p-2 text-white bg-[#21376A] rounded-t-lg'>
                              <div className='flex gap-20'>
                                 <th className=" ">Systolic BP value (mmHg)</th>
                                 <th className=' '>Date recorded (last 3y)</th>
                              </div>
                              
                              <th className=' '></th>

                           </tr>
                        </thead>
                        <tbody className=''>
                           <div className='border h-50 '>
                           </div>
                        </tbody>
                     </table>



                     {/* MEDICATIONS TABLE */}
                     <table className='w-full text-left mt-4'>
                        <thead className='border '>
                           <tr className=' flex p-2 text-white bg-[#21376A] rounded-t-lg'>
                              <th className='w-[45%] '>Medication</th>
                              <th className='w-[40%] '>Medication name</th>
                              <th>Date recorded</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td className='border'>ACEi/ARB (6m)</td>
                              <td></td>
                              <td></td>
                           </tr>
                           <tr>
                              <td className='border'>Beta-blocker (6m)</td>
                              <td></td>
                              <td></td>

                           </tr>
                           <tr>
                              <td className='border'>Calcium Channel Blockers (CCB)(6m)</td>
                              <td></td>
                              <td></td>
                           </tr>                           
                           <tr>
                              <td className='border'>Thiazide(-like) diuretic (6m)</td>
                              <td></td>
                              <td></td>
                           </tr>                           
                           <tr>
                              <td className='border'>Other (e.g. centrally-acting, loop diuretic)(6m)</td>
                              <td></td>
                              <td></td>

                           </tr>                           
                           <tr>
                              <td className='border'>Antiplatelet</td>
                              <td></td>
                              <td></td>

                           </tr>
                           
                        </tbody>
                     </table>

                     {/*Lipids medications */}
                     <table className='w-full text-left mt-4'>
                        <thead className='border '>
                           <tr className=' flex p-2 text-white bg-[#21376A] rounded-t-lg'>
                              <th className='w-[45%] '>Lipids medications</th>
                              <th className='w-[40%] '>Medication name</th>
                              <th>Date recorded</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td className='border'>Statin Any / High intensity (6m)</td>
                              <td></td>
                              <td></td>
                           </tr>
                           <tr>
                              <td className='border'>Ezetimbe (6m)</td>
                              <td></td>
                              <td></td>

                           </tr>
                           <tr>
                              <td className='border'>Bempedoic Acid (6m)</td>
                              <td></td>
                              <td></td>
                           </tr>                           
                           <tr>
                              <td className='border'>PCSK9 (incl. Inclisiran)(6m)</td>
                              <td></td>
                              <td></td>
                           </tr>                           
                           <tr>
                              <td className='border'>Other lipid lowering therapy (6m)</td>
                              <td></td>
                              <td></td>

                           </tr>               
                        </tbody>
                     </table>

                     {/* STATIN EXCLUSION */}
                     <table className='w-full text-left mt-4'>
                        <thead className='border '>
                           <tr className=' flex p-2 text-white bg-[#21376A] rounded-t-lg'>
                              <th className='w-[45%] '>Statin exclusion</th>
                              <th className='w-[40%] '>Description</th>
                              <th>Date recorded</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td className='border'>Contraindicated (latest ever)</td>
                              <td></td>
                              <td></td>
                           </tr>
                           <tr>
                              <td className='border'>Patient declined (latest ever)</td>
                              <td></td>
                              <td></td>
                           </tr>
                        </tbody>
                     </table>

                     <table className='w-full text-left mt-4'>
                        <thead className='border '>
                           <tr className=' flex p-2 text-white bg-[#21376A] rounded-t-lg'>
                              <th className='w-[45%] '>Adverse meds</th>
                              <th className='w-[40%] '>Description</th>
                              <th>Date recorded</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td className='border'>NSAIDs (excl. aspirin) (6m)</td>
                              <td></td>
                              <td></td>
                           </tr>
                        </tbody>
                     </table>

                     <table className='w-full text-left mt-4'>
                        <thead className='border '>
                           <tr className=' flex p-2 text-white bg-[#21376A] rounded-t-lg'>
                              <th className='w-[45%] '>Clinical data</th>
                              <th className='w-[40%] '>Value</th>
                              <th>Date recorded</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td className='border'>Total cholestrol (latest ever)</td>
                              <td></td>
                              <td></td>
                           </tr>
                           <tr>
                              <td className='border'>HDL cholestrol (latest ever)</td>
                              <td></td>
                              <td></td>
                           </tr>
                           <tr>
                              <td className='border'>LDL cholestrol (latest ever)</td>
                              <td></td>
                              <td></td>
                           </tr><tr>
                              <td className='border'>non-HDL cholestrol (latest ever)</td>
                              <td></td>
                              <td></td>
                           </tr><tr>
                              <td className='border'>Ratio total cholestrol/HDL (latest ever)</td>
                              <td></td>
                              <td></td>
                           </tr><tr>
                              <td className='border'>Triglycerides (latest ever)</td>
                              <td></td>
                              <td></td>
                           </tr><tr>
                              <td className='border'>eGFR (latest ever)</td>
                              <td></td>
                              <td></td>
                           </tr><tr>
                              <td className='border'>Serum creatinine (latest ever)</td>
                              <td></td>
                              <td></td>
                           </tr><tr>
                              <td className='border'>Urine ACR (latest ever)</td>
                              <td></td>
                              <td></td>
                           </tr>
                           <tr>
                              <td className='border'>Serum ALT or AST (latest ever)</td>
                              <td></td>
                              <td></td>
                           </tr>
                           <tr>
                              <td className='border'>Pulse check (latest ever)</td>
                              <td></td>
                              <td></td>
                           </tr>
                        </tbody>
                     </table>

                     <table className='w-full text-left mt-4'>
                        <thead className='border '>
                           <tr className=' flex p-2 text-white bg-[#21376A] rounded-t-lg'>
                              <th className='w-[45%] '>CVD and Comorbidities</th>
                              <th className='w-[40%] '>Description</th>
                              <th>Date recorded</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td className='border'>CVD (IHD/Stroke/TIA/PAD)</td>
                              <td></td>
                              <td></td>
                           </tr>
                           <tr>
                              <td className='border'>Hypertension</td>
                              <td></td>
                              <td></td>
                           </tr>
                           <tr>
                              <td className='border'>Heart Failure</td>
                              <td></td>
                              <td></td>
                           </tr><tr>
                              <td className='border'>Diabetes(T1/T2)</td>
                              <td></td>
                              <td></td>
                           </tr><tr>
                              <td className='border'>AF</td>
                              <td></td>
                              <td></td>
                           </tr><tr>
                              <td className='border'>CKD 3-5</td>
                              <td></td>
                              <td></td>
                           </tr><tr>
                              <td className='border'>Rheumatoid Arthritis or Lupus</td>
                              <td></td>
                              <td></td>
                           </tr>
                        </tbody>
                     </table>


                     <table className='w-full text-left mt-4'>
                        <thead className='border '>
                           <tr className=' flex p-2 text-white bg-[#21376A] rounded-t-lg'>
                              <th className='w-[45%] '>Vulnerabilities</th>
                              <th className='w-[40%] '>Description</th>
                              <th>Date recorded</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td className='border'>SMI</td>
                              <td></td>
                              <td></td>
                           </tr>
                           <tr>
                              <td className='border'>Frailty score</td>
                              <td></td>
                              <td></td>
                           </tr>
                           <tr>
                              <td className='border'>Housebound</td>
                              <td></td>
                              <td></td>
                           </tr><tr>
                              <td className='border'>Learning disability</td>
                              <td></td>
                              <td></td>
                           </tr><tr>
                              <td className='border'>Palliative care</td>
                              <td></td>
                              <td></td>
                           </tr><tr>
                              <td className='border'>Dementia</td>
                              <td></td>
                              <td></td>
                           </tr><tr>
                              <td className='border'>Cancer</td>
                              <td></td>
                              <td></td>
                           </tr>
                        </tbody>
                     </table>

                     <table className='w-full text-left mt-4'>
                        <thead className='border '>
                           <tr className=' flex p-2 text-white bg-[#21376A] rounded-t-lg'>
                              <th className='w-[45%] '>Social factors</th>
                              <th className='w-[40%] '>Description</th>
                              <th>Date recorded</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td className='border'>Alcohol consumption (latest ever)</td>
                              <td></td>
                              <td></td>
                           </tr>
                           <tr>
                              <td className='border'>Smoking (latest ever)</td>
                              <td></td>
                              <td></td>
                           </tr>
                           
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>   
      </> 
   );    
}

export default Modal
{/* <div className="overlayBackground" onClick={()=>setIsModalOpen(false)}> */}
{/* )
               : null
         } */}{/* {
            openModal ?
               ( */}