import { useTranslation } from "react-i18next";
import Dialog, { DialogContent, DialogHandle, DialogTrigger } from "./Dialog";
import { MindustryIcon } from "./icons";
import React, { useRef } from "react";
import { VisualizeSettingsType } from "@/types";

export default function VisualizeSettings({
  settingsState,
}: {
  settingsState: [
    VisualizeSettingsType,
    React.Dispatch<React.SetStateAction<VisualizeSettingsType>>
  ];
}) {
  const { t } = useTranslation();
  const [settings, setSettings] = settingsState;
  const dialogRef = useRef<DialogHandle>(null);

  return (
    <Dialog className="w-min" ref={dialogRef}>
      <DialogTrigger>
        <div>
          <button className="bg-surface-a20 p-1 rounded-md duration-200 hover:bg-surface-a30">
            <MindustryIcon className="text-xl">&#xe88c;</MindustryIcon>&nbsp;
            {t("Settings")}
          </button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <h4 className="text-primary whitespace-nowrap w-full text-center font-bold p-1">
          {t("Settings")}
        </h4>
        <hr className="border-primary mb-2" />
        <div className="flex flex-col gap-2 overflow-auto whitespace-nowrap">
          {Object.entries({
            type: [
              ["boxline", "Boxline"],
              ["sankey", "Sankey"],
            ],
            mode: [
              ["flow", "Flow"],
              ["fixed", "Fixed"],
            ],
            direction: [
              ["LR", "Left to right"],
              ["TB", "Top to bottom"],
            ],
          }).map(([k, value]) => (
            <div key={k} className="flex gap-2">
              <span>{t(k[0].toUpperCase() + k.slice(1))}:</span>
              <div className="flex flex-wrap w-max gap-2">
                {value.map(([v1, v2]) => (
                  <button
                    key={v1}
                    className={`px-2 py-1 rounded-md duration-200 ${settings[k as "type"] === v1 ? "bg-primary text-background" : "bg-surface-a20 hover:bg-surface-a30"}`}
                    onClick={() => {
                      setSettings((prev) => ({ ...prev, [k]: v1 }));
                      dialogRef.current?.closeDialog();
                    }}
                  >
                    {t(v2)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
