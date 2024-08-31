/* eslint-disable no-unused-vars */
import add from "@/assets/resource/add.png";
import sub from "@/assets/resource/sub.png";
import token from "@/assets/resource/token.png";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSocketContext } from "@/context/socketContext";
import { toast } from "sonner";

const BetAmount = ({ setGameState }) => {
  const [betAmount, setBetAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { socket } = useSocketContext();

  function increaseBetAmount() {
    const currentAmount =
      betAmount === "" || isNaN(betAmount) ? 0 : parseInt(betAmount);
    setBetAmount((currentAmount + 10).toString());
  }

  function decreaseBetAmount() {
    const currentAmount =
      betAmount === "" || isNaN(betAmount) ? 0 : parseInt(betAmount);
    if (currentAmount <= 10) {
      return;
    }
    setBetAmount((currentAmount - 10).toString());
  }

  const isBetAmountValid =
    !isNaN(betAmount) && betAmount !== "" && betAmount > 0;

  function onStartGame(e) {
    e.preventDefault();
    let errorOccurred = false;
    // console.log("Starting game with bet amount: ", betAmount);

    socket?.emit("SET_BET_AMOUNT", { betAmount: parseInt(betAmount) });

    socket?.once("ERROR", (msg) => {
      // console.log(msg);
      toast.error(msg);
      errorOccurred = true;
    });

    socket?.on("MESSAGE", (msg) => {
      if (!errorOccurred) {
        // Only process messages if no error occurred
        toast.message(msg);
        setGameState("PRESSED_SPIN_BUTTON");
      }
    });
  }

  return (
    <>
      <div className="mt-3 z-[49] w-full max-w-md flex justify-around items-center gap-2">
        <Button
          className="group font-pocket relative inline-flex items-center justify-center overflow-hidden rounded-xl border bg-transparent px-6 text-lg font-medium bg-white hover:bg-neutral-100 border-[#341D1A] text-black transition-all [box-shadow:0px_4px_1px_#515895] active:translate-y-[3px] active:shadow-none"
          onClick={decreaseBetAmount}
        >
          <div>
            <img src={sub} alt="sub" className="" width={8} />
          </div>
        </Button>

        <div className="relative betAmounInput cursor-text text-black z-50 flex items-center">
          <img src={token} alt="sub" className="" width={20} />
          <Input
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            className="bg-transparent placeholder:text-gray-700 outline-none border-none font-pocket text-2xl h-[46px] cursor-text"
            placeholder="00.00"
          />
        </div>

        <Button
          className="group font-pocket relative inline-flex items-center justify-center overflow-hidden rounded-xl border bg-transparent px-6 text-lg font-medium bg-white hover:bg-neutral-100 border-[#341D1A] text-black transition-all [box-shadow:0px_4px_1px_#515895] active:translate-y-[3px] active:shadow-none"
          onClick={increaseBetAmount}
        >
          <div>
            <img src={add} alt="sub" className="" width={10} />
          </div>
        </Button>
      </div>
      <div className="z-50 pt-2">
        <Button
          size="sm"
          className="group w-[120px] font-pocket cursor-pointer items-center justify-center rounded-xl border text-lg bg-[#F7405E] hover:bg-[#F7405E]/95 border-[#341D1A] transition-all [box-shadow:0px_4px_1px_#AB1C34] active:translate-y-[3px] active:shadow-none"
          disabled={!isBetAmountValid}
          onClick={(e) => onStartGame(e)}
        >
          Confirm
        </Button>
      </div>
    </>
  );
};

export default BetAmount;
