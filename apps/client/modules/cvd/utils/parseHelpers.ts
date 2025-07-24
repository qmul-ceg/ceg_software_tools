import { ParserResultInterface } from "@/types/shared.types";
import Papa from 'papaparse'


const sortSystmOneFilesByHeader = async (files: Array<File>): Promise<Object> => {
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





const parseSystmOneReport = async(files: Object): Promise<ParserResultInterface> => {
      
      const parsedFilesPromises: Array<Promise<object>> = []

      let fileArray: Array<File> = []
      //Get report headers
      for(const [key, value] of Object.entries(files)){      
            fileArray.push(value)
      }

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
                  
                  //Fix header names on report 2.
                  if (parsedResultHeader.includes('Date of issue')){
                     for (let i = 0; i < parsedResultHeader.length; i++){
                        if(parsedResultHeader[i] === 'Date of issue'){
                           parsedResultHeader[i] = `${parsedResultHeader[i-1].trim()} - Date of issue`;
                           
                        }
                     }
                  }

                  const objectsArray: Array<object> = []
                  for (let i = 1; i < parsedResult.length; i++){
                     const rowObject: Record<string, string> = {}; 
                     const currentRow = parsedResult[i] as Array<string>
                     for (let i = 0; i < currentRow.length; i++){
                        rowObject[parsedResultHeader[i].trim()] = currentRow[i].trim()
                     }
                     objectsArray.push(rowObject)
                  }

                  resolve(objectsArray)

               }
            })
         })
      }
   
      for(let file of fileArray){
         parsedFilesPromises.push(parseFile(file))
      }
      

      const parsedFilesResults = await Promise.all(parsedFilesPromises);
      const masterReport: Record<string, object> = {};
      
      for (let parsedObjectItems of parsedFilesResults){
         const parsedObject = Object.values(parsedObjectItems)
         
         for(let i = 0; i < parsedObject.length; i++){
            for(let [key, value] of Object.entries(parsedObject[i])){
               let objectkey = key.trim() as string
               let objectValue = value as string
               
               if (objectkey === "NHS number"){
                  if(!masterReport[objectValue]){
                     masterReport[objectValue] = parsedObject[i]
                  }else{
                     masterReport[objectValue] = {...masterReport[objectValue], ...parsedObject[i]}
                  }
               }
            }
         }
      } 

      let parserResult: ParserResultInterface = {
         status : "success",
         info : "Reports successfully parsed",
         masterReport: masterReport
      };

      return parserResult
   }


export { sortSystmOneFilesByHeader, parseSystmOneReport }