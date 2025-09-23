import { ParserResultType } from "@/types/shared.types";
import { parseSystmOneReport } from "../utils/cvdParseHelpers";

export default async function parseCvdSystmOneReport (report:FileList ):Promise<ParserResultType>{
   console.log(report)
   //CREATED TO SORT FILES IN A SPECIFIC STRUCTURE BUT NOT WORKING AS EXEPECTED DUE TO THE ASYNCHRONOUS NATURE 
   // const filesArray:Array<File> = [...report];
   // const sortedFiles = await sortSystmOneFilesByHeader(filesArray)

   const parsedFiles = await parseSystmOneReport(report)
   return parsedFiles
}  















