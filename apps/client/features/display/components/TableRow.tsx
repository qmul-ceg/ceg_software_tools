"use client"
import { tableConfig } from '@/types/shared.types';
import { SystmOneReportKeys, EMISReportKeys } from '@/modules/cvd/constants/cvdDataEnums';
import React from 'react';
import useScreenWidth from '@/app/hooks/useScreenWidth';

type IndexMap = typeof SystmOneReportKeys | typeof EMISReportKeys
type TableRowProps = {
   row: string[]
   tableConfig: tableConfig,
   reportKeys: IndexMap,
   selectedForExport : Record<string, boolean>
   toggleSelectedPatient: (patientId: number) => void;
   handlePatientClick : (index: number) => void; 
   index : number;
   style :React.CSSProperties
   gridTemplateColumns: string
}



const TableRow = ({row, tableConfig, reportKeys, selectedForExport, toggleSelectedPatient, handlePatientClick, index, style, gridTemplateColumns}: TableRowProps)=> {

   const screenWidth = useScreenWidth();
   return (
      <div style ={{...style, display:"grid", gridTemplateColumns: gridTemplateColumns }} className='hover:bg-gray-50' >
         {
            tableConfig.map((data, configIndex) => {
               return (
                  data.id === "select"
                  ?  <div className= " border-gray-100 border-b text-center border-r flex items-center justify-center">
                        <input type = "checkbox" onChange = {()=>toggleSelectedPatient(index)} checked = {row[reportKeys!.Full_Name] in selectedForExport}/>
                     </div>
                  :  <div 
                        className ={`${screenWidth < 1800 && data.priority !== "high" ? "hidden " : ""}  flex justify-${data.align} items-center border-gray-100 border-b border-r px-2 py-1 text-xs font-medium  ${data.id === reportKeys!.Full_Name ? "cursor-pointer text-[#21376A]": undefined}`}
                        onClick={   data.id === reportKeys!.Full_Name ? () => handlePatientClick(index) : undefined  }
                        style= {{minWidth: data.minWidth, maxWidth: data.maxWidth}}
                     >
                        {row[data.id]}
                        
                     </div>
               )
            })
         }
      </div>
   )
}

export default React.memo(TableRow)




























   // console.log(gridTemplateColumns())
//   console.log(tableConfig) 
   // const gridTemplateColumns = ()=>{
   //    let gridTemplateColumns: string[] = []
   //    tableConfig.map((col)=> {
   //       gridTemplateColumns.push(col.width)
   //    })
   //    return gridTemplateColumns.join(' ')
   // }



   // console.log(tableConfig)