import { ResourcesEnum, UnitsEnum } from "@/calculations/enums";
import React, {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
} from "react";

export default function Target({
  product,
  index,
  targets,
  setTargets,
}: {
  product: ResourcesEnum | UnitsEnum;
  index: number;
  targets: (ResourcesEnum | UnitsEnum)[];
  setTargets: Dispatch<SetStateAction<(ResourcesEnum | UnitsEnum)[]>>;
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const dropdown = useRef<HTMLDivElement | null>(null);
  const selector = useRef<HTMLImageElement | null>(null);

  const toggleDropdown = () => {
    if (showDropdown) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const openDropdown = () => {
    setShowDropdown(true);
    setExiting(true);
    setMounted(true);
    setTimeout(() => setExiting(false), 1);
  };

  const closeDropdown = () => {
    setMounted(false);
    setExiting(true);
    setTimeout(() => setShowDropdown(false), 150);
  };

  const updateTargets = (target: ResourcesEnum | UnitsEnum) => {
    const updatedTargets = [...targets];
    updatedTargets[index] = target;
    setTargets(updatedTargets);
  };

  const renderItems = (
    enumObject: { [key: string]: string | number },
    sliceStart: number,
    sliceEnd: number
  ) => {
    return Object.keys(enumObject)
      .slice(sliceStart, sliceEnd)
      .map((value, idx) => (
        <img
          className={`${
            (value as ResourcesEnum | UnitsEnum) == product && "bg-brand"
          } cursor-pointer  rounded-md p-1 w-12 h-12 transition hover:bg-brand duration-300`}
          key={idx}
          src={`/assets/sprites/${value}.webp`}
          alt={value}
          onClick={() => {
            updateTargets(value as ResourcesEnum);
            closeDropdown();
          }}
        />
      ));
  };

  const removeTarget = (): void => {
    if (targetRef.current) {
      targetRef.current.classList.remove("opacity-1");
      targetRef.current.classList.add("opacity-0");
      setTimeout(() => {
        setTargets((prev) => prev.filter((_, i) => i !== index));
        if (targetRef.current) {
          targetRef.current.classList.remove("opacity-0");
          targetRef.current.classList.add("opacity-1");
        }
      }, 99);
    }
  };

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (dropdown.current && selector.current) {
        if (!dropdown.current.contains(event.target as Node)) {
          closeDropdown();
        }
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (targetRef.current) {
        targetRef.current.classList.remove("opacity-0");
        targetRef.current.classList.add("opacity-1");
      }
    }, 1);
  }, [targetRef]);

  return (
    <div className="transition-opacity duration-150 opacity-0" ref={targetRef}>
      <div className="flex space-x-2">
        <div className="flex flex-wrap content-center">
          <button
            className="h-8 w-8 text-3xl rounded-md bg-secondary hover:bg-red-600 transition-colors duration-100"
            onClick={removeTarget}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2rem"
              height="2rem"
              viewBox="0 0 24 24"
              transform="rotate(45 0 0)"
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
        <img
          className={`cursor-pointer border-2 border-border rounded-md p-1 h-12 w-12 ${
            showDropdown && "bg-brand"
          } duration-150`}
          ref={selector}
          src={`/assets/sprites/${product}.webp`}
          alt={product}
          onClick={() => toggleDropdown()}
        />

        <div className="h-12 flex flex-wrap content-center space-x-2">
          <input
            className="w-28 pl-2 h-8 bg-secondary focus:outline-none rounded-md"
            type="text"
            placeholder="Item/sec"
          />
          <input
            className="w-28 h-8 pl-2 bg-secondary rounded-md focus:outline-none"
            type="text"
            placeholder="buildings"
          />
        </div>
      </div>

      {showDropdown && (
        <div
          ref={dropdown}
          className={`absolute ml-10 h-80 bg-background border-2 border-border rounded-md overflow-auto transition-all duration-150 ease-in-out transform ${
            exiting
              ? "opacity-0 scale-95"
              : mounted
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }`}
        >
          <div className="w-72">
            {[30].map((start, idx) => (
              <div className="flex flex-wrap" key={idx}>
                {renderItems(ResourcesEnum, 0, start)}
              </div>
            ))}
            <hr />
            {[0, 5, 10, 15, 20, 25, 30, 35].map((start, idx) => (
              <div className="flex flex-wrap" key={idx}>
                {renderItems(UnitsEnum, start, start + 5)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
