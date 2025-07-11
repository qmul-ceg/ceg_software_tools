

export default function validateCvdSystmOneReport(files:FileList){
   return new Promise<Object>((resolve, reject)=> {
      if(files.length === 3){
      let reportValidator: Record<string, Boolean> = {
            report1 : false,
            report2 : false,
            report3 : false,
      }
      

      const filesArray = [...files];
      let readers:Promise<string[]>[] = [];

   
      const readFileAsText= (file:File)=>{
          return new Promise<string[]>((resolve, reject) => {
             const reader = new FileReader();
            reader.onload = () => {
               const text = reader.result as string
               const lines = text.split("\n");
               const header_array = lines[0].split(",")
               resolve(header_array)
            }
            reader.onerror = () =>{
               console.log("Error rearing the file")
            }
            reader.readAsText(file)
          })
      }

      for(let i = 0; i < filesArray.length; i++ ){
         readers.push(readFileAsText(filesArray[i]))
      }

      Promise.all(readers).then((values) =>{
            for (let i = 0; i < values.length; i++){
               const headerArray = values[i]
               
               if(headerArray[0].trim() === "Full Name" && headerArray[1].trim() === "Age"){
                  reportValidator['report1'] = true
      
               }
               else if (headerArray[0].trim() === "NHS number" && headerArray[1].trim() === 'Frailty'){
                  reportValidator['report2'] = true

               }
               else if (headerArray[0].trim() === "NHS number" && headerArray[1].trim() === 'Antiplatelet'){
                  reportValidator['report3'] = true

               }  
            }
            resolve(reportValidator)
         })     
      }
   })
   
}


