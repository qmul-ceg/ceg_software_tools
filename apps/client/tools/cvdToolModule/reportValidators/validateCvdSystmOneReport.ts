import { ValidationInterface } from "@/types/shared.types"

export default async function validateCvdSystmOneReport(files:FileList){

   const validationResult: ValidationInterface ={
      status: "",
      info:""
   }

   let filesArray: Array<File> = []
   
   for(let i = 0; i < files.length; i++){
      let file = files[i]
      if(file.name.toLowerCase().endsWith(".csv")){
         filesArray.push(file)
      }
   }


   if(filesArray.length !== 3){
      validationResult['status'] = "failure";
      validationResult['info'] = "cvdImportError1"
      return validationResult
   }
   const headerReaderPromises: Promise<string[]>[] = [];


   const readFileHeaders = (file:File) => {
      return new Promise<string[]>((resolve, reject) => {
         const reader = new FileReader();

         reader.onload = () => {
            const fileContent = reader.result as string;
            const lines = fileContent.split('\n');
            const headerArray = lines[0].split(",")
            resolve(headerArray)
         }

         reader.onerror = () => {
            new Error("Could not read file")
         }

         reader.readAsText(file)
      })
   }


   for (let i = 0; i < filesArray.length; i++ ){
      headerReaderPromises.push(readFileHeaders(filesArray[i]))
   }

   const headerResults = await Promise.all(headerReaderPromises)
   for (let i = 0; i < headerResults.length; i++ ){
      let headerArray = headerResults[i];
      if ((headerArray[0].trim() === "Full Name" || headerArray[0].trim() === "NHS number" ) &&
         (headerArray[1].trim() === "Age" || headerArray[1].trim() === 'Frailty' || headerArray[1].trim() === 'Antiplatelet') )
      {
         validationResult['status'] = "success";
         validationResult['info'] = "All headers are correct"
      }
      else {
         validationResult['status'] = "failure";
         validationResult['info'] = "cvdImportError2"
      }
   }
   
   return validationResult
}





// export default function validateCvdSystmOneReport(files:FileList){
//    return new Promise<Object>((resolve, reject)=> {


//       if(files.length === 3){

//          let reportValidator: Record<string, Boolean> = {
//                report1 : false,
//                report2 : false,
//                report3 : false,
//          }
      
//          const filesArray = [...files];
//          let headerReaderPromises:Promise<string[]>[] = [];

//          const readFileAsText= (file:File)=>{
//             return new Promise<string[]>((resolve, reject) => {
//                const reader = new FileReader();
//                reader.onload = () => {
//                   const text = reader.result as string;
//                   const lines = text.split("\n");
//                   const headerArray = lines[0].split(",")
//                   resolve(headerArray);
//                }
//                reader.onerror = () =>{
//                   // reject(new Error("This is not a valid CVD SystmOne file"))
//                   console.log("Error reading the file");
//                }
//                reader.readAsText(file)
//             });
//          };

//          for(let i = 0; i < filesArray.length; i++ ){
//             headerReaderPromises.push(readFileAsText(filesArray[i]));
//          };

//          Promise.all(headerReaderPromises).then((values) =>{
//             for (let i = 0; i < values.length; i++){
//                const headerArray = values[i]
//                if(headerArray[0].trim() === "Full Name" && headerArray[1].trim() === "Age"){
//                   reportValidator['report1'] = true;
//                }
//                else if (headerArray[0].trim() === "NHS number" && headerArray[1].trim() === 'Frailty'){
//                   reportValidator['report2'] = true;
//                }
//                else if (headerArray[0].trim() === "NHS number" && headerArray[1].trim() === 'Antiplatelet'){
//                   reportValidator['report3'] = true;
//                }  
//             }
//             resolve(reportValidator);
//          })     
//       }
//       else {
//          reject(new Error("This is not a valid SystmOne import."))
//       }
//    })
// }


