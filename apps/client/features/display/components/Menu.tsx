import { PopoverContent, Popover, PopoverTrigger } from "@/components/ui/popover"
import Link from "next/link"
import * as XLSX from 'xlsx';
import { useDisplay } from "@/context/DispayContext";



import { SystmOneReportKeys, EMISReportKeys } from "@/modules/cvd/constants/cvdDataEnums"
type IndexMap = typeof SystmOneReportKeys | typeof EMISReportKeys

type MenuProps= {
   exportObject: Record<string, boolean>,
   data : string [][],
   reportKeys :IndexMap
}



const Menu = ({exportObject, data, reportKeys}:MenuProps) => {
   const {importedData} = useDisplay();

 
   const masterReportObject = importedData.data?.masterReport
   if(!masterReportObject){
      return null; 
   }

   // console.log(importedData)
   // Create a function that takes in the current selectedForExport Object
   // take the object use that to filter the data in filtered data... you get an array use that array to generate the excel list using the report keys. 


   const exportExcel = ()=> {
      if(Object.keys(exportObject).length > 0 ){
         const exportData = Object.keys(exportObject).map((patient) => {
            const patientInfo = data.find((patiendDetails) => patiendDetails[reportKeys.Full_Name] === patient)

            return {
               Name : patientInfo![reportKeys.Full_Name],
               Age: patientInfo![reportKeys.Age],
               Gender: patientInfo![reportKeys.Gender],
               // "Patient reference" : patientInfo![reportKeys.PatientReference!],
               "CHA₂DS₂-VASc - Value" : patientInfo![reportKeys.Statin_Name_Dosage_Quantity],     
               "CHA₂DS₂-VASc - Date": patientInfo![reportKeys.Statin_Intensity],
               // "ORBIT - Value": patientInfo![reportKeys.Statn_Exclusion],

               "ORBIT - Date": patientInfo![reportKeys.Inclisiran],
               "Anticoagulant issued (6m)" : patientInfo![reportKeys.BloodPressure],
               "Aspirin / antiplatelet issued (6m)" : patientInfo![reportKeys.CVD],

               NSAID: patientInfo![reportKeys.CKD3_5],
               HTN: patientInfo![reportKeys.Hypertension],
               "Diabetes": patientInfo![reportKeys.Diabetes],

               "Total Cholestrol": patientInfo![reportKeys.Total_Cholestrol_Value],
               LDL: patientInfo![reportKeys.LDL_Cholestrol_Value],

               eGFR: patientInfo![reportKeys.EGFR_Value],
               "No. of anti-hptn Medication" : patientInfo![reportKeys.AntiHptnMedicationCount],
               // "Medication Review Date": patientInfo![reportKeys.MedsReviewDate]
            }
         })

         const date = new Date();

         let worksheet = XLSX.utils.json_to_sheet(exportData)
         XLSX.utils.sheet_add_aoa(worksheet, [["CEG CVD Prevention Tool"]], {origin: "A1"});  

         XLSX.utils.sheet_add_aoa(worksheet,
            [["Patient Data Export", date, `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`]],
            {origin: "A2"}
         );
         const workbook = XLSX.utils.book_new();
         XLSX.utils.book_append_sheet(workbook, worksheet, "Patients")
   
         XLSX.writeFile(workbook, "Patients.xlsx")
      }


   }


   // const exportAccuRxList = () => {
   //    if (Object.keys(exportObject).length > 0){
         //Finish NHS number for AccurxList

   //    }
   // }












   return (
      <div className = "flex">
         <div className = "mr-2">
            <Popover>
               <PopoverTrigger 
                  className="flex justify-center items-center
                        text-xs px-2 py-[0.3em]  rounded-lg font-semibold
                        bg-gradient-to-r from-[#7B0E72] from-70% to-[#E6007E] text-white hover:cursor-pointer"
                     >
                        User guide & <br></br>resources
               </PopoverTrigger>
               <PopoverContent className = "px-2 py-2 w-[14em] mr-28">
                  <div className=" text-sm ">
                     <div> 
                        <ul className="ml-2 menu_list_items">
                           <li>
                              <a href = "https://www.qmul.ac.uk/ceg/support-for-gp-practices/resources/software-tools/aftool/user-guidance/"
                                 target="_blank" rel="noopener noreferrer"
                              >
                                 User guide
                              </a>
                           </li>
                        </ul>
                     </div>
                     <div className="w-full border mt-1 mb-1"></div>
                     <div>
                        <strong>Resources</strong>
                        <ul className="ml-2 menu_list_items">
                           <li><a href="https://www.qmul.ac.uk/ceg/" target="_blank" rel="noopener noreferrer">CEG website</a></li>
                           <li><a href="https://cks.nice.org.uk/topics/anticoagulation-oral/" target="_blank" rel="noopener noreferrer">NICE CKS Anticoagulation</a></li>
                           <li><a href="https://www.mdcalc.com/calc/43/creatinine-clearance-cockcroft-gault-equation" target="_blank" rel="noopener noreferrer">Creatine clearance MDCALC</a></li>
                        </ul>
                     </div>                            
                  </div>
               </PopoverContent>
            </Popover>
         </div>
               <div className="flex border border-[#21376A] rounded-lg ">
               <div className="mr-1">


                  <Popover>
                     <PopoverTrigger className ="h-full cursor-pointer">
                        <div className="text-center  px-6 py-2">
                           <p className="text-md hover:text-black font-bold text-[#21376A]">Export</p>
                        </div>
                     </PopoverTrigger>
                     <PopoverContent className="px-2 py-2 w-[17em] ml-18 ">
                        <div className="text-sm">
                           <strong className="text-sm">EXPORT SELECTED PATIENTS LIST</strong>
                           <ul className=" ml-2 menu_list_items ">
                              <li ><button className="cursor-pointer hover:opacity-70 font-medium" onClick={exportExcel}>Excel list (.xlsx)</button> </li>
                              <li ><button className="cursor-pointer hover:opacity-70 font-medium">Accurx list (.csv)</button> </li>
                              <li ><button className="cursor-pointer hover:opacity-70 font-medium"> NHS No. list (.txt)</button> </li>
                           </ul>
                        </div>
                     </PopoverContent>
                  </Popover>



               </div>

               <div className="">
                  <div className='border border-[#21376A] h-[80%] my-1'>

                  </div>
               </div>

               <div className="ml-1 w-[70%]">
                  <Link href = "/">
                     <button className="  flex flex-col  items-center px-4  py-1 hover:text-black group" >
                        <p className="text-xs text-[#21376A]  group-hover:text-black font-bold">Load new <br></br>patient data</p>
                     </button>
                  </Link>

               </div>
            </div>  
      </div>
   )
}

export default Menu
