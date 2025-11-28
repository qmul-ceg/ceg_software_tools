import { FilterStates } from '@/types/shared.types'
import React from 'react'


type QuickFiltersPayload = {
   selectedQuickFilter : FilterStates;
   handleQuickFilterSelection : (quickFilterPayload:FilterStates) => void;
   quickFilters: string[];
}


const QuickFilters = ({handleQuickFilterSelection, selectedQuickFilter, quickFilters}: QuickFiltersPayload) => {
   return (
      <div className= " min-w-[400px] ">
         <header 
            className=  "flex justify-between px-2 py-2 rounded-t-lg bg-gradient-to-r from-[#7B0E72] from-70% to-[#E6007E] text-white" >
            <p className ="font-semibold text-md text-left">Quick filters</p>
         </header>
         <div className="flex flex-col border-[0.1em] text-left border-[#21376A]  border-t-0 p-2  ">
            {
               Object.entries(quickFilters).map(([key, value])=> {
      
                  return(
                     <ul>
                        <li>
                           <label htmlFor="" className=" hover:opacity-80 text-md font-semibold">
                              <input 
                                 className="mr-2 cursor-pointer hover:opacity-90"
                                 type = "checkbox"
                                 checked = {JSON.stringify(selectedQuickFilter) === JSON.stringify(value.payload)}
                                 onChange={()=>handleQuickFilterSelection(value.payload)}
                              />
                              {value.label}
                           </label>
                        </li>
                     </ul>
                  )
               })
            }
         </div>
      </div>
   )
}

export default QuickFilters
