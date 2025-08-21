import React from 'react'
import { useState } from 'react'

export default function useCVDStateHooks (){
   type toolName = {
      name : string
   }

   const example:toolName  = { name : 'Fola'}

   return { example }
}