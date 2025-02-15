import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("Astra-theme") || "light",
  setTheme: (theme) => {
    localStorage.setItem("Astra-theme", theme);
    set({ theme });
  },
}));
