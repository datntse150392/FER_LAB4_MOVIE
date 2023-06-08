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
          <Link to="/film/homePage">Mới & Phổ biến</Link>
        </li>
        {/* <li style={{ fontWeight: "" }}>
          <Link to="/film/newFilm">Danh sách Phim của bạn</Link>
        </li> */}
      </ul>
      <AccountMenu />
    </div>
  );
}
