import { BuildingsEnum, FloorsEnum, MaterialEnum, ModesEnum } from "@/types/data/7.0-Build-146"
import { getBuilding, SettingsType } from "@/types/utils"
import { CustomImage } from "./CustomImage";


export function AffinitiesSettings(
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
            const building = getBuilding(buildingName);
            if (!building) return acc;
            if (!building.affinities) return acc;
            if (!building.modes.includes(settings.mode) && settings.mode !== ModesEnum.Any) return acc;

            const affinities = building.affinities;

            acc.push(
              <tr key={buildingName}>
                <td className={`${acc.length != 0 && "border-t"} py-2`}>
                  <div className="flex items-center shrink-0">
                    <CustomImage name={buildingName} settings={settings} />
                    <span className="mx-1">:</span>
                  </div>
                </td>
                <td className={`${acc.length != 0 && "border-t"} py-2`}>
                  <div className="flex flex-wrap gap-1">
                    {Object.values(affinities).map(({ type, efficiency, affinity }) => (
                      <div
                        key={type}
                        className={`rounded-md p-1 cursor-pointer duration-100 ${settings.defaultAffinities[settings.mode][buildingName] === type ? "bg-brand" : "bg-secondary"
                          }`}
                        onClick={() => {
                          const defaultAffinities = { ...settings.defaultAffinities };
                          const affinitiesSettings = { ...settings.affinities }
                          Object.values(MaterialEnum).forEach((materialName) => {
                            if (affinitiesSettings[settings.mode] && affinitiesSettings[settings.mode][materialName]) {
                              affinitiesSettings[settings.mode][materialName]!.building[buildingName] = type
                            }
                          })
                          defaultAffinities[settings.mode][buildingName] = type;
                          setSettings((prev) => ({ ...prev, defaultAffinities: defaultAffinities, affinities: affinitiesSettings }));
                        }}
                      >
                        {type === FloorsEnum.Other ? (
                          <div className="h-full flex items-center w-[32px]">
                            <span className="text-xs" translate="no">
                              Other
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center text-xs">
                            <CustomImage name={type} settings={settings} />
                            {affinity ?
                              (<span>{affinity * 100 > 0 ? `+${affinity * 100}` : `${affinity * 100}`}%</span>) :
                              (efficiency ? <span>{efficiency * 100}%</span> : null)
                            }
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            );

            return acc;
          }, [])
        }
      </tbody>
    </table>
  )
}