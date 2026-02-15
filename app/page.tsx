import InputResource from "@/components/forms/InputResource";
import { ProductionTable } from "@/components/results/ProductionTable";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 p-2 min-w-min">
      <InputResource />
      <ProductionTable />
    </div>
  );
}
