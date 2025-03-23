import { MaterialEnum } from "@/types/data/7.0-Build-146";
import { SettingsType } from "@/types/utils";
import { getListFactoryNames } from "@/types/utils";
import { CustomImage } from "./CustomImage";
import { SetStateAction } from "react";

export default function MaterialSettings(
  { settings, setSettings }: {
    settings: SettingsType,
    setSettings: React.Dispatch<SetStateAction<SettingsType>>
  }
) {
  return (
    <table>
      <thead>
        <tr>
          <th className="w-10"></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {Object.values(MaterialEnum).reduce<React.JSX.Element[]>((acc, materialName) => {
          const listFactory = getListFactoryNames(materialName, settings.mode);
          if (listFactory.length < 2) return acc;
          acc.push(
            <tr
              key={materialName}
            >
              <td className={`${acc.length != 0 && "border-t"} py-2`}>
                <div className="flex shrink-0 items-center">
                  <CustomImage name={materialName} settings={settings} />
                  <span>:</span>
                </div>
              </td>
              <td className={`${acc.length != 0 && "border-t"} py-2`}>
                <div
                  className="flex flex-wrap gap-1"
                >
                  {Object.values(listFactory).map((buildingName) => (
                    <div
                      className={`p-1 rounded-md hover:bg-brand cursor-pointer duration-100 ${settings.material[settings.mode][materialName] == buildingName ? "bg-brand" : "bg-secondary"}`}
                      key={buildingName}
                      onClick={() => {
                        const materialSettings = { ...settings.material };
                        materialSettings[settings.mode][materialName] = buildingName;
                        setSettings((prev) => ({ ...prev, material: materialSettings }));
                      }}
                    >
                      <CustomImage name={buildingName} settings={settings} />
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          )

          return acc
        }, [])}
      </tbody>
    </table>
  )
}