"use client";

import SpriteImage from "@/components/SpriteImage";
import {
  getBeacons,
  getBuilding,
  getBuildings,
  getData,
  getItem,
  getItems,
  getRecipes,
  getTiles,
} from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Data() {
  const { t } = useTranslation();
  const modes = [
    { mode: "Serpulo", file: "/data/vanilla-serpulo-v8.json" },
    { mode: "Erekir", file: "/data/vanilla-erekir-v8.json" },
    { mode: "Any", file: "/data/vanilla-any-v8.json" },
  ];

  return (
    <main className="p-1">
      <Link
        className="text-primary"
        href={"https://github.com/Duyrep/mindustry-calculator"}
      >
        File
      </Link>
      {modes.map(({ mode, file }) => (
        <div key={mode}>
          <h2>{mode}</h2>
          <Link className="text-primary" href={file}>
            {file}
          </Link>
          <h3>{t("Items")}</h3>
          <table>
            <thead>
              <tr>
                <th className="border p-1">Id</th>
                <th className="border p-1">{t("Sprite")}</th>
                <th className="border p-1">{t("Name")}</th>
                <th className="border p-1">{t("Producer")}</th>
              </tr>
            </thead>
            <tbody>
              {getItems(mode).map((item) => (
                <tr key={item.getId()}>
                  <td className="border p-1">{item.getId()}</td>
                  <td className="border p-1">
                    <div className="flex whitespace-nowrap">
                      <SpriteImage
                        row={item.getImage().row}
                        col={item.getImage().col}
                        size={24}
                      />
                      <span>
                        &nbsp;
                        {Object.entries(item.getImage()).map(
                          ([k, v]) => `${k}:${v} `
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="border p-1 whitespace-nowrap">
                    {t(item.getName())}
                  </td>
                  <td className="border p-1">
                    <div className="flex flex-col gap-1">
                      {item.getProducedBy().map((buildingId) => (
                        <div
                          key={buildingId}
                          className="flex whitespace-nowrap"
                        >
                          <SpriteImage
                            row={getBuilding(buildingId, mode).getImage().row}
                            col={getBuilding(buildingId, mode).getImage().col}
                            size={24}
                          />
                          <span>&nbsp;{buildingId}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>{t("Buildings")}</h3>
          <table>
            <thead>
              <tr>
                <th className="border p-1">Id</th>
                <th className="border p-1">{t("Sprite")}</th>
                <th className="border p-1">{t("Name")}</th>
                <th className="border p-1">{t("Power")}</th>
                <th className="border p-1">{t("Optional enhancements")}</th>
                <th className="border p-1">{t("Required tiles")}</th>
              </tr>
            </thead>
            <tbody>
              {getBuildings(mode).map((building) => (
                <tr key={building.getId()}>
                  <td className="border p-1">{building.getId()}</td>
                  <td className="border p-1">
                    <div className="flex whitespace-nowrap">
                      <SpriteImage
                        row={building.getImage().row}
                        col={building.getImage().col}
                        size={24}
                      />
                      &nbsp;
                      <span>
                        {Object.entries(building.getImage()).map(
                          ([k, v]) => `${k}:${v} `
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="border p-1 whitespace-nowrap">
                    {t(building.getName())}
                  </td>
                  <td className="border p-1">{building.getPower()}</td>
                  <td className="border p-1">
                    {JSON.stringify(building.getOptionalEnhancements())}
                  </td>
                  <td className="border p-1">
                    {JSON.stringify(building.getRequiredTiles())}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>{t("Tiles")}</h3>
          <table>
            <thead>
              <tr>
                <th className="border p-1">Id</th>
                <th className="border p-1">{t("Sprite")}</th>
                <th className="border p-1">{t("Name")}</th>
              </tr>
            </thead>
            <tbody>
              {getTiles(mode).map((tile) => (
                <tr key={tile.getId()}>
                  <td className="border p-1">{tile.getId()}</td>
                  <td className="border p-1">
                    <div className="flex whitespace-nowrap">
                      <SpriteImage
                        row={tile.getImage().row}
                        col={tile.getImage().col}
                        size={24}
                      />
                      <span>
                        &nbsp;
                        {Object.entries(tile.getImage()).map(
                          ([k, v]) => `${k}:${v} `
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="border p-1 whitespace-nowrap">
                    {t(tile.getName())}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>{t("Beacons")}</h3>
          <table>
            <thead>
              <tr>
                <th className="border p-1">Id</th>
                <th className="border p-1">{t("Sprite")}</th>
                <th className="border p-1">{t("Name")}</th>
              </tr>
            </thead>
            <tbody>
              {getBeacons(mode).map((beacon) => (
                <tr key={beacon.getId()}>
                  <td className="border p-1">{beacon.getId()}</td>
                  <td className="border p-1">
                    <div className="flex whitespace-nowrap">
                      <SpriteImage
                        row={beacon.getImage().row}
                        col={beacon.getImage().col}
                        size={24}
                      />
                      <span>
                        &nbsp;
                        {Object.entries(beacon.getImage()).map(
                          ([k, v]) => `${k}:${v} `
                        )}
                      </span>
                    </div>
                  </td>
                  <td className="border p-1 whitespace-nowrap">
                    {t(beacon.getName())}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h3>{t("Recipes")}</h3>
          <table>
            <thead>
              <tr>
                <th className="border p-1">Id</th>
                <th className="border p-1">
                  {t("Input")} {t("Output")}
                </th>
              </tr>
            </thead>
            <tbody>
              {getRecipes(mode).map((recipe) => (
                <tr key={recipe.getId()}>
                  <td className="border p-1">{recipe.getId()}</td>
                  <td className="border p-1">
                    <div className="flex flex-col gap-1">
                      {getItem(recipe.getId(), mode)
                        .getProducedBy()
                        .map((buildingId) => {
                          const input = recipe.getInput(buildingId);
                          const output = recipe.getOutput(buildingId);
                          return (
                            <table key={buildingId}>
                              <thead>
                                <tr>
                                  <th className="border">{t("Producer")}</th>
                                  {input.length > 0 && (
                                    <th className="border">{t("Input")}</th>
                                  )}
                                  {output.length > 0 && (
                                    <th className="border">{t("Output")}</th>
                                  )}
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="border p-1">
                                    <div className="flex whitespace-nowrap">
                                      <SpriteImage
                                        row={
                                          getBuilding(
                                            buildingId,
                                            mode
                                          ).getImage().row
                                        }
                                        col={
                                          getBuilding(
                                            buildingId,
                                            mode
                                          ).getImage().col
                                        }
                                        size={24}
                                      />
                                      &nbsp;
                                      {buildingId}
                                    </div>
                                  </td>
                                  {input.length > 0 && (
                                    <td className="border p-1">
                                      <div className="flex flex-col">
                                        {input.map(({ id, perSec }) => (
                                          <div
                                            key={id}
                                            className="flex whitespace-nowrap"
                                          >
                                            <SpriteImage
                                              row={
                                                getItem(id, mode).getImage().row
                                              }
                                              col={
                                                getItem(id, mode).getImage().col
                                              }
                                              size={24}
                                            />
                                            &nbsp;
                                            {id} x{+perSec.toFixed(3)} (
                                            {
                                              getData(mode)
                                                ?.recipes.find(
                                                  (v) => v.id === recipe.getId()
                                                )
                                                ?.buildings.find(
                                                  (v) => v.id === buildingId
                                                )
                                                ?.input?.find((v) => v.id === id)
                                                ?.perSec
                                            }
                                            ) /{t("second")[0]}
                                          </div>
                                        ))}
                                      </div>
                                    </td>
                                  )}
                                  {output.length > 0 && (
                                    <td className="border p-1">
                                      <div className="flex flex-col">
                                        {output.map(({ id, perSec }) => (
                                          <div
                                            key={id}
                                            className="flex whitespace-nowrap"
                                          >
                                            <SpriteImage
                                              row={
                                                getItem(id, mode).getImage().row
                                              }
                                              col={
                                                getItem(id, mode).getImage().col
                                              }
                                              size={24}
                                            />
                                            &nbsp;
                                            {id} x{+perSec.toFixed(3)} (
                                            {
                                              getData(mode)
                                                ?.recipes.find(
                                                  (v) => v.id === recipe.getId()
                                                )
                                                ?.buildings.find(
                                                  (v) => v.id === buildingId
                                                )
                                                ?.output.find(
                                                  (v) => v.id === id
                                                )?.perSec
                                            }
                                            ) /{t("second")[0]}
                                          </div>
                                        ))}
                                      </div>
                                    </td>
                                  )}
                                </tr>
                              </tbody>
                            </table>
                          );
                        })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <h2>Sprite sheet</h2>
      <Image
        src="/spritesheet.png"
        alt="spritesheet"
        width={32 * 15}
        height={32 * 15}
      />
    </main>
  );
}
