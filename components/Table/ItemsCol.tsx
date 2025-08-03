import { SettingsContext } from "@/context";
import { useContext } from "react";
import type { Item } from "@/models";
import { MindustryIcon } from "../icons";
import { SpriteImage } from "..";

export default function ItemCol({
  product,
  productsPerSec,
}: {
  product: Item;
  productsPerSec: number;
}) {
  const [ignoredItems, setIgnoredItems] =
    useContext(SettingsContext).ignoredItemsState;
  return (
    <td className="pl-2">
      <div className="flex gap-1 items-center py-2 text-xs">
        <div className="relative cursor-pointer">
          <div
            className={`absolute flex justify-center hover:opacity-40 items-center bg-surface-a30 rounded-md text-lg w-full h-full duration-200 ${
              ignoredItems.includes(product.getId())
                ? "opacity-40"
                : "opacity-0"
            }`}
            onClick={() =>
              setIgnoredItems((prev) =>
                prev.includes(product.getId())
                  ? prev.filter((v) => v !== product.getId())
                  : [...prev, product.getId()]
              )
            }
          >
            <MindustryIcon>&#xe88f;</MindustryIcon>
          </div>
          <div className="p-1">
            <SpriteImage
              row={product.getImage().row}
              col={product.getImage().col}
            />
          </div>
        </div>
        <span title={productsPerSec + ""}>
          {productsPerSec > 0.1 ? +productsPerSec.toFixed(3) : "<0.1"}
        </span>
      </div>
    </td>
  );
}