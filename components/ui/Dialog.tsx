import * as RadixDialog from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui";

// 1. Root, Trigger, Portal bạn đã làm
export function Dialog(props: RadixDialog.DialogProps) {
  return <RadixDialog.Root {...props} />;
}

export function DialogTrigger(props: RadixDialog.DialogTriggerProps) {
  return <RadixDialog.Trigger {...props} />;
}

export function DialogPortal(props: RadixDialog.DialogPortalProps) {
  return <RadixDialog.Portal {...props} />;
}

export function DialogOverlay({
  className,
  ...props
}: RadixDialog.DialogOverlayProps) {
  return (
    <RadixDialog.Overlay
      className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-xs duration-200 ${className}`}
      {...props}
    />
  );
}

export function DialogContent({
  className,
  children,
  ...props
}: RadixDialog.DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay className="data-[state=open]:animate-[fadeIn_200ms] data-[state=closed]:animate-[fadeOut_200ms]" />
      <RadixDialog.Content
        {...props}
        className="
          fixed p-10 top-0 right-0 w-screen h-screen z-50 flex items-center justify-center duration-200
          data-[state=open]:animate-[fadeIn_200ms] data-[state=closed]:animate-[fadeOut_200ms]
        "
        style={{ pointerEvents: "none" }}
      >
        <div
          className={twMerge(
            "max-w-md border border-surface-a20 rounded-md p-2 bg-surface-a10 h-min",
            className,
          )}
          style={{ pointerEvents: "auto" }}
        >
          {children}
        </div>
      </RadixDialog.Content>
    </DialogPortal>
  );
}

export function DialogTitle({
  className,
  children,
  asChild,
  ...props
}: RadixDialog.DialogTitleProps) {
  return (
    <RadixDialog.Title {...props} asChild={asChild}>
      {asChild ? (
        <div>
          {children}
          <hr className="border-surface-a30 my-2" />
        </div>
      ) : (
        <div className={`text-center ${className}`}>
          <b>{children}</b>
          <hr className="border-surface-a30 my-2" />
        </div>
      )}
    </RadixDialog.Title>
  );
}

export function DialogDescription({
  className,
  ...props
}: RadixDialog.DialogDescriptionProps) {
  return (
    <RadixDialog.Description
      className={`text-sm text-surface-a50 ${className}`}
      {...props}
    />
  );
}

export function DialogClose({
  children,
  ...props
}: RadixDialog.DialogCloseProps) {
  return (
    <div className="mt-2 flex flex-col gap-2">
      <hr className="border-surface-a30" />
      <div className="flex justify-end">
        <RadixDialog.Close {...props} asChild>
          <Button className="bg-primary font-bold">Close</Button>
        </RadixDialog.Close>
      </div>
    </div>
  );
}

export function DialogFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 flex flex-col gap-2">
      <hr className="border-surface-a30" />
      <div className="flex justify-end">{children}</div>
    </div>
  );
}
