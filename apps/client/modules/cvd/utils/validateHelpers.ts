
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


const filterCSVFiles=  (files:FileList): Array<File>=>{
   let filesArray: Array<File> = []
   
   for(let i = 0; i < files.length; i++){
      let file = files[i]
      if(file.name.toLowerCase().endsWith(".csv")){
         filesArray.push(file)
      }
   }

   return filesArray
}

const validateCVDReportHeaders = (reportHeaders: Array<string[]>):boolean=> {
   const validateHeaders = reportHeaders.every((header:Array<string>) => {
      return(
         (["Full Name", "NHS number"].includes(header[0].trim())) && 
         (["Age", "Frailty", "Antiplatelet"].includes(header[1].trim()))

      )
   })
   return validateHeaders
   
}


export { readFileHeaders, filterCSVFiles, validateCVDReportHeaders}

   