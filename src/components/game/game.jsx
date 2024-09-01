import bottom from "@/assets/resource/bottom-wave.png";
import profile from "@/assets/resource/profile.png";

import { Link } from "react-router-dom";
import Logo from "./logo";

import { useAuthContext } from "@/context/authContext";
import { Button } from "../ui/button";
import SlotGame from "./slot-game";
import StartGame from "./startGame";

const Game = () => {
  const { currentState } = useAuthContext();

  return (
    <div
      className={`w-full min-h-screen ${
        currentState === "PRESSED_SPIN_BUTTON"
          ? "bg-[#CAEA89] pt-20"
          : "bg-[#F0B23E] flex items-center"
      }`}
    >
      <div className="w-full fixed top-0 flex bg-[#FFF6DE] py-1.5 px-10 justify-around items-center">
        <Logo />
        <div className="flex justify-center items-center gap-2">
          <Button asChild variant="ghost" size="icon" className="border-none">
            <Link to={"/profile"}>
              <img
                src={profile}
                width={125}
                height={125}
                className="object-cover cursor-pointer"
              />
            </Link>
          </Button>

          {/* <Button
            size="sm"
            className="group font-pocket uppercase relative inline-flex items-center justify-center overflow-hidden rounded-xl border bg-transparent px-6 text-lg font-medium bg-white hover:bg-neutral-100 border-[#341D1A] text-black transition-all [box-shadow:0px_4px_1px_#515895] active:translate-y-[3px] active:shadow-none"
          >
            Deposit
          </Button> */}
        </div>
      </div>
      <img
        src={bottom}
        alt="top"
        className="w-full z-0 fixed bottom-0 sm:-bottom-3"
      />

      {currentState === "START_GAME" && <StartGame />}
      {currentState !== "START_GAME" && <SlotGame />}
    </div>
  );
};

export default Game;
