import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { images } from "../../assets/images";
import styles from "./Login.module.css";
import jwt_decode from "jwt-decode";
export default function Login() {
  const navigate = useNavigate();
  const handleCredentialResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    var decoded = jwt_decode(response.credential);
    localStorage.setItem("accessToken", true);
    localStorage.setItem("name", decoded.name);
    localStorage.setItem("images", decoded.picture);
    localStorage.setItem("email", decoded.email);
    console.log(decoded);
    document.getElementById("buttonDiv").hidden = true;
    navigate("/admin");
    window.location.reload();
  };

  useEffect(() => {
    /* global google*/
    window.onload = function () {
      google.accounts.id.initialize({
        client_id:
          "420736768866-182b7c42c01gkk83kat9ph7bjdi4nn1b.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" } // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    };
  }, []);

  const [show, setShow] = useState("false");
  useEffect(() => {
    return setShow("false");
  }, []);
  const hanlerShow_disclosure = () => {
    setShow(!show);
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login"]}>
        <div className={styles["logo"]}>
          <Link to={"/"}>
            <img src={images.logo} />
          </Link>
        </div>
      </div>
      <div className={styles["login-content"]}>
        <div className={styles["login-content-top"]}>
          <h1>Đăng nhập</h1>
          <form className={styles["login-form"]}>
            <input
              type="text"
              placeholder="Email hoặc số điện thoại"
              className={styles["login-input-email"]}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              className={styles["login-input-password"]}
            />
            <buttom className={styles["login-content-btn"]}>Đăng nhập</buttom>
            <h4
              style={{
                color: "white",
                padding: "10px 0px",
                overflow: "hidden",
              }}
            >
              Hoặc bạn có thể đăng nhập thông qua
            </h4>
            <div className={styles["login-gg"]}>
              <div style={{ overflow: "hidden" }} id="buttonDiv"></div>
            </div>

            <div className={styles["login-content-form-help"]}>
              <div className={styles["input-login-rememberme"]}>
                <input type="checkbox" id="remember-me" />
                <label for="remember-me">Ghi nhớ tôi</label>
              </div>
              <a href="#">Bạn cần trợ giúp?</a>
            </div>
          </form>
        </div>
        <div className={styles["login-content-bottom"]}>
          <div className={styles["login-signup-now"]}>
            Bạn mới tham gia NTDMovie?
            <a href="#">Đăng kí ngay</a>
          </div>
          <div className={styles["recaptcha-terms-of-use"]}>
            <span>
              Trang này được Google reCAPTCHA bảo vệ để đảm bảo bạn không phải
              là robot.
            </span>
            {show && (
              <button
                className={styles["recaptcha-terms-of-use--link-button"]}
                onClick={hanlerShow_disclosure}
              >
                Tìm hiểu thêm
              </button>
            )}
          </div>
          {!show && (
            <div className={styles["cha-terms-of-use--disclosure"]}>
              <span>
                Thông tin do Google reCAPTCHA thu thập sẽ tuân theo{" "}
                <a href="https://policies.google.com/privacy" target="_blank">
                  Chính sách Quyền riêng tư
                </a>{" "}
                and{" "}
                <a href="https://policies.google.com/terms" target="_blank">
                  Điều khoản dịch vụ
                </a>{" "}
                của Google, và được dùng để cung cấp, duy trì và cải thiện dịch
                vụ reCAPTCHA cũng như các mục đích bảo mật nói chung.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
