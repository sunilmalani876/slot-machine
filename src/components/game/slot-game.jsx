/* eslint-disable no-unused-vars */
import slot from "@/assets/resource/slot.png";
import slotMachine from "@/assets/resource/slotMachine.png";
import token from "@/assets/resource/token.png";
import { useAuthContext } from "@/context/authContext";
import { useSocketContext } from "@/context/socketContext";
import { frameworks } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import BetAmount from "./betAmount";
import { FrameworkRotation } from "./frameworkRotation";

import Cookies from "js-cookie";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const SlotGame = () => {
  const navigate = useNavigate();
  const [Start, setStart] = useState(false);
  const [DialogOpen, setDialogOpen] = useState(false);
  const [winLoss, setWinLoss] = useState(null);
  const {
    setCurrentGameAmount,
    currentGameAmount,
    getGameState,
    setGameState,
    currentState,
  } = useAuthContext();

  const { socket } = useSocketContext();

  const [currentFrameworks, setCurrentFrameworks] = useState([0, 0, 0]); // Holds the final API response
  const [animationFrameworks, setAnimationFrameworks] = useState([0, 1, 2]); // Holds the rotating frameworks during animation
  const gameState = getGameState();

  const getSlotResults = async () => {
    // Mock API response; replace this with your actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (socket) {
          socket?.emit("PRESSED_SPIN_BUTTON");

          socket?.on("MESSAGE", (msg) => {
            console.log(msg);
          });

          socket?.on("WON_LOOSE", (msg) => {
            console.log("WON_LOOSE", msg);
            if (msg) {
              setWinLoss(msg);
              const first = msg.combo[0];
              const secound = msg.combo[1];
              const third = msg.combo[2];
              Cookies.set("slotGameState", JSON.stringify(msg));

              socket?.emit("GET_CURRENT_STATE", (msg) => {
                console.log("emit get CURRENT_STATE", msg);
              });

              socket?.on("CURRENT_STATE", (msg) => {
                setCurrentGameAmount(msg);
                console.log("emit CURRENT_STATE", msg);
              });

              resolve([first, secound, third]); // Example response
              // resolve([1, 1, 1]);

              setTimeout(() => {
                setDialogOpen(true);
              }, 700);

              return;
            }
          });

          // resolve([1, 1, 1]);

          socket.on("ERROR", (msg) => {
            console.log(msg);
            toast.error(msg);
            resolve([]); // Example response
            // emit:GET_CURRENT_STATE
            // listen/on:CURRENT_STATE
          });
        }
      }, 1500); // Simulate network delay
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

  const handleGame = (e, value) => {
    e.preventDefault();

    if (value === "PLAY_AGAIN") {
      if (socket) {
        socket.emit("X", { x: "PRESSED_PLAY_AGAIN" });
        socket.emit("PRESSED_PLAY_AGAIN");
        socket.on("MESSAGE", (msg) => {
          setDialogOpen(false);
          setGameState("START_GAME");
        });
      }
    } else {
      if (socket) {
        socket.emit("EXIT_GAME");
        socket.emit("EXIT_YES");

        socket.on("MESSAGE", (msg) => {
          setDialogOpen(false);
          setGameState("START_GAME");
          navigate("/");
        });
      }
    }
  };

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

        {currentState === "SET_BET_AMOUNT" && (
          <BetAmount setGameState={setGameState} />
        )}

        {currentState === "PRESSED_SPIN_BUTTON" && (
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
            >
              Spin
            </Button>
          </div>
        )}

        <Dialog open={DialogOpen} setOpen={setDialogOpen} className="z-50">
          <DialogContent
            WIN={winLoss?.win ? false : true}
            close={false}
            className="w-full max-w-[420px] bg-transparent bg-cover bg-no-repeat aspect-video border-none shadow-none outline-none focus-visible:ring-0 flex flex-col items-center justify-center"
          >
            <DialogHeader className="w-full text-black font-bold flex flex-col justify-center text-lg items-center py-1">
              <DialogTitle
                className={`w-full pt-12 flex justify-center gap-3 items-center`}
              >
                <img
                  src={token}
                  alt="sub"
                  className="object-cover -mb-1.5"
                  width={25}
                  height={25}
                />
                <span className="text-2xl font-bold font-sans">
                  {parseInt(
                    currentGameAmount?.gameState?.principalBalanceBeforeBet
                  ) -
                    parseInt(
                      currentGameAmount?.gameState?.principalBalanceAfterBet
                    )}
                </span>
              </DialogTitle>
              <div className="space-x-4 pt-2">
                <Button
                  onClick={(e) => handleGame(e, "PLAY_AGAIN")}
                  className="group font-pocket relative inline-flex items-center justify-center overflow-hidden rounded-xl border bg-transparent px-4 text-lg font-medium bg-white hover:bg-neutral-100 border-[#341D1A] text-black transition-all [box-shadow:0px_4px_1px_#515895] active:translate-y-[3px] active:shadow-none"
                >
                  Play again
                </Button>
                <Button
                  onClick={(e) => handleGame(e, "EXIT_GAME")}
                  className="group font-pocket relative inline-flex items-center justify-center overflow-hidden rounded-xl border bg-transparent px-4 text-lg font-medium bg-white hover:bg-neutral-100 border-[#341D1A] text-black transition-all [box-shadow:0px_4px_1px_#515895] active:translate-y-[3px] active:shadow-none"
                >
                  Exit game
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SlotGame;
