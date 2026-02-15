import * as RDropdown from "@radix-ui/react-dropdown-menu";
import { twMerge } from "tailwind-merge";

export function Dropdown({ ...props }: RDropdown.DropdownMenuProps) {
  return <RDropdown.Root {...props} />;
}

export function DropdownTrigger({
  className,
  ...props
}: RDropdown.DropdownMenuTriggerProps) {
  return <RDropdown.Trigger {...props} className={twMerge(className)} />;
}

export function DropdownPortal({
  ...props
}: RDropdown.DropdownMenuPortalProps) {
  return <RDropdown.Portal {...props} />;
}

export function DropdownContent({
  className,
  children,
  ...props
}: RDropdown.DropdownMenuContentProps) {
  return (
    <DropdownPortal>
      <RDropdown.Content
        avoidCollisions={true}
        collisionPadding={10}
        sideOffset={5}
        className={twMerge(
          "bg-surface-a10 p-2 rounded-md shadow-xl border border-surface-a20",
          "origin-(--radix-dropdown-menu-content-transform-origin)",
          "data-[state=open]:data-[side=bottom]:animate-slide-down",
          "data-[state=open]:data-[side=top]:animate-slide-up",
          "data-[state=open]:data-[side=left]:animate-slide-left",
          "data-[state=open]:data-[side=right]:animate-slide-right",
          "data-[state=closed]:animate-[fade-out_100ms]",
          className,
        )}
        {...props}
      >
        {children}
        <DropdownArrow className="fill-surface-a20" />
      </RDropdown.Content>
    </DropdownPortal>
  );
}

export function DropdownItem({
  className,
  ...props
}: RDropdown.DropdownMenuItemProps) {
  return (
    <RDropdown.Item
      className={twMerge("dropdown-item hover:outline-none", className)}
      {...props}
    />
  );
}

export function DropdownSeparator({
  className,
  ...props
}: RDropdown.DropdownMenuSeparatorProps) {
  return (
    <RDropdown.Separator
      className={twMerge("dropdown-separator", className)}
      {...props}
    />
  );
}

export function DropdownArrow({
  className,
  ...props
}: RDropdown.DropdownMenuArrowProps) {
  return (
    <RDropdown.Arrow
      className={twMerge("fill-surface-a10", className)}
      {...props}
    />
  );
}
