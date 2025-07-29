import React, { useEffect, useRef, useState } from "react";

export default function Dropdown({
  openState,
  trigger,
  children,
  anchorEl,
}: {
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  children: React.ReactNode;
  anchorEl?: React.ReactNode;
  trigger?: HTMLElement | null;
}) {
  const [open, setOpen] = openState;
  const [origin, setOrigin] = useState<"top" | "bottom">(
    "top"
  );
  const container = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!divRef.current?.contains(target) && !trigger?.contains(target)) {
        setOpen(false);
      }
    };

    const handleScroll = (event: Event) => {
      const target = event.target;
      if (
        target instanceof Node &&
        divRef.current &&
        !divRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    const closeDropdown = () => setOpen(false)

    document.addEventListener("click", handleClick);
    document.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", closeDropdown, true);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", closeDropdown, true);
    };
  }, [setOpen, trigger]);

  useEffect(() => {
    if (!open || !divRef.current || !container.current) return;
    const rect = container.current.getBoundingClientRect();
    const dropdown = divRef.current;
    const style = dropdown.style;

    const dropdownHeight = dropdown.offsetHeight;
    const dropdownWidth = dropdown.offsetWidth;

    let top = rect.bottom;
    let left = rect.left;

    if (top + dropdownHeight > window.innerHeight) {
      top = rect.top - dropdownHeight;
      setOrigin("bottom");
      if (top < 0) top = 0;
    } else {
      setOrigin("top");
    }

    if (left + dropdownWidth > window.innerWidth) {
      left = window.innerWidth - dropdownWidth;
    }

    if (left < 0) left = 0;

    style.top = `${top}px`;
    style.left = `${left}px`;
  }, [open]);

  return (
    <div ref={container}>
      <div>{anchorEl}</div>
      <div
        ref={divRef}
        className={`z-10 fixed overflow-hidden ${
          !open && "scale-y-70 opacity-0 pointer-events-none select-none"
        }`}
        style={{ transformOrigin: origin, transition: "opacity .2s ease, scale .2s ease" }}
      >
        <div className="border border-surface-a30 bg-surface-a10 rounded-md">
          {children}
        </div>
      </div>
    </div>
  );
}
