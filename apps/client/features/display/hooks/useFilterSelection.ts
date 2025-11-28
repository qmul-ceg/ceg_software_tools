import { FilterStates } from '@/types/shared.types';
import { useState } from 'react';

type FilterKind = "multi" | "grouped"
type FilterHookPayload = {

   filterStates : FilterStates,
   setFilterStates: React.Dispatch<React.SetStateAction<FilterStates>>,

}


   const defaultFilters:FilterStates = {
      antihypertensiveMedsFilter : {   kind: "grouped", value: [[],[], [], []]   },
      bloodPressureFilter: {  kind: "grouped", value: [  [], []]  },
      houseboundCarehomeFilter : {  kind: "multi", value: []},
      lipidMedicationsFilter: {kind: "grouped", value: [[],[],[],[]]},
      comorbiditiesFilter: {kind: "multi", value: []},
      cholestrolFilter: {kind: "grouped", value: [[], []]},
      qRiskFilter: {kind: "grouped", value: [[],[]]},
      vulnerabilitiesFilter: {kind: "multi", value: []},
      ethnicityFilter: {kind: "multi", value: []},
      ageFilter: {kind: "multi", value: []},
      adverseMedsFilter: {kind: "multi", value: []},
      hptnDiagnosis: {kind: "multi", value: []},
      aceiArbFilter : {kind : "multi", value : []}
   }

export default function useFilterSelection (payload: FilterHookPayload){
   const [selectedQuickFilter, setSelectedQuickFilter] = useState<FilterStates>({})
   
   type FilterSelectionPayload = {
      selectedFilterName : string,
      selectedValue : string,
      selectedFilterKind : FilterKind,
      selectedIndex? : number
   }


   function handleFilterSelection (filterPayload:FilterSelectionPayload){
      if(filterPayload.selectedFilterKind === "multi"){
         const updateMultiFilterState = () => {
               
            const filterKeyToUpdate = filterPayload.selectedFilterName
            payload.setFilterStates((prev) => {
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
                  [filterKeyToUpdate] : { kind : "multi", value : [...prev[filterKeyToUpdate].value as string[], filterPayload.selectedValue] }
               }
            });
         }
         updateMultiFilterState();
      }


      else  {
         const updateGroupedFilterState = () => {
            const filterToUpdate = filterPayload.selectedFilterName;
            payload.setFilterStates((prev) => {
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
         updateGroupedFilterState();
      }
   }


   function handleQuickFilterSelection (quickFilterPayload:FilterStates){
     
      const exists = Object.entries(quickFilterPayload).every(([key, value]) => (
         JSON.stringify(selectedQuickFilter[key]) === JSON.stringify(value)
      ))

      if(selectedQuickFilter && exists){
         payload.setFilterStates(defaultFilters)
         setSelectedQuickFilter({})
         return
      };

      setSelectedQuickFilter(quickFilterPayload)
      payload.setFilterStates(defaultFilters)
      payload.setFilterStates({...defaultFilters, ...quickFilterPayload});
   
   }


   function removeAllFilters(){
      setSelectedQuickFilter({})
      payload.setFilterStates(defaultFilters)
   }

   return {handleFilterSelection, handleQuickFilterSelection, selectedQuickFilter, setSelectedQuickFilter, removeAllFilters}
}



