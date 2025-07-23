import { ParserResultInterface } from "@/types/shared.types"
import Papa from 'papaparse'

export default async function parseCvdSystmOneReport (files:FileList ){

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

   // console.log(sortedFiles)

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
                  
                  // console.log(objectsArray)
                  resolve(objectsArray)
                  //Do i need a reject
               }

            })
         })
      }
   
      // console.log(parseFile(filesArray[0]))
      for(let file of filesArray){
         parsedFilesPromises.push(parseFile(file))
      }
      

      const parsedFilesResults = await Promise.all(parsedFilesPromises);
      const masterReport: Record<string, object> = {};

      console.log(parsedFilesResults)
      
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

      console.log(masterReport)

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
      // console.log(parseFile())  // console.log(parsedFilesResults)

      // for (let fileObject of parsedFilesResults){
         
         // let sample = Object.values(fileObject)
         // console.log(sample)
         // for(let i = 0; i < sample.length; i++){
         //    // console.log(sample[i]) 
         //    for(const [key, value] of Object.entries(sample[i])){
         //       console.log(key, value)
         //       // if(key === "NHS number"){
         //       //    let NHSnumber= value as string
         //       //    if(!masterReport[NHSnumber]){
         //       //       masterReport[NHSnumber] = sample[i]
         //       //    }
         //       //    else if(masterReport[NHSnumber]){
         //       //       masterReport[NHSnumber] = {...masterReport[NHSnumber], ...sample[i]}
         //       //    }
         //       // }
         //       break
         //    }
         // }
         // for(let i = 0; i < fileObject.length; i++)
        
         // for (let object of fileObject){

         // }
      // }
      // for(let i = 0; i < parsedFilesResults.length; i++){
      //    console.log(parsedFilesResults)
      // }

      // console.log(masterReport)
// console.log(Object.values(objectArray))
     
         // for(let i = 0; i < objectArray.length; i++){

         // }