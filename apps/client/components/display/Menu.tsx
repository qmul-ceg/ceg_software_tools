import { PopoverContent, Popover, PopoverTrigger } from "@/components/ui/popover"
import Link from "next/link"
import React from 'react'



const Menu = () => {
   return (
      <div className = "flex">
         <div className = "mr-2">
            <Popover>
               <PopoverTrigger 
                  className="flex justify-center items-center
                        text-xs px-2 py-[0.3em]  rounded-lg font-semibold
                        bg-gradient-to-r from-[#7B0E72] from-70% to-[#E6007E] text-white "
                     >
                        User guide & <br></br>resources
               </PopoverTrigger>
               <PopoverContent className = "px-2 py-2 w-[14em] mr-28">
                        <div className=" text-sm ">
                           <div> 
                              {/* <a href = "https://www.qmul.ac.uk/ceg/support-for-gp-practices/resources/software-tools/aftool/user-guidance/"
                                 className="ml-2 menu_list_items">User guide</a>         */}
                              <ul className="ml-2 menu_list_items">
                                 <li>
                                    <a href = "https://www.qmul.ac.uk/ceg/support-for-gp-practices/resources/software-tools/aftool/user-guidance/"
                                       target="_blank" rel="noopener noreferrer"
                                    >
                                       User guide
                                    </a>
                                 </li>
                              </ul>
                           </div>
                           <div className="w-full border mt-1 mb-1"></div>
                           <div>
                              <strong>Resources</strong>
                              <ul className="ml-2 menu_list_items">
                                 <li><a href="https://www.qmul.ac.uk/ceg/" target="_blank" rel="noopener noreferrer">CEG website</a></li>
                                 <li><a href="https://cks.nice.org.uk/topics/anticoagulation-oral/" target="_blank" rel="noopener noreferrer">NICE CKS Anticoagulation</a></li>
                                 <li><a href="https://www.mdcalc.com/calc/43/creatinine-clearance-cockcroft-gault-equation" target="_blank" rel="noopener noreferrer">Creatine clearance MDCALC</a></li>
                              </ul>
                           </div>                            
                           
                           

                        </div>
                     </PopoverContent>
            </Popover>
         </div>
                     <div className="flex border border-[#21376A] rounded-lg ">
               <div className="mr-1">
                  <Popover>
                     <PopoverTrigger className ="h-full ">
                        <div className="text-center  px-6 ">
                           <p className="text-md hover:text-black font-bold text-[#21376A]">Export</p>
                        </div>
                     </PopoverTrigger>
                     <PopoverContent className="px-2 py-2 w-[17em] ml-18">
                        <div className="text-sm">
                           <strong className="text-sm">EXPORT SELECTED PATIENTS LIST</strong>
                           <ul className=" ml-2 menu_list_items">
                              <li><button>Excel list (.xlsx)</button> </li>
                              <li><button>Accurx list (.csv)</button> </li>
                              <li><button>NHS No. list (.txt)</button> </li>
                           </ul>
                        </div>
                        
                     </PopoverContent>
                  </Popover>
               </div>

               <div className="">
                  <div className='border border-[#21376A] h-[80%] my-1'>

                  </div>
               </div>

               <div className="ml-1 w-[70%]">
                  <Link href = "/">
                     <button className="  flex flex-col  items-center px-4  py-1 hover:text-black group" >
                        <p className="text-xs text-[#21376A]  group-hover:text-black font-bold">Load new <br></br>patient data</p>
                     </button>
                  </Link>

               </div>
            </div>  
      </div>
   )
}

export default Menu
