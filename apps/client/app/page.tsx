import Image from "next/image";
import { Button } from "@/components/ui/button"
import ImportScreen from "@/features/import/components/ImportScreen";
import DisplayProvider from "@/context/DispayContext";

export default function Home() {
  return (
   <div>
      <ImportScreen />
   </div>
  );
}


