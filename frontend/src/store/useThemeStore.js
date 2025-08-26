import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("currTheme") || "coffee", //if user has a theme selected then dont forget it
  setTheme: (theme) => {
    localStorage.setItem("currTheme", theme);
    set({ theme });
  },
}));