import React, { useEffect, useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import Button from "@mui/material/Button";
import { Paper, Stack } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import styles from "./DetailFilm.module.css";
// Icon
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { getFilmByID } from "../../api/film";
import axios from "axios";
export default function DetailFilm() {
  const [value, setValue] = React.useState(0);

  const [filmDetail, setFilmDetail] = useState();
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
  }, []);
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
              <Link to={`/film/detailFilm/${filmDetail?.id}`}>
                <button className={styles["register-btn"]}>
                  <PlayArrowIcon />
                  Đăng kí gói
                </button>
              </Link>
              <Link to={`/film/trailerFilm/${filmDetail?.id}`}>
                <button className={styles["detail-btn"]}>
                  <FavoriteBorderIcon />
                </button>
              </Link>
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
