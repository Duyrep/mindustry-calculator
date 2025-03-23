import { SettingsType } from "@/types/utils";
import Dropdown from "./Dropdown";
import { MaterialEnum } from "@/types/data/7.0-Build-146";
import { useState } from "react";
import { getMaterialDisplayName } from "@/types/utils";
import { CustomImage } from "./CustomImage";

export default function Target(
  {
    target,
    setTarget,
    settings
  }: {
    target: MaterialEnum,
    setTarget: React.Dispatch<React.SetStateAction<MaterialEnum>>,
    settings: SettingsType
  }
) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="flex items-center flex-shrink-0">
      <div
        className={`fixed top-0 right-0 w-screen h-screen ${!showDropdown && "hidden"}`}
        onClick={() => setShowDropdown(false)}
      ></div>
      <div
        className={`flex items-center ${showDropdown ? "bg-brand" : "bg-input"} cursor-pointer px-1 rounded-md duration-100`}
        onClick={() => setShowDropdown(!showDropdown)}
        title={getMaterialDisplayName(target, settings)}
      >
        <span>Output:</span>
        <div className="ml-2 relative">
          <div className={`p-1`}>
            <CustomImage name={target} settings={settings}/>
          </div>
          <Dropdown show={showDropdown} target={target} setTarget={setTarget} setShowDropdown={setShowDropdown} settings={settings} />
        </div>
      </div>
    </div>
  );
}