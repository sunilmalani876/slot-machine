import avatar from "@/assets/resource/avatar.png";
import avatar2 from "@/assets/resource/avatar2.png";
import youtube from "@/assets/resource/youtube.png";

import { useAuthContext } from "@/context/authContext";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useSocketContext } from "@/context/socketContext";
import { useEffect } from "react";
import { toast } from "sonner";

const StartGame = () => {
  const { setGameState, getGameState } = useAuthContext();
  const { socket } = useSocketContext();
  const CurrentState = getGameState();

  // useEffect(() => {
  //   if (socket) {
  //     console.log("q");
  //     socket.emit("START_GAME", (message) => {
  //       console.log("Received START_GAME message:", message);
  //       // if (CurrentState.previous === "") {
  //       //   // Handle the message
  //       // }
  //     });

  //     return () => {
  //       socket.off("START_GAME");
  //     };
  //   }
  // }, [socket, CurrentState.previous]);

  useEffect(() => {
    // Set up the socket listener when the component mounts
    socket?.on("START_GAME", (mes) => {
      console.log("socket message", mes);
    });

    // Clean up the socket listener when the component unmounts
    return () => {
      socket?.off("START_GAME");
    };
  }, []); // Empty dependency array means this runs once on mount

  const handleClick = async (e) => {
    e.preventDefault();

    // Emit an event to the server if needed
    // socket.emit('START_GAME');

    setGameState({
      previous: "START_GAME",
      current: "SET_BET_AMOUNT",
    });
  };

  return (
    <div className="w-full relative mx-auto my-auto flex max-w-2xl flex-col gap-5 items-center">
      {/* CARD 1 */}
      <div className="relative w-full max-w-xs h-[80px] rounded-full rounded-tr-none bg-[#341D1A] flex items-center justify-between text-white">
        <img
          src={avatar}
          alt="avatar"
          className="object-cover absolute -left-6 -top-1"
          width={100}
        />
        <div className="w-full font-pocket text-xl text-center text-[#FFA013]">
          Tokio Slots
          <p className="text-white text-xs">Play Now</p>
        </div>

        <div className="absolute -right-5">
          <Button
            onClick={(e) => {
              e.preventDefault();

              socket?.emit("START_GAME");

              socket?.on("MESSAGE", (msg) => {
                toast.message(msg);
              });

              setGameState({
                previous: "START_GAME",
                current: "SET_BET_AMOUNT",
              });
            }}
            // onClick={handleClick}
            size="sm"
            className="group cursor-pointer items-center justify-center rounded-xl border text-lg font-medium bg-[#7A85F4] hover:bg-[#7A85F4]/95 border-[#341D1A] transition-all [box-shadow:0px_4px_1px_#515895] active:translate-y-[3px] active:shadow-none"
          >
            <Link to="play">
              <img src={youtube} alt="youtube" className="" width={17} />
            </Link>
          </Button>
        </div>
      </div>

      {/* CARD 2 */}
      <div className="relative w-full max-w-xs h-[80px] rounded-full rounded-tr-none bg-[#341D1A] flex items-center justify-between text-white">
        <img
          src={avatar2}
          alt="avatar"
          className="object-cover absolute -left-6 -top-1"
          width={100}
        />
        <div className="w-full font-pocket text-xl text-center text-[#FFA013]">
          Tokio Pool🎱
          <p className="text-white text-xs">Play Now</p>
        </div>

        <div className="absolute -right-5">
          <Button
            asChild
            size="sm"
            className="group cursor-pointer items-center justify-center rounded-xl border text-lg font-medium bg-[#7A85F4] hover:bg-[#7A85F4]/95 border-[#341D1A] transition-all [box-shadow:0px_4px_1px_#515895] active:translate-y-[3px] active:shadow-none"
          >
            <Link to="play">
              <img src={youtube} alt="youtube" className="" width={17} />
            </Link>
          </Button>
        </div>
      </div>

      {/*  */}
    </div>
  );
};

export default StartGame;
