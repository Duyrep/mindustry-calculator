/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  forwardRef,
  ReactElement,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

export const DialogTrigger = ({ children }: { children?: React.ReactNode }) =>
  children;
export const DialogContent = ({ children }: { children?: React.ReactNode }) =>
  children;

export interface DialogHandle {
  openDialog: () => void;
  closeDialog: () => void;
}

const Dialog = forwardRef<
  DialogHandle,
  {
    children?: React.ReactNode;
    className?: string;
    onOpen?: (isOpen: boolean) => void;
  }
>(({ children, className, onOpen }, ref) => {
  const { t } = useTranslation();
  const [mount, setMount] = useState(false);
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const { triggerComponent, contentComponent } = useMemo(() => {
    let trigger: ReactElement | undefined;
    let content: ReactElement | undefined;

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        if (child.type === DialogTrigger) trigger = child;
        if (child.type === DialogContent) content = child;
      }
    });

    return { triggerComponent: trigger, contentComponent: content };
  }, [children]);

  useImperativeHandle(ref, () => ({
    openDialog: () => setOpen(true),
    closeDialog: () => setOpen(false),
  }));

  useEffect(() => {
    if (onOpen) onOpen(open);

    if (open) {
      setMount(true);
    } else if (contentRef.current) {
      contentRef.current.classList.add("opacity-0");
      setTimeout(() => setMount(false), 200);
    }
  }, [open]);

  useEffect(() => {
    if (mount && contentRef.current) {
      contentRef.current.classList.remove("opacity-0");
    }
  }, [mount]);

  if (!triggerComponent) {
    throw new Error("DialogTrigger component is missing");
  }
  if (!contentComponent) {
    throw new Error("DialogContent component is missing");
  }

  return (
    <>
      <span onClick={() => setOpen((prevOpen) => !prevOpen)}>
        {triggerComponent}
      </span>
      {mount && (
        <div
          ref={contentRef}
          className={`fixed z-10 top-0 left-0 w-svw h-svh overflow-hidden transition-all duration-200 sm:p-14 backdrop-blur-xs flex justify-center items-center opacity-0 ${
            !open && "opacity-0"
          }`}
          onClick={(event) => {
            if (!dialogRef.current?.contains(event.target as HTMLElement))
              setOpen(false);
          }}
        >
          <div
            ref={dialogRef}
            className={`flex flex-col w-full h-full max-h-min bg-surface-a10 p-2 sm:rounded-md overflow-hidden rounded-md border border-surface-a20 ${className}`}
          >
            {contentComponent}
            <hr className="my-2 border-surface-a50" />
            <div className="flex justify-end">
              <button
                className="bg-primary rounded-md py-1 px-3 text-background"
                onClick={() => setOpen(false)}
              >
                <b>{t("Close")}</b>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

Dialog.displayName = "Dialog";
export default Dialog;
