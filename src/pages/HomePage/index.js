import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useParams } from "react-router-dom";
import { Films } from "../../assets/Datas/data";
import styles from "./HomePage.module.css";
// Madal MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ModalUI from "./component/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  borderradius: "20px",
  boxShadow: 24,
  p: 4,
  backgroundColor: "#0000009d",
  padding: "0px",
  borderRadius: "15px",
  // minWidth: "90%",
};

export default function HomePage() {
  // transfrom billboard
  const [transformID, setTranformID] = useState(1);

  // Lấy tất cả danh sách muốn show billBoard theo type billboard
  const listFilm_BillBoard = Films.filter((film, index) => {
    return film.billboard === true;
  });

  // Hiện tại thì chuyển billboard có thể đang phải gặp bug => sau khi hoàn thiện hết tính năng quay lại kiểm tra
  setTimeout(() => {
    setTranformID(Math.floor(Math.random() * listFilm_BillBoard.length));
  }, 10000);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //----------------------------------------------------------------//
  const filmId = useParams();
  const Film_detail = Films.find((obj) => {
    return obj.id == filmId.id;
  });
  const convertURL = (url) => {
    return url?.replace("watch?v=", "embed/");
  };

  // Lọc ra những bộ phim mới và Trending
  const listFilm_trending = Films.filter((film, index) => {
    return film.state === "trending";
  });

  // Lọc ra những bộ phim kinh dị
  const listFilm_Honor = Films.filter((film, index) => {
    return film.type === "honor";
  });

  // Lọc ra những bộ phim mới và Trending
  const listFilm_Ainime = Films.filter((film, index) => {
    return film.type === "Phim Anime";
  });

  // Lọc ra những bộ  Phim Hàn Quốc
  const listFilm_Korea = Films.filter((film, index) => {
    return film.type === "Phim Hàn Quốc";
  });

  // Sẽ phải tách ra thành 1 component riêng và gắn vào như component AVT "MUI MODAL"
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 380,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles["container-homepage"]}>
      {/* MADAL */}
      {Film_detail && (
        <ModalUI
          Film_detail={Film_detail}
          open={open}
          handleClose={handleClose}
        />
      )}
      {/* MADAL */}

      {/* SHOW BILLBOARD  */}
      <div className={styles["billboard-motion"]}>
        <div className={styles["motion-background"]}>
          <img src={listFilm_BillBoard[transformID].imgBG} />
        </div>
        <div className={styles["info-container"]}>
          <div className={styles["billboard-title"]}>
            <img
              alt=""
              className={styles["title-logo"]}
              src={listFilm_BillBoard[transformID].imgLogo}
              title="Xác ướp"
            />
          </div>
          <div className={styles["info-wrapper"]}>
            <p>{listFilm_BillBoard[transformID].description}</p>
          </div>
          <div className={styles["action"]}>
            <Link to={`/film/homePage/${listFilm_BillBoard[transformID].id}`}>
              <button
                onClick={() => setOpen(true)}
                className={styles["login-btn"]}
              >
                Xem trailer
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* SHOW BILLBOARD */}
      <div className={styles["slider-content"]}>
        {/* Tổng hợp tất cả bộ phim thịnh hành*/}
        <h2
          style={{ color: "white" }}
          className={styles["container-news-title"]}
        >
          Hiện đang thịnh hành
        </h2>
        <Slider
          {...settings}
          style={{ overflowY: "hidden", marginBottom: "20px" }}
        >
          {listFilm_trending.map((film, index) => (
            <div className={styles["news"]} key={index}>
              <div className={styles["news-top"]}>
                <Link to={`/film/homePage/${film.id}`}>
                  <img src={film.img} alt={film.title} onClick={handleOpen} />
                </Link>
              </div>
            </div>
          ))}
        </Slider>
        {/* Tổng hợp tất cả bộ phim thịnh hành */}

        {/* Tổng hợp tất cả bộ phim hiện có */}
        <h2
          style={{ color: "white" }}
          className={styles["container-news-title"]}
        >
          Phổ biến trên Netflix
        </h2>
        <Slider
          {...settings}
          style={{ overflowY: "hidden", marginBottom: "20px" }}
        >
          {Films.map((film, index) => (
            <div className={styles["news"]} key={index}>
              <div className={styles["news-top"]}>
                <Link to={`/film/homePage/${film.id}`}>
                  <img src={film.img} alt={film.title} onClick={handleOpen} />
                </Link>
              </div>
            </div>
          ))}
        </Slider>
        {/* Tổng hợp tất cả bộ phim hiện có */}

        {/* Tổng hợp tất cả bộ phim Anime*/}
        <h2
          style={{ color: "white" }}
          className={styles["container-news-title"]}
        >
          Phim Anime
        </h2>
        <Slider
          {...settings}
          style={{ overflowY: "hidden", marginBottom: "20px" }}
        >
          {listFilm_Ainime.map((film, index) => (
            <div className={styles["news"]} key={index}>
              <div className={styles["news-top"]}>
                <Link to={`/film/homePage/${film.id}`}>
                  <img src={film.img} alt={film.title} onClick={handleOpen} />
                </Link>
              </div>
            </div>
          ))}
        </Slider>
        {/* Tổng hợp tất cả bộ phim Anime */}

        {/* Tổng hợp tất cả phim truyền hình lãng mạn Hàn Quốc*/}
        <h2
          style={{ color: "white" }}
          className={styles["container-news-title"]}
        >
          Phim hài truyền hình lãng mạn Hàn Quốc
        </h2>
        <Slider
          {...settings}
          style={{ overflowY: "hidden", marginBottom: "20px" }}
        >
          {listFilm_Korea.map((film, index) => (
            <div className={styles["news"]} key={index}>
              <div className={styles["news-top"]}>
                <Link to={`/film/homePage/${film.id}`}>
                  <img src={film.img} alt={film.title} onClick={handleOpen} />
                  <img src={film.img} alt={film.title} onClick={handleOpen} />
                </Link>
              </div>
            </div>
          ))}
        </Slider>
        {/* Tổng hợp tất cả phim truyền hình lãng mạn Hàn Quốc */}
      </div>
    </div>
  );
}
