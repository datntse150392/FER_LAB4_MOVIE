import React from "react";
import HeaderForFilmLayout from "../components/HeaderForFilmLayout";
export default function FilmLayout({ children }) {
  return (
    <div className="FilmLayout">
      <HeaderForFilmLayout />
      <>{children}</>
    </div>
  );
}
