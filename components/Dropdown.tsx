import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export const DropdownTrigger = ({ children }: { children?: React.ReactNode }) =>
  children;
export const DropdownContent = ({ children }: { children?: React.ReactNode }) =>
  children;

export default function Dropdown({
  children,
  onOpen,
}: {
  children: React.ReactNode;
  onOpen?: (isOpen: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [mount, setMount] = useState(false);
  const [origin, setOrigin] = useState<"top" | "bottom">("top");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  const { triggerComponent, contentComponent } = useMemo(() => {
    let trigger: ReactElement | undefined;
    let content: ReactElement | undefined;

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        if (child.type === DropdownTrigger) trigger = child;
        if (child.type === DropdownContent) content = child;
      }
    });

    return { triggerComponent: trigger, contentComponent: content };
  }, [children]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!dropdownRef.current?.contains(target)) {
        setOpen(false);
      }
    };

    const handleScroll = (event: Event) => {
      const target = event.target;
      if (
        target instanceof Node &&
        content.current &&
        !content.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    const closeDropdown = () => setOpen(false);

    document.addEventListener("click", handleClick);
    document.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", closeDropdown, true);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", closeDropdown, true);
    };
  }, [setOpen]);

  if (!triggerComponent) {
    throw new Error("DropdownTrigger component is missing");
  }
  if (!contentComponent) {
    throw new Error("DropdownContent component is missing");
  }

  useEffect(() => {
    if (onOpen) onOpen(open);

    if (open) {
      setMount(true);
    } else if (content.current) {
      setTimeout(() => setMount(false), 200);
    }

    if (!open || !content.current || !dropdownRef.current) return;
    const rect = dropdownRef.current.getBoundingClientRect();
    const dropdown = content.current;
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
  }, [open, onOpen]);

  useEffect(() => {
    if (mount && content.current) {
      content.current.classList.remove("opacity-0", "scale-y-70");
    } else {
    }
  }, [mount])

  return (
    <div ref={dropdownRef}>
      <div onClick={() => setOpen((prevOpen) => !prevOpen)}>
        {triggerComponent}
      </div>
      {mount && (
        <div
          ref={content}
          onClick={() => setOpen(false)}
          className={`z-10 fixed overflow-hidden opacity-0 scale-y-70 ${open && "opacity-0 scale-y-70"}`}
          style={{
            transformOrigin: origin,
            transition: "opacity .2s ease, scale .2s ease",
          }}
        >
          <div className="border border-surface-a30 bg-surface-a10 rounded-md">
            {contentComponent}
          </div>
        </div>
      )}
    </div>
  );
}
