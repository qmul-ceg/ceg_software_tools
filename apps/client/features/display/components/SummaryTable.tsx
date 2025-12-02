import React from 'react'
import { SummaryTableType } from '@/types/shared.types';
import useScreenWidth from '@/app/hooks/useScreenWidth';
import { PopoverContent, Popover, PopoverTrigger } from "@/components/ui/popover";

type SummaryTableProps = {
   summaryTable : SummaryTableType;
}

const SummaryTable = ({summaryTable}: SummaryTableProps) => {
   const screenWidth = useScreenWidth();
   if(screenWidth < 1474){
      return  (
         <>
         <Popover>
            <PopoverTrigger className=" mr-2 h-9 min-w-[100px] w-[140px] text-left p-2 rounded-lg bg-gradient-to-r from-[#7B0E72] from-70% to-[#E6007E] text-white font-semibold text-sm">
               Summary
            </PopoverTrigger>
            <PopoverContent className="mr-10 w-[600px] p-1">
               <div className="max-w-[600px]   ml-0">
              
               <div className=" px-2 pb-1 font-medium ">
                  <table>
                     <thead>
                        <tr className=' w-1.5'>
                           {
                              summaryTable.headers.map((header, index)=> {
                                 return <th className=" font-semibold text-sm w-100">{header}</th>
                              })

                           }

                        </tr>
                     </thead>
                     <tbody>
                        {
                           summaryTable.summaryContent.map((content, index)=> {
                              return (
                                 <tr className={` text-sm ${index % 2 == 0 ? "bg-gray-100": ""} `}>
                                    <td className="w-[60%] font-semibold">{content.description}</td>
                                    <td className='text-center '>{content.denominator}</td>
                                    <td className='text-center'> {content.numerator}</td>
                                    <td className='text-center'>{content.percentage}</td>

                                    
                                 </tr>

                              )
                              
                           })
                        }
                     </tbody>
                  </table>
               </div>
            </div>
            </PopoverContent>
         </Popover>
         </>
      )
     
   }
   return (
      <div className="  max-w-[600px] min-w-[540px]   ml-0">
         <header className="flex  rounded-t-lg p-2 bg-[#21376A] text-white justify-between">
            <h1 className ="font-semibold text-sm text-left ">Summary</h1>
            
         </header>
         <div className="border-[0.1em] border-[#21376A] border-t-0 px-2 pb-1 font-medium ">
            <table>
               <thead>
                  <tr className=' w-1.5'>
                     {
                        summaryTable.headers.map((header, index)=> {
                           return <th className=" font-semibold text-sm w-100">{header}</th>
                        })

                     }

                  </tr>
               </thead>
               <tbody>
                  {
                     summaryTable.summaryContent.map((content, index)=> {
                        return (
                           <tr className={` text-sm ${index % 2 == 0 ? "bg-gray-100": ""} `}>
                              <td className="w-[60%] font-semibold">{content.description}</td>
                              <td className='text-center '>{content.denominator}</td>
                              <td className='text-center'> {content.numerator}</td>
                              <td className='text-center'>{content.percentage}</td>

                              
                           </tr>

                        )
                        
                     })
                  }
               </tbody>
            </table>
         </div>
      </div>
   )
}

export default SummaryTable
