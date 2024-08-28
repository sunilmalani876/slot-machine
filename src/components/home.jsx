import playButton from "@/assets/resource/play-button.png";
import top from "@/assets/resource/top-wave.png";
import avatar from "@/assets/resource/avatar.png";
import bottom from "@/assets/resource/bottom-wave.png";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full min-h-screen relative overflow-y-clip bg-[#FFA013] flex">
      <img src={top} alt="top" className="w-full fixed top-0" />
      <img
        src={bottom}
        alt="top"
        className="w-full fixed bottom-0 sm:-bottom-3"
      />

      <div className="relative mx-auto my-auto flex max-w-2xl flex-col gap-2 items-center">
        <img
          src={playButton}
          alt="top"
          width={50}
          className="absolute left-2 bottom-2 rotate-[-20deg] sm:rotate-[-30deg] md:rotate-[-40deg] z-10"
        />
        <img
          src={avatar}
          alt="top"
          width={100}
          className="absolute right-5 -top-5 rotate-[-20deg] sm:rotate-[-30deg] z-10"
        />

        <h2 className="text-center font-pocket text-4xl text-[#341D1A] sm:text-6xl">
          Let Your Mind <span className="">🥂</span>
          <span className="animate-text-gradient inline-flex bg-clip-text leading-tight text-[#341D1A]">
            Explore New World.
          </span>
        </h2>

        <p className="mt-2 font-pocket text-[#341D1A] max-sm:px-4 text-center text-lg leading-6">
          Discover a world of thrilling games, unbeatable jackpots, and
          top-notch entertainment.
          <span className="cursor-wait opacity-70">Join us</span>
          today and experience the ultimate in luxury and fun!
        </p>

        <div className="mt-4 flex gap-4">
          <Button
            asChild
            className="group font-pocket relative inline-flex items-center justify-center overflow-hidden rounded-xl border bg-transparent px-6 text-lg font-medium bg-white hover:bg-neutral-100 border-[#341D1A] text-black transition-all [box-shadow:0px_4px_1px_#515895] active:translate-y-[3px] active:shadow-none"
          >
            <Link to="/signin">Log-In</Link>
          </Button>
          <Button
            asChild
            className="group font-pocket text-lg relative inline-flex items-center justify-center overflow-hidden rounded-xl border bg-transparent px-6 font-medium bg-white hover:bg-neutral-100 border-[#341D1A] text-black transition-all [box-shadow:0px_4px_1px_#515895] active:translate-y-[3px] active:shadow-none"
          >
            <Link to="/signup">Sign-up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
