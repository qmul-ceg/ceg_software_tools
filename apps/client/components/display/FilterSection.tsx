"use client"
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { useDisplay } from '@/contexts/DispayContext'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const FilterSection = () => {
   const [showFilter, setShowFilter] = useState<boolean>(true)
   const { filterItems, setFilterItems, quickFilters, summaryTable, age, setAge, selectedFilter, setSelectedFilter} = useDisplay()
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
   
 

   const handleFilterChange = (value:string)=>{
      setSelectedFilter((prev) => prev === value ? "" : value)

   }

  useEffect(()=> {
      console.log(selectedFilter)
   }, [selectedFilter])

   return (
      <div className="">


         <div className = " flex px-4 min-h-16 items-center  rounded-t-lg bg-[#21376A]">
            <div className=" items-center">
               <p className="text-xl font-bold text-white">
                  Filters
               </p>
            </div>
            
            {/* FILTER ADD OR DELETE FILTERS */}
            <div>

            </div>

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
               <FontAwesomeIcon  icon ={faChevronUp}  
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
                  {quickFilters.map((item) => (
                     <label>
                        <input type="checkbox" className="mr-2"></input>
                        <span>{item}</span>
                     </label>

                  ))}
               </div>
            </div>

            <div className="border border-black border-dotted w-[800px] grid grid-rows-3 grid-flow-col h-50">

               {Object.entries(filterItems).map(([key, value]) => (
                  <Select >
                     <SelectTrigger className={`  ${ key == "Adverse meds" ? "bg-red-700 text-white" : "bg-[#21376A] text-white"} cursor-pointer `}>
                        <p className="text-white font-bold">{key}</p>
                     </SelectTrigger>
                     <SelectContent >
                        {
                           value.map((innerList:[]) => (
                              <ul className="border-b-2">{
                                 innerList.slice(1).map((item, index) => 
                                 (
                                    
                                    <label className=" flex space-x-2 cursor-pointer">
                                       <input 
                                          type="checkbox" 
                                          className='mr-2 cursor-pointer'
                                          value = {item} 
                                          onChange={()=>handleFilterChange(item)}
                                          checked = {selectedFilter === item}
                                          // checked = {selectedFilter === "item"} 
                                       />
                                       {/* <span onClick={()=>filterTest(item, key)}>{item}</span> */}
                                       <span>{item}</span>

                                    </label>
                                    
                              ))
                           }
                              
                           </ul>
                              
                           ))
                        }
                        
                        {/* <ul >
                           <li>{value}</li>
                        </ul> */}
                     </SelectContent>
                  </Select>

                  ))
               }
                  
                  
            </div>
            
            
            {/* SUMMARY BOX */}
            <div className="max-w-[650px] w-[600px] ml-0">
               <header className="flex  rounded-t-lg px-2 py-2 bg-[#21376A] text-white justify-between">
                  <p className ="font-semibold text-md text-left ">Summary</p>
                  <div className= "flex gap-6 text-sm font-bold  mr-14">
                     <p>Numerator</p>
                     <p>Denominator</p>
                     <p>%</p>
                  </div>
               </header>
               <div className="border-[0.1em] border-[#21376A] border-t-0  p-2 font-semibold ">
                  {summaryTable.map((item)=> (
                     <div className="text-sm flex  justify-between">
                        <p>{item[0]}</p>
                        <div className="flex gap-16 mr-12">
                           <p>0</p>
                           <p>0</p>
                           <p>0%</p>
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