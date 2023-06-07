import React from "react";
import { images } from "../../../../assets/images";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
export default function Header() {
  return (
    <div className={styles["header"]}>
      <div className={styles["header-logo"]}>
        <Link to={"/"}>
          <img src={images.logo} />
        </Link>
      </div>
      <div className={styles["header-action"]}>
        <Link to="/login">
          <button className={styles["header-login-btn"]}>Đăng nhập</button>
        </Link>
      </div>
    </div>
  );
}
