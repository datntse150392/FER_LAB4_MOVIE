import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useParams } from "react-router-dom";
import styles from "./SeriesFilm.module.css";
import { Stack } from "react-bootstrap";

// Icon
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

export default function SeriesFilm() {
  const [data, setData] = useState();
  const [test, setTest] = useState();

  // Lọc tất cả các phim có isActive
  const getFilms = () => {
    const url = new URL(
      "https://64acf61eb470006a5ec514b7.mockapi.io/movie/movie"
    );
    url.searchParams.append("isActive", true);
    fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((tasks) => {
        // mockapi returns only tasks that match `Phim Hàn Quốc` string
        setData(tasks);
      })
      .catch((error) => {
        // handle error
      });
  };
  const getListFilm_Billboard = () => {
    const url = new URL(
      "https://64acf61eb470006a5ec514b7.mockapi.io/movie/movie"
    );
    url.searchParams.append("billboard", true);
    fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((tasks) => {
        // mockapi returns only tasks that match `Phim Hàn Quốc` string
        setTest(tasks);
      })
      .catch((error) => {
        // handle error
      });
  };

  // Lấy ra phim theo ID
  const filmId = useParams();

  useEffect(() => {
    getFilms();
    getListFilm_Billboard();
  }, []);

  //----------------------------------------------------------------//
  const Film_detail = data?.find((obj) => {
    return obj.id === filmId.id;
  });

  // Lọc ra tất cả PHIM  hiện có đang trending
  const listFilm_seriesFilm_trending = data?.filter((obj) => {
    return (
      (obj.tag === "Xu hướng" && obj.type === "Cổ trang") || obj.type === "Việt"
    );
  });

  // Lọc ra tất cả Phim hành động hiện có
  const listFilm_chinaFilm = data?.filter((obj) => {
    return obj.type === "Cổ trang";
  });
  // Lọc ra những PHIM HÀNH ĐỘNG có quảng cáo
  const listFilm_billborad_seriesFilm = test?.filter((obj) => {
    return obj.type === "Cổ trang" || obj.type === "Việt";
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
  // Sẽ phải tách ra thành 1 component riêng và gắn vào như component AVT "MUI MODAL"
  const settings1 = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
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
      {/* SHOW BILLBOARD  */}
      {test && (
        <Slider
          {...settings1}
          style={{ overflowY: "hidden", marginBottom: "20px" }}
        >
          {listFilm_billborad_seriesFilm?.map((test, index) => (
            <div className={styles["billboard-motion"]}>
              <div className={styles["motion-background"]}>
                {/* <img src={test[0]?.imgBG} /> */}
                <video
                  src={test?.trailerURL}
                  style={{ height: "100%", width: "100%", overflow: "hidden" }}
                  autoPlay
                  muted
                  loop
                />
              </div>
              <div className={styles["info-container"]}>
                <div className={styles["billboard-title"]}>
                  <img
                    alt=""
                    className={styles["title-logo"]}
                    src={test?.imgLogo}
                    title={test?.title}
                  />
                </div>
                <div className={styles["action"]}>
                  <Stack style={{ display: "flex" }} direction="row">
                    <Link to={"#"}>
                      <button className={styles["register-btn"]}>
                        <PlayArrowIcon />
                        Đăng kí gói
                      </button>
                    </Link>
                    <Link to={"/film/detailFilm/1"}>
                      <button className={styles["detail-btn"]}>
                        <BookmarkAddIcon />
                        Thêm vào danh sách
                      </button>
                    </Link>
                  </Stack>
                </div>
                <div className={styles["info-wrapper"]}>
                  <Stack style={{ display: "flex" }} direction="row">
                    <p>
                      {test?.description}
                      &nbsp; &nbsp;
                      <Link to={`/film/detailFilm/${test?.id}`}>
                        Xem chi tiết
                      </Link>
                    </p>
                  </Stack>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
      {/* SHOW BILLBOARD */}
      <div className={styles["slider-content"]}>
        {/* Tổng hợp tất cả bộ phim hiện đang thịnh hành*/}
        <h2
          style={{ color: "white" }}
          className={styles["container-news-title"]}
        >
          Phim Đang Thịnh Hành
        </h2>
        <Slider
          {...settings}
          style={{ overflowY: "hidden", marginBottom: "20px" }}
        >
          {listFilm_seriesFilm_trending?.map((film, index) => (
            <div className={styles["news"]} key={index}>
              <div className={styles["news-top"]}>
                <Link to={`/film/detailFilm/${film.id}`}>
                  <img src={film.img} alt={film.title} />
                </Link>
              </div>
            </div>
          ))}
        </Slider>
        {/* Tổng hợp tất cả bộ phim thịnh hành */}

        {/* Tổng hợp tất cả bộ Phim Cổ Trang Huyền Huyễn hiện có */}
        <h2
          style={{ color: "white" }}
          className={styles["container-news-title"]}
        >
          Danh Sách Phim Cổ Trang Huyền Huyễn
        </h2>
        <Slider
          {...settings}
          style={{ overflowY: "hidden", marginBottom: "20px" }}
        >
          {listFilm_chinaFilm?.map((film, index) => (
            <div className={styles["news"]} key={index}>
              <div className={styles["news-top"]}>
                <Link to={`/film/detailFilm/${film.id}`}>
                  <img src={film.img} alt={film.title} />
                </Link>
              </div>
            </div>
          ))}
        </Slider>
        {/*  Tổng hợp tất cả bộ  phim hành động hiện có */}
      </div>
    </div>
  );
}
