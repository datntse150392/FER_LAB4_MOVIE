import React, { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./HomePage.module.css";
import { Stack } from "react-bootstrap";

// Icon
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import CancelIcon from "@mui/icons-material/Cancel";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import DiamondIcon from "@mui/icons-material/Diamond";

export default function HomePage() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [test, setTest] = useState();

  // Lấy ra danh sách phim yêu thích theo email hiện tại trên localstorage
  const [listFilmFavoriteAPI, setListFilmFavoriteAPI] = useState();
  const getListFavoriteFilm_ByEmalil = () => {
    fetch(
      "https://64acf61eb470006a5ec514b7.mockapi.io/movie/favoriteList?accountEmail=" +
        localStorage.getItem("email"),
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
        setListFilmFavoriteAPI(tasks);
      })
      .catch((error) => {
        // handle error
      });
  };

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
    getListFavoriteFilm_ByEmalil();
  }, []);

  //----------------------------------------------------------------//
  const Film_detail = data?.find((obj) => {
    return obj.id === filmId.id;
  });

  // Lọc ra tất cả PHIM hiện có đang trending
  const listFilm_Trending = data?.filter((obj) => {
    return obj.tag === "Xu hướng";
  });

  // Lọc ra tất cả Phim kinh dị hiện có đang hoạt động
  const listFilm_Honor = data?.filter((obj) => {
    return obj.type === "Kinh dị";
  });

  // Lọc ra tất cả Phim Thiếu Nhi hiện có đang hoạt động
  const listFilm_Ainme = data?.filter((obj) => {
    return obj.type === "Anime";
  });

  // Lọc ra những PHIM ngoài Anime, China, Korean, Disney có quảng cáo
  const listFilm_billborad_homepage = test?.filter((obj) => {
    return (
      obj.type !== "TV Show" &&
      obj.type !== "Hành động" &&
      obj.type !== "Cổ trang" &&
      obj.type !== "Việt"
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

  const myFunction = () => {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  };

  // hanler add my list
  const hanlerAddMyList = (test) => {
    if (localStorage.getItem("email") === null) {
      navigate("/login");
      window.location.reload();
    } else {
      fetch(
        "https://64acf61eb470006a5ec514b7.mockapi.io/movie/favoriteList?accountEmail=" +
          localStorage.getItem("email"),
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
          // email co ton tai trong favoriteList
          if (tasks.length) {
            const listFilm = tasks[0].listFilm;
            const newDataListFilm = [...listFilm, test];
            if (
              window.confirm(
                "Bạn chắc chắn muốn thêm phim này vào danh sách yêu thích không?"
              )
            ) {
              fetch(
                `https://64acf61eb470006a5ec514b7.mockapi.io/movie/favoriteList/${tasks[0].id}`,
                {
                  method: "PUT", // or PATCH
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({ listFilm: newDataListFilm }),
                }
              )
                .then(() => {
                  getListFavoriteFilm_ByEmalil();
                  navigate("/film/homePage");
                })
                .catch((err) => {
                  console.log(err.message);
                });
            }
          } else if (!tasks.lengh) {
            if (
              window.confirm(
                "Bạn chắc chắn muốn thêm phim này vào danh sách yêu thích không?"
              )
            ) {
              const newTask = {
                accountEmail: localStorage.getItem("email"),
                listFilm: [test],
              };

              fetch(
                "https://64acf61eb470006a5ec514b7.mockapi.io/movie/favoriteList",
                {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  // Send your data in the request body as JSON
                  body: JSON.stringify(newTask),
                }
              )
                .then((res) => {
                  if (res.ok) {
                    return res.json();
                  }
                  // handle error
                })
                .then((task) => {
                  // do something with the new task
                  getListFavoriteFilm_ByEmalil();
                  navigate("/film/homePage");
                })
                .catch((error) => {
                  // handle error
                });
            }
          }
        })
        .catch((error) => {
          // handle error
        });
    }
  };

  // hanlerRemovelist
  const hanlerRemovelist = (test) => {
    if (localStorage.getItem("email") === null) {
      navigate("/login");
      window.location.reload();
    } else {
      fetch(
        "https://64acf61eb470006a5ec514b7.mockapi.io/movie/favoriteList?accountEmail=" +
          localStorage.getItem("email"),
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
          // email co ton tai trong favoriteList
          const listFilm = tasks[0].listFilm;
          console.log(listFilm);
          const newDataListFilm = listFilm.filter(
            (film) => film?.id !== test?.id
          );
          debugger;
          console.log(newDataListFilm);
          if (
            window.confirm(
              "Bạn chắc chắn muốn gỡ phim này khỏi danh sách yêu thích không?"
            )
          ) {
            fetch(
              `https://64acf61eb470006a5ec514b7.mockapi.io/movie/favoriteList/${tasks[0].id}`,
              {
                method: "PUT", // or PATCH
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ listFilm: newDataListFilm }),
              }
            )
              .then(() => {
                getListFavoriteFilm_ByEmalil();
                navigate("/film/homePage");
              })
              .catch((err) => {
                console.log(err.message);
              });
          }
        })
        .catch((error) => {
          // handle error
        });
    }
  };

  useMemo(() => {
    console.log("USE MEMO BEFORE");
    if (
      localStorage.getItem("email") != null &&
      localStorage.getItem("id") == null
    ) {
      console.log("USE MEMO");
      const getAccountID = () => {
        fetch(
          "https://64acf61eb470006a5ec514b7.mockapi.io/movie/account?email=" +
            localStorage.getItem("email"),
          {
            method: "GET",
            headers: { "content-type": "application/json" },
          }
        )
          .then((res) => {
            if (res.ok) {
              console.log("Successfully");
              return res.json();
            } else {
              console.log("Fail");
            }
          })
          .then((tasks) => {
            console.log(tasks[0].id);
            localStorage.setItem("id", tasks[0].id);
          })
          .catch((error) => {
            console.log("Fail: ", error);
          });
      };
      getAccountID();
    }
  }, []);
  return (
    <div className={styles["container-homepage"]}>
      {/* POPUP QC */}
      <div id="myDIV" className={styles["popupPromotion"]}>
        <Link to="/7dayfreetrial">
          <img src="https://assets.glxplay.io/images/w1200/fa2300dfbd1cf79a1ba3eb359db3c3c5.jpg" />
        </Link>
        <div className={styles["popupPromotion-close"]}>
          <CancelIcon
            sx={{ color: "#fff", cursor: "pointer" }}
            fontSize="large"
            onClick={() => {
              myFunction();
            }}
          />
        </div>
      </div>
      {/* POPUP QC */}

      {/* SHOW BILLBOARD  */}
      {test && (
        <Slider
          {...settings1}
          style={{ overflowY: "hidden", marginBottom: "20px" }}
        >
          {listFilm_billborad_homepage?.map((test, index) => (
            <div className={styles["billboard-motion"]} key={index}>
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
                    {localStorage.getItem("memberShip") === "true" ? (
                      <Link to={`/film/WatchFilm/${test?.id}`}>
                        <button className={styles["play-btn"]}>
                          <PlayArrowIcon />
                          &nbsp; Xem ngay
                        </button>
                      </Link>
                    ) : (
                      <Link to={`/pay/1`}>
                        <button className={styles["register-btn"]}>
                          <DiamondIcon />
                          &nbsp; Đăng kí gói
                        </button>
                      </Link>
                    )}
                    {listFilmFavoriteAPI?.[0]?.listFilm?.some((film) => {
                      return film?.id === test?.id;
                    }) ? (
                      <button
                        className={styles["detail-btn"]}
                        onClick={() => {
                          hanlerRemovelist(test);
                        }}
                      >
                        <BookmarkRemoveIcon />
                        &nbsp; Gỡ khỏi danh sách
                      </button>
                    ) : (
                      <button
                        className={styles["detail-btn"]}
                        onClick={() => {
                          hanlerAddMyList(test);
                        }}
                      >
                        <BookmarkAddIcon />
                        &nbsp; Thêm vào danh sách
                      </button>
                    )}
                  </Stack>
                </div>
                <div className={styles["info-wrapper"]}>
                  <Stack style={{ display: "flex" }} direction="row">
                    <p>
                      {test?.description}
                      <Link to={`/film/detailFilm/${test?.id}`}>
                        &nbsp; Xem chi tiết
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
        {/* Tổng hợp tất cả bộ phim thịnh hành*/}
        <h2
          style={{ color: "white" }}
          className={styles["container-news-title"]}
        >
          Phim Mới Hiện Đang Thịnh Hành
        </h2>
        <Slider
          {...settings}
          style={{ overflowY: "hidden", marginBottom: "20px" }}
        >
          {listFilm_Trending?.map((film, index) => (
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

        {/* Tổng hợp tất cả bộ phim kinh dị */}
        <h2
          style={{ color: "white" }}
          className={styles["container-news-title"]}
        >
          Phim Kinh Dị Phổ Biến
        </h2>
        <Slider
          {...settings}
          style={{ overflowY: "hidden", marginBottom: "20px" }}
        >
          {listFilm_Honor?.map((film, index) => (
            <div className={styles["news"]} key={index}>
              <div className={styles["news-top"]}>
                <Link to={`/film/detailFilm/${film.id}`}>
                  <img src={film.img} alt={film.title} />
                </Link>
              </div>
            </div>
          ))}
        </Slider>
        {/*  Tổng hợp tất cả bộ phim kinh dị */}

        {/* QC */}
        <div className={styles["style__RatioImage"]}>
          <Link to="/7dayfreetrial">
            <img src="https://assets.glxplay.io/images/w1264/83d20b440fb4f058f55413a93b049f00.jpg" />
          </Link>
        </div>
        {/* QC */}

        {/* Tổng hợp tất cả bộ phim Anime*/}
        <h2
          style={{ color: "white" }}
          className={styles["container-news-title"]}
        >
          Phim Anime Phổ Biến
        </h2>
        <Slider
          {...settings}
          style={{ overflowY: "hidden", marginBottom: "20px" }}
        >
          {listFilm_Ainme?.map((film, index) => (
            <div className={styles["news"]} key={index}>
              <div className={styles["news-top"]}>
                <Link to={`/film/detailFilm/${film.id}`}>
                  <img src={film.img} alt={film.title} />
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
