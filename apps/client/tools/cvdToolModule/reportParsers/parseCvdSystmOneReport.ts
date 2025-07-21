import { ParserResultInterface } from "@/types/shared.types"

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

   const sortedFiles =  Object.values(await sortFiles(filesArray))

   const parseFiles = async(files: Array<File>): Promise<ParserResultInterface> => {
      const parserResult: ParserResultInterface = {
         status : "",
         info : "",
         masterReport: {}
      };

      
      return parserResult
   }
   
   // console.log(sortedFiles)


   // await sortFiles(filesArray).then((result)=>{

   //    // PLUG IN PARSER TO PARSE FILES 
   //    console.log(Object.values(result))

  






   // return parserResult
}