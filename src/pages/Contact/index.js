import React, { useContext } from "react";
import styles from "./Contact.module.css";
import { Link } from "react-router-dom";
import { images } from "../../assets/images";

// Theme
import { ThemeBackGround } from "../../Theme/ThemeProvider";

export default function Contact() {
  const themeBackGround = useContext(ThemeBackGround);
  console.log(themeBackGround.theme);
  return (
    <div
      className={styles["contact-container"]}
      style={{ background: themeBackGround.theme }}
    >
      <div className={styles["contact"]}>
        {/* Header */}
        <div className={styles["header"]}>
          <div className={styles["header-logo"]}>
            <Link to={"/"}>
              <img src={images.logo} />
            </Link>
          </div>
          <div className={styles["header-action"]}>
            <Link to="/contact">
              <button
                onClick={themeBackGround.hanleTogle}
                className={styles["header-theme-btn"]}
              >
                Bật/Tắt ảnh nền
              </button>
            </Link>
            {/* <Link to="/login">
              <button className={styles["header-login-btn"]}>Đăng nhập</button>
            </Link> */}
          </div>
        </div>
        {/* Header */}

        {/* Content */}
        <div className={styles["content"]}>
          <div className={styles["content-container"]}>
            <h1>Liên hệ với chúng tôi</h1>
            <div className={styles["contactus-container"]}>
              <div className={styles["contactus-form"]}>
                <h3 className={styles["contactus-input-label"]}>
                  Hãy chia sẻ thêm và chúng tôi sẽ tìm giải pháp tốt nhất cho
                  bạn
                </h3>
                <input
                  className={styles["contactus-input-text"]}
                  type="text"
                  placeholder="Mô tả sự cố của bạn"
                ></input>
              </div>
            </div>
          </div>
        </div>
        {/* Content */}

        {/* Footer */}
        <div className={styles["footer"]}>
          <div className={styles["footer-top"]}>
            <p className={styles["footer-top-title"]}>
              Bạn đã sẵn sàng xem chưa? Nhập email để tạo hoặc kích hoạt lại tư
              cách thành viên của bạn.
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
      </div>
      {/* Footer */}
    </div>
  );
}
