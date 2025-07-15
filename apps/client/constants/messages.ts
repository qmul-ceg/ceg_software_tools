enum ErrorMessages{
   None = "",
   ImportError = "Please select a software tool and a clinical system before import.",
   NoFile = "No File selected. Please select a File",
   ClinicalSystemError = "Selected clinical system is not available.",

   // Tool Import error messages
   cvdImportError1 = "The CVD SystmOne import does not have 3 files.",
   cvdImportError2 ="One of the files in the folder is corrupt and could not be read."
   // validImport= "Import is valid",
   // invalidImport="Invalid import"
}

export default ErrorMessages