import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useAuthContext } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";

const Game = () => {
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(false);
  const [symbols, setSymbols] = useState([0, 0, 0]);
  const { LogOut } = useAuthContext();
  const controls = useAnimation();

  const items = [
    "🍭",
    "❌",
    "⛄️",
    "🦄",
    "🍌",
    "💩",
    "👻",
    "😻",
    "💵",
    "🤡",
    "🦖",
    "🍎",
    "😂",
  ];

  const WINNING_COMBINATIONS = [
    [1, 1, 1, 100],
    [2, 2, 2, 80],
    [3, 3, 3, 60],
    [4, 4, 4, 40],
    [5, 5, 5, 30],
    [6, 6, 6, 500],
    [1, 1, 7, 20],
    [2, 2, 7, 20],
    [3, 3, 7, 20],
    [4, 4, 7, 20],
    [5, 5, 7, 20],
    [1, 2, 3, 10],
    [4, 5, 6, 10],
    [7, 1, 1, "Bonus"],
    [7, 7, 7, "Bonus"],
  ];

  const getRandomSymbol = () => Math.floor(Math.random() * items.length);

  const spin = async () => {
    setIsSpinning(true);

    // Start spinning animation
    await controls.start({
      rotate: [0, 360],
      transition: { duration: 1.5, ease: "easeInOut" },
    });

    // Stop spinning and set final symbols
    const finalSymbols = [
      getRandomSymbol(),
      getRandomSymbol(),
      getRandomSymbol(),
    ];
    setSymbols(finalSymbols);

    // Reset spinning state
    setIsSpinning(false);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-neutral-100">
      <div className="w-full border border-b bg-white p-3 absolute top-0 left-0 px-10 flex justify-between items-center">
        <p>Logo</p>
        <div>
          <Button
            className="button"
            onClick={async () => {
              await LogOut();
              navigate("/");
            }}
          >
            Log-Out
          </Button>
        </div>
      </div>
      <div className="w-full max-w-sm flex flex-col justify-between items-center p-2 rounded-md">
        {/* CARDS */}
        <div className="w-full flex justify-between">
          {symbols.map((symbol, index) => (
            <motion.div
              key={index}
              className="w-[100px] h-[110px] overflow-clip bg-white border-[1.5px] border-gray-300 rounded-md flex justify-center items-center"
              animate={controls}
              initial={{ rotate: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <div className="boxes">
                <p className="text-5xl">{items[symbol]}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="w-full pt-4 flex flex-row-reverse">
          <Button
            size="sm"
            className="w-[120px] button"
            onClick={spin}
            disabled={isSpinning}
          >
            Spin
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Game;
