/** 
 * ImportScreen.tsx
 * 
 * Purpose: This is the home screen it allows the user to select a software tool and clinical system
 * and then upload a CSV file for processing 
 * Notes: 
 * - selected tool and system state are kept local; can be lifted to context later if needed
 * - File upload functionality is delegated to useFileImport hook 
**/

"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/button';
import SoftwareTools from '@/constants/softwareTools';
import ClinicalSystems from '@/constants/clinicalSystems';
import useFileImport from '@/features/import/hooks/useFileImport';
import { Card, CardContent} from "@/components/ui/card";

import getFileInputProps from '../helpers/importHelpers';
import { executeImport } from '../services/importService';
import { useDisplay } from '@/context/DispayContext';
import { useRouter } from 'next/navigation';
import ErrorMessages from "@/constants/messages";


const ImportScreen = () => {
   const [selectedSoftwareTool, setSelectedSoftwareTool] = useState<SoftwareTools>(SoftwareTools.NotSelected)
   const [selectedClinicalSystem, setSelectedClinicalSystem] = useState<ClinicalSystems>(ClinicalSystems.NotSelected)
   const [selectedReport, setSelectedReport] = useState<FileList | null>(null)
   const [isImporting, setIsImporting] = useState<boolean>(false)
   const [importError, setImportError] = useState<ErrorMessages>(ErrorMessages.None);

   const { setImportedData } = useDisplay();
   const router = useRouter();
 
   const {
      handleImportButtonClick,
      fileInputRef,
      handleFileChange,
   } = useFileImport(selectedClinicalSystem, selectedSoftwareTool, setSelectedReport, setImportError);
   
   const handleSelectTool = (event: React.ChangeEvent<HTMLInputElement>) => {
      const eventTarget = event.target as HTMLInputElement;
      const eventTargetValue = eventTarget.value as SoftwareTools;
      setSelectedSoftwareTool(eventTargetValue);
   }

   const handleSelectClinicalSystem = (event: React.ChangeEvent<HTMLInputElement>) => {
      const eventTarget = event.target as HTMLInputElement;
      const eventTargetValue = eventTarget.value as ClinicalSystems;
      setSelectedClinicalSystem(eventTargetValue);
   }
   
   const inputProps = getFileInputProps(selectedSoftwareTool, selectedClinicalSystem);

   useEffect(()=> {

      if (selectedReport && selectedClinicalSystem && selectedSoftwareTool && !isImporting){
        
         setIsImporting(true);
         const runImport = async () => {  
            return await executeImport(selectedSoftwareTool, selectedClinicalSystem, selectedReport)
         }
         runImport().then((result) => {

            if(result.importAttempt === "pass"){
               setImportedData(result.parsedResult!) //Exclamation is non-null opearator telling Typescript that this value will never be null 
               router.push("/display")       
            }
            else  {
               setImportError(result.message )
            }
         })
         .catch (()=> setImportError(ErrorMessages.GeneralError))
         .finally(()=> setIsImporting(false))
      }

   },[selectedSoftwareTool, selectedClinicalSystem, selectedReport])

   

   return (

      <main  >
         <div className= "flex  items-center bg-[#21376A]  justify-center h-screen overflow-x-hidden">
            <Card className = "border border-black w-[360px] text-center  px-0  rounded-b-none ">
               <CardContent>
                  <div className="text-[#21376A] ">
                     <h2 className="text-lg font-bold  leading-4">Clinical Effectiveness Group</h2>
                     <h1 className="text-2xl font-extrabold  leading-8">CEG software tools </h1>
                  </div>
               
               
                  <div className=" mt-4 text-md leading-5" >
                     These tools have been developed to present clinical information coded in the patient health record. 
                     They are not diagnostic tools and are not intended to replace clinical judgement.
                  </div>
                  
                  {/* Software tool selection */}
                  <div className="mt-2 text-[#21376A]">
                     <div>
                        <p className="text-lg  font-normal leading-4.5">Select CEG software tool</p>
                        <div className="flex gap-4  justify-center">
                           <div>
                              <input
                                 id="af_default_radio"
                                 type= "radio"
                                 value ={SoftwareTools.af}
                                 checked = {selectedSoftwareTool == SoftwareTools.af}
                                 onChange = {handleSelectTool}
                              />
                              <label 
                                 htmlFor='af_default_radio' 
                                 className='text-lg font-extrabold cursor-pointer af_radio_label'>
                                    AF
                              </label>
                           </div>
                           <div>
                              <input
                                 id="cvd_default_radio"
                                 type= "radio"
                                 value ={SoftwareTools.cvd}
                                 checked = {selectedSoftwareTool == SoftwareTools.cvd}
                                 onChange = {handleSelectTool}
                              />
                              <label 
                                 htmlFor='cvd_default_radio'
                                 className='text-lg font-extrabold cursor-pointer cvd_radio_label'>CVD</label>
                           </div>
                     </div>
                     </div>
                  </div>
                  
                  {/* Clinical system selection */}
                  <div className="mt-2 text-[#21376A]">
                     <p className="text-lg font-normal leading-5">Select clinical system and import</p>
                     <div className="flex justify-center gap-4">
                        <div>
                           
                           <input 
                              id="emis_default_radio"
                              type = "radio"
                              value = {ClinicalSystems.EMIS}
                              checked = {selectedClinicalSystem == ClinicalSystems.EMIS}
                              onChange = {handleSelectClinicalSystem}
                           />
                           <label htmlFor = "emis_default_radio" className="cursor-pointer text-lg font-extrabold emis_radio_label">EMIS Web </label>
                        </div>

                        <div>
                           
                           <input 
                              id="systmone_default_radio"
                              type = "radio"
                              value = {ClinicalSystems.SystmOne}
                              checked = {selectedClinicalSystem == ClinicalSystems.SystmOne}
                              onChange = {handleSelectClinicalSystem}
                           />
                           <label htmlFor = "systmone_default_radio" className="cursor-pointer text-lg font-extrabold systmone_radio_label">SystmOne </label>
                        </div>

                     </div>
     
                  </div>
                  <p className="text-md mt-2 text-red-600 leading-4" >{importError}</p>
                  <div className="mt-4">
                     <input  {...inputProps} ref ={fileInputRef} onChange={handleFileChange} style={{display:"none"}}></input>
                     <Button 
                        className="text-center bg-gradient-to-r from-[#7B0E72] from-70% to-[#E6007E]
                           text-white w-[7em] text-md import_button cursor-pointer font-normal  py-4 "
                        onClick={handleImportButtonClick}
                        disabled = {isImporting}
                     >
                        Select report
                     </Button>
                     
                  </div>
               </CardContent> 
            </Card>
         </div>
      </main>
   )
}

export default ImportScreen




