import React from "react";
import { Link } from "react-router-dom";
import styles from "./HeaderForFilmLayout.module.css";
import { images } from "../../../../assets/images";
import { Avatar } from "@mui/material";
import AccountMenu from "../AccountMenu";
export default function HeaderForFilmLayout() {
  return (
    <div className={styles["header"]}>
      <div className={styles["header-logo"]}>
        <Link to={"/"}>
          <img src={images.logo} />
        </Link>
      </div>
      <ul className={styles["nav"]}>
        <li style={{ fontWeight: "bold" }}>
          <Link to="/film/homePage">Trang chủ</Link>
        </li>
        <li style={{ fontWeight: "bold" }}>
          <Link to="/film/action">Phim H.Động</Link>
        </li>
        <li style={{ fontWeight: "bold" }}>
          <Link to="/film/series">Phim Bộ</Link>
        </li>
        <li style={{ fontWeight: "bold" }}>
          <Link to="/film/tvShow">TV Show</Link>
        </li>
        {localStorage.getItem("accessToken") === "true" && (
          <li style={{ fontWeight: "bold" }}>
            <Link to="/film/myList">Danh sách phim của tôi</Link>
          </li>
        )}
      </ul>
      {localStorage.getItem("accessToken") === "true" && <AccountMenu />}
    </div>
  );
}
