"use client"

import AboutTab from "@/components/AboutTab"
import FactoryTab from "@/components/FactoryTab"
import SettingsTab from "@/components/SettingsTab"
import Tabs from "@/components/Tabs"
import Target from "@/components/Target"
import VisualizeTab from "@/components/VisualizeTab"
import { MaterialEnum, ModesEnum } from "@/types/data/7.0-Build-146"
import { TabsEnum } from "@/types/enums"
import { getTimeUnitInSeconds, SettingsType } from "@/types/utils"
import { calculateMaterialsPerSec, calculateNumOfBuildings, getDefaultSettings, getMaterial } from "@/types/utils"
import { useEffect, useRef, useState } from "react"

export default function App() {
  const [settings, setSettings] = useState<SettingsType>(getDefaultSettings())
  const [target, setTarget] = useState<MaterialEnum>(MaterialEnum.SurgeAlloy);
  const [tab, setTab] = useState<TabsEnum>(TabsEnum.Visualize)
  const [materialsPerTime, setMaterialsPerTime] = useState<number>(0)
  const [numOfBuildings, setNumOfBuildings] = useState<number>(1)
  const [calculate, setCalculate] = useState<0 | 1>(0)
  const buildingInput = useRef<HTMLInputElement>(null);
  const materialsPerTimeInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const material = getMaterial(target);
    if (material) {
      if (!material.modes.includes(settings.mode) && settings.mode != ModesEnum.Any) {
        if (settings.mode == ModesEnum.Serpulo) {
          setTarget(MaterialEnum.SurgeAlloy);
        } else {
          setTarget(MaterialEnum.SurgeAlloy);
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings])

  useEffect(() => {
    if (!buildingInput.current) return;
    buildingInput.current.value = String(+(calculateNumOfBuildings(target, materialsPerTime, settings) / getTimeUnitInSeconds(settings)).toFixed(1))
    if (!materialsPerTimeInput.current) return;
    materialsPerTimeInput.current.value = String(+materialsPerTime.toFixed(3))
  }, [materialsPerTime, calculate, target, settings])

  useEffect(() => {
    if (calculate == 1) return;
    if (!materialsPerTimeInput.current) return;
    setMaterialsPerTime(calculateMaterialsPerSec(target, numOfBuildings, settings) * getTimeUnitInSeconds(settings));
  }, [numOfBuildings, calculate, target, settings])

  useEffect(() => {
    console.log(settings)
  }, [settings])

  return (
    <div className="p-2 overflow-auto h-full">
      <div className="space-y-1 ">
        <Tabs tab={tab} setTab={setTab} />
        <div className="flex flex-wrap gap-1">
          <Target target={target} setTarget={setTarget} settings={settings} />
          <div className="flex flex-wrap gap-1">
            <div className="flex bg-input p-2 rounded-md space-x-1">
              <label htmlFor="Buildings" className={`${calculate == 0 && "font-bold"}`}>Buildings:</label>
              <input
                className="w-16 bg-transparent outline-none text-xs"
                type="number" id="Buildings" name="Buildings"
                min={0}
                ref={buildingInput}
                onKeyDown={(event) => {
                  if (event.key == "Enter") {
                    (event.target as HTMLInputElement).blur()
                  }
                }}
                onBlur={(event) => {
                  setNumOfBuildings(+(event.target as HTMLInputElement).value);
                  setCalculate(0)
                }}
                defaultValue={0}
              />
            </div>
            <div className="flex bg-input p-2 rounded-md space-x-1">
              <label htmlFor="NumOfItemPerTime" className={`${calculate == 1 && "font-bold"}`}>Items/{settings.displayRates}:</label>
              <input
                className="w-16 bg-transparent outline-none text-xs"
                type="number" id="NumOfItemPerTime" name="NumOfItemPerTime"
                min={0}
                ref={materialsPerTimeInput}
                onKeyDown={(event) => {
                  if (event.key == "Enter") (event.target as HTMLInputElement).blur()
                }}
                onBlur={(event) => {
                  setMaterialsPerTime(+(event.target as HTMLInputElement).value);
                  setCalculate(1)
                }}
                defaultValue={0}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-1">
        <div className="rounded-md bg-card">
          <VisualizeTab settings={settings} setSettings={setSettings} show={tab == TabsEnum.Visualize} target={target} materialsPerSec={materialsPerTime}/>
          <FactoryTab settings={settings} setSettings={setSettings} show={tab == TabsEnum.Factory} target={target} materialsPerSec={materialsPerTime} />
          <SettingsTab settings={settings} setSettings={setSettings} show={tab == TabsEnum.Settings} />
          <AboutTab show={tab == TabsEnum.About} />
        </div>
      </div>
    </div>
  )
}