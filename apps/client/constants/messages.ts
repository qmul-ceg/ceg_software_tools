enum ErrorMessages{
   None = "",
   ImportError = "Please select a software tool and a clinical system before import.",
   NoFile = "No File selected. Please select a File",
   ClinicalSystemError = "Selected clinical system is not available.",

   // Tool Import error messages
   cvdImportError1 = "The CVD SystmOne import does not have 3 files.",
   cvdImportError2 ="One of the files in the imported CVD SytmOne folder is invalid and could not be read. Please import a valid report",
   cvdImportError3 ="The imported CVD EMIS report is invalid and could not be read. Please import a valid report."

}

export default ErrorMessages