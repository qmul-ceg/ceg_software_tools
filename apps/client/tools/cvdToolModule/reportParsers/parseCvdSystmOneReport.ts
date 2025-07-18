import { ParserResultInterface } from "@/types/shared.types"

export default async function parseCvdSystmOneReport (files:FileList ){
   const parserResult: ParserResultInterface ={
      status : "",
      info : "",
      masterReport: {}
   };
   const filesArray:Array<File> = [...files];

   const sortedReports = {

   }
   //Sort the files
   console.log(filesArray)
   const sortFiles = async (file: FileList): Promise<Object> => {

      return {}
   }
   return parserResult
}