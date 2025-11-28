"use client"
import { FilterStates } from '@/types/shared.types'
import { useMemo } from 'react'



type FilteredDataPayload<EnumType> = {
   masterReport : Record<string, string[]>,
   activeFilters : string[],
   filterStates : FilterStates,
   reportKeys: EnumType,
   relativeRunDate: string,
   filterFunctionalities: Record<string, (row: string[], filterStates: FilterStates, reportKeys: EnumType , relativeDate: string) => boolean>
}




export default function useFilteredData<EnumType>(payload: FilteredDataPayload<EnumType>): string[][]{
   const filtered = useMemo(()=>{
      const tableData = Object.values(payload.masterReport);
      return tableData.filter((row) => {
         return payload.activeFilters.every((activeFilter) => {
            return payload.filterFunctionalities[activeFilter](row, payload.filterStates, payload.reportKeys, payload.relativeRunDate) === true 
         });
      });
   }, [payload.filterStates, payload.activeFilters]);
  return filtered;
};