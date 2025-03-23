import { BuildingGroupEnum, BuildingsEnum } from "@/types/data/7.0-Build-146"
import { getBuilding, SettingsType } from "@/types/utils"
import { CustomImage } from "./CustomImage"

export function DefaultBeaconSettings(
  { settings, setSettings }: {
    settings: SettingsType,
    setSettings: React.Dispatch<React.SetStateAction<SettingsType>>
  }
) {
  return (
    <div className="flex flex-wrap gap-1 p-1">
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
            className={`text-xs flex flex-col items-center p-1 rounded-md cursor-pointer duration-100 ${settings.defaultBeacons == buildingName ? "bg-brand" : "bg-secondary"}`}
            onClick={() => {
              const defaultBeacons = buildingName == settings.defaultBeacons ? "" : buildingName
              setSettings(prev => ({ ...prev, defaultBeacons: defaultBeacons }))
            }}
          >
            <CustomImage name={buildingName} settings={settings} />
            {speedIncrease && <span>+{speedIncrease * 100}%</span>}
          </div>
        )
      })}
    </div>
  )
}