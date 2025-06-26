import useFileImport from "@/hooks/useFileImport"; 
import { renderHook } from '@testing-library/react'
import {act} from 'react';
import ErrorMessages from "@/constants/messages"
import ClinicalSystems from "@/constants/clinicalSystems";
import SoftwareTools from "@/constants/softwareTools";
// test('should raise error', ()=> {
//    const result = renderHook() => useFileImport()
// })
describe ('using useFileImport hook', ()=> {
   test('No tool or clinical system selected. Should display error message', ()=> {
      const { result } = renderHook(()=>useFileImport(ClinicalSystems.NotSelected, SoftwareTools.NotSelected))

      act(()=> {
         result.current.handleImportButtonClick()
      })
      expect(result.current.importError).toBe(ErrorMessages.import)
   })

   test ('No Clinical system selected. Should display error messages', ()=> {
      const { result } = renderHook(()=>useFileImport(ClinicalSystems.NotSelected, SoftwareTools.af))

      act(()=> {
         result.current.handleImportButtonClick()
      })
      expect(result.current.importError).toBe(ErrorMessages.import)
   })
   
}) 