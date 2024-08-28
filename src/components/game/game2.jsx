import { useAuthContext } from "@/context/authContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

import { Framework, frameworks } from "@/lib/utils";
import { FrameworkRotation } from "./frameworkRotation";

const Game = () => {
  const navigate = useNavigate();
  const { LogOut } = useAuthContext();
  const [Start, setStart] = useState(false);
  const [currentFrameWork, setCurrentFrameWork] = useState(Framework[7]);

  const assets = {
    1: "🤡",
    2: "👻",
    3: "⛄️",
    4: "🦄",
    5: "🌚",
    6: "🦖",
    7: "💵",
  };

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
    <div className="w-full relative min-h-screen flex justify-center items-center">
      <div className="w-full border border-b bg-white p-3 absolute top-0 left-0 px-10 flex justify-between items-center">
        <p>Logo</p>
        <div>
          <Button
            className="button"
            onClick={async () => {
              await LogOut();
              navigate("/");
            }}
          >
            Log-Out
          </Button>
        </div>
      </div>
      <div className="w-full max-w-sm flex flex-col justify-between items-center p-2 rounded-md">
        <div className="w-full flex justify-between">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="w-[100px] h-[110px] overflow-clip bg-white border-[1.5px] border-gray-300 rounded-md flex justify-center items-center"
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

        <div className="w-full pt-4 flex flex-row-reverse">
          <Button
            size="sm"
            className="w-[120px] button"
            onClick={() => setStart(true)}
          >
            Spin
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Game;
