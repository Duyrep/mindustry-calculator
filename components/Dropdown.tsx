import { MaterialGroupsEnum, ModesEnum, MaterialEnum } from "@/types/data/7.0-Build-146";
import { SettingsType } from "@/types/utils"
import { getMaterial } from "@/types/utils";
import React, { useRef } from "react";
import { CustomImage } from "./CustomImage";

const groupRow: { [key in MaterialGroupsEnum]: string } = {
  [MaterialGroupsEnum.Item]: "10rem",
  [MaterialGroupsEnum.Liquid]: "10rem",
  [MaterialGroupsEnum.Unit]: "12.5rem",
  [MaterialGroupsEnum.Other]: "10rem"
}

export default function Dropdown(
  {
    show,
    target,
    setTarget,
    setShowDropdown,
    settings
  }: {
    show: boolean,
    target: MaterialEnum
    setTarget: React.Dispatch<React.SetStateAction<MaterialEnum>>,
    setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>,
    settings: SettingsType
  }
) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={dropdownRef}
      className={`fixed z-50 left-2 h-0 max-h-[calc(100%-6rem)] overflow-auto bg-secondary cursor-auto rounded-b-md select-none duration-500 transition-all ${show ? "h-96" : "h-0"}`}
    >
      <div className="p-2">
        {Object.values(ModesEnum).map((mode) => (
          <div key={mode} className={`${mode != settings.mode && "hidden"}`}>
            {Object.values(MaterialGroupsEnum).map((group) => {
              const materialInGroup: MaterialEnum[] = []

              Object.values(MaterialEnum).forEach((materialName) => {
                const material = getMaterial(materialName);
                if (!material) return;
                if (material.group == group && (material.modes.includes(mode) || mode == ModesEnum.Any)) {
                  materialInGroup.push(materialName)
                }
              })
              if (materialInGroup.length == 0) return;

              return (
                <div key={group}>
                  <span>{group}</span>
                  <hr />
                  <div className="flex flex-wrap" style={{ width: `${groupRow[group]}` }}>
                    {materialInGroup.map((material) => (
                      <div
                        key={material}
                        className={`p-1 rounded-md cursor-pointer hover:bg-brand duration-100 ${target == material && "bg-brand"}`}
                        onClick={() => { if (target != material) { setTarget(material); setShowDropdown(false) } }}
                      >
                        <CustomImage name={material} settings={settings} />
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  );
}