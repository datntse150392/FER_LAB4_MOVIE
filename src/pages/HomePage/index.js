import React, { useLayoutEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useParams } from "react-router-dom";
import { dataBillBoard } from "../../assets/BillBoard";
import { Films } from "../../assets/Datas/data";
import styles from "./HomePage.module.css";

// Madal MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import HeaderForFilmLayout from "../../components/Layout/components/HeaderForFilmLayout";

const style_modal = {};

const style = {
  // overflowY: "hidden",
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
};
export default function HomePage() {
  // transfrom billboard
  const [transformID, setTranformID] = useState(1);

  setTimeout(() => {
    setTranformID(Math.floor(Math.random() * dataBillBoard.length));
  }, 10000);

  console.log(dataBillBoard[transformID].id);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filmId = useParams();
  const Film_detail = Films.find((obj) => {
    return obj.id == filmId.id;
  });
  const convertURL = (url) => {
    return url?.replace("watch?v=", "embed/");
  };
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

  return (
    <div className={styles["container-homepage"]}>
      {/* MADAL */}
      {Film_detail && (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ overflowY: "hidden", border: "none" }}
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <div className={styles["container-movie-film"]}>
                  <embed src={convertURL(Film_detail.trailerURL)} />
                </div>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 0 }}>
                <div className={styles["container-movie-content"]}>
                  <div className={styles["container-movie-content-right"]}>
                    <h2
                      className={styles["container-movie-content-right-title"]}
                    >
                      {Film_detail.title}
                    </h2>
                    <p
                      className={
                        styles["container-movie-content-right-description"]
                      }
                    >
                      {Film_detail.description}
                    </p>
                    <button className={styles["login-btn"]}>Xem Ngay</button>
                  </div>
                  <div className={styles["container-movie-content-lef"]}>
                    <div
                      className={styles["container-movie-content-lef-director"]}
                    >
                      <span>Đạo diễn: </span>
                      <p> {Film_detail.director}</p>
                    </div>
                    <div
                      className={styles["container-movie-content-lef-actor"]}
                    >
                      <span>Diễn viên:</span>
                      <p> {Film_detail.actor}</p>
                    </div>
                    <div className={styles["container-movie-content-lef-type"]}>
                      <span>Thể loại: </span>
                      <p> {Film_detail.type}</p>
                    </div>
                    <div
                      className={styles["container-movie-content-lef-duration"]}
                    >
                      <span>Thời lượng: </span>
                      <p> {Film_detail.duration}</p>
                    </div>
                  </div>
                </div>
              </Typography>
            </Box>
          </Modal>
        </div>
      )}
      {/* MADAL */}

      {/* SHOW BILLBOARD  */}
      <div className={styles["billboard-motion"]}>
        <div className={styles["motion-background"]}>
          <img src={dataBillBoard[transformID].imgBG} />
        </div>
        <div className={styles["info-container"]}>
          <div className={styles["billboard-title"]}>
            <img
              alt=""
              className={styles["title-logo"]}
              src={dataBillBoard[transformID].imgLogo}
              title="Xác ướp"
            />
          </div>
          <div className={styles["info-wrapper"]}>
            <p>{dataBillBoard[transformID].description}</p>
          </div>
          <div className={styles["action"]}>
            <Link to={`/film/homePage/${dataBillBoard[transformID].id}`}>
              <button onClick={handleOpen} className={styles["login-btn"]}>
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
