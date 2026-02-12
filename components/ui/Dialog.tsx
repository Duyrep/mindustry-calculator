import * as Dialog from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";

function DialogRoot({ children, ...props }: Dialog.DialogProps) {
  return (
    <Dialog.Root {...props}>
      <div className="group">{children}</div>
    </Dialog.Root>
  );
}

function DialogTrigger({ ...props }: Dialog.DialogTriggerProps) {
  return <Dialog.Trigger {...props} asChild></Dialog.Trigger>;
}

function DialogContent({
  className,
  children,
  ...props
}: Dialog.DialogContentProps) {
  return (
    <Dialog.Content
      {...props}
      className="fixed top-0 right-0 w-screen h-screen bg-black/0 z-20 flex items-center justify-center backdrop-blur-xs data-[state=open]:animate-[fadeIn_200ms] data-[state=closed]:animate-[fadeOut_200ms]"
      style={{ pointerEvents: "none" }}
    >
      <div
        className={twMerge(
          "border border-surface-a20 rounded-md p-2 bg-surface-a10 h-min",
          className
        )}
        style={{ pointerEvents: "auto" }}
      >
        {children}
      </div>
    </Dialog.Content>
  );
}

function DialogTitle({ ...props }: Dialog.DialogTitleProps) {
  return <Dialog.Title {...props} asChild></Dialog.Title>;
}

function DialogDescription({ ...props }: Dialog.DialogDescriptionProps) {
  return <Dialog.Description {...props}></Dialog.Description>;
}

function DialogClose({ children, ...props }: Dialog.DialogCloseProps) {
  return (
    <Dialog.Close {...props} asChild>
      <div className="text-right">{children}</div>
    </Dialog.Close>
  );
}

export {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
