import { Button } from "@/components/ui";
import { Filter, Settings } from "lucide-react";

export default function TableSettings() {
  return (
    <div className="p-2 flex gap-2" >
      <Button className="flex font-bold" size="sm">
        <Settings />
        &nbsp;Settings
      </Button>
      <Button className="flex font-bold" size="sm">
        <Filter />
        &nbsp;Filter
      </Button>
    </div>
  );
}
