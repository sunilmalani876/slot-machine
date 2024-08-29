/* eslint-disable react/prop-types */
// import { assets } from "@/lib/asset-utils";
import { frameworks } from "@/lib/utils";
import clsx from "clsx";

export const FrameworkRotation = ({ currentFramework }) => {
  const assets = {
    1: "🤡",
    2: "👻",
    3: "⛄️",
    4: "🦄",
    5: "🌚",
    6: "🦖",
    7: "💵",
  };

  return (
    <>
      <div className="flex justify-center items-center relative">
        {frameworks.map((name, index) => (
          <p
            key={name}
            src={assets[name]}
            // w-[35px] h-[35px]
            className={clsx(
              "absolute transition-all duration-100 text-4xl",
              currentFramework === name
                ? "opacity-100 transform-none"
                : index > frameworks.indexOf(currentFramework)
                ? "opacity-0 -translate-y-2"
                : "opacity-0 translate-y-2"
            )}
          >
            {assets[name]}
          </p>
        ))}
      </div>
    </>
  );
};
