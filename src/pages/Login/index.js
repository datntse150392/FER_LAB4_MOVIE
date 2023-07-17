import React, { useEffect, useState, useMemo, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { images } from "../../assets/images";
import styles from "./Login.module.css";
import jwt_decode from "jwt-decode";
import { ThemeBackGround } from "../../Theme/ThemeProvider";
export default function Login() {
  const [show, setShow] = useState("false");
  const [date, setDate] = useState(new Date().toJSON());

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

  const handleCredentialResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    var decoded = jwt_decode(response.credential);
    checkUserIsSignedIn(decoded);
  };

  const navigate = useNavigate();

  const hanlerShow_disclosure = () => {
    setShow(!show);
  };
  const addNewUser = (newUser) => {
    fetch("https://64acf61eb470006a5ec514b7.mockapi.io/movie/account", {
      method: "POST",
      headers: { "content-type": "application/json" },
      // Send your data in the request body as JSON
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then(() => {})
      .catch((error) => {
        // handle error
      });
  };

  function checkUserIsSignedIn(decodedObj) {
    console.log(decodedObj.email);
    fetch(
      `https://64acf61eb470006a5ec514b7.mockapi.io/movie/account?email=${decodedObj.email}`,
      {
        method: "GET",
        headers: { "content-type": "application/json" },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((tasks) => {
        // Do something with the list of tasks
        debugger;
        console.log(tasks.length);
        if (tasks.length) {
          localStorage.setItem("accessToken", true);
          localStorage.setItem("email", decodedObj?.email);
          localStorage.setItem("name", decodedObj?.name);
          localStorage.setItem("images", decodedObj?.picture);
          localStorage.setItem("gender", tasks[0].gender);
          localStorage.setItem("memberShip", tasks[0].memberShip);
          localStorage.setItem("password", tasks[0].password);
          document.getElementById("buttonDiv").hidden = true;
          if (decodedObj.email == "datntse150392@fpt.edu.vn") {
            navigate("/admin");
          } else {
            navigate("/film/homePage");
          }
        } else if (!tasks.length) {
          const newUser = {
            fullName: `${decodedObj?.name}`,
            email: `${decodedObj?.email}`,
            avatar: `${decodedObj?.picture}`,
            phone: "null",
            gender: "null",
            memberShip: false,
            createdAt: date,
            password: "null",
            expiredDate: "null",
          };
          addNewUser(newUser);
          localStorage.setItem("accessToken", true);
          localStorage.setItem("email", decodedObj?.email);
          localStorage.setItem("name", decodedObj?.name);
          localStorage.setItem("images", decodedObj?.picture);
          localStorage.setItem("gender", newUser.gender);
          localStorage.setItem("memberShip", newUser.memberShip);
          localStorage.setItem("password", newUser.password);
          navigate("/film/homePage");
        }
        window.location.reload();
      })
      .catch((error) => {
        // handle error
      });
  }

  // Hanler Login Account Normal
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  console.log(account);
  const hanlerLoginAccount = () => {
    console.log(account);
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
          <form
            onSubmit={hanlerLoginAccount()}
            className={styles["login-form"]}
          >
            <input
              type="text"
              placeholder="Email hoặc số điện thoại"
              className={styles["login-input-email"]}
              onChange={(e) =>
                setAccount((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              className={styles["login-input-password"]}
              onChange={(e) =>
                setAccount((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
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
            Bạn mới tham gia GalaxyPlay?
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
