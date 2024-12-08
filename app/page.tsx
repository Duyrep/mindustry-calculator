"use client";

import { ResourcesEnum, UnitsEnum } from "@/enums";
import Target from "@/components/Target";
import { useState } from "react";

export default function Home() {
  const [targets, setTargets] = useState<(ResourcesEnum | UnitsEnum)[]>([
    ResourcesEnum.Silicon,
  ]);



  return (
    <div>
      <div>
        <button
          className="w-8 h-8 text-3xl rounded-md bg-secondary hover:bg-green-600 transition-all duration-100"
          onClick={() => setTargets((prev) => [...prev, ResourcesEnum.Silicon])}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2rem"
            height="2rem"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 12H20M12 4V20"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div>
        {targets.map((value, index) => (
          <Target
            key={index}
            product={value}
            index={index}
            targets={targets}
            setTargets={setTargets}
          />
        ))}
      </div>
      <div id="graph-container" className="w-full h-screen border-2 my-2 border-border transition-all duration-100"></div>
    </div>
  );
}
