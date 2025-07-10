

export default function validateCvdSystmOneReport(files:FileList){
   if(files.length === 3){
      const filesArray = [...files];
      console.log(filesArray)

      const reader = new FileReader();
      reader.onload = () => {
         // console.log(reader.result)
         const text = reader.result as string
         const lines = text.split("\n");
         const header = lines[0]
         console.log(header)
      }
      reader.onerror = () =>{
         console.log("Error rearing the file")
      }

      reader.readAsText(files[0])
      // Promise.all(filesArray.map(file => {
      //    new Promise ((resolve, reject)=> {
      //       Papa.parse(file, {
      //          header: true,
      //          skipEmptyLines: true
      //       });
      //    })
      // }))
   }
   


}