import React from "react";
import { Link } from "react-router-dom";
import styles from "./HeaderForAdminLayout.module.css";
import { images } from "../../../../assets/images";
import AccountMenu from "../AccountMenu";
export default function HeaderForAdminLayout() {
  return (
    <div className={styles["header"]}>
      <div className={styles["header-logo"]}>
        <Link to={"/admin"}>
          <img src={images.logo} />
        </Link>
      </div>
      <div className={styles["header-action"]}>
        <Link to="/admin/createFilm">
          <button className={styles["header-addfilm-btn"]}>
            Thêm phim mới
          </button>
        </Link>
        {localStorage.getItem("accessToken") === "true" && <AccountMenu />}
      </div>
    </div>
  );
}
