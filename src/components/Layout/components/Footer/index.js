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
      {/*  */}

      {/*  */}
      {/* <div className={styles["FAQ"]}>
        <h2>Câu hỏi thường gặp</h2>
        <div>
          <ul>
            <li>
              <button>
                <h3>Netflix là gì?</h3>
                <ArrowForwardIosIcon
                  fontSize="large"
                  style={{ marginRight: "20px" }}
                />
              </button>
            </li>
            <li>
              <button>
                <h3>Tôi phải trả bao nhiêu tiền để xem Netflix?</h3>
                <ArrowForwardIosIcon
                  fontSize="large"
                  style={{ marginRight: "20px" }}
                />
              </button>
            </li>
            <li>
              <button>
                <h3>Tôi có thể xem ở đâu?</h3>
                <ArrowForwardIosIcon
                  fontSize="large"
                  style={{ marginRight: "20px" }}
                />
              </button>
            </li>
          </ul>
        </div>
      </div> */}
      {/*  */}
    </div>
  );
}
