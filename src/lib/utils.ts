import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleKeyUpForNumberInput = (event: React.KeyboardEvent) => {
  const forbiddenKeys = ["e", "+", "-", ",", " "];
  if (forbiddenKeys.includes(event.key)) {
    event.preventDefault();
  }
};
