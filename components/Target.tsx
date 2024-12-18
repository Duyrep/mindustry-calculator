import { factoryCalculate, productCalculateInput, Settings } from "@/calculations/calculations";
import { ResourcesEnum, UnitsEnum } from "@/calculations/enums";
import Image from "next/image";
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
  settings,
  targets,
  setTargets,
}: {
  product: ResourcesEnum | UnitsEnum | undefined;
  index: number;
  settings: Settings;
  targets: [(ResourcesEnum | UnitsEnum | undefined), number][];
  setTargets: Dispatch<SetStateAction<[(ResourcesEnum | UnitsEnum | undefined), number][]>>;
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [numOfFactoryState, setNumOfFactory] = useState(1);
  const numOfFactoryInput = useRef<HTMLInputElement>(null);
  const numOfProductInput = useRef<HTMLInputElement>(null);
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
    updatedTargets[index] = [target, numOfFactoryState];
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
        <Image
          width={48}
          height={48}
          key={idx}
          src={`/assets/sprites/${value}.webp`}
          alt={value}
          title={value}
          className={`cursor-pointer rounded-md p-1 w-12 h-12 transition hover:bg-brand duration-300 ${(value as ResourcesEnum | UnitsEnum) == product && "bg-brand"}`}
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

  const isNumber = (str: string): boolean => {
    return /^\d+(\.\d+)?$/.test(str);
  };

  const onKeyDownInputHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (event.key == "Enter") {
      if (isNumber(target.value) && product) {
        const numOfFactory = Number(target.value)
        const numOfProduct = factoryCalculate(product, numOfFactory, settings)
        const updatedTargets = [...targets]

        updatedTargets[index][1] = numOfFactory
        setTargets(updatedTargets)
        target.blur()
        setNumOfFactory(numOfFactory);
        if (numOfProductInput.current) {
          numOfProductInput.current.value = String(+numOfProduct.toFixed(3))
        }
      }
    }
  };

  const onBlurInputHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (isNumber(target.value) && product) {
      const numOfFactory = Number(target.value)
      const numOfProduct = factoryCalculate(product, numOfFactory, settings)
      const updatedTargets = [...targets]

      updatedTargets[index][1] = numOfFactory
      setTargets(updatedTargets)
      target.blur()
      setNumOfFactory(numOfFactory);
      if (numOfProductInput.current) {
        numOfProductInput.current.value = String(+numOfProduct.toFixed(3))
      }
    }
  };

  const onKeyDownInputHandler2 = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement

    if (event.key == "Enter") {
      if (isNumber(target.value) && product) {
        const numOfFactory = productCalculateInput(product, Number(target.value), settings)
        const updatedTargets = [...targets]

        updatedTargets[index][1] = numOfFactory
        setTargets(updatedTargets)
        target.blur()
        setNumOfFactory(numOfFactory);
        if (numOfFactoryInput.current) {
          numOfFactoryInput.current.value = String(+numOfFactory.toFixed(1))
        }
      }
    }
  };

  const onBlurInputHandler2 = (event: React.FocusEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement

    if (isNumber(target.value) && product) {
      const numOfFactory = productCalculateInput(product, Number(target.value), settings)
      const updatedTargets = [...targets]

      updatedTargets[index][1] = numOfFactory
      setTargets(updatedTargets)
      setNumOfFactory(numOfFactory);
      if (numOfFactoryInput.current) {
        numOfFactoryInput.current.value = String(+numOfFactory.toFixed(1))
      }
    }
  };

  const formatString = (input: string): string => {
    return input.replace(/([A-Z])/g, (match, p1, offset) => {
      return offset === 0 ? p1 : ' ' + p1.toLowerCase();
    });
  }

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (dropdown.current && selector.current) {
        if (!dropdown.current.contains(event.target as Node)) {
          closeDropdown();
        }
      }
    };

    if (numOfProductInput.current && product) {
      numOfProductInput.current.value = String(+factoryCalculate(product, numOfFactoryState, settings).toFixed(3))
    }
    if (numOfFactoryInput.current && product) {
      numOfFactoryInput.current.value = String(+numOfFactoryState.toFixed(1))
    }

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  useEffect(() => {
    if (numOfProductInput.current && product) {
      numOfProductInput.current.value = String(+factoryCalculate(product, numOfFactoryState, settings).toFixed(3))
    }
    if (numOfFactoryInput.current) {
      numOfFactoryInput.current.value = String(+numOfFactoryState.toFixed(1))
    }
  }, [targets, settings]);

  useEffect(() => {
    setTimeout(() => {
      if (targetRef.current) {
        targetRef.current.classList.remove("opacity-0");
        targetRef.current.classList.add("opacity-1");
      }
    }, 1);
  }, [targetRef]);

  return (
    <div className="relative mb-2 transition-opacity duration-150 opacity-0" ref={targetRef}>
      <div className="flex flex-wrap space-x-1 content-center">

        <div
          className={
            `flex w-44 border-2 border-border rounded-md cursor-pointer duration-150 select-none
              ${showDropdown && "bg-brand"} 
            `}
          onClick={() => toggleDropdown()}
          ref={selector}
        >
          {
            product ?
              <>
                <Image
                  width={48}
                  height={48}
                  className={`p-1 h-12 w-12`}
                  src={`/assets/sprites/${product}.webp`}
                  alt={formatString(product)}
                  draggable={false}
                />
                <span className="flex flex-wrap content-center p-1">
                  {formatString(product)}
                </span>
              </>
              :
              <span
                className="flex flex-wrap content-center p-1 h-12"
              >
                Select product
              </span>
          }
        </div>

        <div className="flex flex-wrap content-center">
          <div className="ml-2">
            <label>Item/{settings.displayRate == 60 ? "minute" : settings.displayRate == 3600 ? "hour" : "second"}:</label>
            <input
              className="ml-1 w-32 pl-2 h-8 bg-secondary focus:outline-none rounded-md"
              ref={numOfProductInput}
              type="text"
              onKeyDown={onKeyDownInputHandler2}
              onBlur={onBlurInputHandler2}
            />
          </div>
          <div className="ml-2">
            <label>Buildings:</label>
            <input
              className="ml-1 w-28 h-8 pl-2 bg-secondary rounded-md focus:outline-none"
              ref={numOfFactoryInput}
              type="text"
              onKeyDown={onKeyDownInputHandler}
              onBlur={onBlurInputHandler}
            />
          </div>
        </div>

        <div className="flex flex-wrap content-center" title="Delete">
          <button
            className="h-8 w-8 text-3xl rounded-md bg-secondary hover:bg-red-600 transition-colors duration-100"
            onClick={removeTarget}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2rem"
              height="2rem"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide"
              transform="rotate(45 0 0)"
            >
              <path d="M4 12H20M12 4V20" />
            </svg>
          </button>
        </div>
      </div>

      {showDropdown && (
        <div
          ref={dropdown}
          className={`absolute z-10 flex p-2 h-80 bg-background border-2 border-border rounded-md overflow-auto transition-all duration-150 ease-in-out transform ${exiting
            ? "opacity-0 scale-95"
            : mounted
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
            }`}
        >
          <div className="w-60">
            <span className="mx-2 text-lg">Items</span>
            <hr className="border-2 bg-border mx-2" />
            {[0, 20].map((start, idx) => (
              <div className="flex flex-wrap" key={idx}>
                {renderItems(ResourcesEnum, 0, start)}
              </div>
            ))}
            <span className="mx-2 text-lg">Liquids</span>
            <hr className="border-2 bg-border mx-2" />
            {[30].map((start, idx) => (
              <div className="flex flex-wrap" key={idx}>
                {renderItems(ResourcesEnum, 20, start)}
              </div>
            ))}
            <span className="mx-2 text-lg">Units</span>
            <hr className="border-2 bg-border mx-2" />
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
