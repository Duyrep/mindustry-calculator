import { SettingsContext } from "@/context";
import { CalculationResult } from "@/types";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { BuildingCol } from ".";
import { getBuilding, getItem } from "@/utils";
import ColumnSettings from "./ColumnSettings";
import type { ColumnSettingsType } from "@/types";
import ItemCol from "./ItemsCol";
import { BeltCol } from "./BeltsCol";
import Affinities from "./Affinities";
import Boosts from "./Boosts";
import BeaconsCol from "./BeaconsCol";
import PowerCol from "./PowerCol";
import LinksCol from "./LinkCol";
import TotalPower from "./TotalPower";

export default function Table({ result }: { result: CalculationResult }) {
  const { t } = useTranslation();
  const [settings] = useContext(SettingsContext).settingsState;
  const [columnSettings, setColumnSettings] = useState<ColumnSettingsType>({
    belts: true,
    affinities: true,
    boosts: true,
    beacons: true,
    power: true,
    links: true,
  });

  return (
    <div className="p-2 bg-surface-a10 rounded-md">
      <ColumnSettings
        columnSettings={columnSettings}
        setColumnSettings={setColumnSettings}
      />
      <table className="my-2">
        <thead>
          <tr className="border-b border-surface-a30">
            <HeadItem>
              {t("Items")}/{t(settings.displayRate)[0]}
            </HeadItem>
            <HeadItem>{t("Buildings")}</HeadItem>
            {columnSettings.belts && <HeadItem>{t("Belts")}</HeadItem>}
            {(columnSettings.affinities || columnSettings.boosts) && (
              <HeadItem>
                <div className="flex flex-col text-sm">
                  <span>{t("Affinities")}</span>
                  <span>{t("Boosts")}</span>
                </div>
              </HeadItem>
            )}
            {columnSettings.beacons && <HeadItem>{t("Beacons")}</HeadItem>}
            {columnSettings.power && <HeadItem>{t("Power")}</HeadItem>}
            {columnSettings.links && <th></th>}
          </tr>
        </thead>
        <tbody>
          {Object.entries(result).map(
            ([
              product,
              { productsPerSec, building, numOfBuildings, power },
            ]) => (
              <tr key={product} className="border-b border-surface-a30">
                <ItemCol
                  product={getItem(product, settings.mode)}
                  productsPerSec={productsPerSec}
                />
                <BuildingCol
                  product={getItem(product, settings.mode)}
                  building={getBuilding(building, settings.mode)}
                  numOfBuildings={numOfBuildings}
                />
                {columnSettings.belts && (
                  <BeltCol
                    product={getItem(product, settings.mode)}
                    productsPerSec={productsPerSec}
                  />
                )}
                <td>
                  {columnSettings.affinities && (
                    <Affinities
                      product={getItem(product, settings.mode)}
                      building={getBuilding(building, settings.mode)}
                    />
                  )}
                  {columnSettings.boosts && (
                    <Boosts
                      product={getItem(product, settings.mode)}
                      building={getBuilding(building, settings.mode)}
                    />
                  )}
                </td>
                {columnSettings.beacons && (
                  <BeaconsCol product={getItem(product, settings.mode)} />
                )}
                {columnSettings.power && <PowerCol power={power} />}
                {columnSettings.links && <LinksCol />}
              </tr>
            )
          )}
          <TotalPower columnSettings={columnSettings} result={result} />
        </tbody>
      </table>
    </div>
  );
}

function HeadItem({ children }: { children?: React.ReactNode }) {
  return <th className="px-2">{children}</th>;
}
