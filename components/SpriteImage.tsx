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
  return (
    <div style={{ width: size, height: size }}>
      <Image
        src="/pixel.gif"
        alt={title}
        title={title}
        width={size}
        height={size}
        style={{
          userSelect: "none",
          background: `url('/spritesheet.png') ${-col * size}px ${
            -row * size
          }px ${size ? `/ ${size * 15}px ${size * 15}px` : ""}`,
        }}
        draggable={false}
      />
    </div>
  );
}
