import { CalculationResult, ColumnSettingsType } from "@/types";
import { useTranslation } from "react-i18next";

export default function TotalPower({
  columnSettings,
  result,
}: {
  columnSettings: ColumnSettingsType;
  result: CalculationResult;
}) {
  const { t } = useTranslation();

  return (
    <tr>
      <td
        className="text-right"
        colSpan={
          1 +
          (columnSettings.belts ? 1 : 0) +
          (columnSettings.affinities || columnSettings.boosts ? 1 : 0) +
          (columnSettings.beacons ? 1 : 0) +
          (columnSettings.power ? 1 : 0)
        }
      >
        <b>{t("Total power")}</b>:&nbsp;
      </td>
      <td>
        {+Object.values(result).reduce(
          (acc, { power }) => acc + (power ?? 0),
          0
        ).toFixed(3)}
      </td>
    </tr>
  );
}
