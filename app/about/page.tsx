import { MindustryIcon } from "@/components/icons";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Link
        href="https://github.com/Duyrep/mindustry-calculator"
        className="flex w-min items-center gap-1"
      >
        <MindustryIcon className="text-3xl">&#xf300;</MindustryIcon>
        <p className="text-primary">Github</p>
      </Link>
      <Link
        href="https://discord.gg/h8azEfwpe7"
        className="flex w-min items-center gap-1"
      >
        <MindustryIcon className="text-3xl">&#xe80d;</MindustryIcon>
        <p className="text-primary">Discord</p>
      </Link>
    </>
  );
}
