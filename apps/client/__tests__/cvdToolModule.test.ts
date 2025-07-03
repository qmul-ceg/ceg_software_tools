// import cvdToolModule from '@/tools/cvdToolModule/cvdToolModule'
import validateCvdInput from '@/tools/cvdToolModule/validateCvdInput'
import SoftwareTools from '@/constants/softwareTools'
import ClinicalSystems from '@/constants/clinicalSystems'



// describe('runs the cvdToolModule', ()=> {
//    it('read payload, parses and returns master report', ()=> {
//       expect(cvdToolModule({tool: 'CVD Tool, clinicalSystem: 'EMIS Web', file: "some, data"}))
//       .toBe("hello")
//    });
// })

describe('validating cvd input',()=>{
   it('It returns true for valid payload', ()=> {
      expect(validateCvdInput({
         tool: SoftwareTools.cvd, 
         clinicalSystem: ClinicalSystems.EMIS, 
         file: "some, data"
      }))
      .toBe(true)
   });

   it ('It returns false for payload with unsupported tool', ()=> {
      expect(validateCvdInput({
         tool: SoftwareTools.renal, 
         clinicalSystem: ClinicalSystems.EMIS, 
         file: "some, data"
      }))
      .toBe(false)
   })

   it ('It returns false for payload with unsupported tool', ()=> {
      expect(validateCvdInput({
         tool: SoftwareTools.cvd, 
         clinicalSystem: ClinicalSystems.NotSelected, 
         file: "some, data"
      }))
      .toBe(false)
   })

   it ('It returns false for payload with unsupported tool', ()=> {
      expect(validateCvdInput({
         tool: SoftwareTools.af, 
         clinicalSystem: ClinicalSystems.EMIS, 
         file: null
      }))
      .toBe(false)
   })
})


