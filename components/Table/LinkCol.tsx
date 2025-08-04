"use client";

import Link from "next/link";
import { MindustryIcon } from "../icons";
import { generateURL } from "@/context";
import type { Item } from "@/models";
import { useEffect, useState } from "react";

export default function LinksCol({
  product,
  productsPerSec,
}: {
  product: Item;
  productsPerSec: number;
}) {
  const [href, setHref] = useState("/");

  useEffect(() => {
    setHref(generateURL(product.getId(), "item", productsPerSec));
  }, [product, productsPerSec]);

  return (
    <td className="px-2">
      <Link href={href} title="">
        <MindustryIcon className="text-2xl">&#xe81c;</MindustryIcon>
      </Link>
    </td>
  );
}
