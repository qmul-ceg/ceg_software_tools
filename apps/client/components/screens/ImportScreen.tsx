"use client"
import React, { use, useState } from 'react'
import { Button } from '../ui/button'
import SoftwareTools from '@/constants/softwareTools'
import ClinicalSystems from '@/constants/clinicalSystems'
import useFileImport from '@/hooks/useFileImport'
import { Card, CardContent} from "@/components/ui/card"
import { Source_Sans_3 } from 'next/font/google'
import getFileInputProps from './importScreen.helpers'


const sourceFont = Source_Sans_3({
   subsets:['latin'],
   weight:"500"
   
})

const ImportScreen = () => {
   const [selectedSoftwareTool, setSelectedSoftwareTool] = useState<SoftwareTools>(SoftwareTools.NotSelected)
   const [selectedClinicalSystem, setSelectedClinicalSystem] = useState<ClinicalSystems>(ClinicalSystems.NotSelected)

   const {
      importError,
      handleImportButtonClick,
      fileInputRef,
      handleFileChange,
   } = useFileImport(selectedClinicalSystem, selectedSoftwareTool)


   const handleSelectTool = (event: React.ChangeEvent<HTMLInputElement>) => {
      const eventTarget = event.target as HTMLInputElement
      const eventTargetValue = eventTarget.value as SoftwareTools
      setSelectedSoftwareTool(eventTargetValue)
   }

   const handleSelectClinicalSystem = (event: React.ChangeEvent<HTMLInputElement>) => {
      const eventTarget = event.target as HTMLInputElement
      const eventTargetValue = eventTarget.value as ClinicalSystems
      setSelectedClinicalSystem(eventTargetValue)
   }

   // console.log(selectedSoftwareTool)
   
   const inputProps = getFileInputProps(selectedSoftwareTool, selectedClinicalSystem)


   return (
      <main className={sourceFont.className}>
         <div className= "flex justify-center items-start h-screen bg-[#21376A]">
            <Card className = "w-[500px] text-center mt-[25vh] px-6 py-10">
               <CardContent>
                  <div className="text-[#21376A]">
                     <h2 className="text-xl font-bold ">Clinical Effectiveness Group</h2>
                     <h1 className="text-3xl font-extrabold">CEG software tools</h1>
                  </div>
               
               
                  <div className="font-bold mt-4 text-xl leading-6" >
                     These tools have been developed to present clinical information coded in the patient health record. 
                     They are not diagnostic tools and are not intended to replace clinical judgement.
                  </div>
                  
                  {/* Software tool selection */}
                  <div className="mt-4 text-[#21376A]">
                     <div>
                        <p className="text-2xl mb-2 font-normal">Select CEG software tool</p>
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
                              className='text-2xl font-extrabold cursor-pointer af_radio_label'>
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
                              className='text-2xl font-extrabold cursor-pointer cvd_radio_label'>CVD</label>
                        </div>
                     </div>
                     </div>
                  </div>
                  
                  {/* Clinical system selection */}
                  <div className="mt-2 text-[#21376A]">
                     <p className="text-2xl mb-2 font-normal">Select clinical system and import</p>
                     <div className="flex justify-center gap-4">
                        <div>
                           
                           <input 
                              id="emis_default_radio"
                              type = "radio"
                              value = {ClinicalSystems.EMIS}
                              checked = {selectedClinicalSystem == ClinicalSystems.EMIS}
                              onChange = {handleSelectClinicalSystem}
                           />
                           <label htmlFor = "emis_default_radio" className="cursor-pointer text-2xl font-extrabold emis_radio_label">EMIS Web </label>
                        </div>

                        <div>
                           
                           <input 
                              id="systmone_default_radio"
                              type = "radio"
                              value = {ClinicalSystems.SystmOne}
                              checked = {selectedClinicalSystem == ClinicalSystems.SystmOne}
                              onChange = {handleSelectClinicalSystem}
                           />
                           <label htmlFor = "systmone_default_radio" className="cursor-pointer text-2xl font-extrabold systmone_radio_label">SystmOne </label>
                        </div>

                     </div>
     
                  </div>
                  <p className="text-lg mt-2 text-red-600 leading-5">{importError}</p>
                  <div className="mt-4">
                     
                     <input  {...inputProps} ref ={fileInputRef} onChange={handleFileChange} style={{display:"none"}}></input>

                     <Button 
                        className="text-center bg-gradient-to-r from-[#7B0E72] from-70% to-[#E6007E]
                           text-white w-[6em] text-2xl import_button cursor-pointer font-bold py-6" 
                        onClick={handleImportButtonClick}>
                        Import
                     </Button>
                  </div>
               </CardContent> 
            </Card>
         </div>
      </main>
   )
}

export default ImportScreen




  {/* <h2>Select clinical system</h2> <div>*/}
               {/* <h1></h1> */}
            {/* <h1>CEG Software tools</h1> */}

            // <div>
               
            // </div>

            // <div>
            //    <h2></h2>
      
      
               {/* <div>
                  <label htmlFor='emis_default_radio'>
                     AF
                     <input 
                        type= "radio"
                        value ={SoftwareTools.af}
                        checked = {selectedSoftwareTool == SoftwareTools.af}
                        onChange = {handleSelectTool}
                     />
                  </label>
                  <label htmlFor='systmOne_default_radio'>
                     CVD
                     <input 
                        type= "radio"
                        value ={SoftwareTools.cvd}
                        checked = {selectedSoftwareTool == SoftwareTools.cvd}
                        onChange = {handleSelectTool}
                     />
                  </label>
               </div> */}
                  {/* <div data-value={SoftwareTools.cvd} onChange={handleSelectTool}>CVD</div>
                  <div data-value= {SoftwareTools.af} onChange={handleSelectTool}>AF</div> */}
            
         //    </div>
            
         // </div>  {/* <CardDescription>
                  
               // </CardDescription> */}
               {/* <CardContent>
                  <CardAction>
                     Select software tool */}

                     {/* <div>
                        <label htmlFor='emis_default_radio'>
                           AF
                           <input 
                              type= "radio"
                              value ={SoftwareTools.af}
                              checked = {selectedSoftwareTool == SoftwareTools.af}
                              onChange = {handleSelectTool}
                           />
                        </label>
                        <label htmlFor='systmOne_default_radio'>
                           CVD
                           <input 
                              type= "radio"
                              value ={SoftwareTools.cvd}
                              checked = {selectedSoftwareTool == SoftwareTools.cvd}
                              onChange = {handleSelectTool}
                           />
                        </label>
                     </div> */}
                  {/* </CardAction>
                  <CardAction>
                     Select clinical system
                     <div> */}
                     {/* <label htmlFor='emis_default_radio'>
                        EMIS Web
                        <input 
                           type= "radio"
                           value ={ClinicalSystems.EMIS}
                           checked = {selectedClinicalSystem == ClinicalSystems.EMIS}
                           onChange = {handleSelectClinicalSystem}
                        />
                     </label>
                     <label htmlFor='systmOne_default_radio'>
                        SystmOne
                        <input 
                           type= "radio"
                           value ={ClinicalSystems.SystmOne}
                           checked = {selectedClinicalSystem == ClinicalSystems.SystmOne}
                           onChange = {handleSelectClinicalSystem}
                        />
                     </label> */}
                  // </div>
                  {/* </CardAction>
               </CardContent> */}
               {/* <CardFooter>
                 
      
               </CardFooter> */}{/* <div>
                              <span id ="custom_AF_button" className='text-2xl font-extrabold text:hover-black'>AF</span>
                           </div> */}
                        {/* <label htmlFor='systmOne_default_radio' className='text-2xl font-extrabold cursor-pointer'>
                           CVD
                           <input 
                              type= "radio"
                              value ={SoftwareTools.cvd}
                              checked = {selectedSoftwareTool == SoftwareTools.cvd}
                              onChange = {handleSelectTool}
                           />
                        </label> */}

                        {/* <label htmlFor='emis_default_radio'>
                           EMIS Web
                           <input 
                              type= "radio"
                              value ={ClinicalSystems.EMIS}
                              checked = {selectedClinicalSystem == ClinicalSystems.EMIS}
                              onChange = {handleSelectClinicalSystem}
                           />
                        </label>
                        <label htmlFor='systmOne_default_radio'>
                           SystmOne
                           <input 
                              type= "radio"
                              value ={ClinicalSystems.SystmOne}
                              checked = {selectedClinicalSystem == ClinicalSystems.SystmOne}
                              onChange = {handleSelectClinicalSystem}
                           />
                        </label> */}{/* <label htmlFor='emis_default_radio'>
                           EMIS Web
                           <input 
                              type= "radio"
                              value ={ClinicalSystems.EMIS}
                              checked = {selectedClinicalSystem == ClinicalSystems.EMIS}
                              onChange = {handleSelectClinicalSystem}
                           />
                        </label>
                        <label htmlFor='systmOne_default_radio'>
                           SystmOne
                           <input 
                              type= "radio"
                              value ={ClinicalSystems.SystmOne}
                              checked = {selectedClinicalSystem == ClinicalSystems.SystmOne}
                              onChange = {handleSelectClinicalSystem}
                           />
                        </label> */}
                        // console.log(selectedClinicalSystem)
// console.log(selectedSoftwareTool)
   // const sourceFont = Source_Sans_3({
   //    weight:"600"
   // })