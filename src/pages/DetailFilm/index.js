import React, { useEffect, useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import Button from "@mui/material/Button";
import { Paper, Stack } from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import styles from "./DetailFilm.module.css";
// Icon
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import axios from "axios";
export default function DetailFilm() {
  const [value, setValue] = React.useState(0);
  const [filmDetail, setFilmDetail] = useState();
  const navigate = useNavigate();
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
  // Get Params
  const FilmID = useParams();
  async function getFilmByID(id) {
    try {
      const response = await axios.get(
        "https://64acf61eb470006a5ec514b7.mockapi.io/movie/movie/" + id
      );
      setFilmDetail(response?.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getFilmByID(FilmID.id);
    getListFavoriteFilm_ByEmalil();
  }, []);

  // hanler add my list
  const hanlerAddMyList = (filmDetail, id) => {
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
            const newDataListFilm = [...listFilm, filmDetail];
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
                  navigate(`/film/detailFilm/${id}`);
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
                listFilm: [filmDetail],
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
                  navigate(`/film/detailFilm/${id}`);
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
  const hanlerRemovelist = (filmDetail, id) => {
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
            (film) => film?.id !== filmDetail?.id
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
                navigate(`/film/detailFilm/${id}`);
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
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={1}
    >
      <div
        style={{
          backgroundSize: "cover",
          backgroundImage: `linear-gradient(to right bottom,rgba(0, 0, 0, 0.44),rgba(63, 60, 60, 0.715)),url(${filmDetail?.imgBG})`,
        }}
        className={styles["background-image"]}
      >
        <div className={styles["info-container"]}>
          <div className={styles["billboard-title"]}>
            <img
              alt=""
              className={styles["title-logo"]}
              src={filmDetail?.imgLogo}
              title=""
            />
          </div>
          <div className={styles["info-wrapper"]}>
            <p>{filmDetail?.description}</p>
          </div>

          {/* info-main */}
          <div className={styles["info-main"]}>
            <div className={styles["list-type"]}>
              <div className={styles["list-actor"]}>
                <p>Diễn viên: {filmDetail?.actor}</p>
              </div>
              <div className={styles["list-actor"]}>
                <p>Đạo diễn: {filmDetail?.director}</p>
              </div>
              <div className={styles["list-actor"]}>
                <p>Thể loại: {filmDetail?.type}</p>
              </div>
            </div>
          </div>
          {/* info-main */}

          <div className={styles["action"]}>
            <Stack direction={"row"}>
              {localStorage.getItem("memberShip") === "true" ? (
                <Link to={`/film/WatchFilm/${filmDetail?.id}`}>
                  <button className={styles["play-btn"]}>
                    <PlayArrowIcon />
                    &nbsp; Xem ngay
                  </button>
                </Link>
              ) : (
                <Link to={`/pay/1`}>
                  <button className={styles["register-btn"]}>
                    <PlayArrowIcon />
                    &nbsp; Đăng kí gói
                  </button>
                </Link>
              )}
              {listFilmFavoriteAPI?.[0]?.listFilm?.some((film) => {
                return film?.id === filmDetail?.id;
              }) ? (
                <button
                  className={styles["detail-btn"]}
                  onClick={() => {
                    hanlerRemovelist(filmDetail, filmDetail?.id);
                  }}
                >
                  <BookmarkRemoveIcon />
                </button>
              ) : (
                <button
                  className={styles["detail-btn"]}
                  onClick={() => {
                    hanlerAddMyList(filmDetail, filmDetail?.id);
                  }}
                >
                  <FavoriteBorderIcon />
                </button>
              )}
            </Stack>
          </div>
        </div>
        <BottomNavigation
          sx={{
            position: "fixed",
            bottom: 15,
            left: 0,
            right: 0,
            backgroundColor: "transparent",
            fontSize: "30px",
          }}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <Link to={`/film/detailFilm/${filmDetail?.id}`}>
            <Button
              variant="text"
              sx={{
                color: "#C0C0C0",
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "35px",
                margin: "0 40px",
                textAlign: "center",
              }}
            >
              Tổng quan
            </Button>
          </Link>

          <Link to={`/film/trailerFilm/${filmDetail?.id}`}>
            <Button
              variant="text"
              sx={{
                color: "#C0C0C0",
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "35px",
                margin: "0 40px",
                textAlign: "center",
              }}
            >
              TRAILER
            </Button>
          </Link>
        </BottomNavigation>
      </div>
    </Paper>
  );
}
