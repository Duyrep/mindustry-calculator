// import { ModesEnum } from "@/types/data/7.0-Build-146";
import { getDefaultSettings, SettingsType } from "@/types/utils";
import React from "react";
import MaterialSettings from "./MaterialSettings";
import { DefaultBoostsSettings } from "./DefaultBoostsSettings";
import { AffinitiesSettings } from "./DefaultAffinitiesSettings";
import { DefaultBeaconSettings } from "./DefaultBeaconSettings";

export default function SettingsTab(
  { show, settings, setSettings }: {
    show: boolean,
    settings: SettingsType,
    setSettings: React.Dispatch<React.SetStateAction<SettingsType>>
  }
) {
  return (
    <div className={`p-2 ${!show && "hidden"}`}>
      <button 
        className="bg-brand p-1 my-1 rounded-md outline-none"
        onClick={() => setSettings(getDefaultSettings())}
      >Reset</button>
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={2}><b><i>Display</i></b><hr /></td>
          </tr>
          <tr>
            <td className="pl-10 text-right">Display rates as:</td>
            <td>
              {
                ["second", "minute", "hour"].map((value) => (
                  <button
                    key={value}
                    onClick={() => setSettings(prev => ({ ...prev, displayRates: value as "second" | "minute" | "hour" }))}
                    className={`p-1 px-2 rounded-md mx-1 duration-100 outline-none ${value == settings.displayRates ? "bg-brand" : "bg-secondary"}`}
                  >{value}</button>
                ))
              }
            </td>
          </tr>

          <tr>
            <td colSpan={2}><b><i>Mode</i></b><hr /></td>
          </tr>
          <tr>
            <td className="pl-10 text-right">Mode:</td>
            <td>
              {/* {
                Object.values(ModesEnum).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setSettings(prev => ({ ...prev, mode: mode }))}
                    className={`p-1 px-2 rounded-md mx-1 duration-100 outline-none ${mode == settings.mode ? "bg-brand" : "bg-secondary"}`}
                  >{mode}</button>
                ))
              } */}
              Coming soon
            </td>
          </tr>

          <tr>
            <td colSpan={2}><b><i>Default Boosts</i></b><hr /></td>
          </tr>
          <tr>
            <td colSpan={2}><DefaultBoostsSettings key={settings.mode} settings={settings} setSettings={setSettings}/></td>
          </tr>

          <tr>
            <td colSpan={2}><b><i>Default Affinities</i></b><hr /></td>
          </tr>
          <tr>
            <td colSpan={2}><AffinitiesSettings key={settings.mode} settings={settings} setSettings={setSettings}/></td>
          </tr>

          <tr>
            <td colSpan={2}><b><i>Default Beacon</i></b><hr /></td>
          </tr>
          <tr>
            <td colSpan={2}><DefaultBeaconSettings key={settings.mode} settings={settings} setSettings={setSettings}/></td>
          </tr>

          <tr>
            <td colSpan={2}><b><i>Material</i></b><hr /></td>
          </tr>
          <tr>
            <td colSpan={2}><MaterialSettings key={settings.mode} settings={settings} setSettings={setSettings}/></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}