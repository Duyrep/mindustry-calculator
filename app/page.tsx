"use client";

import {
  factoryCalculation,
  getDefaultSettings,
  getFactoriesByProduct,
  resizeChart,
} from "@/calculations/calculations";
import {
  ExtractorsEnum,
  FactoriesEnum,
  ResourcesEnum,
  UnitsEnum,
} from "@/calculations/enums";
import renderChart from "@/calculations/calculations";
import Target from "@/components/Target";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { GraphvizOptions } from "d3-graphviz";

export default function Home() {
  const [targets, setTargets] = useState<(ResourcesEnum | UnitsEnum)[]>([
    ResourcesEnum.Silicon,
  ]);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState(getDefaultSettings());
  const settingTable = useRef<HTMLDivElement | null>(null);
  const settingToggleButton = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    factoryCalculation(ResourcesEnum.Silicon, 1, settings);
    let option: GraphvizOptions = {"zoom": !/mobile|android|touch|webos/i.test(navigator.userAgent.toLowerCase())}
    console.log(option)

    const handleMouseDown = (event: MouseEvent) => {
      if (settingTable.current && settingToggleButton.current) {
        if (
          !settingTable.current.contains(event.target as Node) &&
          !settingToggleButton.current.contains(event.target as Node)
        ) {
          setShowSettings(false);
        }
      }
    };

    renderChart(option, settings)
    document.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("resize", resizeChart);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("resize", resizeChart);
    };
  }, []);

  return (
    <div>
      <div className="flex flex-warp content-center mb-2">
        <button
          ref={settingToggleButton}
          className={`my-2 rounded-md ${
            showSettings ? "bg-brand" : "bg-secondary"
          }`}
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
        </button>
        {showSettings && (
          <div
            ref={settingTable}
            className="absolute p-2 overflow-auto ml-10 border border-border rounded-md bg-background w-72 h-80"
          >
            <table>
              <thead>
                <tr className="border border-border rounded-t-md py-1">
                  <th>Product</th>
                  <th colSpan={1}>Factory</th>
                </tr>
              </thead>
              <tbody>
                {/* <tr className="border border-border">
                  <td className="text-center">All</td>
                  <td className="flex flex-wrap">
                    {[
                      "MechanicalDrill",
                      "PneumaticDrill",
                      "LaserDrill",
                      "AirblastDrill",
                    ].map((value) => (
                      <Image
                        className="p-1"
                        key={value}
                        src={`/assets/sprites/${value}.webp`}
                        width={48}
                        height={48}
                        alt=""
                        // onClick={() =>
                        //   setSettings((prev) => {
                        //     for (const key in prev) {
                        //       if (
                        //         ([
                        //           "MechanicalDrill",
                        //           "PneumaticDrill",
                        //           "LaserDrill",
                        //           "AirblastDrill",
                        //         ] as ExtractorsEnum[]).includes(
                        //           prev[key as ResourcesEnum]
                        //             .key as ExtractorsEnum
                        //         )
                        //       ) {
                        //         prev[key as ResourcesEnum].key = value as ExtractorsEnum
                        //         console.log(key, prev[key as ResourcesEnum])
                        //         console.log(settings)
                        //       }
                        //     }
                        //     return prev;
                        //   })
                        // }
                      />
                    ))}
                  </td>
                </tr> */}
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
                          className={`p-1 rounded-md ${
                            valuej == settings[valuei as ResourcesEnum].key
                              ? "bg-brand"
                              : "cursor-pointer"
                          }`}
                          src={`/assets/sprites/${valuej}.webp`}
                          alt={valuej}
                          onClick={() =>
                            setSettings((prev) => ({
                              ...prev,
                              [valuei as ResourcesEnum]: { key: valuej },
                            }))
                          }
                          title={valuej}
                        />
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div>
        <button
          className="w-8 h-8 text-3xl rounded-md bg-secondary hover:bg-green-600 transition-all duration-100"
          onClick={() => setTargets((prev) => [...prev, ResourcesEnum.Silicon])}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            height="2rem"
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
        </button>
      </div>
      <div>
        {targets.map((value, index) => (
          <Target
            key={index}
            product={value}
            index={index}
            targets={targets}
            setTargets={setTargets}
          />
        ))}
      </div>
      <div
        id="graph-container"
        className="w-full h-screen border-2 my-2 border-border transition-all duration-100"
      ></div>
    </div>
  );
}
