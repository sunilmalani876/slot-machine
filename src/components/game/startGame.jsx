import avatar from "@/assets/resource/avatar.png";
import avatar2 from "@/assets/resource/avatar2.png";
import youtube from "@/assets/resource/youtube.png";

import { useAuthContext } from "@/context/authContext";
import { useSocketContext } from "@/context/socketContext";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useEffect } from "react";

const StartGame = () => {
  const { setGameState } = useAuthContext();
  const { socket, setupSocketHandlers } = useSocketContext();

  const handleStartGame = (e) => {
    e.preventDefault();

    let errorOccurred = false;

    socket?.emit("START_GAME");

    socket?.once("ERROR", (msg) => {
      toast.error(msg);
      errorOccurred = true;
    });

    socket?.on("MESSAGE", (msg) => {
      if (!errorOccurred) {
        // console.log("Message received from server:", msg);
        toast.message(msg);
        setGameState("SET_BET_AMOUNT");
      }
    });

    // if (!errorOccurred) {
    // }
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
            onClick={(e) => handleStartGame(e)}
            size="sm"
            className="group cursor-pointer items-center justify-center rounded-xl border text-lg font-medium bg-[#7A85F4] hover:bg-[#7A85F4]/95 border-[#341D1A] transition-all [box-shadow:0px_4px_1px_#515895] active:translate-y-[3px] active:shadow-none"
          >
            <img src={youtube} alt="youtube" className="" width={17} />
          </Button>
        </div>
      </div>

      {/* CARD 2 */}

      {/*  */}
    </div>
  );
};

export default StartGame;

// <div className="relative w-full max-w-xs h-[80px] rounded-full rounded-tr-none bg-[#341D1A] flex items-center justify-between text-white">
//         <img
//           src={avatar2}
//           alt="avatar"
//           className="object-cover absolute -left-6 -top-1"
//           width={100}
//         />
//         <div className="w-full font-pocket text-xl text-center text-[#FFA013]">
//           Tokio Pool🎱
//           <p className="text-white text-xs">Play Now</p>
//         </div>

//         <div className="absolute -right-5">
//           <Button
//             asChild
//             size="sm"
//             className="group cursor-pointer items-center justify-center rounded-xl border text-lg font-medium bg-[#7A85F4] hover:bg-[#7A85F4]/95 border-[#341D1A] transition-all [box-shadow:0px_4px_1px_#515895] active:translate-y-[3px] active:shadow-none"
//           >
//             <Link to="">
//               <img src={youtube} alt="youtube" className="" width={17} />
//             </Link>
//           </Button>
//         </div>
//       </div>
