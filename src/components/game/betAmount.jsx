import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import sub from "@/assets/resource/sub.png";
import token from "@/assets/resource/token.png";
import add from "@/assets/resource/add.png";

const BetAmount = () => {
  return (
    <div className="mt-5 z-[49] w-full max-w-md flex justify-around gap-2">
      <Button className="group font-pocket relative inline-flex items-center justify-center overflow-hidden rounded-xl border bg-transparent px-6 text-lg font-medium bg-white hover:bg-neutral-100 border-[#341D1A] text-black transition-all [box-shadow:0px_4px_1px_#515895] active:translate-y-[3px] active:shadow-none">
        <div>
          <img src={sub} alt="sub" className="" width={8} />
        </div>
      </Button>

      <div className="relative betAmounInput flex items-center">
        <img src={token} alt="sub" className="" width={20} />
        <Input
          className="bg-transparent placeholder:text-gray-700 outline-none border-none font-pocket text-lg h-[46px]"
          placeholder="00.00"
        />
      </div>

      <Button className="group font-pocket relative inline-flex items-center justify-center overflow-hidden rounded-xl border bg-transparent px-6 text-lg font-medium bg-white hover:bg-neutral-100 border-[#341D1A] text-black transition-all [box-shadow:0px_4px_1px_#515895] active:translate-y-[3px] active:shadow-none">
        <div>
          <img src={add} alt="sub" className="" width={10} />
        </div>
      </Button>
    </div>
  );
};

export default BetAmount;
