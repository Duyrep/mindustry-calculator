import { MindustryIcon } from "@/components/common/icons";
import Link from "next/link";

export default function About() {
  return (
    <main className="p-2">
      <Link
        href="https://github.com/Duyrep/mindustry-calculator"
        className="flex w-min items-center gap-1"
      >
        <MindustryIcon className="text-3xl">&#xf300;</MindustryIcon>
        <p className="text-primary">Github</p>
      </Link>
      <Link
        href="https://discord.gg/5jntZRQ928"
        className="flex w-min items-center gap-1"
      >
        <MindustryIcon className="text-3xl">&#xe80d;</MindustryIcon>
        <p className="text-primary">Discord</p>
      </Link>
    </main>
  );
}
