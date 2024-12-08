"use client";

import {
  factoryCalculation,
  getDefaultSettings,
  getFactoriesByProduct,
} from "@/calculations/calculations";
import {
  ExtractorsEnum,
  FactoriesEnum,
  ResourcesEnum,
  UnitFactoriesEnum,
  UnitsEnum,
} from "@/calculations/enums";
import Target from "@/components/Target";
import { useEffect, useState } from "react";

export default function Home() {
  const [targets, setTargets] = useState<(ResourcesEnum | UnitsEnum)[]>([
    ResourcesEnum.Silicon,
  ]);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState(getDefaultSettings());

  useEffect(() => {
    factoryCalculation(ResourcesEnum.Silicon, 1, settings);
  }, []);

  return (
    <div>
      <div className="flex flex-warp content-center mb-2">
        <button
          className={`my-2 rounded-md ${
            showSettings ? "bg-brand" : "bg-secondary"
          }`}
          onClick={() => setShowSettings(!showSettings)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.75rem"
            height="1.75rem"
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
          <div className="absolute p-2 overflow-auto ml-10 border border-border rounded-md bg-background h-80">
            <table>
              <thead>
                <tr className="border border-border py-1">
                  <th>Product</th>
                  <th colSpan={10}>Factory</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(ResourcesEnum).map((valuei, indexi) => (
                  <tr key={valuei} className="border border-border">
                    <td>
                      <img
                        className="w-12 h-12 p-1"
                        src={`/assets/sprites/${valuei}.webp`}
                        alt={valuei}
                      />
                    </td>
                    {(getFactoriesByProduct(
                      valuei as ResourcesEnum
                    ) as (FactoriesEnum | ExtractorsEnum)[]).map((valuej, indexj) => (
                      <td key={valuej}>
                        <img
                          className={`w-12 h-12 p-1 rounded-md ${
                            valuej == settings[valuei as ResourcesEnum].key
                              ? "bg-brand"
                              : "cursor-pointer"
                          }`}
                          src={`/assets/sprites/${valuej}.webp`}
                          alt={valuej}
                          onClick={() =>
                            setSettings((prev) => ({
                              ...prev,
                              [valuei as ResourcesEnum]: {key: valuej},
                            }))
                          }
                        />
                      </td>
                    ))}
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
