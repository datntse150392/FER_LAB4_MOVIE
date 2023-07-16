import React from "react";
import styles from "./7DayFreeTrial.module.css";
export default function FreeTrial() {
  return (
    <div className={styles["svod-trial-7day"]}>
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
              Vui lòng nhập số điện thoại và nhấn nút "Tiếp tục"
            </p>
            <div className={styles["form"]}>
              <form>
                <input
                  id="input1"
                  placeholder="Nhập số điện thoại"
                  type="tel"
                  className={styles["input-number"]}
                />
                <p className={styles["error-message"]}></p>
                <button className={styles["btn-submit"]}>Tiếp tục</button>
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
