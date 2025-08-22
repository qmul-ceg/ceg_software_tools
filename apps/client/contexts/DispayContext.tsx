"use client"
import React, { useContext, useState } from 'react'
import { createContext } from 'react'

type Data = {
   toolName: string;
   setToolName: React.Dispatch<React.SetStateAction<string>>;
}


export const DisplayContext = createContext<Data | null>(null);

export default function DisplayProvider ({children} : {children : React.ReactNode }){
   const [toolName, setToolName] = useState("")
   
   return (
      <DisplayContext.Provider value = {{ toolName, setToolName }}>
         {children}

      </DisplayContext.Provider>
   )
}

export function useDisplay() {
  const ctx = useContext(DisplayContext);
  if (!ctx) throw new Error("useDisplay must be used within DisplayProvider");
  return ctx; // now ctx is Data, not Data | null
}



// export function useDisplayContext(){
//    const test = useContext(DisplayContext)
//    if(!test){
//       throw new Error("not working ")
//    }
//    return test
// }

// export const DisplayContext = createContext<Data | null>(null);
   // const cvdData:Data = {toolName: "CVD"}