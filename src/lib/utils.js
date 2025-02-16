import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const colors = [
  "bg-[#712c4a] text-white border border-[#ff006faa]",
  "bg-[#fd6a02] text-black border border-[#fd6a02bb]",
  "bg-[#06d6a0] text-black border border-[#06d6a0bb]",
  "bg-[#4cc9f0] text-black border border-[#4cc9f0bb]",
];

export const getColor = (color) => {
  if (Number.isInteger(color) && color >= 0 && color < colors.length) {
    return colors[color];
  }
  return colors[0]; // ✅ Fallback to the first color
};
