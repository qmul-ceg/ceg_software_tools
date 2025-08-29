import React, { useState } from 'react'

type ChildProps = {
   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const Modal = ({ setIsModalOpen }: ChildProps) => {
   // const [openModal, setOpenModal] = useState<boolean>(true)

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
                           <span>Previous patient</span>
                           <span className="">&larr;</span>
                        </div>
                     </button>
                     {/* <button className=" " onClick={handleNextPatient}> */}
                     <button className="cursor-pointer border">
                        <div className="flex flex-col text-sm hover:font-medium">
                           <span>Next patient</span>
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
                              <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1"></div>
                           </div>
                           <div className="flex">
                              <h2 className=" w-[30%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg">Date of birth</h2>
                              <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1"></div>
                           </div>
                           <div className="flex">
                              <h2 className=" w-[30%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg">NHS number</h2>
                              <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1"></div>
                           </div>
                           <div className="flex h-14">
                              <h2 className=" w-[30%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg">Ethnicity</h2>
                              <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1 ">
                           
                              </div>
                           </div>
                        </div>
                     </div>
                     


                     {/* TABLE 2 */}
                     <div className="border w-[50%]">
                        <div className="flex flex-col gap-2  text-left">
                           <div className="flex">
                              <h2 className="w-[36%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg whitespace-nowrap">Patient record #</h2>
                              <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1"></div>
                           </div>
                           <div className="flex">
                              <h2 className="w-[36%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg">Gender</h2>
                              <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1"></div>
                           </div>
                           <div className="flex">
                              <h2 className="w-[36%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg">Age</h2>
                              <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1"></div>
                           </div>
                           <div className="flex h-6">
                              <h2 className="w-[36%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg">Mobile telephone</h2>
                              <div className="border border-gray-400 w-[65%]  rounded-r-lg pl-2 py-1"></div>
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