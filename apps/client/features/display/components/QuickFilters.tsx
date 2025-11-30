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
            className=  "p-2 rounded-t-lg bg-gradient-to-r from-[#7B0E72] from-70% to-[#E6007E] text-white" >
            <p className ="font-semibold text-sm text-left">Quick filters</p>
         </header>
         <div className="flex flex-col border-[0.1em] border-[#21376A]  border-t-0 p-2  text-sm font-medium">
            {
               Object.entries(quickFilters).map(([key, value])=> {
      
                  return(
                     <ul className="leading-normal">
                        <li>
                           <label htmlFor={value.id} className=" hover:opacity-90   cursor-pointer">
                              <input 
                                 className="mr-2 cursor-pointer hover:opacity-90"
                                 id={value.id}
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
