import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useAuthContext } from "@/context/authContext";
import { useNavigate } from "react-router-dom";

const Game = () => {
  const navigate = useNavigate();
  const doorsRef = useRef([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const { LogOut } = useAuthContext();

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

  useEffect(() => {
    // Initialize doors
    // init();
  }, []);

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
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              // ref={(el) => (doorsRef.current[index] = el)}
              className="w-[100px] h-[110px] overflow-clip bg-white border-[1.5px] border-gray-300 rounded-md flex justify-center items-center"
            >
              <div className="boxes">
                <p className="text-5xl">❓</p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full pt-4 flex flex-row-reverse">
          <Button size="sm" className="w-[120px] button" onClick={() => {}}>
            Spin
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Game;
