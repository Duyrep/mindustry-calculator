import { BuildingsEnum, data, FloorsEnum, MaterialEnum, WallsEnum } from "@/types/data/7.0-Build-146";
import { SettingsType } from "@/types/utils";
import { getBuilding, getMaterial } from "@/types/utils";

import Image from 'next/image';

export function CustomImage({ name, settings, size = 32 }: { name: string, settings: SettingsType, size?: number }) {
  let imageRow = 0;
  let imageCol = 0;
  let title = name;

  if (Object.values(MaterialEnum).includes(name as MaterialEnum)) {
    const material = getMaterial(name);
    if (material) {
      imageRow = material.imageRow;
      imageCol = material.imageCol;
      if (material.displayName[settings.lang]) {
        title = material.displayName[settings.lang];
      }
    }
  } else if (Object.values(BuildingsEnum).includes(name as BuildingsEnum)) {
    const building = getBuilding(name);
    if (building) {
      imageRow = building.imageRow;
      imageCol = building.imageCol;
      if (building.displayName[settings.lang]) {
        title = building.displayName[settings.lang];
      }
    }
  } else if (Object.values(FloorsEnum).includes(name as FloorsEnum)) {
    if (data.floors[name as FloorsEnum]) {
      const floor = data.floors[name as FloorsEnum];
      imageRow = floor.imageRow;
      imageCol = floor.imageCol;
      if (floor.displayName[settings.lang]) {
        title = floor.displayName[settings.lang];
      }
    }
  } else if (Object.values(WallsEnum).includes(name as WallsEnum)) {
    if (data.walls[name as WallsEnum]) {
      const walls = data.walls[name as WallsEnum];
      imageRow = walls.imageRow;
      imageCol = walls.imageCol;
      if (walls.displayName[settings.lang]) {
        title = walls.displayName[settings.lang];
      }
    }
  } else {
    return (
      <Image
        src="/pixel.gif"
        alt={name}
        title="Error"
        width={size}
        height={size}
        style={{
          userSelect: "none",
          background: `url('/spritesheet.png') 0px 0px`,
        }}
        draggable={false}
      />
    );
  }

  const row = -imageRow * size;
  const col = -imageCol * size;

  return (
    <Image
      src="/pixel.gif"
      alt={title || name}
      title={title}
      width={size}
      height={size}
      style={{
        userSelect: "none",
        background: `url('/spritesheet.png') ${col}px ${row}px ${
          size ? `/ ${size * 14}px ${size * 14}px` : ""
        }`,
      }}
      draggable={false}
    />
  );
}
