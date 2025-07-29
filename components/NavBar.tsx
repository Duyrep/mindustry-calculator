"use client";

import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";

export default function NavBar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const navItemBg = useRef<HTMLDivElement>(null);

  return (
    <nav className="relative border-b border-b-surface-a50 overflow-auto scroll-hidden bg-background">
      <div
        ref={navItemBg}
        className="fixed top-0 right-0 pointer-events-none transition-all p-1"
      >
        <div className="w-full h-full rounded-sm bg-surface-a10"></div>
      </div>
      <div className="flex">
        {Object.entries({
          "/": "Factory",
          "/visualize": "Visualize",
          "/settings": "Settings",
          "/about": "About",
        }).map(([href, name]) => (
          <NavItem
            key={name}
            href={href}
            navItemBg={navItemBg.current}
            className={`${pathname !== href && "text-surface-a50"} z-10`}
          >
            {t(name)}
          </NavItem>
        ))}
      </div>
    </nav>
  );
}

function NavItem({
  children,
  href,
  navItemBg,
  className,
}: {
  children?: React.ReactNode;
  href: Url;
  navItemBg?: HTMLElement | null;
  className?: string;
}) {
  const handleNavItemHover: React.MouseEventHandler<HTMLElement> = (event) => {
    if (!navItemBg) return;
    const target = event.target as HTMLElement;
    if (!target) return;
    const style = navItemBg.style;
    const rect = target.getBoundingClientRect();

    style.opacity = "1";
    style.top = rect.top + "px";
    style.left = rect.left + "px";
    style.width = rect.width + "px";
    style.height = rect.height + "px";
  };

  const handleNavItemLeave: React.MouseEventHandler<HTMLElement> = (event) => {
    if (!navItemBg) return;
    const target = event.target as HTMLElement;
    if (!target) return;
    navItemBg.style.opacity = "0";
  };

  return (
    <Link
      className={`p-2 px-4 ${className}`}
      onMouseEnter={handleNavItemHover}
      onMouseLeave={handleNavItemLeave}
      href={href}
    >
      {children}
    </Link>
  );
}
