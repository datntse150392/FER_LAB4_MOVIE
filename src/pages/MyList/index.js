import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useParams } from "react-router-dom";
import styles from "./MyList.module.css";
import ModalUI from "./component/Modal";

// GRID
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
export default function MyList() {
  const [data, setData] = useState();

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

  // Lấy ra phim theo ID
  const filmId = useParams();
  useEffect(() => {
    getFilms();
    getListFavoriteFilm_ByEmalil();
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(listFilmFavoriteAPI);
  console.log(data);
  //----------------------------------------------------------------//
  const Film_detail = data?.find((obj) => {
    return obj.id === filmId.id;
  });

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
      <div className={styles["slider-content"]}>
        {/* Tổng hợp tất cả bộ phim yêu thích*/}
        <h2
          style={{ color: "white" }}
          className={styles["container-news-title"]}
        >
          Danh sách yêu thích
        </h2>
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 0 }}
          >
            {listFilmFavoriteAPI?.[0]?.listFilm?.map((film, index) => (
              <Grid item xs={2}>
                <div className={styles["news"]} key={index}>
                  <div className={styles["news-top"]}>
                    <Link to={`/film/detailFilm/${film.id}`}>
                      <img
                        src={film.img}
                        alt={film.title}
                        onClick={handleOpen}
                      />
                    </Link>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Tổng hợp tất cả bộ phim yêu thích */}
      </div>
    </div>
  );
}
