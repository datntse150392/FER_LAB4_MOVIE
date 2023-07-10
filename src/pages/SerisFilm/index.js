import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useParams } from "react-router-dom";
import styles from "./SerisFilm.module.css";
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
//   // minWidth: "90%",
// };

export default function SerisFilm() {
  // API FUNCTION
  const [data, setData] = useState();
  const [test, setTest] = useState();
  // const [listFilm_Korea, setlistFilm_Korea] = useState();
  // const [listFilm_China, setlistFilm_China] = useState();
  // const [listFilm_USUK, setlistFilm_USUK] = useState();

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

  // Lấy danh sách Phim Hàn Quốc
  // const getListFilm_Korea = () => {
  //   const url = new URL("https://6491295d2f2c7ee6c2c7cfa0.mockapi.io/Films");
  //   url.searchParams.append("type", "Korean");
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
  //       setlistFilm_Korea(tasks);
  //     })
  //     .catch((error) => {
  //       // handle error
  //     });
  // };

  // Lấy danh sách Phim Tung Quốc
  // const getListFilm_China = () => {
  //   const url = new URL("https://6491295d2f2c7ee6c2c7cfa0.mockapi.io/Films");
  //   url.searchParams.append("type", "China");
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
  //       setlistFilm_China(tasks);
  //     })
  //     .catch((error) => {
  //       // handle error
  //     });
  // };

  // Lấy danh sách Phim Âu Mỹ
  // const getListFilm_USUK = () => {
  //   const url = new URL("https://6491295d2f2c7ee6c2c7cfa0.mockapi.io/Films");
  //   url.searchParams.append("type", "USUK");
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
  //       setlistFilm_USUK(tasks);
  //     })
  //     .catch((error) => {
  //       // handle error
  //     });
  // };

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
    // getListFilm_Korea();
    // getListFilm_China();
    // getListFilm_USUK();
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

  // Lấy ra danh sách PHIM HÀN QUỐC đang Acitve
  const listFilm_Korea = data?.filter((obj) => {
    return obj.type === "Korean";
  });

  // Lấy ra danh sách PHIM TRUNG QUỐC đang Active
  const listFilm_China = data?.filter((obj) => {
    return obj.type === "China";
  });

  // Lấy ra danh sách PHIM ÂU MỸ đang Active
  const listFilm_USUK = data?.filter((obj) => {
    return obj.type === "USUK";
  });

  // Lây ra danh sách Phim Trung Quốc, Hàn Quốc, Âu Mỹ có quảng cáo
  const lsitFilm_Billboard_Seris = test?.filter((obj) => {
    return obj.type === "USUK" || obj.type === "Korean" || obj.type === "China";
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
          {lsitFilm_Billboard_Seris?.map((test, index) => (
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
                <div className={styles["action"]}>
                  <Link to={`/film/detailFilm/${test?.id}`}>
                    <button
                      // throw new TypeError("Cannot find id of film");
                      onClick={() => setOpen(true)}
                      className={styles["register-btn"]}
                    >
                      Đăng kí gói / Thuê phim
                    </button>
                    <button
                      // throw new TypeError("Cannot find id of film");
                      onClick={() => setOpen(true)}
                      className={styles["detail-btn"]}
                    >
                      Xem chi tiết
                    </button>
                  </Link>
                </div>
                <div className={styles["info-wrapper"]}>
                  <p>{test?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
      {/* SHOW BILLBOARD */}
      <div className={styles["slider-content"]}>
        {/* Tổng hợp tất cả phim truyền hình lãng mạn Hàn Quốc*/}
        <h2
          style={{ color: "white" }}
          className={styles["container-news-title"]}
        >
          Phim Truyền Hình Lãng Mạn Hàn Quốc
        </h2>
        <Slider
          {...settings}
          style={{ overflowY: "hidden", marginBottom: "20px" }}
        >
          {listFilm_Korea?.map((film, index) => (
            <div className={styles["news"]} key={index}>
              <div className={styles["news-top"]}>
                <Link to={`/film/series/${film.id}`}>
                  <img src={film.img} alt={film.title} onClick={handleOpen} />
                  <img src={film.img} alt={film.title} onClick={handleOpen} />
                </Link>
              </div>
            </div>
          ))}
        </Slider>
        {/* Tổng hợp tất cả phim truyền hình lãng mạn Hàn Quốc */}

        {/* Tổng hợp tất cả phim truyền hình Trung Quốc*/}
        <h2
          style={{ color: "white" }}
          className={styles["container-news-title"]}
        >
          Chương Trình Truyền Hình Hàn Quốc
        </h2>
        <Slider
          {...settings}
          style={{ overflowY: "hidden", marginBottom: "20px" }}
        >
          {listFilm_China?.map((film, index) => (
            <div className={styles["news"]} key={index}>
              <div className={styles["news-top"]}>
                <Link to={`/film/series/${film.id}`}>
                  <img src={film.img} alt={film.title} onClick={handleOpen} />
                  <img src={film.img} alt={film.title} onClick={handleOpen} />
                </Link>
              </div>
            </div>
          ))}
        </Slider>
        {/* Tổng hợp tất cả phim truyền hình Trung Quốc */}

        {/* Tổng hợp tất cả phim truyền hình Âu Mỹ*/}
        <h2
          style={{ color: "white" }}
          className={styles["container-news-title"]}
        >
          Chương Trình Truyền Hình Âu Mỹ
        </h2>
        <Slider
          {...settings}
          style={{ overflowY: "hidden", marginBottom: "20px" }}
        >
          {listFilm_USUK?.map((film, index) => (
            <div className={styles["news"]} key={index}>
              <div className={styles["news-top"]}>
                <Link to={`/film/series/${film.id}`}>
                  <img src={film.img} alt={film.title} onClick={handleOpen} />
                  <img src={film.img} alt={film.title} onClick={handleOpen} />
                </Link>
              </div>
            </div>
          ))}
        </Slider>
        {/* Tổng hợp tất cả phim truyền hình Âu Mỹ */}
      </div>
    </div>
  );
}
