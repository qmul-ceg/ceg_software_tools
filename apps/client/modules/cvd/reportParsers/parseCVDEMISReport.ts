import { ParserResultInterface } from "@/types/shared.types";
import Papa from 'papaparse';

export default async function parseCVDEMISReport(report: FileList):Promise<ParserResultInterface>{
   let parsedFile:ParserResultInterface = {
      status : "",
      info : "",
      masterReport : {}
   }

   const parseFile = async (file: File): Promise<object> => {
      return new Promise<object>((resolve, reject) => {
         Papa.parse(file, {
            header : false,
            skipEmptyLines : true,
            complete : (result) =>{
               
               let result_array = result.data
               let patient_data_starting_index: number = 0

               console.log(result_array[0])

               //Get the headers
               for (let i = 0; i < result_array.length; i++){
                  let header_one = result_array[i] as Array<string>
                  let header_two = result_array[i+1] as Array<string>
                  if (header_one[0].trim() == "Patient Details"){
                     console.log(result_array.indexOf(header_one))
                     console.log(header_two)

                  } 

               }


               resolve(result.data)
            }
         })
      })
   }

   console.log(await parseFile(report[0]))

   return parsedFile
}