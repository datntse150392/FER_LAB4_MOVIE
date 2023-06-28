import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useParams } from "react-router-dom";
import styles from "./MyList.module.css";
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

export default function MyList() {
  const [listFilm_Honor, setListFilm_Honor] = useState();
  const [listFilm_myList, setListFilm_myList] = useState();
  const [listFilm_myList_2, setListFilm_myList_2] = useState();
  const [listFilm_myList_3, setListFilm_myList_3] = useState();

  const [film_detail, setFilm_detail] = useState();
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
  // Lọc ra những bộ phim mới và Trending page 1 list 6
  const getListFilm_myList = () => {
    const url = new URL("https://6491295d2f2c7ee6c2c7cfa0.mockapi.io/Films");
    url.searchParams.append("myList", true);
    url.searchParams.append("isActive", true);
    url.searchParams.append("page", 1);
    url.searchParams.append("limit", 6);
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
        setListFilm_myList(tasks);
      })
      .catch((error) => {
        // handle error
      });
  };
  // Lọc ra những bộ phim mới và Trending page 2 list 6
  const getListFilm_myList_2 = () => {
    const url = new URL("https://6491295d2f2c7ee6c2c7cfa0.mockapi.io/Films");
    url.searchParams.append("myList", true);
    url.searchParams.append("isActive", true);
    url.searchParams.append("page", 2);
    url.searchParams.append("limit", 6);
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
        setListFilm_myList_2(tasks);
      })
      .catch((error) => {
        // handle error
      });
  };
  // Lọc ra những bộ phim mới và Trending page 2 list 6
  const getListFilm_myList_3 = () => {
    const url = new URL("https://6491295d2f2c7ee6c2c7cfa0.mockapi.io/Films");
    url.searchParams.append("myList", true);
    url.searchParams.append("isActive", true);
    url.searchParams.append("page", 3);
    url.searchParams.append("limit", 6);
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
        setListFilm_myList_3(tasks);
      })
      .catch((error) => {
        // handle error
      });
  };
  // Lấy ra phim theo ID
  const filmId = useParams();

  useEffect(() => {
    getFilms();
    getListFilm_myList_2();
    getListFilm_myList();
    getListFilm_myList_3();
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //----------------------------------------------------------------//
  const Film_detail = data?.find((obj) => {
    return obj.id == filmId.id;
  });
  const convertURL = (url) => {
    return url?.replace("watch?v=", "embed/");
  };

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
      <div className={styles["slider-content"]}>
        {/* Tổng hợp tất cả bộ phim yêu thích*/}
        <h2
          style={{ color: "white" }}
          className={styles["container-news-title"]}
        >
          Danh sách yêu thích
        </h2>
        <Slider
          {...settings}
          style={{ overflowY: "hidden", marginBottom: "20px" }}
        >
          {listFilm_myList?.map((film, index) => (
            <div className={styles["news"]} key={index}>
              <div className={styles["news-top"]}>
                <Link to={`/film/myList/${film.id}`}>
                  <img src={film.img} alt={film.title} onClick={handleOpen} />
                </Link>
              </div>
            </div>
          ))}
        </Slider>
        <Slider
          {...settings}
          style={{ overflowY: "hidden", marginBottom: "20px" }}
        >
          {listFilm_myList_2?.map((film, index) => (
            <div className={styles["news"]} key={index}>
              <div className={styles["news-top"]}>
                <Link to={`/film/myList/${film.id}`}>
                  <img src={film.img} alt={film.title} onClick={handleOpen} />
                </Link>
              </div>
            </div>
          ))}
        </Slider>
        <Slider
          {...settings}
          style={{ overflowY: "hidden", marginBottom: "20px" }}
        >
          {listFilm_myList_3?.map((film, index) => (
            <div className={styles["news"]} key={index}>
              <div className={styles["news-top"]}>
                <Link to={`/film/myList/${film.id}`}>
                  <img src={film.img} alt={film.title} onClick={handleOpen} />
                </Link>
              </div>
            </div>
          ))}
        </Slider>
        {/* Tổng hợp tất cả bộ phim yêu thích */}
      </div>
    </div>
  );
}
