import useFileImport from "@/features/import/hooks/useFileImport"; 
import { renderHook } from '@testing-library/react'
import {act} from 'react';
import ErrorMessages from "@/constants/messages"
import ClinicalSystems from "@/constants/clinicalSystems";
import SoftwareTools from "@/constants/softwareTools";


describe ('using useFileImport hook', ()=> {
   test('No tool or clinical system selected. Should display error message', ()=> {
      const { result } = renderHook(()=>useFileImport(ClinicalSystems.NotSelected, SoftwareTools.NotSelected))

      act(()=> {
         result.current.handleImportButtonClick()
      })
      expect(result.current.importError).toBe(ErrorMessages.ImportError)
   })

   test ('No Clinical system selected. Should display error message', ()=> {
      const { result } = renderHook(()=>useFileImport(ClinicalSystems.NotSelected, SoftwareTools.af))

      act(()=> {
         result.current.handleImportButtonClick()
      })
      expect(result.current.importError).toBe(ErrorMessages.ImportError)
   })

   test ('No software tool selected. Should display error message', ()=> {
      const { result } = renderHook(()=> useFileImport(ClinicalSystems.EMIS, SoftwareTools.NotSelected))

      act(()=>{
         result.current.handleImportButtonClick()
      })

      expect(result.current.importError).toBe(ErrorMessages.ImportError)
   })

   test('Tool and clinical system selected, no error message', ()=>{
      const { result } = renderHook(()=> useFileImport(ClinicalSystems.EMIS,SoftwareTools.af))

      act(()=> {
         result.current.handleImportButtonClick()
      })

      expect(result.current.importError).toBe("")
   })
}) 