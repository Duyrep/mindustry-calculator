import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from "../ui/Dialog";
import { MindustryIcon } from "../icons";
import type { ColumnSettingsType } from "@/types";
import React from "react";
import Button from "../ui/Button";

export default function ColumnSettings({
  columnSettings,
  setColumnSettings,
}: {
  columnSettings: ColumnSettingsType;
  setColumnSettings: React.Dispatch<React.SetStateAction<ColumnSettingsType>>;
}) {
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger>
        <button className="bg-surface-a20 p-1 rounded-md duration-200 hover:bg-surface-a30">
          <MindustryIcon className="text-xl">&#xe88c;</MindustryIcon>&nbsp;
          {t("Column settings")}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-primary whitespace-nowrap w-full text-center font-bold p-1">
          <h4>{t("Column settings")}</h4>
        </DialogTitle>
        <hr className="border-primary" />
        <div className="flex flex-col gap-2 overflow-auto my-2">
          {Object.entries(columnSettings).map(([key, value]) => (
            <div key={key} className="flex items-center gap-1 px-1">
              <div
                className={`flex items-center justify-center w-8 h-8 border border-surface-a30 rounded-md cursor-pointer duration-100 hover:border-primary hover:border-2 active:scale-90 ${
                  value && "bg-primary"
                }`}
                onClick={() =>
                  setColumnSettings((prev) => ({
                    ...prev,
                    [key]: !value,
                  }))
                }
              >
                <MindustryIcon
                  className={`duration-100 ${
                    value ? "opacity-100" : "opacity-0"
                  }`}
                >
                  &#xe800;
                </MindustryIcon>
              </div>
              <span className="whitespace-nowrap">
                {t(key[0].toUpperCase() + key.slice(1))}
              </span>
            </div>
          ))}
        </div>
        <hr className="border-primary mb-2" />
        <DialogClose>
          <Button>Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
