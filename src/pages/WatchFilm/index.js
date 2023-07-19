import React, { useEffect, useState } from "react";
import { Paper, Stack } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import styles from "./WatchFilm.module.css";
import axios from "axios";

// Icon
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export default function WatchFilm() {
  const [value, setValue] = React.useState(0);
  const [filmDetail, setFilmDetail] = useState();
  const [muted, setMuted] = useState(true);
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

  const disableMute = () => {
    var x = document.getElementById("myVideo");
    if (x !== null) {
      x.muted = true;
      setMuted(!muted);
    }
  };

  const enableMute = () => {
    var x = document.getElementById("myVideo");
    if (x !== null) {
      x.muted = false;
      setMuted(!muted);
    }
  };

  const convertURL = (url) => {
    return url?.replace("watch?v=", "embed/");
  };
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={1}
    >
      <div className={styles["motion-background"]}>
        {/* <img src={test[0]?.imgBG} /> */}
        {/* <embed
          style={{ width: "100%", height: "100%" }}
          src={convertURL("https://www.youtube.com/watch?v=9gitpjz97ZY")}
        /> */}
        <Link to="/film/homePage">
          <div className={styles["btn-back"]}>
            <ArrowBackIosIcon fontSize="large" />
          </div>
        </Link>
        <video
          id="myVideo"
          src={filmDetail?.trailerURL}
          style={{ height: "100%", width: "100%", overflow: "hidden" }}
          autoPlay
          controls
        />
      </div>
    </Paper>
  );
}
