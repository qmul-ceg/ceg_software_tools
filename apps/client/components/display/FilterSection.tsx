"use client"
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'


const FilterSection = () => {
   const [showFilter, setShowFilter] = useState<boolean>(true)
   
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
            <div className="border-[0.1em] border-[#21376A] h-40 border-t-0  pt-2 font-semibold ">

            </div>
         </div>

         <div className="border border-black border-dotted">
            Filters
         </div>
         
         
         {/* SUMMARY BOX */}
         <div className="min-w-[500px] ml-0">
            <header className="flex  rounded-t-lg px-2 py-2 bg-[#21376A] text-white">
               <p className ="font-semibold text-md text-left ">Summary</p>
            </header>
            <div className="border-[0.1em] border-[#21376A] h-40 border-t-0  pt-2 font-semibold ">

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