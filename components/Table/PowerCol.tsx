export default function PowerCol({ power }: { power?: number }) {
  return (
    <td className="text-xs text-right pr-2">
      {power && <span title={+power.toFixed(3) + ""}>{+power.toFixed(3)}</span>}
    </td>
  );
}