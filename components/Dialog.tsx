import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function Dialog({
  openState,
  children,
  className,
  onClose,
}: {
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  children?: React.ReactNode;
  className?: string;
  onClose?: () => void
}) {
  const { t } = useTranslation();
  const [open, setOpen] = openState;
  const divRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onClose, [open])

  return (
    <div
      className={`fixed z-10 top-0 left-0 w-screen h-screen overflow-hidden transition-all duration-200 sm:p-14 backdrop-blur-xs flex justify-center items-center ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={(event) => {
        if (!divRef.current?.contains(event.target as HTMLElement))
          setOpen(false);
      }}
    >
      <div
        ref={divRef}
        className={`flex flex-col w-full h-full max-h-min bg-surface-a10 p-2 sm:rounded-md overflow-hidden ${className}`}
      >
        {children}
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
  );
}
