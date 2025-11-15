"use client"
import React, { useContext, useState } from 'react';
import { createContext } from 'react';
import { ParserResult} from '@/types/shared.types';


type Data = {
   importedData : ParserResult;
   setImportedData : React.Dispatch<React.SetStateAction<ParserResult>>
}


export const DisplayContext = createContext<Data | null>(null);

export default function DisplayProvider ({children} : {children : React.ReactNode }){

   const [importedData, setImportedData] = useState<ParserResult>({status : "", info: ""})
   return (
      <DisplayContext.Provider value = {{ importedData,  setImportedData, }}>
         {children}
      </DisplayContext.Provider>
   )
}

//Allows us to call the useDisplay in whichever component has access to it 
export function useDisplay() {
   const displayContext = useContext(DisplayContext);
   if (!displayContext) throw new Error("useDisplay must be used within DisplayProvider");
   return displayContext; 
}










 