import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const frameworks = ["1", "2", "3", "4", "5", "6", "7"];

export const Framework = frameworks;
