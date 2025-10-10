"use client"
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { useDisplay } from '@/context/DispayContext'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FilterStates } from '@/types/shared.types'

const FilterSection = () => {

   const [showFilter, setShowFilter] = useState<boolean>(true)
   const {  filterItems, setFilterItems, quickFilters, summaryTable, filterStates, setFilterStates} = useDisplay()
  
   type FilterKind = "multi" | "grouped"
   type FilterSelectionPayload = {
      selectedFilterName : string,
      selectedValue : string,
      selectedFilterKind : FilterKind,
      selectedIndex? : number
   }






   // console.log(filterItems)
   const handleFilterSelection = (filterPayload : FilterSelectionPayload) => {
      // console.log(filterPayload)

      if(filterPayload.selectedFilterKind === "multi"){
         const updateMultiFilterState = () => {
            
            const filterKeyToUpdate = filterPayload.selectedFilterName
            setFilterStates((prev) => {
               if((prev[filterKeyToUpdate].value as string[]).includes(filterPayload.selectedValue)){
                  
                  return {
                     ...prev,
                     [filterKeyToUpdate] : {
                        kind: "multi", 
                        value :(prev[filterKeyToUpdate].value as string[]).filter(value => value !== filterPayload.selectedValue)

                     }
                  }
               }
               return {
                  ...prev,
                  [filterKeyToUpdate] : { kind : "multi", value : [...prev[filterKeyToUpdate].value as string[], filterPayload.selectedValue]
               
                  }
               }
              
            })
         }
         updateMultiFilterState()
      }

      if (filterPayload.selectedFilterKind === "grouped"){
   
         const updateGroupedFilterState = () => {
            const filterToUpdate = filterPayload.selectedFilterName;
            setFilterStates((prev) => {
               const arrayToUpdate = prev[filterToUpdate].value[filterPayload.selectedIndex as number]

               if(arrayToUpdate.includes(filterPayload.selectedValue)){
                  return {
                     ...prev,
                     [filterToUpdate] : { 
                        kind : "grouped",
                        value : (prev[filterToUpdate].value as [][]).map((item: string[], index:number) => 
                           index === filterPayload.selectedIndex ? item.filter(value => value !== filterPayload.selectedValue) : item 
                        )
                       
                     }
                  }
                  
               }
               return {
                  ...prev,
                  [filterToUpdate] : {
                     kind : "grouped",
                     value : (prev[filterToUpdate].value as [][]).map((item: string[], index:number) => 
                           index === filterPayload.selectedIndex ? [...item, filterPayload.selectedValue] : item
                     )
                  }
               }
            })          
         }
         updateGroupedFilterState()
      }
   }

   useEffect(()=>{
      console.log(filterStates)

   }, [filterStates])






   return (
      <div >
         <div className = " flex px-4 min-h-16 items-center  rounded-t-lg bg-[#21376A]">
            <div className=" items-center">
               <p className="text-xl font-bold text-white">
                  Filters
               </p>
            </div>
            
            {/* FILTER ADD OR DELETE FILTERS */}
            
            <div className="ml-auto mr-8 text-center min-w-[140px] ">
               <button
                  className='bg-white text-[#21376A] rounded-md 
                           font-bold text-sm px-2 py-1 cursor-pointer 
                           hover:text-black hover:bg-white'
               >
                  Remove all filters
               </button>
            </div>
            <div className = {`icon ${showFilter ? 'open' : 'closed'}`}>
               <FontAwesomeIcon  
                  icon ={faChevronUp}  
                  className="text-white cursor-pointer opacity-80" 
                  onClick={()=>setShowFilter(!showFilter)}
               />
            </div>
         </div>
         

         
         <div className={`border-[0.1em] border-[#21376A] border-t-0 filter ${showFilter ? 'open' : 'closed'} px-4 py-2 flex justify-between`}>
            {/* QUICK FILTERS */}
            <div className= " min-w-[400px] ">
               <header 
                  className=  "flex justify-between px-2 py-2 rounded-t-lg bg-gradient-to-r from-[#7B0E72] from-70% to-[#E6007E] text-white" >
                  <p className ="font-semibold text-md text-left ">Quick filters</p>
               </header>
               <div className="flex flex-col border-[0.1em] text-left border-[#21376A]  border-t-0 p-2 font-semibold ">
                  {quickFilters.map((item, id) => (
                     <label key={id}>
                        <input type="checkbox" className="mr-2"></input>
                        <span>{item}</span>
                     </label>

                  ))}
               </div>
            </div>


            {/* FILTERS */}
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
                              <SelectContent className="pl-2">
                                 {
                                    value.kind === "multi" ?
                                       value.options.map((option: {value: string, label: string} ) => (
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
                                       ))     
                                       : 
                                       Object.entries(value.options).map(([group, inner], groupIndex, groupArray) => {
                                          return (
                                             <div>
                                                <p className="font-bold">{inner.groupName}</p>
                                                <ul className={`${groupIndex !== groupArray.length -1 ? " border-b-2" : ""} py-1`}>
                                                   {inner.groupOptions.map((option) => (
                                                      <li >
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
                                                   ))}
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




            
            
            {/* SUMMARY BOX */}
            <div className="max-w-[650px] w-[600px] ml-0">
               <header className="flex  rounded-t-lg px-2 py-2 bg-[#21376A] text-white justify-between">
                  <p className ="font-semibold text-md text-left ">Summary</p>
                  <div className= "flex gap-6 text-sm font-bold  mr-14">
                     <p>Denominator</p>
                     <p>Numerator</p>
                     <p>%</p>
                  </div>
               </header>
               <div className="border-[0.1em] border-[#21376A] border-t-0  p-2 font-semibold ">
                  {summaryTable.map((item, index)=> (
                     <div key = {index} className="text-sm flex  justify-between">
                        <p>{item[0]}</p>
                        <div className="flex gap-16 mr-12">
                           {item.map((subItem, subIndex)=> (
                             subIndex ? <p>{subItem}</p> : ""
                           ))}
                        </div>
                     </div>
                  ))}
               </div>

            </div>
         </div>


         
   </div>
  )
}

export default FilterSection

  // setFilterStates((prev) => {
            //    // prev[filterToUpdate].value.map((item, index) => {

            //       if()
            //       // if(filterPayload.selectedIndex === index){
            //       //    return {
            //       //       ...prev,
            //       //       [filterToUpdate] : { kind : "grouped",
            //       //          value : (prev[filterToUpdate].value).map(inner, index) => {

            //       //          }

            //       //       }
            //       //    }
            //       }
            //    })
               
            //    // (prev[filterToUpdate].value as [][]).map((item: string[], index:number) => {
            //    //    if(index === filterPayload.selectedIndex){
            //    //       if(item.includes(filterPayload.selectedValue)){
                        
            //    //          return {
            //    //             ...prev,
            //    //             [filterToUpdate] : { kind : "grouped",
            //    //                value : (prev[filterToUpdate].value as string[][]).map((inner, index) => {
            //    //                   if(index === filterPayload.selectedIndex){
            //    //                      if(inner.includes(filterPayload.selectedValue)){
            //    //                         inner.filter(value => value !== filterPayload.selectedValue)
            //    //                      }
            //    //                   }
            //    //                })
            //    //          }
            //    //       }
            //    //    }
            //    // })
            // })
           



 // const indexArrayToUpdate = filterStates[filterToUpdate].value[filterPayload.selectedIndex as number] as string[];
            // console.log(indexArrayToUpdate)
            // setFilterStates((prev) => {
            //    const arrayToUpdate = prev[filterToUpdate].value[filterPayload.selectedIndex as number] as string[]
            //    console.log(arrayToUpdate)
            //    // return prev

            //    if(arrayToUpdate.includes(filterPayload.selectedValue)){
            //       return {
            //          ...prev,
            //          [filterToUpdate] : {kind : "grouped", value : [...prev[filterToUpdate].value, arrayToUpdate.filter(value => value !== filterPayload.selectedValue)]}
            //       }
            //    }
               
            //    return {
            //       ...prev,
            //       [filterToUpdate] : {kind : "grouped", value : [...prev[filterToUpdate].value, arrayToUpdate.concat([filterPayload.selectedValue])]}
            //    }
            //  })

























            {/* <div className="border border-black border-dotted w-[800px] grid grid-rows-3 grid-flow-col h-50">

               {Object.entries(filterItems).map(([key, value]) => (
                  <Select key={key}>
                     <SelectTrigger className={`  ${ key == "Adverse meds" ? "bg-red-700 text-white" : "bg-[#21376A] text-white"} cursor-pointer `}>
                        <p className="text-white font-bold">{key}</p>
                     </SelectTrigger>
                     <SelectContent >
                        {
                           value.map((innerList:[], innerIndex:number) => (
                              <ul key ={innerIndex}className="border-b-2">{
                                 innerList.slice(1).map((item, index) => 
                                 (
                                    
                                    <label key = {index}className=" flex space-x-2 cursor-pointer">
                                       <input 
                                          type="checkbox" 
                                          className='mr-2 cursor-pointer'
                                          value = {item} 
                                          onChange={()=>handleFilterChange(key, item)}
                                          checked = {filterStates.houseboundCarehomeFilter === item}
                                          
                                       />
                                       <span>{item}</span>
                                    </label>
                                 ))
                           }
                              
                           </ul>
                              
                           ))
                        }
                     </SelectContent>
                  </Select>

                  ))
               }
                  
                  
            </div> */}


 {/* <DropdownMenu>
               <DropdownMenuTrigger>
                  Quick filters
               
               </DropdownMenuTrigger>
               <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu> */}
            
            
            
            {/* // filterItems
            //    filterItems.map((item) =>  (
            //       <Select >
            //          <SelectTrigger className={`  ${ item == "Adverse meds" ? "bg-red-700 text-white" : "bg-[#21376A] text-white"}`}>
            //             <p className="text-white font-bold">{item}</p>
            //          </SelectTrigger>
            //       </Select>
            //       // <ul>
            //       //    <li>{item}</li>
            //       // </ul>
                     
            //    )
    
            // )
             */}
             
             
             
             
             // console.log(filterItems)

   // const filterTest = (input:string, filter:string)=> {
   //    const filters = []
   //    filters.push(input)
   //    filters.push(filter)
   //    if (selectedFilter.length > 0 ){
   //       setSelectedFilter([])
   //    }

   //    setSelectedFilter(filters)
   // }
   
   
   
   // console.log(filterName, value)
      // setSelectedFilter((prev) => prev === value ? "" : value)
      // setFilterStates({...filterStates, age: value})
      // setFilterStates(prev => {
      //     == value)
      // })

      // setFilterStates(prev => {
      //    if (prev.age == value){
      //       return {...prev, age: ""}
      //    }
      //    return {...prev, age: value}
      // }) 
      
      
      
      
      
      
      
      
      
      
      
      
      
      // if(filterName.trim() === "Housebound/Care home"){
      //    // console.log(filterStates.houseboundCarehomeFilter)
      //    setFilterStates((prev)=> {
      //       const filterToUpdate = prev[filterName]
      //       if(filterToUpdate.kind === "single"){
      //          if(value === filterToUpdate.value){
      //             return {
      //                ...prev,
      //                filterToUpdate : {kind: "single", value : ""}
      //             }
      //          }else {
      //          return {
      //             ...prev,
      //             filterTopUpdate: {kind: "single", value : value}
      //          }
      //       }
      //       }
      //       return{

      //       }
            
      //    })
      // }
      // const setSingleState = (setter:React.Dispatch<React.SetStateAction<string>>, filterName:string, value:string) =>{
         
      // }

      //If the Filter name = age we know the age filter has been clicked
      // need to to update the state of our ageFilter by using the function
      //check if the current value == to the value we pass in if it is set out value to "" else set to  value



      //TURN THIS INTO SWITCH CASE ... POSSIBLY 
      // if (filterName === "Age"){
      //    setFilterStates(prev => {
            
      //          if(prev.ageFilter.includes(value)){
      //             return {
      //                ...prev,
      //                ageFilter: prev.ageFilter.filter((item) => item !== value)
      //             }
      //          }

      //          return {
      //             ...prev,
      //             ageFilter: [...prev.ageFilter, value]
      //          }
            

      //    })
      // }

      // else if (filterName === "Housebound/Care home"){
      //    setFilterStates(prev => {
      //       if(prev.houseboundCarehomeFilter === value){
      //          return {
      //             ...prev,
      //             houseboundCarehomeFilter : ""
      //          }
      //       }
      //       return {
      //          ...prev,
      //          houseboundCarehomeFilter : value
      //       }
      //    })

      // } 
      
      
      
      
      
      
      
      
      
      // if(age.includes(value)){
      //    setAge((prev) => prev.filter((item)=> item !== value) )
      // }
      // else {
      //    setAge([...age, value])
      // }
      
      
      
      
      
      // const handleFilterChange = (filterName: string, valueSelected:string)=>{

   //    if(filterName.trim() === "Housebound/Care home"){
   //       // console.log(filterStates.houseboundCarehomeFilter)filterToSet: { kind: "single", value: string} 
   //       // const filterStateToSet = filterStates.houseboundCarehomeFilter;
   //       const setSingleFilterState = (setter:React.Dispatch<React.SetStateAction<FilterStates>>, filterToSet:keyof FilterStates) => {
   //          setter(prev => {
   //             if (prev[filterToSet].value === valueSelected) {
   //                return {
   //                   ...prev,
   //                   [filterToSet]: {kind: "single", value : ""}
   //                }
   //             }
   //             return {
   //                ...prev,
   //                [filterToSet] : {kind : "single", value : valueSelected}
   //             }
   //          })
   //       }
   //       // if(filterStateToSet.kind === "single"){
   //          setSingleFilterState(setFilterStates, "houseboundCarehomeFilter")
   //       // }
   //    }

      
   //    if (filterName.trim() === "Age"){
   //       const setMultiFilterState = (setter:React.Dispatch<React.SetStateAction<FilterStates>>, filterToSet: keyof FilterStates) =>{
   //          setter(prev => {
   //             if(prev[filterToSet].kind === "multi"){
   //                if((prev[filterToSet].value as string[]).includes(valueSelected)){
   //                return {
   //                   ...prev,
   //                   [filterToSet] : {kind : "multi" , value : (prev[filterToSet].value as string[]).filter(value => value !== valueSelected)}
   //                   }

   //                }
   //                return {
   //                   ...prev,
   //                   [filterToSet] : {kind : "multi", value : [...prev[filterToSet].value, valueSelected]}
   //                   }
   //             }
   //             return prev
               
   //          })
   //       }
   //       setMultiFilterState(setFilterStates, "ageFilter")
   //    }

   //    if (filterName.trim() === "QRisk score"){
   //       const setGroupFilterState = (setter:React.Dispatch<React.SetStateAction<FilterStates>>, filterToSet: keyof FilterStates) => {
   //          setter(prev => {
   //             if(prev[filterToSet].kind === "group"){
   //                if(valueSelected === "10% or more" || valueSelected === "20% or more"){
   //                   if ((prev[filterToSet].value[0] as string[]).includes(valueSelected)){
   //                      return {
   //                         ...prev,
   //                         [filterToSet] : {kind : "group", value : [[""], prev[filterToSet].value[1]]}
   //                      }
   //                   }
   //                   else {
   //                      return {
   //                         ...prev,
   //                         [filterToSet] : {kind : "group", value : [[valueSelected], prev[filterToSet].value[1]]}
   //                      }
   //                   }
   //                }
   //                else {
   //                   if((prev[filterToSet].value[1] as string[]).includes(valueSelected)){
   //                      return {
   //                         ...prev,
   //                         [filterToSet] : {kind : "group", value : [prev[filterToSet].value[0], [""]]}
   //                      }
   //                   }
   //                   else {
   //                      return {
   //                         ...prev,
   //                         [filterToSet] : {kind : "group", value : [prev[filterToSet].value[0], [valueSelected]]}
   //                      }
   //                   }
   //                }
   //             }
   //             return prev
   //          })
   //       }
   //       setGroupFilterState(setFilterStates, "qRiskFilter")
   //             // console.log(valueSelected)
   //    }
   // }
   
   
   
   
   
   // if (inner.groupName){
                                       //    return (
                                       //       <p>{inner.groupName}</p>
                                             
                                       //    )
                                       // }
                                       // if (inner.groupOptions){

                                       //    return (
                                       //          inner.groupOptions.map((option) => (
                                       //             <>
                                       //                <p>{inner.groupName}</p>
                                       //                <ul>
                                       //                   <label>
                                       //                      <input 
                                       //                         type = "checkbox"
                                       //                         className=" cursor-pointer mr-2"

                                       //                      />
                                       //                         {option.label}
                                       //                   </label>
                                                      
                                       //                {/* <li>{option.label}</li> */}
                                       //                </ul>
                                       //             </>
                                                   
                                       //    ))
                                       //    )
                                       // }
                                       
                                       // if (inner.groupName === "groupName"){
                                       //    return <p>{inner.groupName}</p>
                                       // }
                                       
                                       // if(group === "groupOptions"){
                                       //    return (
                                       //       <>
                                       //          {inner.groupOptions.map((option)=> {
                                       //             <ul>
                                       //                <label>
                                       //                   <input
                                       //                      type="checkbox" 
                                       //                   />
                                       //                      {option.label}
                                       //                </label>
                                       //             </ul>
                                       //          })}
                                       //       </>
                                       //    )
                                       // }