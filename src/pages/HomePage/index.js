import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useParams } from "react-router-dom";
import styles from "./HomePage.module.css";
import ModalUI from "./component/Modal";

export default function HomePage() {
  // const [listFilm_Honor, setListFilm_Honor] = useState();
  // const [listFilm_Action, setListFilm_Action] = useState();
  // const [listFilm_Trending, setListFilm_Trending] = useState();
  const [data, setData] = useState();
  const [test, setTest] = useState();

  // Lọc tất cả các phim có isActive
  const getFilms = () => {
    const url = new URL("https://6491295d2f2c7ee6c2c7cfa0.mockapi.io/Films");
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
    const url = new URL("https://6491295d2f2c7ee6c2c7cfa0.mockapi.io/Films");
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
  // Lọc ra những bộ phim kinh dị
  // const getListFilm_Horror = () => {
  //   const url = new URL("https://6491295d2f2c7ee6c2c7cfa0.mockapi.io/Films");
  //   url.searchParams.append("type", "Horror");
  //   fetch(url, {
  //     method: "GET",
  //     headers: { "content-type": "application/json" },
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       // handle error
  //     })
  //     .then((tasks) => {
  //       // mockapi returns only tasks that match `Phim Hàn Quốc` string
  //       setListFilm_Honor(tasks);
  //     })
  //     .catch((error) => {
  //       // handle error
  //     });
  // };
  // Lọc ra những bộ phim Anime
  // const getListFilm_Anime = () => {
  //   const url = new URL("https://6491295d2f2c7ee6c2c7cfa0.mockapi.io/Films");
  //   url.searchParams.append("type", "Action");
  //   fetch(url, {
  //     method: "GET",
  //     headers: { "content-type": "application/json" },
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       // handle error
  //     })
  //     .then((tasks) => {
  //       // mockapi returns only tasks that match `Phim Hàn Quốc` string
  //       setListFilm_Action(tasks);
  //     })
  //     .catch((error) => {
  //       // handle error
  //     });
  // };
  // Lọc ra những bộ phim mới và Trending
  // const getListFilm_Trending = () => {
  //   const url = new URL("https://6491295d2f2c7ee6c2c7cfa0.mockapi.io/Films");
  //   url.searchParams.append("state", "Trending");
  //   fetch(url, {
  //     method: "GET",
  //     headers: { "content-type": "application/json" },
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       // handle error
  //     })
  //     .then((tasks) => {
  //       // mockapi returns only tasks that match `Phim Hàn Quốc` string
  //       setListFilm_Trending(tasks);
  //     })
  //     .catch((error) => {
  //       // handle error
  //     });
  // };
  // Lấy ra phim theo ID
  const filmId = useParams();

  useEffect(() => {
    getFilms();
    getListFilm_Billboard();
    // getListFilm_Horror();
    // getListFilm_Anime();
    // getListFilm_Trending();
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //----------------------------------------------------------------//
  const Film_detail = data?.find((obj) => {
    return obj.id === filmId.id;
  });

  // Lọc ra tất cả PHIM hiện có đang trending
  const listFilm_Trending = data?.filter((obj) => {
    return obj.state === "Trending";
  });

  // Lọc ra tất cả Phim kinh dị hiện có đang hoạt động
  const listFilm_Honor = data?.filter((obj) => {
    return obj.type === "Horror";
  });

  // Lọc ra tất cả Phim hành động hiện có đang hoạt động
  const listFilm_Action = data?.filter((obj) => {
    return obj.type === "Action";
  });

  // Lọc ra những PHIM ngoài Anime, China, Korean, Disney có quảng cáo
  const listFilm_billborad_homepage = test?.filter((obj) => {
    return (
      obj.type !== "Anime" &&
      obj.type !== "Korean" &&
      obj.type !== "China" &&
      obj.type !== "Disney" &&
      obj.type !== "THTT" &&
      obj.type !== "TVShow"
    );
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
      {test && (
        <Slider
          {...settings1}
          style={{ overflowY: "hidden", marginBottom: "20px" }}
        >
          {listFilm_billborad_homepage?.map((test, index) => (
            <div className={styles["billboard-motion"]}>
              <div className={styles["motion-background"]}>
                {/* <img src={test[0]?.imgBG} /> */}
                <video
                  src={test?.imgBG}
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
                <div className={styles["info-wrapper"]}>
                  <p>{test?.description}</p>
                </div>
                <div className={styles["action"]}>
                  <Link to={`/film/homePage/${test?.id}`}>
                    <button
                      onClick={() => setOpen(true)}
                      className={styles["login-btn"]}
                    >
                      Xem chi tiết
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
      {/* SHOW BILLBOARD */}
      <div className={styles["slider-content"]}>
        {/* Tổng hợp tất cả bộ phim thịnh hành*/}
        <h2
          style={{ color: "white" }}
          className={styles["container-news-title"]}
        >
          HIỆN ĐANG THỊNH HÀNH
        </h2>
        <Slider
          {...settings}
          style={{ overflowY: "hidden", marginBottom: "20px" }}
        >
          {listFilm_Trending?.map((film, index) => (
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

        {/* Tổng hợp tất cả bộ phim kinh dị */}
        <h2
          style={{ color: "white" }}
          className={styles["container-news-title"]}
        >
          PHIM KINH DỊ PHỔ BIẾN
        </h2>
        <Slider
          {...settings}
          style={{ overflowY: "hidden", marginBottom: "20px" }}
        >
          {listFilm_Honor?.map((film, index) => (
            <div className={styles["news"]} key={index}>
              <div className={styles["news-top"]}>
                <Link to={`/film/homePage/${film.id}`}>
                  <img src={film.img} alt={film.title} onClick={handleOpen} />
                </Link>
              </div>
            </div>
          ))}
        </Slider>
        {/*  Tổng hợp tất cả bộ phim kinh dị */}

        {/* Tổng hợp tất cả bộ phim Anime*/}
        <h2
          style={{ color: "white" }}
          className={styles["container-news-title"]}
        >
          PHIM HÀNH ĐỘNG PHỔ BIẾN
        </h2>
        <Slider
          {...settings}
          style={{ overflowY: "hidden", marginBottom: "20px" }}
        >
          {listFilm_Action?.map((film, index) => (
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
      </div>
    </div>
  );
}
