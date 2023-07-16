import React, { createContext, useState, useEffect } from "react";
export const ThemeBackGround = createContext();
export default function ThemeProviderUI({ children }) {
  const [theme, setTheme] = useState("none");
  const [user, setUser] = useState([]);
  const hanleTogle = () => {
    setTheme(theme === "none" ? "" : "none");
  };

  const getUser = () => {
    fetch("https://64acf61eb470006a5ec514b7.mockapi.io/movie/account", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((tasks) => {
        // Do something with the list of tasks
        setUser(tasks);
      })
      .catch((error) => {
        // handle error
      });
  };

  useEffect(() => {
    getUser();
  }, []);
  const value = {
    theme,
    user,
    hanleTogle,
  };
  return (
    <ThemeBackGround.Provider value={value}>
      {children}
    </ThemeBackGround.Provider>
  );
}
