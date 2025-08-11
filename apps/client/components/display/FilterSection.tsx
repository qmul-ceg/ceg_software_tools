"use client"
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

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
         
         <div>

         </div>

         <div className="ml-auto mr-8 text-center min-w-[140px] ">
            <button
               className='bg-white text-[#21376A] rounded-md font-bold text-sm px-2 py-1 cursor-pointer hover:text-black hover:bg-white'
               // className = " cursor-pointer bg-white text-xs  lg:text-xs xl:text-sm 2xl:text-sm font-semibold text-[#21376A] hover:text-black px-2 py-1 rounded-md "
               // onClick={resetAllFilters} 
            >
               Remove all filters
            </button>
         </div>
         <div className = {`icon ${showFilter ? 'open' : 'closed'}`}>
         
               <FontAwesomeIcon icon ={faChevronUp}  className="text-white cursor-pointer opacity-70" onClick={()=>setShowFilter(!showFilter)}/> 
                  {/* <FontAwesomeIcon icon ={faChevronDown} className="text-white cursor-pointer" onClick={()=>setShowFilter(!showFilter)}/>
                  */}
         </div>

         
      </div>
      
      <div className={`border-[0.1em] border-[#21376A] border-t-0 filter ${showFilter ? 'open' : 'closed'}`}>
            
      </div>
   </div>
  )
}

export default FilterSection
