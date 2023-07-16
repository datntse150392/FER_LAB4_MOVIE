import React, { useRef, useState } from "react";
import styles from "./Footer.module.css";
import emailjs from "@emailjs/browser";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Footer() {
  const [show, setShow] = useState("false");
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_11i8e1d",
        "template_jo6fg9n",
        form.current,
        "vUiAiHknv5qCkvwlT"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };
  return (
    <div className={styles["footer"]}>
      {/*  */}
      <div className={styles["footer-top"]}>
        <p className={styles["footer-top-title"]}>
          Bạn đã sẵn sàng xem chưa? Nhập email để tạo hoặc kích hoạt lại tư cách
          thành viên của bạn.
        </p>
      </div>
      <form ref={form} onSubmit={sendEmail}>
        <div className={styles["footer-bottom"]}>
          <input
            placeholder="Địa chỉ Email"
            className={styles["footer-bottom-input"]}
            type="email"
            name="user_email"
          />
          <button
            type="submit"
            value="Send"
            className={styles["footer-bottom-btn"]}
          >
            Bắt đầu
          </button>
        </div>
      </form>
    </div>
  );
}
