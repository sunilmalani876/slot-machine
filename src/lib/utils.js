import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const frameworks = ["0", "1", "2", "3", "4", "5", "6", "7"];

export const Framework = frameworks;

export const events = {
  start: "START_GAME",
  setBetAmount: "SET_BET_AMOUNT",
  spinButton: "PRESSED_SPIN_BUTTON",
  playAgain: "PRESSED_PLAY_AGAIN",
  exit: "EXIT_GAME",
  exitYes: "EXIT_YES",
  exitNo: "EXIT_NO",
};
