import { TableConfig } from "@/types/shared.types"

export default function (tableConfig:TableConfig ):string{
   return tableConfig.map((item) => item.width).join(' ')
}

//Create a custom hook that accepts the tableConfig and the priority 
//Create useEffect so that when the screen changes width the function is called 
// the result from the function is stored in state. 
// that state is what we use to update o