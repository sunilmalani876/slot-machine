/* eslint-disable no-unused-vars */
import slot from "@/assets/resource/slot.png";
import slotMachine from "@/assets/resource/slotMachine.png";
import { Framework, frameworks } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import BetAmount from "./betAmount";
import { FrameworkRotation } from "./frameworkRotation";
import { useAuthContext } from "@/context/authContext";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useSocketContext } from "@/context/socketContext";
import Cookies from "js-cookie";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SlotGame = () => {
  const navigate = useNavigate();
  const [Start, setStart] = useState(false);
  const [DialogOpen, setDialogOpen] = useState(false);

  const { socket } = useSocketContext();
  const { getGameState, setGameState, setWinState, getWinState } =
    useAuthContext();

  const [currentFrameworks, setCurrentFrameworks] = useState([0, 0, 0]); // Holds the final API response
  const [animationFrameworks, setAnimationFrameworks] = useState([0, 1, 2]); // Holds the rotating frameworks during animation

  const gameState = getGameState();

  const getSlotResults = async () => {
    // Mock API response; replace this with your actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (socket) {
          socket.emit("PRESSED_SPIN_BUTTON");

          socket.on("WON_LOOSE", (msg) => {
            console.log(msg);
            Cookies.set("slotGameState", JSON.stringify(msg));

            // setWinState(msg);
          });

          setTimeout(() => {
            // Debugging line to check if cookie is retrieved
            console.log("Retrieving cookie...");
            const cookieValue = Cookies.get("slotGameState");

            // Debugging line to check the retrieved cookie value
            console.log("Cookie Value: ", cookieValue);

            if (cookieValue) {
              const data = JSON.parse(cookieValue);
              console.log(data);
              const first = data.combo[0];
              const second = data.combo[1];
              const third = data.combo[2];
              resolve([first, second, third]);

              setTimeout(() => {
                setDialogOpen(true);
              }, 500);
            } else {
              console.error("Cookie 'slotGameState' not found or empty.");
              resolve([]); // Resolve with empty array if no data
            }
          }, 500);
        }
      }, 700); // Simulate network delay
    });
  };

  // const getSlotResults = async () => {
  //   // Mock API response; replace this with your actual API call
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       if (socket) {
  //         socket.emit("PRESSED_SPIN_BUTTON");

  //         socket.on("WON_LOOSE", (msg) => {
  //           // console.log("win  loose ", msg);
  //           setWinState(msg);
  //         });

  //         setTimeout(() => {
  //           const cookieValue = Cookies.get("slotGameState");
  //           // console.log("Cookie Value: ", cookieValue);

  //           if (cookieValue) {
  //             const data = JSON.parse(cookieValue);
  //             console.log(data);
  //             const first = data.combo[0];
  //             const second = data.combo[1];
  //             const third = data.combo[2];
  //             resolve([first, second, third]);

  //             setTimeout(() => {
  //               setDialogOpen(true);
  //             }, 500);
  //             // console.log(data);
  //           } else {
  //             console.error("Cookie 'slotGameState' not found or empty.");
  //             resolve([]); // Resolve with empty array if no data
  //           }
  //         }, 500);
  //       }
  //     }, 700); // Simulate network delay
  //   });
  // };

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
        {/* GAME */}
        <div
          className="w-full max-w-md aspect-video bg-center bg-no-repeat bg-cover flex relative items-center justify-around px-8"
          style={{
            backgroundImage: `url(${slotMachine})`,
          }}
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

        {gameState.previous === "" && (
          <>
            <p className="max-w-sm text-center text-xl text-[] pt-2 font-pocket">
              Please go back and select a game. that you want to be play 🕹.
            </p>
            <Button
              size="sm"
              className="z-50 group w-[120px] font-pocket cursor-pointer items-center justify-center rounded-xl border text-lg bg-[#7A85F4] hover:bg-[#7A85F4]/95 border-[#341D1A] transition-all [box-shadow:0px_4px_1px_#515895] active:translate-y-[3px] active:shadow-none"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </>
        )}

        {gameState.current === "SET_BET_AMOUNT" && (
          <BetAmount setGameState={setGameState} />
        )}

        {gameState.current === "PRESSED_SPIN_BUTTON" && (
          <div className="mt-5 z-[49] w-full max-w-md flex justify-around">
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
              // disabled={Start}
            >
              Spin
            </Button>
          </div>
        )}

        <Dialog open={DialogOpen} setOpen={setDialogOpen} className="z-50">
          {/* <DialogTrigger className="z-50">Open</DialogTrigger> */}
          {/* <DialogContent WIN={false}>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent> */}
        </Dialog>
      </div>
    </div>
  );
};

export default SlotGame;
