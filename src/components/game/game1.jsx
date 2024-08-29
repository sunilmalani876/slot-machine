import slot from "@/assets/resource/slot.png";
import slotMachine from "@/assets/resource/slotMachine.png";
import { frameworks } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import BetAmount from "./betAmount";
import { FrameworkRotation } from "./frameworkRotation";
import { useAuthContext } from "@/context/authContext";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const SlotGame = () => {
  const navigate = useNavigate();
  const [Start, setStart] = useState(false);
  const [currentFrameworks, setCurrentFrameworks] = useState([0, 0, 0]); // Holds the final API response
  const [animationFrameworks, setAnimationFrameworks] = useState([0, 1, 2]); // Holds the rotating frameworks during animation
  const { currentState } = useAuthContext();

  // Simulate an API call to get slot results
  const getSlotResults = async () => {
    // Mock API response; replace this with your actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([1, 3, 5]); // Example response
      }, 2000); // Simulate network delay
    });
  };

  useEffect(() => {
    let intervalId;

    const rotateFrameworks = () => {
      setAnimationFrameworks((prevFrameworks) =>
        prevFrameworks.map((f) => (f + 1) % frameworks.length)
      );
    };

    const fetchSlotResults = async () => {
      // Start rotating animations
      intervalId = setInterval(rotateFrameworks, 100);

      // Fetch the API result
      const response = await getSlotResults();

      // Stop animation and set the final frameworks
      clearInterval(intervalId);
      setAnimationFrameworks(response);
      setCurrentFrameworks(response);
    };

    if (Start) {
      fetchSlotResults();
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [Start]);

  return (
    <div className="w-full z-50">
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full max-w-sm flex justify-center items-center">
          <img src={slot} alt="slot" width={200} />
        </div>
        <div
          className="w-full max-w-md aspect-video bg-center bg-no-repeat bg-cover flex relative items-center justify-around px-8"
          style={{ backgroundImage: `url(${slotMachine})` }}
        >
          {animationFrameworks.map((framework, index) => (
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
                  <FrameworkRotation currentFramework={frameworks[framework]} />
                ) : (
                  <p className="text-5xl">❓</p>
                )}
              </motion.div>
            </div>
          ))}
        </div>

        {currentState.current === "SET_BET_AMOUNT" && <BetAmount />}

        <div className="mt-5 z-[49] w-full max-w-md flex justify-around">
          <Button
            size="sm"
            className="group w-[120px] font-pocket cursor-pointer items-center justify-center rounded-xl border text-lg bg-[#F7405E] hover:bg-[#F7405E]/95 border-[#341D1A] transition-all [box-shadow:0px_4px_1px_#AB1C34] active:translate-y-[3px] active:shadow-none"
            onClick={() => {
              setStart(false);
              setAnimationFrameworks([0, 0, 0]); // Reset to default
              setCurrentFrameworks([0, 0, 0]); // Reset to default
            }}
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
        </div>
      </div>
    </div>
  );
};

export default SlotGame;
