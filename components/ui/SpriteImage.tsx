import { useGameDataStore } from "@/store";
import Image from "next/image";

export default function SpriteImage({
  row,
  col,
  size = 32,
  title = "",
}: {
  row: number;
  col: number;
  size?: number;
  title?: string;
}) {
  const image = useGameDataStore(state => state.getGameData()?.image)

  return (
    <div style={{ width: size, height: size }}>
      <Image
        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        alt={title}
        title={title}
        width={size}
        height={size}
        style={{
          userSelect: "none",
          background: `url('${image}') ${-col * size}px ${
            -row * size
          }px ${size ? `/ ${size * 15}px ${size * 15}px` : ""}`,
        }}
        draggable={false}
      />
    </div>
  );
}
