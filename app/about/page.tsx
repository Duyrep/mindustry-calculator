import Link from "next/link";

export const metadata = {
  title: "About | Mindustry Calculator",
  description: "",
};

export default function About() {
  return (
    <div className="p-2 font-bold">
      <Link href="https://github.com/Duyrep/mindustry-calculator">
        <p className="text-primary p-2">Github</p>
      </Link>
      <Link href="https://discord.gg/h8azEfwpe7">
        <p className="text-primary p-2">Discord</p>
      </Link>
    </div>
  );
}
