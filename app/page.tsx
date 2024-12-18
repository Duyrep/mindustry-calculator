"use client";

import {
  ExtractorsEnum,
  FactoriesEnum,
  ResourcesEnum,
  UnitsEnum,
} from "@/calculations/enums";
import renderChart from "@/calculations/render";
import Target from "@/components/Target";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GraphvizOptions } from "d3-graphviz";
import { FactorySettings, getDefaultSettings, getFactoriesByProduct, Settings } from "@/calculations/calculations";

export default function Home() {
  const [targets, setTargets] = useState<[(ResourcesEnum | UnitsEnum | undefined), number][]>([
    [undefined, 1]
  ]);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<Settings>({ displayRate: 1, factorySettings: getDefaultSettings() });
  const settingTable = useRef<HTMLDivElement | null>(null);
  const settingToggleButton = useRef<HTMLButtonElement | null>(null);
  const isMobile = (): boolean => {
    if (typeof navigator !== "undefined") {
      return /mobile|android|touch|webos/i.test(
        navigator.userAgent.toLowerCase()
      );
    } else {
      return false
    }
  };
  const option: GraphvizOptions = {
    zoom: !isMobile(),
    useWorker: false,
    growEnteringEdges: false,
    tweenShapes: false,
    tweenPaths: false,
    zoomScaleExtent: [0.8, 10],
  };

  useEffect(() => {
    renderChart(targets, option, settings);
  }, []);

  useEffect(() => {
    renderChart(targets, option, settings);
  }, [targets, settings]);

  return (
    <div className="overflow-auto h-screen p-2">
      <div className="flex flex-warp content-center mb-2">
        <button
          ref={settingToggleButton}
          className="flex p-1 my-2 rounded-md hover:bg-brand duration-150 bg-secondary"
          onClick={() => setShowSettings(!showSettings)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            height="2rem"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <span className="ml-1 flex flex-wrap content-center h-full">Settings</span>
        </button>
        {showSettings && (
          <div
            ref={settingTable}
            className="absolute flex flex-col bottom-0 right-0 z-50 border border-border rounded-md bg-card w-full h-full"
          >
            <div className="overflow-auto p-2">
              <b>Display</b>
              <hr className="border-2 bg-border my-2" />
              <span className="flex my-2">
                Display rates as:
                <div>
                  <div className="p-1 cursor-pointer">
                    <span className={`rounded-md p-1 hover:bg-brand duration-150 ${settings.displayRate == 1 ? "bg-brand" : ""}`} onClick={() => setSettings(prev => ({ ...prev, displayRate: 1 }))}>Item/s</span>
                    <span className={`rounded-md p-1 hover:bg-brand duration-150 ${settings.displayRate == 60 ? "bg-brand" : ""}`} onClick={() => setSettings(prev => ({ ...prev, displayRate: 60 }))}>Item/m</span>
                    <span className={`rounded-md p-1 hover:bg-brand duration-150 ${settings.displayRate == 3600 ? "bg-brand" : ""}`} onClick={() => setSettings(prev => ({ ...prev, displayRate: 3600 }))}>Item/h</span>
                  </div>
                </div>
              </span>
              <b>Factory</b>
              <hr className="border-2 bg-border my-2" />
              <table className="w-full">
                <thead>
                  <tr className="border border-border rounded-t-md py-1">
                    <th className="w-1">Product</th>
                    <th colSpan={1}>Factory</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border border-border">
                    <td className="text-center">All</td>
                    <td className="flex flex-wrap">
                      {[
                        "MechanicalDrill",
                        "PneumaticDrill",
                        "LaserDrill",
                        "AirblastDrill",
                      ].map((value) => (
                        <Image
                          className="p-1 cursor-pointer rounded-md hover:bg-brand duration-150"
                          key={value}
                          src={`/assets/sprites/${value}.webp`}
                          width={48}
                          height={48}
                          alt=""
                          onClick={() => {
                            const factorySettings: FactorySettings = { ...settings.factorySettings }
                            for (const key in factorySettings) {
                              const factories = getFactoriesByProduct(key as ResourcesEnum)
                              if (factories.includes(value as ExtractorsEnum)) {
                                factorySettings[key as ResourcesEnum].key = value as ExtractorsEnum
                              }
                            }
                            setSettings(prev => ({ ...prev, factorySettings: factorySettings }))
                          }}
                        />
                      ))}
                    </td>
                  </tr>
                  {Object.keys(ResourcesEnum).map((valuei) => (
                    <tr
                      key={valuei}
                      className="border border-border overflow-x-scroll"
                    >
                      <td>
                        <Image
                          width={48}
                          height={48}
                          className="w-12 h-12 p-1"
                          src={`/assets/sprites/${valuei}.webp`}
                          alt={valuei}
                          title={valuei}
                        />
                      </td>
                      <td className="flex flex-wrap my-2">
                        {(
                          getFactoriesByProduct(valuei as ResourcesEnum) as (
                            | FactoriesEnum
                            | ExtractorsEnum
                          )[]
                        ).map((valuej) => (
                          <Image
                            key={valuej}
                            width={48}
                            height={48}
                            className={`p-1 rounded-md hover:bg-brand duration-150 ${valuej == settings.factorySettings[valuei as ResourcesEnum].key
                              ? "bg-brand"
                              : "cursor-pointer"
                              }`}
                            src={`/assets/sprites/${valuej}.webp`}
                            alt={valuej}
                            onClick={() => {
                              const factorySettings = { ...settings.factorySettings }
                              factorySettings[valuei as ResourcesEnum].key = valuej
                              setSettings(prev => ({ ...prev, factorySettings: factorySettings }))
                            }}
                            title={valuej}
                          />
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-1">
              <button className="bg-brand float-right px-4 py-2 rounded-md" onClick={() => setShowSettings(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        {targets.map((value, index) => (
          <Target
            key={index}
            product={value[0]}
            index={index}
            settings={settings}
            targets={targets}
            setTargets={setTargets}
          />
        ))}
      </div>
      <button
        className="flex flex-wrap content-center justify-center space-x-2 w-44 h-12 p-1 pr-2 rounded-md bg-secondary hover:bg-green-600 transition-colors duration-100"
        onClick={() => setTargets((prev) => [...prev, [undefined, 1]])}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5rem"
            height="1.5rem"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 12H20M12 4V20"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span>Add product</span>
      </button>
      <div id="graph-container" className="p-2"></div>
      Website made by Duyrep
      <br />
      The site is in development
      <br />
      Latest Updates: 12/1/2024
    </div>
  );
}
