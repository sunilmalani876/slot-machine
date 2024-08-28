import bottom from "@/assets/resource/bottom-wave.png";

import { Outlet, useLocation } from "react-router-dom";
import Logo from "./logo";

const Game = () => {
  const { pathname } = useLocation();
  return (
    <div
      className={`w-full min-h-screen ${
        pathname.includes("/play")
          ? "bg-[#CAEA89] pt-20"
          : "bg-[#F0B23E] flex items-center"
      }`}
    >
      <div className="w-full fixed top-0 flex bg-[#FFF6DE] py-1.5 px-10 justify-around items-center">
        <Logo />
        <div>profile</div>
      </div>
      <img
        src={bottom}
        alt="top"
        className="w-full z-0 fixed bottom-0 sm:-bottom-3"
      />

      <Outlet />
    </div>
  );
};

export default Game;
