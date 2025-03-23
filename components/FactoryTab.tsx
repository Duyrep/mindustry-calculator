import { factoryCalculator, FactoryResultType } from "@/types/calculations/factory";
import { BuildingGroupEnum, BuildingsEnum, FloorsEnum, MaterialEnum, WallsEnum } from "@/types/data/7.0-Build-146";
import { getBuilding, getTimeUnitInSeconds, SettingsType } from "@/types/utils";
import { useEffect, useState } from "react";
import { CustomImage } from "./CustomImage";

export default function FactoryTab(
  { show, settings, setSettings, target, materialsPerSec }: {
    show: boolean,
    settings: SettingsType,
    setSettings: React.Dispatch<React.SetStateAction<SettingsType>>,
    target: MaterialEnum,
    materialsPerSec: number
  }
) {

  const [factoryResult, setFactoryResult] = useState<FactoryResultType>(factoryCalculator(target, materialsPerSec, settings));

  useEffect(() => {
    setFactoryResult(factoryCalculator(target, materialsPerSec / getTimeUnitInSeconds(settings), settings))
    console.log(factoryResult)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings, target, materialsPerSec])

  return (
    <div className={`${!show && "hidden"} p-1`}>
      <table className="bg-card text-nowrap relative" translate="no">
        <thead>
          <tr>
            {
              ["Building", `Item/${settings.displayRates[0]}`, "Boosts", "Affinities", "Beacons", "Power"].map((title) => (
                <th key={title} className="pl4 py-2 px-2">{title}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            Object.entries(factoryResult.result).map(([materialName, data]) => {
              if (!data.building) return
              const boosts = getBuilding(data.building)?.booster
              const building = getBuilding(data.building);
              const affinities = building?.affinities;

              const setShowDropdownBoost = (show: boolean) => {
                const boostsSettings = { ...settings.boosts }
                if (!boostsSettings[settings.mode][materialName as MaterialEnum]) return
                boostsSettings[settings.mode][materialName as MaterialEnum]!.showDropDown = show
                setSettings(prev => ({ ...prev, boosts: boostsSettings }))
              }

              const isShowDropdownBoost = () => {
                if (settings.boosts[settings.mode][materialName as MaterialEnum]) {
                  return settings.boosts[settings.mode][materialName as MaterialEnum]!.showDropDown
                } else {
                  return false
                }
              }

              const setBoost = (name: MaterialEnum | undefined) => {
                const boostsSettings = { ...settings.boosts }
                if (!boostsSettings[settings.mode][materialName as MaterialEnum]) return
                boostsSettings[settings.mode][materialName as MaterialEnum]!.building[buildingName] = name
                setSettings(prev => ({ ...prev, boosts: boostsSettings }))
                setShowDropdownBoost(false)
              }

              const setShowDropdownAffinities = (show: boolean) => {
                const affinitiesSettings = { ...settings.affinities }
                if (!affinitiesSettings[settings.mode][materialName as MaterialEnum]) return
                affinitiesSettings[settings.mode][materialName as MaterialEnum]!.showDropDown = show
                setSettings(prev => ({ ...prev, affinities: affinitiesSettings }))
              }

              const isShowDropdownAffinities = () => {
                if (settings.affinities[settings.mode][materialName as MaterialEnum]) {
                  return settings.affinities[settings.mode][materialName as MaterialEnum]!.showDropDown
                } else {
                  return false
                }
              }

              const setAffinities = (name: FloorsEnum | WallsEnum) => {
                const affinitiesSettings = { ...settings.affinities }
                if (!affinitiesSettings[settings.mode][materialName as MaterialEnum]) return
                affinitiesSettings[settings.mode][materialName as MaterialEnum]!.building[buildingName] = name
                setSettings(prev => ({ ...prev, affinities: affinitiesSettings }))
                setShowDropdownAffinities(false)
              }

              const setShowDropdownBeacons = (show: boolean) => {
                const beaconsSettings = { ...settings.beacons }
                if (!beaconsSettings[settings.mode][materialName as MaterialEnum]) return
                console.log(materialName)
                beaconsSettings[settings.mode][materialName as MaterialEnum].showDropDown = show
                setSettings(prev => ({ ...prev, beacons: beaconsSettings }))
              }

              const isShowDropdownBeacons = () => {
                if (settings.beacons[settings.mode][materialName as MaterialEnum]) {
                  return settings.beacons[settings.mode][materialName as MaterialEnum].showDropDown
                } else {
                  return false
                }
              }

              const setBeacons = (name: string) => {
                const beaconsSettings = { ...settings.beacons }
                if (!beaconsSettings[settings.mode][materialName as MaterialEnum]) return
                beaconsSettings[settings.mode][materialName as MaterialEnum]!.beacon = name
                setSettings(prev => ({ ...prev, beacons: beaconsSettings }))
                setShowDropdownAffinities(false)
              }

              const getBeacon = () => {
                return settings.beacons[settings.mode][materialName as MaterialEnum].beacon
              }

              const buildingName = data.building

              return (
                <tr
                  key={materialName}
                  className="text-xs"
                >
                  <td className="py-2 border-t">
                    <div className="flex w-max items-center space-x-1">
                      <CustomImage name={data.building as string} settings={settings} />
                      <span>x {+data.numOfBuildings.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="pl-4 border-t">
                    <div className="flex w-max items-center">
                      <CustomImage name={data.material} settings={settings} />
                      &nbsp;
                      {+(data.materialPerSec * getTimeUnitInSeconds(settings)).toFixed(3)}
                    </div>
                  </td>
                  <td className="pl-4 border-t">
                    {boosts && <div key={data.building} className="w-max flex flex-col flex-wrap content-center">
                      <div
                        className={`fixed left-0 top-0 w-screen h-screen ${!isShowDropdownBoost() && "hidden"}`}
                        onClick={() => setShowDropdownBoost(false)}
                      ></div>
                      <div>
                        <div
                          className={`cursor-pointer select-none border rounded-md p-1 duration-100 ${isShowDropdownBoost() ? "bg-brand" : "bg-secondary"}`}
                          onClick={() => setShowDropdownBoost(true)}
                        >
                          <div className="w-[32px] h-[32px] flex items-center">
                            {settings.boosts[settings.mode][materialName as MaterialEnum]!.building[data.building] ? (
                              <CustomImage name={settings.boosts[settings.mode][materialName as MaterialEnum]!.building[data.building]!} settings={settings} />
                            ) : (
                              <span>None</span>
                            )}
                          </div>
                        </div>
                        {boosts.map(({ name, speedBoost }) => (<div
                          key={name}
                          className={`absolute bg-secondary rounded-md ${!isShowDropdownBoost() && "hidden"}`}
                        >
                          <div className={`flex flex-wrap gap-1 p-1 border rounded-md`}>
                            <div
                              className={`cursor-pointer select-none flex p-1 items-center rounded-md ${!settings.boosts[settings.mode][materialName as MaterialEnum]!.building[buildingName] ? "bg-brand" : "bg-secondary"}`}
                              onClick={() => setBoost(undefined)}
                            ><div className="flex items-center w-[32px] h-[32px]"><span>None</span></div></div>
                            <div
                              className={`flex flex-col items-center cursor-pointer p-1 rounded-md ${settings.boosts[settings.mode][materialName as MaterialEnum]!.building[buildingName] == name && "bg-brand"}`}
                              onClick={() => setBoost(name)}
                            >
                              <CustomImage name={name} settings={settings} />
                              <span>x{speedBoost}</span>
                            </div>
                          </div>
                        </div>))}
                      </div>
                    </div>}
                  </td>
                  <td className="pl-4 border-t">
                    {affinities && <>
                      <div
                        className={` fixed left-0 top-0 w-screen h-screen ${!isShowDropdownAffinities() && "hidden"}`}
                        onClick={() => setShowDropdownAffinities(false)}
                      ></div>
                      <div className="flex w-max justify-center">
                        <div className="w-full">
                          <div
                            className={`w-min border cursor-pointer select-none rounded-md p-1 duration-100 ${isShowDropdownAffinities() ? "bg-brand" : "bg-secondary"}`}
                            onClick={() => setShowDropdownAffinities(!isShowDropdownAffinities())}
                          >
                            <div className="flex items-center w-[32px] h-[32px]">
                              {settings.affinities[settings.mode][materialName as MaterialEnum]?.building[buildingName] == FloorsEnum.Other ? (<div>
                                <span>Other</span>
                              </div>) : (
                                <div>
                                  <CustomImage
                                    name={
                                      settings.affinities[settings.mode][materialName as MaterialEnum]?.building[buildingName]
                                      ?? "Error"
                                    }
                                    settings={settings}
                                  />
                                </div>
                              )}</div>
                          </div>
                          <div
                            className={`absolute border flex p-1 flex-wrap gap-1 bg-secondary rounded-md overflow-hidden ${!isShowDropdownAffinities() && "hidden"}`}
                          >
                            {Object.values(affinities).map(({ type, efficiency, affinity }) => (
                              <div
                                key={type}
                                className={`flex flex-col items-center cursor-pointer p-1 rounded-md ${settings.affinities[settings.mode][materialName as MaterialEnum]?.building[buildingName] == type && "bg-brand"}`}
                                onClick={() => setAffinities(type)}
                              >
                                {type == FloorsEnum.Other ? (<div
                                  className="w-[32px] h-full flex items-center"
                                ><span>Other</span></div>) : (<CustomImage name={type} settings={settings} />)
                                }
                                {affinity ?
                                  (<span>{affinity * 100 > 0 ? `+${affinity * 100}` : `${affinity * 100}`}%</span>) :
                                  (efficiency ? <span>{efficiency * 100}%</span> : null)
                                }
                              </div>
                            )
                            )}
                          </div>
                        </div>
                      </div>
                    </>}
                  </td>
                  <td className="pl-4 border-t">
                    <div className="w-max">
                      <div
                        className={`fixed left-0 top-0 w-screen h-screen ${!isShowDropdownBeacons() && "hidden"}`}
                        onClick={() => setShowDropdownBeacons(false)}
                      ></div>
                      <div
                        className={`w-min h-min p-1 border rounded-md cursor-pointer duration-100 ${isShowDropdownBeacons() ? "bg-brand" : "bg-secondary"}`}
                        onClick={() => setShowDropdownBeacons(!isShowDropdownBeacons())}
                      >
                        <div className="flex items-center w-[32px] h-[32px]">
                          {getBeacon() == "" ? (
                            <span>None</span>
                          ) : (
                            <CustomImage name={getBeacon()} settings={settings} />
                          )}
                        </div>
                      </div>
                      <div className={`absolute min-w flex flex-wrap gap-1 p-1 bg-secondary border rounded-md ${!isShowDropdownBeacons() && "hidden"}`}>
                        <div
                          className={`flex items-center rounded-md cursor-pointer p-1 duration-100 ${getBeacon() == "" ? "bg-brand" : "bg-secondary"}`}
                          onClick={() => setBeacons("")}
                        >
                          <div className="flex items-center w-[32px] h-[32px]"><span>None</span></div>
                        </div>
                        {Object.values(BuildingsEnum).map((buildingName) => {
                          const building = getBuilding(buildingName)
                          if (!building) return
                          if (building.group != BuildingGroupEnum.Beacon) return
                          let speedIncrease = building.speedIncrease
                          if (settings.defaultBoosts[building.modes][buildingName] && building.booster) {
                            const exist = building.booster.find(value => value.name == settings.defaultBoosts[building.modes][buildingName])
                            if (exist) speedIncrease = exist.speedBoost
                          }
                          return (
                            <div
                              key={buildingName}
                              className={`flex flex-col items-center p-1 rounded-md cursor-pointer duration-100 ${getBeacon() == buildingName ? "bg-brand" : "bg-secondary"}`}
                              onClick={() => setBeacons(buildingName)}
                            >
                              <CustomImage name={buildingName} settings={settings} />
                              {speedIncrease && <span>+{speedIncrease * 100}%</span>}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </td>
                  <td className="pl-4 border-t"><div className="w-max">{+data.powerUse.toFixed(2)}</div></td>
                </tr>
              )
            }
            )
          }
          <tr>
            <td colSpan={5} className="border-t text-right">
              <div><b>Total power:</b></div>
            </td>
            <td className="pl-4 border-t  text-sm">
              <div className="w-max">{+factoryResult.totalPowerUse.toFixed(2)}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}