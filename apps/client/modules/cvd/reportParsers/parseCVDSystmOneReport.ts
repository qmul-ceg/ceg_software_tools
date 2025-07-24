import { ParserResultInterface } from "@/types/shared.types";
import { sortSystmOneFilesByHeader, parseSystmOneReport } from "../utils/parseHelpers";

export default async function parseCvdSystmOneReport (report:FileList ):Promise<ParserResultInterface>{

   const filesArray:Array<File> = [...report];

   const sortedFiles =  await sortSystmOneFilesByHeader(filesArray)

   const parsedFiles = await parseSystmOneReport(sortedFiles)
   return parsedFiles
}  















