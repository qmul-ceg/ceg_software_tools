import React from 'react'
import { FilterStates } from '@/types/shared.types'
import { TfiClose } from "react-icons/tfi";
import { GoDotFill } from "react-icons/go";
import { cvdConfig } from '@/modules/cvd/utils/cvdConfig';

type FilterKind = "multi" | "grouped";

type FilterSelectionPayload = {
   selectedFilterName : string,
   selectedValue : string,
   selectedFilterKind : FilterKind,
   selectedIndex? : number
}

type SelectedFilterDisplayProps = {
   filterStates: FilterStates;
   handleFilterSelection: (filterPayload: FilterSelectionPayload) => void;
}

const SelectedFilterDisplay = ({filterStates, handleFilterSelection} : SelectedFilterDisplayProps) => {

   
   return (
      <div className="flex gap-2 flex-wrap  p-2">
         {
            Object.entries(filterStates).map(([selectedFilterName, selectedFilterValue]) => {
               if(selectedFilterValue.kind === "multi" && selectedFilterValue.value.length > 0){           
                     return (
                        <div className="  text-sm text-[#21376A] bg-white px-2 rounded-lg  ">
                           <span className='inline-flex gap-2 items-center justify-center font-bold'>{ cvdConfig.filters[selectedFilterName as keyof typeof cvdConfig.filters].label }: {
                              selectedFilterValue.value.map((item)=>{
                                 return (
                                    <div className="flex items-center">
                                       {
                                     
                                          cvdConfig.filters[selectedFilterName as keyof typeof cvdConfig.filters].options.map((filterOptions)=> {
                                             if (item === filterOptions.value){
                                                return (
                                                   <span className="font-normal mr-2">{filterOptions.label}</span>
                                                )
                                             }
                                          })
                                       }
                                       
                                       <button className=" cursor-pointer text-red-500 hover:opacity-90 text-sm hover:text-lg font-black" 
                                          onClick= {()=> handleFilterSelection(
                                             {
                                             selectedFilterName : selectedFilterName,
                                             selectedValue : item,
                                             selectedFilterKind : selectedFilterValue.kind
                                          })}>

                                          
                                          <TfiClose  className="font-bold"/>
                                       </button>
                                       {
                                          selectedFilterValue.value.indexOf(item) < selectedFilterValue.value.length - 1? <GoDotFill className=" ml-2 text-gray-500" /> : ""
                                       }
                                    </div> 
                                 )
                              })
                           }
                           </span>
                        </div>
                     )
               }


               else if(selectedFilterValue.kind === "grouped" && selectedFilterValue.value.some((group) =>group.length > 0)){
                  return (
                     <div className=" border text-sm text-[#21376A] bg-white px-2 rounded-lg  ">
                        <span className='inline-flex gap-2 items-center justify-center font-bold'>{ cvdConfig.filters[selectedFilterName as keyof typeof cvdConfig.filters].label } : 
                        {
                           selectedFilterValue.value.map((group, groupIndex)=>{
                              if(group.length > 0 ){
                                 return (
                                    <div className="flex items-center gap-2">
                                       {
                                          group.map((item) => {
                                             return (
                                                <div className="flex items-center">
                                                   {
                                                      Object.entries(cvdConfig.filters[selectedFilterName as keyof typeof cvdConfig.filters].options).map(([filterGroup, groupDetails])=> {
                                                   
                                                         return (
                                                            <div className="flex">
                                                               {
                                                                  groupDetails.groupOptions.map((filterOptions)=> {
                                                                     if (item === filterOptions.value){
                                                                     
                                                                        return <span className="font-normal mr-1">{filterOptions.label}</span>
                                             
                                                                     }
                                                                  })
                                                               } 
                                                            </div>
                                                         )
                                                      })
                                                   }
                                                      <button 
                                                         className=" cursor-pointer text-red-500 hover:opacity-90 text-xs hover:text-sm" 
                                                         onClick = { ()=>handleFilterSelection({
                                                            selectedFilterName : selectedFilterName,
                                                            selectedValue : item,
                                                            selectedFilterKind : selectedFilterValue.kind,
                                                            selectedIndex : groupIndex


                                                         })       
                                                            
                                                         }
                                                         
                                                         >
                                                      <TfiClose  />
                                                   </button>
                                                   {
                                                      group.indexOf(item) < group.length - 1? <GoDotFill className=" ml-2 text-gray-500 " /> : ""
                                                   }
                                                </div>
                                             )
                                          })
                                       }
                                       {
                                       groupIndex < selectedFilterValue.value.length -1 ? <span className="text-gray-300">|</span> : ""
                                       }
                                                               

                                    </div>
                                 )  
                              }
                           })
                        }
                        </span>
                     </div>
                  )
               }
            })
         }
      </div>
   )
}

export default SelectedFilterDisplay
