import { boxLineCalculate } from "@/types/calculations/visualize";
import { MaterialEnum } from "@/types/data/7.0-Build-146";
import { render } from "@/types/graph";
import { SettingsType } from "@/types/utils";
import { useEffect } from "react";

export default function VisualizeTab(
  { show, target, settings, setSettings, materialsPerSec }: {
    show: boolean,
    target: MaterialEnum,
    materialsPerSec: number
    settings: SettingsType,
    setSettings: React.Dispatch<React.SetStateAction<SettingsType>>
  }
) {

  useEffect(() => {
    const result = boxLineCalculate(target, materialsPerSec, settings)
    console.log(result)
    render(settings.graphDirection, settings, result)
  }, [settings, target, materialsPerSec, show])

  return (
    <div className={`p-1 select-none ${!show && "hidden"}`}>
      <div className="p-1">
        <span>Graph direction:</span>
        <div className="flex flex-wrap gap-1">
          <button
            className={`p-1 rounded-md outline-none ${settings.graphDirection == "TB" && "bg-brand"}`}
            onClick={() => setSettings(prev => ({ ...prev, graphDirection: "TB" }))}
          >Top to bottom</button>
          <button
            className={`p-1 rounded-md outline-none ${settings.graphDirection == "LR" && "bg-brand"}`}
            onClick={() => setSettings(prev => ({ ...prev, graphDirection: "LR" }))}
          >Left to right</button>
        </div>
      </div>
      <div id="graph-container">
        <div id="graph"></div>
      </div>
      <div className="flex flex-col gap-1" id="debug">
      </div>
    </div>
  );
}