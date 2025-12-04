import React from 'react'
import { TfiArrowRight } from "react-icons/tfi";
import { TfiArrowLeft } from "react-icons/tfi";
import { GrClose } from "react-icons/gr";
import { SystmOneReportKeys, EMISReportKeys } from '@/modules/cvd/constants/cvdDataEnums';
import ModalChart from './ModalChart';

type IndexMap = typeof SystmOneReportKeys | typeof EMISReportKeys
type ModalProps = {
   setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
   selectedPatientIndex : number |undefined
   setSelectedPatientIndex: React.Dispatch<React.SetStateAction<number | undefined>>,
   filteredData : string[][],
   reportKeys : IndexMap,
   toggleSelectedPatient: (patientId: number) => void;
   selectedForExport : Record<string, boolean>
}
export default function Modal<EnumType extends number>({ setIsModalOpen, selectedPatientIndex, setSelectedPatientIndex, filteredData, reportKeys, toggleSelectedPatient, selectedForExport }: ModalProps){
 


   const handleNextPatient = (direction: "previous" | "next" ) => {
      let nextPatientIndex = 0 
      if (selectedPatientIndex){
         if(direction === "next"){
            
               nextPatientIndex = (selectedPatientIndex + 1) % filteredData.length;
            }
            
         
         else if(direction === "previous"){
            if(selectedPatientIndex === 0 ){
               nextPatientIndex = filteredData.length - 1;
            }
            else nextPatientIndex = selectedPatientIndex - 1;
         }
      }
      setSelectedPatientIndex(nextPatientIndex);
  
   };
   // console.log(filteredData)
   // const reportKeys = importedData?.config?.reportKeys


   const cvdModalConfig = {
      medicationTable : {
         tableHeaders : ["Medication", "Medication name", "Date recorded"],
         tableData : [
            {  info : "ACEi/ARB (6m)", description : reportKeys?.ACEi_ARB_Name_Dosage_Quantity, dateRecorded :  reportKeys?.ACEi_ARB_Issue_Date  },
            {  info : "Beta-blocker (6m)", description : reportKeys?.Beta_Blocker_Name_Dosage_Quantity, dateRecorded :  reportKeys?.Beta_Blocker_Issue_Date },
            {  info : "Calcium Channel Blockers (CCB)(6m)", description : reportKeys?.Ca_Channel_Name_Dosage_Quantity, dateRecorded : reportKeys?.Beta_Blocker_Issue_Date },
            {  info : "Thiazide(-like) diuretic (6m)	", description : reportKeys?.Thiazides_Name_Dosage_Quantity, dateRecorded : reportKeys?.Thiazides_Issue_Date },
            {  info: "Other (e.g. centrally-acting, loop diuretic)(6m)", description: reportKeys?.Other_Diuretic_Name_Dosage_Quantity, dateRecorded : reportKeys?.Other_Diuretic_Name_Issue_Date },
         ],
      },

      lipidsMedicationTable : {
         tableHeaders : ["Lipids medication", "Medication name", "Date recorded"],
         tableData : [
            {  info: "Statin any/high intensity (6m)", description : reportKeys?.Statin_Name_Dosage_Quantity, dateRecorded : reportKeys?.Statin_Issue_Date },
            {  info: "Ezetimbe (6m)", description : reportKeys?.Ezetimbe_Issue_Date, dateRecorded : reportKeys?.Ezetimbe_Issue_Date },
            {  info: "Bempedoic (6m)", description : reportKeys?.Bempedoic_Acid_Name_Dosage_Quantity, dateRecorded : reportKeys?.Bempedoic_Acid_Name_Issue_Date },
            {  info: "PCSK9 (incl. Inclisiran) (6m)", description : reportKeys?.PCSK9_Name_Dosage_Quantity, dateRecorded : reportKeys?.PCSK9_Issue_Date },
         ],
      },

      statinExclusion : {
         tableHeaders : ["Statin exclusion", "Description", "Date recorded"],
         tableData : [
            {  info : "Contraindicated (latest ever)", description : reportKeys?.Statin_Contra_Code_Term, dateRecorded : reportKeys?.Statin_Contra_Date   },
            {  info : "Patient declined (latest ever)", description : reportKeys?.Statin_Decline_Code_Term, dateRecorded : reportKeys?.Statin_Decline_Date  },
         ]
      },

      adverseMeds : {
         tableHeaders : ["AdverseMeds", "Description", "Date recorded"],
         tableData : [
            { info : "NSAIDs (excl. aspirin) (6m)", description : reportKeys?.NSAID_Name_Dosage_Quantity, dateRecorded : reportKeys?.NSAID_Issue_Date },
         ]
      },

      clinicalData : {
         tableHeaders : ["Clinical data", "Description", "Date recorded"],
         tableData : [
            { info : "Total cholestrol (latest ever)", value : reportKeys?.Total_Cholestrol_Value, dateRecorded : reportKeys?.Total_Cholestrol_Date},
            { info : "HDL cholestrol (latest ever)", value : reportKeys?.HDL_Cholestrol_Value, dateRecorded : reportKeys?.HDL_Cholestrol_Date},
            { info : "LDL cholestrol (latest ever)", value : reportKeys?.LDL_Cholestrol_Value, dateRecorded : reportKeys?.LDL_Cholestrol_Date},
            { info : "non-HDL cholestrol (latest ever)", value : reportKeys?.Non_HDL_Cholestrol_Value, dateRecorded : reportKeys?.Non_HDL_Cholestrol_Date},
            { info : "Ratio total cholestrol/HDL (latest ever)", value : "", dateRecorded: "" }, //CHECK WITH ZAHEER
            { info : "Triglycerides (latest ever)", value : reportKeys?.Triglyceride_Value, dateRecorded : reportKeys?.Triglyceride_Date},
            { info : "eGFR (latest ever)", value : reportKeys?.EGFR_Value, dateRecorded : reportKeys?.EGFR_Date},
            { info : "Serum creatinine (latest ever)", value : reportKeys?.Serum_Creatinine_Value, dateRecorded : reportKeys?.Serum_Creatinine_Date},
            { info : "Urine ACR (latest ever)", value : reportKeys?.ACR_Value, dateRecorded : reportKeys?.ACR_Date},
            { info : "Serum ALT or AST (latest ever)", value : reportKeys?.ALT_Value, dateRecorded : reportKeys?.ALT_Date},
            { info : "Pulse check (latest ever)", value : "", dateRecorded :""}, //CHECK WITH ZAHEER
         ]
      },

      comorbidities : {
         tableHeaders : ["Co-morbidities", "Description", "Date recorded"],
         tableData : [
            {  info: "CVD (IHD/Strike/TIA/PAD)", description : reportKeys?.CVD, dateRecorded : ""},
            {  info: "Hypertension", description : reportKeys?.Hypertension_Code_Term, dateRecorded : ""},
            {  info: "Heart Failure", description : reportKeys?.Heart_Failure_Code_Term, dateRecorded : ""},
            {  info: "Diabetes (T1/T2)", description : reportKeys?.Diabetes_Code_Term, dateRecorded : ""},
            {  info: "AF", description : reportKeys?.AF_Code_Term, dateRecorded : ""}, //CHECK WITH ZAHEER
            {  info: "CKD 3-5", description : reportKeys?.CKD_Code_Term, dateRecorded : ""}, //CHECK WITH ZAHEER
            {  info: "Rheumatoid Arthritis or Lupus", description : reportKeys?.RA_SLE_Code_Term, dateRecorded : ""}, //CHECK WITH ZAHEER
         ],

      },

      vulnerabilities : {
         tableHeaders : ["Vulnerabilities", "Description", "Date recorded"],
         tableData : [
            {  info: "SMI", description : reportKeys?.SMI_Code_Term, dateRecorded : ""},
            {  info: "Frailty score", description : reportKeys?.Frailty_Score_Code_Term, dateRecorded : reportKeys?.Frailty_Score_Date},
            {  info: "Housebound", description : reportKeys?.HouseB_CareH_Code_Term, dateRecorded : ""},
            {  info: "Learning disability", description : reportKeys?.Learning_Difficulties_Code_Term, dateRecorded : ""},
            {  info: "Palliative care", description : reportKeys?.Palliative_Care_Code_Term, dateRecorded : ""},
            {  info: "Dementia", description : reportKeys?.Dementia_Code_Term, dateRecorded : ""},
            {  info: "Cancer", description : reportKeys?.Cancer_Code_Term, dateRecorded : ""},
         ]
      },


      socialFactors : {
         tableHeaders: ["Social factors", "Description", "Date recorded"],
         tableData : [
            { info: "Alcohol consumption (latest ever)", description: reportKeys?.Alcohol_Value, dateRecorded: reportKeys?.Alcohol_Date},
            { info: "Smoking (latest ever)", description: reportKeys?.Smoking_Code_Term, dateRecorded: ""}, //CHECK WITH ZAHEER
         ]
      }
   }

   const row = filteredData[selectedPatientIndex!]




   return (
      <>

         <div className=" cursor-pointer fixed top-0 left-0 w-full h-full bg-black/90 z-40" onClick={()=> setIsModalOpen(false)}>
            </div>

            <div className=" z-50 bg-white fixed  rounded-t-xl top-30 left-1/2 tranform -translate-x-1/2   w-[900px] ">
                  
                  
                  {/* HEADER */}
                  <div className="flex justify-between items-center  w-full h-12 px-4 rounded-t-lg bg-[#21376A] text-white ">
                     <strong>Patient information</strong>
                     <GrClose className= "cursor-pointer "  onClick={()=>setIsModalOpen(false)}/>
                  </div>

                  {/* GET PREVIOUS AND NEXT PATIENT */}
                  <div className=' bg-white flex justify-center gap-4 p-2 '>
                     <button onClick={()=>handleNextPatient("previous")} className="cursor-pointer  flex flex-col text-sm font-medium hover:font-semibold">
                        <span className= "">Previous patient</span>
                        <TfiArrowLeft className=" m-auto text-gray-500"/>
                     </button>
                   
                     <button  onClick={()=>handleNextPatient("next")}className="cursor-pointer  flex flex-col text-sm font-medium hover:font-semibold"> 
                        <span >Next patient</span>
                        <TfiArrowRight className=" m-auto text-gray-500" />
                     </button>
                  </div>



                  {/* PATIENT DEMOGRAPHIC DATA*/}
                  <div className=' text-xs px-2 flex bg-white py-4'>
                     {/* TABLE 1 */}
                     <div className=" w-[50%]">
                        <div className="flex flex-col gap-2   text-left">
                           <div className="flex ">
                              <h2 className=" w-[30%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg">Full name</h2>
                              <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1">{filteredData[selectedPatientIndex][reportKeys.Full_Name]}</div>
                           </div>
                           <div className="flex">
                              <h2 className=" w-[30%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg">Date of birth</h2>
                              <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1">{filteredData[selectedPatientIndex][reportKeys.Date_Of_Birth]}</div>
                           </div>
                           <div className="flex">
                              <h2 className=" w-[30%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg">NHS number</h2>
                              <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1"></div>
                           </div>
                           <div className="flex h-14">
                              <h2 className=" w-[30%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg">Ethnicity</h2>
                              <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1 ">{filteredData[selectedPatientIndex][reportKeys.Ethnicity]}</div>
                           </div>
                        </div>
                     </div>
                     


                     {/* TABLE 2 */}
                     <div className=" w-[50%]">
                        <div className="flex flex-col gap-2  text-left">
                           <div className="flex">
                              <h2 className="w-[36%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg whitespace-nowrap">Patient record #</h2>
                              <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1">?????</div>
                           </div>
                           <div className="flex">
                              <h2 className="w-[36%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg">Gender</h2>
                              <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1">{filteredData[selectedPatientIndex][reportKeys.Gender]}</div>
                           </div>
                           <div className="flex">
                              <h2 className="w-[36%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg">Age</h2>
                              <div className="border border-gray-400 w-[65%] rounded-r-lg pl-2 py-1">{filteredData[selectedPatientIndex][reportKeys.Age]}</div>
                           </div>
                           <div className="flex h-6">
                              <h2 className="w-[36%] text-white pl-2 bg-[#21376A] font-semibold py-1 rounded-l-lg">Mobile telephone</h2>
                              <div className="border border-gray-400 w-[65%]  rounded-r-lg pl-2 py-1">{filteredData[selectedPatientIndex][reportKeys.Mobile_Number]}</div>
                           </div>
                           <div className="text-left text-sm ml-1">
                              <label className=" inline-flex gap-2 items-center cursor-pointer font-bold" htmlFor="modalCheckBox">
                                 Select for export
                                 <input
                                    type="checkbox"
                                    id="modalCheckBox"
                                    // checked = {!!selectedForExport[selectedPatientData[AFibColumns.NHS_Number]]}
                                    checked = {row[reportKeys!.Full_Name] in selectedForExport}
                                    onChange={()=>toggleSelectedPatient(selectedPatientIndex!)}
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
                  <div className="  w-full my-4  px-2 text-sm max-h-[40vh]  overflow-auto bg-white">
                     {/* BLOOD PRESSURE CHART TABLE */}
                     <table className='w-full  border-separate border-spacing-0  rounded-t-lg '>
                        <thead className=''>
                           <tr className="text-white text-sm bg-[#21376A]   ">
                           
                             
                              <th className="py-2 px-4  rounded-tl-lg w-[30%] ">Systolic BP value (mmHg)</th>
                              <th className='  w-[25%] py-2 px-4'>Date recorded (last 3y)</th>
                            
                              
                              <th className='rounded-tr-lg  '></th>

                           </tr>
                        </thead>
                        <tbody className=' border-[#21376A]'>
                           <tr>

                              
                              <td className="border-l border-b"></td>
                              <td className= "border-b"></td>
                              
                              
                              
                              <td className="border-b border-r"colSpan={3}><ModalChart /></td>

                           </tr>
                             
                           
                        </tbody>
                     </table>



                     {/* MEDICATIONS TABLE */}

                    {
                     Object.entries(cvdModalConfig).map(([config, tableObject]) => {
                        // console.log(Object.entries(cvdModalConfig))
                        // console.log(tableObject)
                        return (
                           <table className="w-full  mt-4 border-separate border-spacing-0  rounded-t-lg">
                              <thead>
                                 <tr className=' rounded-t-lg '>
                                    {
                                       tableObject.tableHeaders.map((header, index)=> {
                                          const firstHeader = index === 0;
                                          const lastHeader = index === tableObject.tableHeaders.length - 1
                                          
                                          return (
                                             <th className={`p-2 bg-[#21376A] text-white${firstHeader ? " rounded-tl-lg": ""} ${lastHeader ? "rounded-tr-lg " : ""}`

                                             }
                                             
                                             >{header}</th>
                                          )
                                       })
                                    }
                                 </tr>


                              </thead>
                              <tbody className="">
                                 {
                                    tableObject.tableData.map((row, index)=> {
                                       return (
                                       <tr className={`${index % 2 !== 0 ? "bg-gray-100": ""} `}>
                                          <td className="border-l border-b px-2 py-0.5 font-semibold w-[38%]">{row.info}</td>
                                          <td className="border-b text-center px-2">{filteredData[selectedPatientIndex][row.description]}</td>
                                          <td className='border-b border-r w-[20%] text-center px-2'>{filteredData[selectedPatientIndex][row.dateRecorded]}</td>
                                       </tr>)
                                    })
                                 }
                              </tbody>
                              
                           </table>
                           
                        )
                       
                     })
                    }
                    
                  </div>
            </div>
      </>   
         
   );    
}











































//  Object.entries(tableObject).map(([data, tableConfig])=>{
                           
                           //    return (
                           //       <div>hi</div>
                           //       // <table className='w-full text-left mt-4 pt-4'>  
                                    
                           //       //    <thead className=' '>
                                        
                           //       //             <tr className='  text-white bg-[#21376A] rounded-t-lg'>
                           //       //                <th className='w-[45%] p-2'>{tableConfig[0]}</th>
                           //       //                <th className='w-[40%] '>{tableConfig[1]}</th>
                           //       //                <th>{tableConfig[2]}</th>
                           //       //             </tr>

                           //       //    </thead>
                                   
                           //       // </table>
                           //    )

                           //  })
//   Object.entries(tableObject).map(([data, tableConfig])=>{
                           
//                               return (
//                                  <div>hi</div>
                                 // <table className='w-full text-left mt-4 pt-4'>  
                                    
                                 //    <thead className=' '>
                                        
                                 //             <tr className='  text-white bg-[#21376A] rounded-t-lg'>
                                 //                <th className='w-[45%] p-2'>{tableConfig[0]}</th>
                                 //                <th className='w-[40%] '>{tableConfig[1]}</th>
                                 //                <th>{tableConfig[2]}</th>
                                 //             </tr>

                                 //    </thead>
                                   
                           //       // </table>
                           //    )

                           //  })


 {/* // <tbody> */}
                                    {/* //    { *
                                    //       tableConfig.map((row)=> {
                                 
                                    //          return (
                                    //             <tr className= "border">
                                    //                <td className=''>{row.info}</td>
                                    //                <td>{filteredData[selectedPatientIndex][row.description]}</td>
                                    //                <td>{filteredData[selectedPatientIndex][row.dateRecorded]}</td>
                                    //             </tr>
                                    //          )
                                             
                                    //       })
                                    //    }
                                    // </tbody>
                                    }











































  // const {selectedPatientRow, , , setSelectedPatientRow, filteredData, importedData} = useDisplay()
// export default Modal


{/* <button className = "text-sm cursor-pointer" onClick={()=>setIsModalOpen(false)}>
   &#10005;
</button> */}



        // tableHeaders : ["Medication", "Medication name", "Date recorded"],
         // tableBody :[
         //    {  description: "ACEi/ARB (6m)", details : reportKeys?.ACEi_ARB_Name_Dosage_Quantity, date : reportKeys?.ACEi_ARB_Issue_Date },
         //    {  description: "Beta-blocker (6m)", details : reportKeys?.Beta_Blocker_Name_Dosage_Quantity, date : reportKeys?.Beta_Blocker_Issue_Date },
         //    {  description: "Calcium Channel Blockers (CCB)(6m)", details : reportKeys?.Ca_Channel_Name_Dosage_Quantity, date : reportKeys?.Beta_Blocker_Issue_Date },
         //    {  description: "Thiazide(-like) diuretic (6m)	", details : reportKeys?.Thiazides_Name_Dosage_Quantity, date : reportKeys?.Thiazides_Issue_Date },
         //    {  description: "Other (e.g. centrally-acting, loop diuretic)(6m)", details : reportKeys?.Other_Diuretic_Name_Dosage_Quantity, date : reportKeys?.Other_Diuretic_Name_Issue_Date },
         // ],


            

      // lipidsMedicationTable : {
      //    tableHeaders : ["Lipids medications", "Medication name", "Date recorded"],
      //    tableBody : [
      //       {  description: "Statin any/high intensity (6m)", details : reportKeys?.Statin_Name_Dosage_Quantity, date : reportKeys?.Statin_Issue_Date },
      //       {  description: "Ezetimbe (6m)", details : reportKeys?.Ezetimbe_Issue_Date, date : reportKeys?.Ezetimbe_Issue_Date },
      //       {  description: "Bempedoic (6m)", details : reportKeys?.Bempedoic_Acid_Name_Dosage_Quantity, date : reportKeys?.Bempedoic_Acid_Name_Issue_Date },
      //       {  description: "PCSK9 (incl. Inclisiran) (6m)", details : reportKeys?.PCSK9_Name_Dosage_Quantity, date : reportKeys?.PCSK9_Issue_Date },
      //       {  description: "Other lipid lowering therapy (6m)", details : reportKeys?.Other_Lipid_Lowering_Name_Dosage_Quantity, date : reportKeys?.Other_Lipid_Lowering_Issue_Date },
      //    ]
      // },

      // StatinExclusion : {

      // } // statinExclusion : {
      //    tableData : [
      //       {  statinExclusion : "Contraindicated (latest ever)", description : reportKeys?.Statin_Contra_Code_Term, dateRecorded : reportKeys?.Statin_Contra_Date   },
      //       {  StatinExclusion : "Patient declined (latest ever)", description : reportKeys?.Statin_Decline_Code_Term, dateRecorded : reportKeys?.Statin_Decline_Date},
      //    ],
      // },

      // adverseMeds : {
      //    tableData : [
      //       { adverseMeds : "NSAIDs (excl. aspirin) (6m)", description : reportKeys?.NSAID_Name_Dosage_Quantity, dateRecorded : reportKeys?.NSAID_Issue_Date },
      //    ]
      // },

      // clinicalData : {
      //    tableData : [
      //       { clinicalData : "Total cholestrol (latest ever)", value : reportKeys?.Total_Cholestrol_Value, dateRecorded : reportKeys?.Total_Cholestrol_Date},
      //       { clinicalData : "HDL cholestrol (latest ever)", value : reportKeys?.HDL_Cholestrol_Value, dateRecorded : reportKeys?.HDL_Cholestrol_Date},
      //       { clinicalData : "LDL cholestrol (latest ever)", value : reportKeys?.LDL_Cholestrol_Value, dateRecorded : reportKeys?.LDL_Cholestrol_Date},
      //       { clinicalData : "non-HDL cholestrol (latest ever)", value : reportKeys?.Non_HDL_Cholestrol_Value, dateRecorded : reportKeys?.Non_HDL_Cholestrol_Date},
      //       { clinicalData : "Ratio total cholestrol/HDL (latest ever)", value : "", dateRecorded: "" }, //CHECK WITH ZAHEER
      //       { clinicalData : "Triglycerides (latest ever)", value : reportKeys?.Triglyceride_Value, dateRecorded : reportKeys?.Triglyceride_Date},
      //       { clinicalData : "eGFR (latest ever)", value : reportKeys?.EGFR_Value, dateRecorded : reportKeys?.EGFR_Date},
      //       { clinicalData : "Serum creatinine (latest ever)", value : reportKeys?.Serum_Creatinine_Value, dateRecorded : reportKeys?.Serum_Creatinine_Date},
      //       { clinicalData : "Urine ACR (latest ever)", value : reportKeys?.ACR_Value, dateRecorded : reportKeys?.ACR_Date},
      //       { clinicalData : "Serum ALT or AST (latest ever)", value : reportKeys?.ALT_Value, dateRecorded : reportKeys?.ALT_Date},
      //       { clinicalData : "Pulse check (latest ever)", value : "", dateRecorded :""}, //CHECK WITH ZAHEER
      //    ]
      // },

      // cvdComorbidities : {
      //    tableData : [
      //       {  cvdComorbidities: "CVD (IHD/Strike/TIA/PAD)", description : reportKeys?.CVD, dateRecorded : ""},
      //       {  cvdComorbidities: "Hypertension", description : reportKeys?.Hypertension_Code_Term, dateRecorded : ""},
      //       {  cvdComorbidities: "Heart Failure", description : reportKeys?.Heart_Failure_Code_Term, dateRecorded : ""},
      //       {  cvdComorbidities: "Diabetes (T1/T2)", description : reportKeys?.Diabetes_Code_Term, dateRecorded : ""},
      //       {  cvdComorbidities: "AF", description : reportKeys?.AF_Code_Term, dateRecorded : ""}, //CHECK WITH ZAHEER
      //       {  cvdComorbidities: "CKD 3-5", description : reportKeys?.CKD_Code_Term, dateRecorded : ""}, //CHECK WITH ZAHEER
      //       {  cvdComorbidities: "Rheumatoid Arthritis or Lupus", description : reportKeys?.RA_SLE_Code_Term, dateRecorded : ""}, //CHECK WITH ZAHEER
      //    ]
      // },

      // vulnerabilites : {
      //    tableData : [
      //       {  vulnerabilities: "SMI", description : reportKeys?.SMI_Code_Term, dateRecorded : ""},
      //       {  vulnerabilities: "Frailty score", description : reportKeys?.Frailty_Score_Code_Term, dateRecorded : reportKeys?.Frailty_Score_Date},
      //       {  vulnerabilities: "Housebound", description : reportKeys?.HouseB_CareH_Code_Term, dateRecorded : ""},
      //       {  vulnerabilities: "Learning disability", description : reportKeys?.Learning_Difficulties_Code_Term, dateRecorded : ""},
      //       {  vulnerabilities: "Palliative care", description : reportKeys?.Palliative_Care_Code_Term, dateRecorded : ""},
      //       {  vulnerabilities: "Dementia", description : reportKeys?.Dementia_Code_Term, dateRecorded : ""},
      //       {  vulnerabilities: "Cancer", description : reportKeys?.Cancer_Code_Term, dateRecorded : ""},
      //    ]
      // },
      // socialFactors : {
      //    tableData : [
      //       { socialFactors: "Alcohol consumption (latest ever)", description: reportKeys?.Alcohol_Value, dateRecorded: reportKeys?.Alcohol_Date},
      //       { socialFactors: "Smoking (latest ever)", description: reportKeys?.Smoking_Code_Term, dateRecorded: ""}, //CHECK WITH ZAHEER
      //    ]
      // }





       {/* <table className='w-full text-left mt-4 pt-4'>
                        <thead className='border '>
                           <tr className='flex p-2 text-white bg-[#21376A] rounded-t-lg'>
                              <th className='w-[45%] '>Medication</th>
                              <th className='w-[40%] '>Medication name</th>
                              <th>Date recorded</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td className='border pl-4'>ACEi/ARB (6m)</td>
                              <td></td>
                              <td></td>
                           </tr>
                           <tr>
                              <td className='border pl-4'>Beta-blocker (6m)</td>
                              <td></td>
                              <td></td>

                           </tr>
                           <tr>
                              <td className='border pl-4'>Calcium Channel Blockers (CCB)(6m)</td>
                              <td></td>
                              <td></td>
                           </tr>                           
                           <tr>
                              <td className='border pl-4'>Thiazide(-like) diuretic (6m)</td>
                              <td></td>
                              <td></td>
                           </tr>                           
                           <tr>
                              <td className='border pl-4'>Other (e.g. centrally-acting, loop diuretic)(6m)</td>
                              <td></td>
                              <td></td>

                           </tr>                           
                           <tr>
                              <td className='border pl-4'>Antiplatelet</td>
                              <td></td>
                              <td></td>

                           </tr>
                           
                        </tbody>
                     </table> */}

                     {/*Lipids medications */}
                     {/* <table className='w-full text-left mt-4'>
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
                     </table> */}

                     {/* STATIN EXCLUSION */}
                     {/*  */}
      
      // <table className='w-full text-left mt-4'>
      //                   <thead className='border '>
      //                      <tr className=' flex p-2 text-white bg-[#21376A] rounded-t-lg'>
      //                         <th className='w-[45%] '>Statin exclusion</th>
      //                         <th className='w-[40%] '>Description</th>
      //                         <th>Date recorded</th>
      //                      </tr>
      //                   </thead>
      //                   <tbody>
      //                      <tr>
      //                         <td className='border'>Contraindicated (latest ever)</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr>
      //                      <tr>
      //                         <td className='border'>Patient declined (latest ever)</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr>
      //                   </tbody>
      //                </table>

      //                <table className='w-full text-left mt-4'>
      //                   <thead className='border '>
      //                      <tr className=' flex p-2 text-white bg-[#21376A] rounded-t-lg'>
      //                         <th className='w-[45%] '>Adverse meds</th>
      //                         <th className='w-[40%] '>Description</th>
      //                         <th>Date recorded</th>
      //                      </tr>
      //                   </thead>
      //                   <tbody>
      //                      <tr>
      //                         <td className='border'>NSAIDs (excl. aspirin) (6m)</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr>
      //                   </tbody>
      //                </table>

      //                <table className='w-full text-left mt-4'>
      //                   <thead className='border '>
      //                      <tr className=' flex p-2 text-white bg-[#21376A] rounded-t-lg'>
      //                         <th className='w-[45%] '>Clinical data</th>
      //                         <th className='w-[40%] '>Value</th>
      //                         <th>Date recorded</th>
      //                      </tr>
      //                   </thead>
      //                   <tbody>
      //                      <tr>
      //                         <td className='border'>Total cholestrol (latest ever)</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr>
      //                      <tr>
      //                         <td className='border'>HDL cholestrol (latest ever)</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr>
      //                      <tr>
      //                         <td className='border'>LDL cholestrol (latest ever)</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr><tr>
      //                         <td className='border'>non-HDL cholestrol (latest ever)</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr><tr>
      //                         <td className='border'>Ratio total cholestrol/HDL (latest ever)</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr><tr>
      //                         <td className='border'>Triglycerides (latest ever)</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr><tr>
      //                         <td className='border'>eGFR (latest ever)</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr><tr>
      //                         <td className='border'>Serum creatinine (latest ever)</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr><tr>
      //                         <td className='border'>Urine ACR (latest ever)</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr>
      //                      <tr>
      //                         <td className='border'>Serum ALT or AST (latest ever)</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr>
      //                      <tr>
      //                         <td className='border'>Pulse check (latest ever)</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr>
      //                   </tbody>
      //                </table>

      //                <table className='w-full text-left mt-4'>
      //                   <thead className='border '>
      //                      <tr className=' flex p-2 text-white bg-[#21376A] rounded-t-lg'>
      //                         <th className='w-[45%] '>CVD and Comorbidities</th>
      //                         <th className='w-[40%] '>Description</th>
      //                         <th>Date recorded</th>
      //                      </tr>
      //                   </thead>
      //                   <tbody>
      //                      <tr>
      //                         <td className='border'>CVD (IHD/Stroke/TIA/PAD)</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr>
      //                      <tr>
      //                         <td className='border'>Hypertension</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr>
      //                      <tr>
      //                         <td className='border'>Heart Failure</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr><tr>
      //                         <td className='border'>Diabetes(T1/T2)</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr><tr>
      //                         <td className='border'>AF</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr><tr>
      //                         <td className='border'>CKD 3-5</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr><tr>
      //                         <td className='border'>Rheumatoid Arthritis or Lupus</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr>
      //                   </tbody>
      //                </table>


      //                <table className='w-full text-left mt-4'>
      //                   <thead className='border '>
      //                      <tr className=' flex p-2 text-white bg-[#21376A] rounded-t-lg'>
      //                         <th className='w-[45%] '>Vulnerabilities</th>
      //                         <th className='w-[40%] '>Description</th>
      //                         <th>Date recorded</th>
      //                      </tr>
      //                   </thead>
      //                   <tbody>
      //                      <tr>
      //                         <td className='border'>SMI</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr>
      //                      <tr>
      //                         <td className='border'>Frailty score</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr>
      //                      <tr>
      //                         <td className='border'>Housebound</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr><tr>
      //                         <td className='border'>Learning disability</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr><tr>
      //                         <td className='border'>Palliative care</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr><tr>
      //                         <td className='border'>Dementia</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr><tr>
      //                         <td className='border'>Cancer</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr>
      //                   </tbody>
      //                </table>

      //                <table className='w-full text-left mt-4'>
      //                   <thead className='border '>
      //                      <tr className=' flex p-2 text-white bg-[#21376A] rounded-t-lg'>
      //                         <th className='w-[45%] '>Social factors</th>
      //                         <th className='w-[40%] '>Description</th>
      //                         <th>Date recorded</th>
      //                      </tr>
      //                   </thead>
      //                   <tbody>
      //                      <tr>
      //                         <td className='border'>Alcohol consumption (latest ever)</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr>
      //                      <tr>
      //                         <td className='border'>Smoking (latest ever)</td>
      //                         <td></td>
      //                         <td></td>
      //                      </tr>
                           
      //                   </tbody>
      //                </table>