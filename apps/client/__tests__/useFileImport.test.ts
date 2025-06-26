import useFileImport from "@/hooks/useFileImport"; 
import { renderHook } from '@testing-library/react-hooks'

test('should raise error', ()=> {
   const result = renderHook() => useFileImport()
})