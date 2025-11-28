import React from 'react';
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import { FilterStates } from '@/types/shared.types';

type MultiOption = {
   value: string;
   label: string
}

type GroupOption = {
   groupName: string;
   groupOptions: MultiOption[]
}

type Options = Record<string, { groupName : string; groupOptions: { value: string; label: string }[]}>

type GroupedOptions = Record <string, GroupOption>;

type MultiFilter = {
   id : string,
   label : string,
   ui : { width : number, bgColour: string},
   kind : "multi",
   options : MultiOption[],
   emptyBehaviour : []
} 

type GroupedFilter = {
   id : string,
   label : string,
   ui : { width : number, bgColour: string},
   kind : "grouped",
   options : GroupedOptions,
   emptyBehaviour : [][]
} 


type FilterKind = "multi" | "grouped";

type FilterSelectionPayload = {
   selectedFilterName : string,
   selectedValue : string,
   selectedFilterKind : FilterKind,
   selectedIndex? : number
}


type FiltersPayload = {
   filterItems : Record<string, MultiFilter | GroupedFilter>,
   filterStates: FilterStates;
   handleFilterSelection : (payload: FilterSelectionPayload) => void;
}



const Filters = ({filterItems, filterStates, handleFilterSelection}:FiltersPayload) => {
   return (
      <div className=" border-black border-dotted w-[800px] grid grid-rows-3 grid-flow-col h-50 justify-between">
         {
            Object.entries(filterItems).map(([key, value])=> {
               return (
                  <div style={{ width : `${value.ui.width}em`}}>
                     <Select key = {key} >
                        <SelectTrigger 
                           className="cursor-pointer w-full hover:opacity-95" 
                           style={{ backgroundColor : value.ui.bgColour , color : 'white', fontWeight : 'bold'}}
                           >

                           {value.label}
                        </SelectTrigger>
                        <SelectContent className="px-2">
                           {
                              value.kind === "multi" ?
                                 value.options.map((option: {value: string, label: string} ) => {
                                    if(option.value !== "noHypertension"){
                                       return (
                                          <ul>
                                             <label key = {option.value}>
                                                <input 
                                                   type = "checkbox"
                                                   className=" cursor-pointer mr-2"
                                                   checked = {
                                                      value.kind === "multi" && (filterStates[value.id].value as string[]).includes(option.value) 

                                                   }
                                                   value = {option.value} 
                                                   onChange = {()=>handleFilterSelection(
                                                      {  
                                                         selectedFilterName : value.id, 
                                                         selectedValue: option.value, 
                                                         selectedFilterKind : value.kind 
                                                      }
                                                   )}
                                                />
                                                   {option.label}
                                             </label>
                                          </ul>
                                       )
                                    }
                           
                                 })     
                                 : 
                                 Object.entries(value.options).map(([group, inner], groupIndex, groupArray) => {
                                    return (
                                       <div>
                                          <p className="font-bold">{inner.groupName}</p>
                                          <ul className={`${groupIndex !== groupArray.length -1 ? " border-b-2" : ""} py-1`}>
                                             {inner.groupOptions.map((option) => 
                                                {
                                                   if (option.value !== "no_acei/arb"){
                                                      return (
                                                         <li>
                                                            <label>
                                                               <input 
                                                                  type = "checkbox"
                                                                  className = "cursor-pointer mr-2 "
                                                                  value = {option.value}
                                                                  checked = {
                                                                     value.kind === "grouped" && (filterStates[value.id].value[groupIndex].includes(option.value))
                                                                  }
                                                                  onChange = {()=>handleFilterSelection(
                                                                     {
                                                                        selectedFilterName : value.id,
                                                                        selectedValue : option.value,
                                                                        selectedFilterKind : value.kind,
                                                                        selectedIndex : groupIndex
                                                                     }
                                                                  )}
                                                               />
                                                               {option.label}
                                                            </label>
                                                         </li>
                                                      )
                                                   }
                                                }
                                             )}
                                          </ul>
                                       </div>
                                    )
                              }) 
                           }
                        </SelectContent>
                     </Select>
                  </div>
               )
            })
         }
      </div>
   )
}

export default Filters
