import React, { useState } from "react";
import styles from "./Footer.module.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Footer() {
  const [show, setShow] = useState("false");
  return (
    <div className={styles["footer"]}>
      {/*  */}
      <div className={styles["footer-top"]}>
        <p className={styles["footer-top-title"]}>
          Bạn đã sẵn sàng xem chưa? Nhập email để tạo hoặc kích hoạt lại tư cách
          thành viên của bạn.
        </p>
      </div>
      <div className={styles["footer-bottom"]}>
        <input
          placeholder="Địa chỉ Email"
          className={styles["footer-bottom-input"]}
        />
        <button className={styles["footer-bottom-btn"]}>Bắt đầu</button>
      </div>
    </div>
  );
}
