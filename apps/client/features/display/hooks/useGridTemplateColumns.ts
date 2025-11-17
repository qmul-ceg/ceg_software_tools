import { TableConfig } from "@/types/shared.types"

export default function (tableConfig:TableConfig ):string{
   return tableConfig.map((item) => item.width).join(' ')
}