import React, { createContext, useState } from "react";
export const ThemeBackGround = createContext();
export default function ThemeProviderUI({ children }) {
  const [theme, setTheme] = useState("none");
  const hanleTogle = () => {
    setTheme(theme === "none" ? "" : "none");
  };

  const value = {
    theme,
    hanleTogle,
  };
  return (
    <ThemeBackGround.Provider value={value}>
      {children}
    </ThemeBackGround.Provider>
  );
}
