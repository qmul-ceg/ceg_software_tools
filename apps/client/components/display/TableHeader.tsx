import React from 'react'
import { useDisplay } from '@/context/DispayContext'


const TableHeader = () => {
   const { tableHeader } = useDisplay()
   return (
      <div className="border">
         <table>
            <thead>
               <tr className=''>
                     <th className='  border-r-2 bg-white sticky top-0 border-b-6 z- border-[#21376A] w-10'>
                        <input
                           type="checkbox"
                           
                        />
                        
                     </th>
                     {tableHeader.map((item)=> (
                        <th className=' px-4 py-1 border-r-2 bg-white sticky top-0 border-b-6  border-[#21376A]'>{item}</th>
                     ))}
                  </tr>

            </thead>
         </table>
      </div>
   )
}

export default TableHeader
