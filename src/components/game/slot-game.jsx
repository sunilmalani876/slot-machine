import React, { useEffect, useState } from "react";
import slot from "@/assets/resource/slot.png";
import slotMachine from "@/assets/resource/slotMachine.png";
import { FrameworkRotation } from "./frameworkRotation";
import { Framework, frameworks } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import BetAmount from "./betAmount";

const SlotGame = () => {
  const [Start, setStart] = useState(false);
  const [currentFrameWork, setCurrentFrameWork] = useState(Framework[7]);

  useEffect(() => {
    let currentIndex = 0;

    const rotateFrameworks = () => {
      setCurrentFrameWork(frameworks[currentIndex]);
      currentIndex = (currentIndex + 1) % frameworks.length;
    };

    if (Start) {
      const invalidId = setInterval(rotateFrameworks, 100);
      return () => clearInterval(invalidId);
    }
  }, [Start]);

  return (
    <div className="w-full z-50">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-sm flex justify-center items-center">
          <img src={slot} alt="slot" width={200} />
        </div>

        {/* GAME */}
        <div
          className="mt-5 w-full max-w-md aspect-video bg-center bg-no-repeat bg-cover flex relative items-center justify-around px-8"
          style={{
            backgroundImage: `url(${slotMachine})`,
          }}
        >
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="w-[85px] h-[100px] overflow-clip bg-white border-[1.5px] border-gray-300 rounded-md flex justify-center items-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                className="boxes relative"
              >
                {Start ? (
                  <FrameworkRotation currentFramework={currentFrameWork} />
                ) : (
                  <p className="text-5xl">❓</p>
                )}
              </motion.div>
            </div>
          ))}
        </div>

        <BetAmount />

        {/* <div className="mt-5 z-[49] w-full max-w-md flex justify-around">
          <Button
            size="sm"
            className="group w-[120px] font-pocket cursor-pointer items-center justify-center rounded-xl border text-lg bg-[#F7405E] hover:bg-[#F7405E]/95 border-[#341D1A] transition-all [box-shadow:0px_4px_1px_#AB1C34] active:translate-y-[3px] active:shadow-none"
            onClick={() => setStart(false)}
          >
            Reset
          </Button>
          <Button
            size="sm"
            className="group w-[120px] font-pocket cursor-pointer items-center justify-center rounded-xl border text-lg bg-[#7A85F4] hover:bg-[#7A85F4]/95 border-[#341D1A] transition-all [box-shadow:0px_4px_1px_#515895] active:translate-y-[3px] active:shadow-none"
            onClick={() => setStart(true)}
            disabled={Start}
          >
            Spin
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default SlotGame;
