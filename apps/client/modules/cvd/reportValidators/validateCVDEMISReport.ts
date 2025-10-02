import { ValidationType } from "@/types/shared.types"
export default async function validateCVDEMISReport(file:FileList) {

   const validationResult: ValidationType={
      status : "",
      info : ""
   }
   

   const readFileHeader = (file:File) => {
      return new Promise ((resolve, reject)=> {
         const reader = new FileReader()

         reader.onload = () => {
            
            const fileContent = reader.result as string;
            
            const splitFileContent = fileContent.split("\n")
            const headerArray = splitFileContent[11].split(",")
            resolve(headerArray)
         } 
         reader.onerror = ()=> {
            new Error("Read as text file")
         } 

         reader.readAsText(file)
      })
   }

   await readFileHeader(file[0]).then((headerArray:any)=>{

      const cleanHeader = (value:string) => value.trim().replace(/"/g, "")
     
      if((cleanHeader(headerArray[0])=== "Anonymised Identifier") &&
         (cleanHeader(headerArray[1])=== "Usual GP's GMC Number") &&
         (cleanHeader(headerArray[2])=== "Age") &&
         (cleanHeader(headerArray[3])=== "Gender")
      ){

         validationResult['status'] = "success";
         validationResult['info'] = "All headers are correct"
      }
      else {
         validationResult['status'] = "failure";
         validationResult['info'] = "cvdImportError3"
      }
      
   })
   return validationResult
}