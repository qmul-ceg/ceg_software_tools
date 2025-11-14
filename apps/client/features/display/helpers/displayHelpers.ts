
const convertDate = (dateString : string):string => {
   if (dateString){
      const [day, month, year] = dateString.split('-');
      const months:Record<string, string> = { "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06", "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12" };
         return `${year}-${months[month]}-${day}`; 
      }
      else return ""
   }


const recordedOverTwelveMonths = (recordedDate: string, relativeRunDate: string):boolean => {
   if(!recordedDate){  
      return false
   }
            
   //Function returns a boolean value that let's us know if a specific data was recorded 12 months prior to relative run date
   const parsedRecordedDate = new Date(recordedDate)
   const parsedRelativeRunDate = new Date(relativeRunDate)
   
   const cutOffDate = new Date (parsedRelativeRunDate.setFullYear(parsedRelativeRunDate.getFullYear() - 1))
   return parsedRecordedDate <= cutOffDate
}


const checkFinancialYear = (dateString: string):boolean => {
   // get start of financial year
   const dateToCheck = new Date(dateString)

   const monthToCheck= dateToCheck.getMonth()

   const currentYear = new Date().getFullYear()
   const financialYearStartWindow1 = new Date(`April 1, ${currentYear}`)
   const financialYearEndWindow1 = new Date(`December 31, ${currentYear}`)

   const financialYearStartWindow2 = new Date(`January 1, ${currentYear + 1}`)
   const financialYearEndWindow2 = new Date(`March 31, ${currentYear + 1 }`)

   if (monthToCheck >= financialYearStartWindow1.getMonth() && monthToCheck <= financialYearEndWindow1.getMonth()){
      if (dateToCheck >= financialYearStartWindow1 && dateToCheck <= financialYearEndWindow1){
         return false
      }
   }
   else if (monthToCheck >= financialYearStartWindow2.getMonth() && monthToCheck <= financialYearEndWindow2.getMonth()){
      if(dateToCheck >= financialYearStartWindow2 && dateToCheck <= financialYearEndWindow2){
         return false
      }
   }
   return true        
}

const splitBloodPressureValue = (value: string) => {
       
   const [systolic, diastolic] = value.split("/");
   return [systolic, diastolic];
}

export {convertDate, recordedOverTwelveMonths, checkFinancialYear, splitBloodPressureValue}