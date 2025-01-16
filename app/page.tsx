"use client"

import { calculateNumOfBuildings, getDefaultSettings, getBuildingsOfProduct, ProductSettings, Settings, getAffinitiesOfBuilding, getBoostersOfBuilding, BuildingSettings, getBuilding, calculateNumOfProducts } from "@/calculations/calculation";
import { BuildingsEnum, ResourcesEnum, TilesEnum } from "@/calculations/enums";
import { renderChart } from "@/calculations/render";
import Image from "next/image"
import React, { JSX, useEffect, useRef, useState } from "react";

export default function Home() {
  const [calculate, setCalculate] = useState<"numOfProduct" | "numOfBuildings">("numOfProduct");
  const [target, setTarget] = useState<undefined | ResourcesEnum>(undefined);
  const [settings, setSettings] = useState<Settings>(getDefaultSettings());
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [numOfBuildings, setNumOfBuildings] = useState(0);
  const [numOfProduct, setNumOfProduct] = useState(0);
  const [graphDirection, setGraphDirection] = useState<"LR" | "TB">("TB")
  const numOfBuildingsInput = useRef<HTMLInputElement | null>(null);
  const numOfProductInput = useRef<HTMLInputElement | null>(null);

  const formatString = (input: string): string => {
    return input.replace(/([A-Z])/g, (_, p1, offset) => {
      return offset === 0 ? p1 : ' ' + p1.toLowerCase();
    });
  }

  const formatNumber = (num: number): string => (num >= 0 ? '+' : '') + num.toString();

  useEffect(() => {
    settings.graphDirection = graphDirection;
    if (numOfBuildingsInput.current && numOfProductInput.current) {
      if (target) {
        if (calculate == "numOfProduct") {
          numOfBuildingsInput.current.value = String(+calculateNumOfBuildings(numOfProduct, target, settings).toFixed(4))
        } else {
          numOfProductInput.current.value = String(+calculateNumOfProducts(numOfBuildings, target, settings).toFixed(4))
        }
      } else {
        setNumOfBuildings(0)
        setNumOfProduct(0)
        numOfBuildingsInput.current.value = "0"
        numOfProductInput.current.value = "0"
      }
    }
    if (target && calculate == "numOfProduct") {
      setNumOfBuildings(calculateNumOfBuildings(numOfProduct, target, settings))
    }
    renderChart(numOfBuildings, target, settings);
  }, [target, settings, numOfBuildings, numOfProduct, calculate, graphDirection]);

  return (
    <div className="p-2 h-full overflow-auto overflow-x-hidden">
      <button
        className="flex items-center p-1 my-2 select-none rounded-md hover:bg-brand duration-150 bg-secondary"
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
      <div className={`fixed top-0 right-0 bottom-0 left-0 z-50 bg-card overflow-hidden select-none ${!showSettings && "hidden"}`}>
        <div className="p-4 flex flex-col h-full gap-2">
          <div className="overflow-auto">
            <div className="flex items-center my-2">
              <span>Beacon:</span>
              <div className="flex">
                {
                  [
                    BuildingsEnum.OverdriveProjector,
                    BuildingsEnum.OverdriveDome
                  ].map((building) => (
                    <div key={building}
                      className={`mx-1 rounded-sm p-1 cursor-pointer duration-150 
                        ${building == settings.beacon.name ? "bg-brand" : "bg-secondary"}`
                      }
                      onClick={() => {
                        const beaconSettings = { ...settings.beacon }
                        if (beaconSettings.name == building) {
                          beaconSettings.name = undefined;
                        } else {
                          beaconSettings.name = building;
                        }
                        setSettings(prev => ({ ...prev, beacon: beaconSettings }))
                      }}
                    >
                      <Image
                        src={`/assets/sprites/${building}.webp`}
                        width={40}
                        height={40}
                        alt={building}
                        title={formatString(building)}
                        draggable={false}
                      />
                      <span></span>
                    </div>
                  ))
                }
              </div>
            </div>
            <span className="text-lg">Buildings Tile</span>
            <hr />
            <table className="w-full">
              <thead>
                <tr>
                  <th className="w-12"></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  Object.keys(settings.buildings).reduce<JSX.Element[]>((acc, building) => {
                    if (!settings.buildings[building as BuildingsEnum].affinitiesTile) {
                      return acc
                    }
                    const affinitiesTile = getAffinitiesOfBuilding(building as BuildingsEnum)
                    if (!affinitiesTile) {
                      return acc
                    }
                    acc.push(
                      <tr key={building} className={`${acc.length != 0 && "border-t border-border"}`}>
                        <td>
                          <div className="flex items-center">
                            <Image
                              src={`/assets/sprites/${building}.webp`}
                              width={40} height={40}
                              alt={building}
                              draggable={false}
                              title={formatString(building)}
                            />
                            <span>:</span>
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-wrap py-2">
                            {
                              Object.values(affinitiesTile).map((tile) => (
                                <div
                                  key={tile.name}
                                  className={`mx-1 rounded-sm p-1 cursor-pointer hover:bg-brand duration-150
                                      ${settings.buildings[building as BuildingsEnum].affinitiesTile?.name == tile.name ? "bg-brand" : "bg-secondary"}
                                    `}
                                  onClick={() => {
                                    const buildingSettings = { ...settings.buildings }
                                    buildingSettings[building as BuildingsEnum].affinitiesTile = tile
                                    setSettings(prev => ({ ...prev, buildingSettings: buildingSettings }))
                                  }}
                                  title={formatString(tile.name)}
                                >
                                  {
                                    tile.name == TilesEnum.Other ?
                                      <span className="flex h-full items-center">Other</span>
                                      :
                                      <div className="flex text-sm flex-col items-center">
                                        <Image
                                          src={`/assets/sprites/${tile.name}.webp`}
                                          width={40} height={40}
                                          alt={tile.name}
                                          draggable={false}
                                        />
                                        <span className="text-center">{formatNumber(tile.productivity * 100)}%</span>
                                      </div>
                                  }
                                </div>
                              ))
                            }
                          </div>
                        </td>
                      </tr>
                    )
                    return acc
                  }, [])
                }
              </tbody>
            </table>
            <span className="text-lg">Extractor boost</span>
            <hr />
            <table className="w-full">
              <thead>
                <tr>
                  <th className="w-12"></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className="flex justify-center">All</span></td>
                  <td className="flex flex-wrap my-2">
                    {[
                      ResourcesEnum.Water
                    ].map((value) => (
                      <Image
                        className="p-1 mx-1 cursor-pointer rounded-md bg-secondary hover:bg-brand duration-150"
                        key={value}
                        src={`/assets/sprites/${value}.webp`}
                        width={48}
                        height={48}
                        alt={formatString(value)}
                        title={formatString(value)}
                        onClick={() => {
                          const buildingSettings: BuildingSettings = { ...settings.buildings }
                          for (const key in buildingSettings) {
                            const building = getBuilding(key as BuildingsEnum)
                            if (building.booster != undefined) {
                              buildingSettings[key as BuildingsEnum].booster = building.booster.find((booster) => booster.name == value)
                            }
                          }
                          setSettings(prev => ({ ...prev, factorySettings: buildingSettings }))
                        }}
                      />
                    ))}
                  </td>
                </tr>
                {
                  Object.keys(settings.buildings).map((building) => {
                    if (!settings.buildings[building as BuildingsEnum].booster == undefined) return;
                    const boosters = getBoostersOfBuilding(building as BuildingsEnum)
                    if (!boosters) return;
                    return (
                      <tr key={building} className="border-t border-border">
                        <td>
                          <div className="flex items-center">
                            <Image
                              src={`/assets/sprites/${building}.webp`}
                              width={40} height={40}
                              alt={building}
                              draggable={false}
                              title={formatString(building)}
                            />
                            <span>:</span>
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-wrap py-2">
                            {
                              Object.values(boosters).map((booster) => (
                                <div
                                  key={booster.name}
                                  className={`flex flex-col mx-1 rounded-sm p-1 cursor-pointer duration-150
                                      ${settings.buildings[building as BuildingsEnum].booster == booster ? "bg-brand" : "bg-secondary"}
                                    `}
                                  onClick={() => {
                                    const buildingSettings = { ...settings.buildings }
                                    if (buildingSettings[building as BuildingsEnum].booster == booster) {
                                      buildingSettings[building as BuildingsEnum].booster = null
                                    } else {
                                      buildingSettings[building as BuildingsEnum].booster = booster
                                    }
                                    setSettings(prev => ({ ...prev, buildingSettings: buildingSettings }))
                                  }}
                                >
                                  <Image
                                    src={`/assets/sprites/${booster.name}.webp`}
                                    width={40} height={40}
                                    alt={booster.name}
                                    draggable={false}
                                    title={formatString(booster.name)}
                                  />
                                  <span className="text-center">x{booster.speedBoost}</span>
                                </div>
                              ))
                            }
                          </div>
                        </td>
                      </tr>)
                  })
                }
              </tbody>
            </table>
            <span className="text-lg">Products</span>
            <hr />
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="w-12"></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">All</td>
                  <td className="flex flex-wrap my-2">
                    {[
                      "MechanicalDrill",
                      "PneumaticDrill",
                      "LaserDrill",
                      "AirblastDrill"
                    ].map((value) => (
                      <Image
                        className="p-1 mx-1 cursor-pointer rounded-md bg-secondary hover:bg-brand duration-150"
                        key={value}
                        src={`/assets/sprites/${value}.webp`}
                        width={48}
                        height={48}
                        alt={formatString(value)}
                        title={formatString(value)}
                        onClick={() => {
                          const productSettings: ProductSettings = { ...settings.product }
                          for (const key in productSettings) {
                            const factories = getBuildingsOfProduct(key as ResourcesEnum)
                            if (factories.includes(value as BuildingsEnum)) {
                              productSettings[key as ResourcesEnum].key = value as BuildingsEnum
                            }
                          }
                          setSettings(prev => ({ ...prev, factorySettings: productSettings }))
                        }}
                      />
                    ))}
                  </td>
                </tr>
                {
                  Object.keys(settings.product).map((resource) => (
                    <tr key={resource} className="border-t border-border text-lg">
                      <td>
                        <div className="flex">
                          <Image
                            src={`/assets/sprites/${resource}.webp`}
                            width={40} height={40}
                            alt={resource}
                            draggable={false}
                            title={formatString(resource)}
                          />
                          <span>:</span>
                        </div>
                      </td>
                      <td className="py-2">
                        <div className="flex flex-wrap">
                          {getBuildingsOfProduct(resource as ResourcesEnum).map((factory) => <Image
                            className={`mx-1 rounded-sm p-1 cursor-pointer hover:bg-brand duration-150
                                ${settings.product[resource as ResourcesEnum].key == factory ? "bg-brand" : "bg-secondary"}
                              `}
                            onClick={() => {
                              const productSettings = { ...settings.product }
                              productSettings[resource as ResourcesEnum].key = factory
                              setSettings(prev => ({ ...prev, productSettings: productSettings }))
                            }}
                            key={factory}
                            src={`/assets/sprites/${factory}.webp`}
                            width={48} height={48}
                            alt={factory}
                            draggable={false}
                            title={formatString(factory)}
                          />)}
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <div className="items-center justify-between flex gap-1 p-0">
            <button
              className="bg-secondary rounded-md px-4 py-2 hover:bg-brand duration-150" type="button"
              onClick={() => setSettings(getDefaultSettings())}
            >
              <span>Reset</span>
            </button>
            <button
              className="bg-brand rounded-md px-4 py-2" type="button"
              onClick={() => setShowSettings(false)}
            >
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center select-none flex-wrap space-x-2">
          <label>Output:</label>
          <div>
            <div
              className={`flex items-center h-12 border-2 border-border rounded-md cursor-pointer ${showDropdown && "bg-brand"} duration-150`}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {
                target ?
                  <>
                    <Image
                      className="p-1"
                      src={`/assets/sprites/${target}.webp`}
                      width={44} height={44}
                      alt={target}
                    />
                    <span className="pr-2">{formatString(target)}</span>
                  </>
                  :
                  <span className="px-2">Select product</span>
              }
            </div>
            <div className={`absolute w-48 p-2 flex flex-wrap bg-card border-border border-2 rounded-md ${!showDropdown && "hidden"}`}>
              {
                Object.keys(ResourcesEnum).map((value) => <Image
                  className={`flex p-1 rounded-md hover:bg-brand duration-150 cursor-pointer ${value as ResourcesEnum == target ? "bg-brand" : ""}`}
                  key={value}
                  src={`/assets/sprites/${value}.webp`}
                  width={43}
                  height={43}
                  title={formatString(value)}
                  alt={value}
                  onClick={() => {
                    setShowDropdown(false);
                    if (target != value) {
                      setTarget(value as ResourcesEnum)
                    }
                  }}
                />)
              }
            </div>
          </div>
        </div>
        <div className="flex flex-wrap sm:space-x-2">
          <div className="flex items-center mb-2 min-w-72 bg-secondary rounded-sm pl-1">
            <label className={`text-nowrap ${calculate == "numOfProduct" && "font-bold"}`} htmlFor="Item/second">Items/second:</label>
            <input
              ref={numOfProductInput}
              className="w-full bg-transparent focus:outline-none p-1"
              name="Item/second"
              id="Item/second"
              type="number"
              defaultValue={"0"}
              min={0}
              max={10 ** 12}
              onBlur={(event) => {
                setNumOfProduct(Number((event.target as HTMLInputElement).value))
                setCalculate("numOfProduct")
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  (event.target as HTMLInputElement).blur()
                }
              }}
            />
          </div>
          <div className="flex items-center mb-2 min-w-72 bg-secondary rounded-sm pl-1">
            <label className={`text-nowrap ${calculate == "numOfBuildings" && "font-bold"}`} htmlFor="Buildings">Buildings:</label>
            <input
              ref={numOfBuildingsInput}
              className="w-full bg-transparent focus:outline-none p-1"
              name="Buildings"
              id="Buildings"
              type="number"
              defaultValue={"0"}
              min={0}
              max={10 ** 12}
              onBlur={(event) => {
                setNumOfBuildings(Number((event.target as HTMLInputElement).value))
                setCalculate("numOfBuildings")
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  (event.target as HTMLInputElement).blur()
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-full space-y-2 rounded-sm bg-card p-2">
        <span>Graph Direction:</span>
        <div className="space-x-2">
          <button
            className={`rounded-sm p-2 outline-none ${graphDirection == "TB" ? "bg-brand" : "bg-secondary"}`}
            onClick={() => {
              setGraphDirection("TB")
            }}
          >
            Top to bottom
          </button>
          <button
            className={`rounded-sm p-2 outline-none ${graphDirection == "LR" ? "bg-brand" : "bg-secondary"}`}
            onClick={() => {
              setGraphDirection("LR")
            }}
          >
            Left to right
          </button>
        </div>
      </div>
      <div className="p-4 stroke-1" id="graph-container-main"></div>
      <a className="text-brand" href="https://github.com/Duyrep/mindustry-calculator"><b>Github</b></a> <br />
      Website made by Duyrep <br />
      The site is in development <br />
      Latest Updates: 1/16/2025<br />
    </div>
  );
}
