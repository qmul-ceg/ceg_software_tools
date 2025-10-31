import ErrorMessages from "@/constants/messages"
import { ValidationType } from "@/types/shared.types"

export default async function validateCVDEMISReport(file:FileList): Promise<ValidationType>{

   // const validationResult: ValidationType={
   //    status : "fail",
   //    message : ErrorMessages.UnsuccessfulValidation
   // }
   

   const readFileHeader = (file:File):Promise<string[]> => {
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


   const headerArray:string[] = await readFileHeader(file[0])
   const cleanHeader = (value:string) => value.trim().replace(/"/g, "")

   if((cleanHeader(headerArray[0])=== "Anonymised Identifier") &&
         (cleanHeader(headerArray[1])=== "Usual GP's GMC Number") &&
         (cleanHeader(headerArray[2])=== "Age") &&
         (cleanHeader(headerArray[3])=== "Gender")
   ){
      return { status : "pass", message: ErrorMessages.SuccessfulValidation}

   }  else return { status : "fail", message : ErrorMessages.UnsuccessfulValidation }


}