import Papa from 'papaparse'

export default function SortSystmOneImport(files:FileList){
   const filesArray = Array.from(files)
   
   const readFiles = filesArray.map((file) => {
      return new Promise((resolve, reject) => {
         Papa.parse(file, {
            headers: true,
            skipEmptyLines: true
         })
      })
   })
}