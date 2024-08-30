/* eslint-disable no-unused-vars */
import slot from "@/assets/resource/slot.png";
import slotMachine from "@/assets/resource/slotMachine.png";
import token from "@/assets/resource/token.png";
import { useAuthContext } from "@/context/authContext";
import { useSocketContext } from "@/context/socketContext";
import { frameworks } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import BetAmount from "./betAmount";
import { FrameworkRotation } from "./frameworkRotation";

import Cookies from "js-cookie";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { toast } from "sonner";

const SlotGame = () => {
  const navigate = useNavigate();
  const [Start, setStart] = useState(false);
  const [DialogOpen, setDialogOpen] = useState(false);
  const { setCurrentGameAmount, currentGameAmount, currentState } =
    useAuthContext();

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
          socket?.emit("PRESSED_SPIN_BUTTON");

          socket?.on("MESSAGE", (msg) => {
            console.log(msg);
          });

          socket?.on("WON_LOOSE", (msg) => {
            console.log(msg);
            if (msg) {
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

              setTimeout(() => {
                setDialogOpen(true);
              }, 700);

              return;
            }
          });

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

  // const getSlotResults = async () => {
  //   // Mock API response; replace this with your actual API call
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       if (socket) {
  //         socket?.emit("PRESSED_SPIN_BUTTON");

  //         socket?.on("MESSAGE", (msg) => {
  //           console.log(msg);
  //         });

  //         socket?.on("WON_LOOSE", (msg) => {
  //           console.log(msg);
  //           Cookies.set("slotGameState", JSON.stringify(msg));

  //           // setWinState(msg);
  //         });

  //         socket.on("ERROR", (msg) => {
  //           console.log(msg);
  //         });

  //         setTimeout(() => {
  //           // Debugging line to check if cookie is retrieved
  //           console.log("Retrieving cookie...");
  //           // const cookieValue = Cookies.get("slotGameState");

  //           // Debugging line to check the retrieved cookie value
  //           // console.log("Cookie Value: ", cookieValue);

  //           // if (cookieValue) {
  //           //   const data = JSON.parse(cookieValue);
  //           //   console.log(data);
  //           //   const first = data.combo[0];
  //           //   const second = data.combo[1];
  //           //   const third = data.combo[2];
  //           resolve([1, 1, 1]);

  //           setTimeout(() => {
  //             setDialogOpen(true);
  //           }, 500);
  //           // } else {
  //           //   console.error("Cookie 'slotGameState' not found or empty.");
  //           //   toast.error("somthing wrong");
  //           //   resolve([]); // Resolve with empty array if no data
  //           // }
  //         }, 500);
  //       }
  //     }, 1500); // Simulate network delay
  //   });
  // };

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
  }, [Start, socket]);

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

        {/* {gameState.previous === "" && (
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
        )} */}

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
              // disabled={Start}
            >
              Spin
            </Button>
          </div>
        )}

        <Dialog open={DialogOpen} setOpen={setDialogOpen} className="z-50">
          {/* <DialogTrigger className="z-50">Open</DialogTrigger> */}
          <DialogContent
            WIN={true}
            className="bg-transparent bg-cover bg-no-repeat aspect-video border-none shadow-none"
          >
            <DialogHeader className="w-full text-black font-bold flex justify-center text-lg items-center py-1">
              <div className="w-full pt-5 flex justify-center gap-1 items-center">
                <img
                  src={token}
                  alt="sub"
                  className=""
                  width={25}
                  height={25}
                />
                <p className="text-xl">2323</p>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SlotGame;
