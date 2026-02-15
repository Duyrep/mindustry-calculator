"use client";

import { useSideBar } from "@/context";
import {
  Bug,
  ChevronsLeft,
  Network,
  Settings,
  Table,
  LucideIcon,
  Info,
  Puzzle,
  CodeXml,
} from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui";
import { usePathname } from "next/navigation";

interface MenuItem {
  label: string;
  Icon: LucideIcon;
  href: string;
}

const MENU_ITEMS: MenuItem[] = [
  { label: "Table", Icon: Table, href: "/" },
  { label: "Visualize", Icon: Network, href: "/visualize" },
  { label: "Settings", Icon: Settings, href: "/settings" },
  { label: "Editor", Icon: CodeXml, href: "/editor" },
  { label: "Modding", Icon: Puzzle, href: "/modding" },
  { label: "Debug", Icon: Bug, href: "/debug" },
  { label: "About", Icon: Info, href: "/about" },
];

export default function SideBar() {
  const { isOpen, isCollapsed, setIsOpen, toggleCollapse } = useSideBar();
  const pathname = usePathname();

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={twMerge(
        "flex flex-col justify-between bg-primary h-full z-40 transition-all duration-300 ease-in-out overflow-auto",
        isOpen
          ? isCollapsed
            ? "w-15.5"
            : "w-48"
          : "-left-1 w-0 overflow-hidden",
      )}
    >
      <ul
        className={twMerge(
          "pt-12 flex flex-col transition-all duration-300",
          isCollapsed ? "gap-1" : "gap-2",
          isOpen ? "px-2" : "px-0",
        )}
      >
        {MENU_ITEMS.map(({ label, Icon, href }) => {
          const isActive = pathname === href;

          return (
            <li key={`sidebar-item-${href}`}>
              <Link
                href={href}
                onClick={handleLinkClick}
                className={twMerge(
                  "flex items-center rounded-lg duration-200 group relative",
                  "p-2 active:bg-surface-a10/40",
                  isActive ? "bg-surface-a10/50 " : "hover:bg-surface-a10/20",
                )}
                title={isCollapsed ? label : ""}
              >
                <Icon size={24} className="shrink-0" />

                <span
                  className={twMerge(
                    "overflow-hidden whitespace-nowrap transition-all duration-300",
                    isCollapsed
                      ? "w-0 opacity-0 ml-0"
                      : "w-full opacity-100 ml-2",
                  )}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div
        className={twMerge(
          "p-2 transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      >
        <Button
          className="w-full flex justify-center items-center hover:bg-surface-a10/20 py-2 rounded-md p-2 active:bg-surface-a10/40"
          onClick={toggleCollapse}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronsLeft
            size={24}
            className={twMerge(
              "duration-500 ease-out",
              isCollapsed && "rotate-180",
            )}
          />
        </Button>
      </div>
    </nav>
  );
}
