import { ParserResultInterface } from "@/types/shared.types"
import Papa from 'papaparse'

export default async function parseCvdSystmOneReport (files:FileList ){
   // const parserResult: ParserResultInterface = {
   //    status : "",
   //    info : "",
   //    masterReport: {}
   // };
   const filesArray:Array<File> = [...files];


   const sortFiles = async (files: Array<File>): Promise<Object> => {
      const sortedReports: Record<string, File> = {};
      const headers: Array<Promise<string[]>> = []


      const readHeaders = (file:File)=> {
         return new Promise<string[]>((resolve, reject)=>{
            const headerReader = new FileReader();

            headerReader.onload = () => {
               const result= headerReader.result as string;
               const lines = result.split("\n");
               const headerArray = lines[0].split(",");
               
               for(let i = 0; i < headerArray.length; i++){
                  if(headerArray[0].trim() === "Full Name" && headerArray[1].trim() === "Age" && headerArray[2].trim() === "Gender"){
                     sortedReports["report1"] = file;
                  }
                  else if (headerArray[0].trim() === "NHS number" && headerArray[1].trim() === "Antiplatelet" && headerArray[2].trim() === "Date of issue"){
                     sortedReports["report2"] = file;
                  }
                  else if (headerArray[0].trim() === "NHS number" && headerArray[1].trim() === "Frailty" && headerArray[2].trim() === "Frailty (Date last ever)"){
                     sortedReports["report3"] = file;
                  }
               }
               resolve(headerArray)
            }
            headerReader.onerror = () => {
               new Error ("One or more files could not be read")
            }
            headerReader.readAsText(file)
         })
      }

      for(let file of files){
         headers.push(readHeaders(file))
      }

      await Promise.all(headers).then((result)=> {
         return result
      })
      
      return sortedReports
   }

   const sortedFiles =  await sortFiles(filesArray)










   const parseFiles = async(files: Object): Promise<ParserResultInterface> => {
      const parserResult: ParserResultInterface = {
         status : "",
         info : "",
         masterReport: {}
      };
      
      const parsedFilesPromises: Array<Promise<object>> = []

      
      let fileArray: Array<File> = []
      //Get Fix report 3 header 
      for(const [key, value] of Object.entries(files)){      
            fileArray.push(value)
      }

      // console.log(fileArray)

      //Parse each file 
      const parseFile = async(file: File) => {

         

         return new Promise<Object> ((resolve, reject)=> {
            let reportObject: Record<string, object> = {}


            Papa.parse(file, {
               header: false,
               skipEmptyLines:true,
               complete: (results) => {
                  const parsedResult = results.data
                  let parsedResultHeader = parsedResult[0] as Array<string>

                  if (parsedResultHeader.includes('Date of issue')){
                     for (let i = 0; i < parsedResultHeader.length; i++){
                        if(parsedResultHeader[i] === 'Date of issue'){
                           parsedResultHeader[i] = `${parsedResultHeader[i-1].trim()} - Date of issue`;
                           
                        }
                     }
                  }

                 
                  for(let i = 1; i < parsedResult.length; i++){
                     let arrayObject: Record<string, string> = {}
                     let parsedResultArray = parsedResult[i] as Array<string>
                     let keysArray = parsedResult[0] as Array<string>
                     
                     
                     for (let j = 0; j < parsedResultArray.length; j++){
                        arrayObject[keysArray[j]] = parsedResultArray[j]
                        
                     } 

                     if (keysArray[i] === "NHS number"){
                        reportObject[keysArray[i]] = arrayObject
                        console.log(reportObject)
                        // console.log(arrayObject)
                     }

                     
                     
                     
                     
                  }
                  
                  return
                  
                  
                  
                  // console.log(parsedResult)

                  


               }

            })
         })
      }
      
      for(let file of filesArray){
         console.log(parseFile(file))
      }
      
      return parserResult
      
     
   }

   
   const parsedFiles = await parseFiles(sortedFiles)
   console.log(parsedFiles)

}  







// const finalReport: Record<string, object> = {}

      // for (const [key, value] of Object.entries(files)){
      //    if(key === "report1"){
      //       console.log(value)
      //    }
         
      // }
      // console.log(parseFile()) 