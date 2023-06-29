import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useParams } from "react-router-dom";
import styles from "./KidFilm.module.css";
import ModalUI from "./component/Modal";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "70%",
//   bgcolor: "background.paper",
//   borderradius: "20px",
//   boxShadow: 24,
//   p: 4,
//   backgroundColor: "#0000009d",
//   padding: "0px",
//   borderRadius: "15px",
// };

export default function KidFilm() {
  // API FUNCTION
  const [data, setData] = useState();
  const [test, setTest] = useState();
  // const [listFilm_Ainime, setListFilm_Ainime] = useState();
  // const [listFilm_Disney, setListFilm_Disney] = useState();

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
        setData(tasks);
      })
      .catch((error) => {
        // handle error
      });
  };

  // Lấy danh sách Anime && Trending
  // const getListFilm_Anime = () => {
  //   const url = new URL("https://6491295d2f2c7ee6c2c7cfa0.mockapi.io/Films");
  //   url.searchParams.append("type", "Anime");
  //   url.searchParams.append("isActive", true);
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
  //       setListFilm_Ainime(tasks);
  //     })
  //     .catch((error) => {
  //       // handle error
  //     });
  // };

  // Lấy danh sách Disney
  // const getListFilm_Disney = () => {
  //   const url = new URL("https://6491295d2f2c7ee6c2c7cfa0.mockapi.io/Films");
  //   url.searchParams.append("type", "Disney");
  //   url.searchParams.append("isActive", true);
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
  //       setListFilm_Disney(tasks);
  //     })
  //     .catch((error) => {
  //       // handle error
  //     });
  // };

  // Lấy danh sách phim đang quảng cáo để show quảng cáo
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

  useEffect(() => {
    getFilms();
    // getListFilm_Anime();
    // getListFilm_Disney();
    getListFilm_Billboard();
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //----------------------------------------------------------------//
  const filmId = useParams();
  const Film_detail = data?.find((obj) => {
    return obj.id === filmId.id;
  });

  // Lấy ra danh sách các phim Anime đang có quảng cáo
  const List_Film_BiilBorad_Anime = test?.filter((obj) => {
    return obj.type === "Disney";
  });

  // Lấy ra danh sách các Phim DISNEY đang active
  const listFilm_Disney = data?.filter((obj) => {
    return obj.type === "Disney";
  });

  // Lấy ra danh sách các Phim ANIME đang active
  const listFilm_Ainime = data?.filter((obj) => {
    return obj.type === "Anime";
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
          {List_Film_BiilBorad_Anime?.map((test, index) => (
            <div className={styles["billboard-motion"]}>
              <div className={styles["motion-background"]}>
                <video
                  id="myVideo"
                  src={test?.imgBG}
                  style={{ height: "100%", width: "100%", overflow: "hidden" }}
                  muted
                  autoPlay
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
                  <Link to={`/film/kid/${test?.id}`}>
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
        {/* Tổng hợp tất cả phim Hoạt hình hay nhất*/}
        <h2
          style={{ color: "white" }}
          className={styles["container-news-title"]}
        >
          PHIM HOẠT HÌNH HAY NHẤT
        </h2>
        <Slider
          {...settings}
          style={{ overflowY: "hidden", marginBottom: "20px" }}
        >
          {listFilm_Ainime?.map((film, index) => (
            <div className={styles["news"]} key={index}>
              <div className={styles["news-top"]}>
                <Link to={`/film/kid/${film.id}`}>
                  <img src={film.img} alt={film.title} onClick={handleOpen} />
                  <img src={film.img} alt={film.title} onClick={handleOpen} />
                </Link>
              </div>
            </div>
          ))}
        </Slider>
        {/* Tổng hợp tất cả phim Hoạt hình hay nhất */}

        {/* Tổng hợp tất cả phim Disney*/}
        <h2
          style={{ color: "white" }}
          className={styles["container-news-title"]}
        >
          HOẠT HÌNH THIẾU NHI - XEM MÊ LY
        </h2>
        <Slider
          {...settings}
          style={{ overflowY: "hidden", marginBottom: "20px" }}
        >
          {listFilm_Disney?.map((film, index) => (
            <div className={styles["news"]} key={index}>
              <div className={styles["news-top"]}>
                <Link to={`/film/kid/${film.id}`}>
                  <img src={film.img} alt={film.title} onClick={handleOpen} />
                  <img src={film.img} alt={film.title} onClick={handleOpen} />
                </Link>
              </div>
            </div>
          ))}
        </Slider>
        {/* Tổng hợp tất cả phim Disney */}
      </div>
    </div>
  );
}
