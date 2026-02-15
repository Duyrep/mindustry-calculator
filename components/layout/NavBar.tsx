"use client";

import { Menu, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui";
import { useSideBar } from "@/context";

// [@media(min-height:450px)]:fixed
export default function NavBar() {
  const { toggleSideBar } = useSideBar();

  return (
    <nav className="fixed w-screen flex justify-between items-center px-2 py-0.5 bg-primary text-white z-50">
      <div className="flex gap-4">
        <Button className="p-1 overflow-hidden" onClick={toggleSideBar}>
          <Menu size={32} />
        </Button>

        <Link href="/" className="flex items-center select-none">
          <Image src="/favicon.ico" width={32} height={32} alt="logo" />
          <span className="font-bold text-lg">&nbsp;Mindustry Calculator</span>
        </Link>
      </div>

      <Button>
        <Sun />
      </Button>
    </nav>
  );
}
