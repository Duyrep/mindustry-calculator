import Link from "next/link";
import { MindustryIcon } from "../icons";

export default function LinksCol() {
  return (
    <td className="px-2">
      <Link href="/" title="">
        <MindustryIcon className="text-2xl">&#xe81c;</MindustryIcon>
      </Link>
    </td>
  );
}