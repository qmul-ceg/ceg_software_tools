import { ParserResult } from "@/types/shared.types";
import Papa from 'papaparse';

export default async function parseCVDEMISReport(report: FileList):Promise<ParserResult>{
   // let parsedFile:ParserResultInterface = {
   //    status : "",
   //    info : "",
   //    masterReport : {}
   // }

   const parseFile = async (file: File): Promise<ParserResult> => {
      return new Promise<ParserResult>((resolve, reject) => {
         Papa.parse(file, {
            header : false,
            skipEmptyLines : true,
            complete : (result) =>{
               console.log(result)
               let result_array = result.data
               let patient_data_starting_index: number = 0

               // console.log(result_array[0])
            
               let startingPatientIndex: number = 0;
               //Get the first header row of patients
               for (let i = 0; i < result_array.length; i++){
                  let currentArray = result_array[i] as Array<string>
                  if(currentArray[0].toLowerCase().trim() === 'anonymised identifier'){
                     startingPatientIndex = result_array.indexOf(currentArray)
                  }
               }
               console.log(startingPatientIndex)

               let masterReport: Record<string, Array<string>> = {}

              
               let checkPatientArray: Array<string> = []
               for (let i = startingPatientIndex + 1; i < result_array.length; i++){
                  let currentPatientArray = result_array[i] as Array<string>
                  
                   if (currentPatientArray[0] === checkPatientArray[0] || currentPatientArray[0]=== ""){
                     let slicedArray = currentPatientArray.slice(-3)
                     checkPatientArray = [...checkPatientArray, ...slicedArray]
                     if (!masterReport[checkPatientArray[0]]){
                        masterReport[checkPatientArray[0]] = checkPatientArray
                     }
                     else if(masterReport[checkPatientArray[0]]){
                        masterReport[checkPatientArray[0]] = [...masterReport[checkPatientArray[0]], ...slicedArray]
                     }
                  }

                  else if (currentPatientArray !== checkPatientArray){
                     checkPatientArray = currentPatientArray;
                  }
               }

               for (let value of (Object.values(masterReport))){
                  while (value.length < 115){
                     value.push("")
                  }
               }
               
               let parsedFileResult:ParserResult = {
                  status : "success",
                  info : "Report successfully parsed",
                  data : {
                     masterReport : masterReport
                  }
               }

               resolve(parsedFileResult)
            }
         })
      })
   }

   

   let parsedFile = await parseFile(report[0])
   console.log(parsedFile)
   return parsedFile
}  





//Get the headers
               // for (let i = 0; i < result_array.length; i++){
               //    let header_one = result_array[i] as Array<string>
               //    let header_two = result_array[i+1] as Array<string>
               //    if (header_one[0].trim() == "Patient Details"){
               //       console.log(result_array.indexOf(header_one))
               //       console.log(header_two)

               //    } 

               // }

                  // if(currentPatientArray[0] == ""){
                  //    console.log(currentPatientArray)
                  //    return 
                  // }
                  //    // if(!masterReport[currentPatientArray[0]]){
                     //    masterReport[currentPatientArray[0]] = currentPatientArray
                        
                     // }
                     // else if (masterReport[currentPatientArray[0]] || currentPatientArray[0].trim() == ""){
                     //    let bloodPressureReading = currentPatientArray.slice(-3)
                     //    masterReport[currentPatientArray[0]] = [...masterReport[currentPatientArray[0]], ...bloodPressureReading]
                     // }