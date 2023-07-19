import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import styles from "./7DayFreeTrial.module.css";

// Icon
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";

export default function FreeTrial() {
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
    <div className={styles["svod-trial-7day"]}>
      <Link to="/film/homePage">
        <div className={styles["btn-back"]}>
          <ArrowBackIosIcon fontSize="large" />
        </div>
      </Link>
      <div className={styles["content-body"]}>
        <div className={styles["img-left"]}>
          <div className={styles["video-ytb-wrapper"]}>
            <div className={styles["video-ytb"]}>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dZSUK17-3Hc"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen="true"
              ></iframe>
            </div>
          </div>
        </div>
        {/* {styles["note-footer"]} */}

        <div className={styles["content-right"]}>
          <div className={styles["container"]}>
            <img
              src="https://galaxyplay.vn/landings/assets/img/svod-trial-7day.png"
              className={styles["img-info"]}
            />
            <p className={styles["note-input"]}>
              Vui lòng nhập số email và nhấn nút "Tiếp tục"
            </p>
            <div className={styles["form"]}>
              <form ref={form} onSubmit={sendEmail}>
                <input
                  name="email"
                  id="input1"
                  placeholder="Nhập email để đăng kí tham gia chương trình"
                  type="tel"
                  className={styles["input-number"]}
                />
                <p className={styles["error-message"]}></p>
                <button
                  type="submit"
                  value="Send"
                  className={styles["btn-submit"]}
                >
                  Tiếp tục
                </button>
              </form>
              {/* <p className={styles["note-footer text-center"]}>
                <b>Lưu ý</b>
              </p>
              <p className={styles["note-footer"]}>
                - Chương trình áp dụng với KHÁCH HÀNG LẦN ĐẦU ĐĂNG KÝ (chưa từng
                sở hữu gói Mobile, Cao cấp &amp; Siêu Việt)
              </p>
              <p className={styles["note-footer"]}>
                - Gói Cao cấp sẽ được tự động gia hạn sau 7 ngày kể từ lúc kích
                hoạt (Giá gốc: 70.000đ/ tháng)
              </p>
              <p className={styles["note-footer"]}>
                - Trong thời gian dùng thử, quý khách có thể hủy gói bất cứ lúc
                nào
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
