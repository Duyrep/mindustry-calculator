import * as RTooltip from "@radix-ui/react-tooltip";
import { twMerge } from "tailwind-merge";

export function Tooltip(props: RTooltip.TooltipProps) {
  return <RTooltip.Root {...props} />;
}

export function TooltipTrigger({
  className,
  ...props
}: RTooltip.TooltipTriggerProps) {
  return <RTooltip.Trigger {...props} className={twMerge("", className)} />;
}

export function TooltipPortal(props: RTooltip.TooltipPortalProps) {
  return <RTooltip.Portal {...props} />;
}

export function TooltipContent({
  children,
  className,
  ...props
}: RTooltip.TooltipContentProps) {
  return (
    <RTooltip.Portal>
      <RTooltip.Content
        avoidCollisions={true}
        collisionPadding={10}
        sticky="always"
        align="center"
        className={twMerge(
          "z-50 bg-surface-a20 border border-surface-a30 p-1 rounded-md duration-50",
          "data-[state=delayed-open]:animate-face-in data-[state=delayed-open]:animate-fade-in",
          "data-[state=closed]:animate-face-out data-[state=closed]:animate-fade-out",
          className,
        )}
        {...props}
      >
        {children}
        <TooltipArrow className="fill-surface-a30" />
      </RTooltip.Content>
    </RTooltip.Portal>
  );
}

export function TooltipArrow({
  className,
  ...props
}: RTooltip.TooltipArrowProps) {
  return <RTooltip.Arrow {...props} className={twMerge("", className)} />;
}
