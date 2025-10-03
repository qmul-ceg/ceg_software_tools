import React from 'react'
import { useDisplay } from '@/context/DispayContext'


const TableHeader = () => {
   const { tableHeader } = useDisplay()
   return (
      <div className="  sticky border-b-6 border-[#21376A] rounded-t-lg">
         <table>
            <thead>
               <tr className=''>
                     <th className='  border-r-1   top-0   border-[#21376A] w-10'>
                        <input
                           type="checkbox"
                           
                        />
                     </th>

                     {  tableHeader.map((item, index)=> (
                           <th key = {index} className={` px-2 py-1 ${item !== "Medication review latest date" ? "border-r-1" : "" }  top-0   border-[#21376A]`}>{item}</th>
                     ))}
                  </tr>

            </thead>
         </table>
      </div>
   )
}

export default TableHeader
