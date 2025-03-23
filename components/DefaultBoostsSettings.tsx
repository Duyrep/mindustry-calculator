import { BuildingGroupEnum, BuildingsEnum, data, MaterialEnum, ModesEnum } from "@/types/data/7.0-Build-146"
import { getBuilding, SettingsType } from "@/types/utils"
import { CustomImage } from "./CustomImage"

export function DefaultBoostsSettings(
  { settings, setSettings }: {
    settings: SettingsType,
    setSettings: React.Dispatch<React.SetStateAction<SettingsType>>
  }
) {

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          Object.values(BuildingsEnum).reduce<React.JSX.Element[]>((acc, buildingName) => {
            if (settings.defaultBoosts[settings.mode][buildingName as BuildingsEnum] === undefined) return acc
            if (!data.buildings[buildingName as BuildingsEnum].modes.includes(settings.mode) && settings.mode != ModesEnum.Any) return acc
            const building = getBuilding(buildingName)
            if (!building) return acc
            const boosts = building.booster

            acc.push(
              <tr key={buildingName}>
                <td className={`${acc.length != 0 && "border-t"} py-2`}>
                  <div className="flex shrink-0 items-center">
                    <CustomImage name={buildingName} settings={settings} />
                    <span className="mx-1">:</span>
                  </div>
                </td>
                <td className={`${acc.length != 0 && "border-t"} py-2`}>
                  <div className="flex flex-wrap gap-1">
                    <div
                      className={`flex items-center p-1 rounded-md cursor-pointer duration-100 ${!settings.defaultBoosts[settings.mode][buildingName as BuildingsEnum] ? "bg-brand" : "bg-secondary"}`}
                      onClick={() => {
                        const defaultBoostsSettings = { ...settings.defaultBoosts }
                        const boostsSettings = { ...settings.boosts }
                        defaultBoostsSettings[settings.mode][buildingName as BuildingsEnum] = null
                        Object.values(MaterialEnum).forEach((materialName) => {
                          if (boostsSettings[settings.mode] && boostsSettings[settings.mode][materialName]) {
                            boostsSettings[settings.mode][materialName]!.building[buildingName] = null
                          }
                        })
                        setSettings(prev => ({ ...prev, defaultBoosts: defaultBoostsSettings }))
                      }}
                    ><span className="text-center text-xs w-[32px]" translate="no">None</span></div>
                    {
                      boosts && Object.values(boosts).map(({ name, speedBoost }) => (
                        <div
                          key={name}
                          className={`p-1 rounded-md cursor-pointer duration-100 ${settings.defaultBoosts[settings.mode][buildingName as BuildingsEnum] == name ? "bg-brand" : "bg-secondary"}`}
                          onClick={() => {
                            const defaultBoostsSettings = { ...settings.defaultBoosts }
                            const boostsSettings = { ...settings.boosts }
                            if (defaultBoostsSettings[settings.mode][buildingName as BuildingsEnum] == name) defaultBoostsSettings[settings.mode][buildingName as BuildingsEnum] = null
                            else defaultBoostsSettings[settings.mode][buildingName as BuildingsEnum] = name
                            Object.values(MaterialEnum).forEach((materialName) => {
                              if (boostsSettings[settings.mode] && boostsSettings[settings.mode][materialName]) {
                                boostsSettings[settings.mode][materialName]!.building[buildingName] = name
                              }
                            })
                            setSettings(prev => ({ ...prev, defaultBoosts: defaultBoostsSettings, boosts: boostsSettings }))
                          }}
                        >
                          <div className="flex flex-col text-xs items-center">
                            <CustomImage name={name} settings={settings} />
                            {building.group == BuildingGroupEnum.Beacon ? <span>+{speedBoost * 100}%</span> :<span>+{speedBoost}%</span>}
                          </div>
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
  )
}