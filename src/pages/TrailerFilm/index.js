import React, { useEffect, useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import Button from "@mui/material/Button";
import { Paper, Stack } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import styles from "./TrailerFilm.module.css";
import axios from "axios";
// Icon
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { useTransition } from "react";

export default function TrailerFilm() {
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

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={1}
    >
      <div className={styles["motion-background"]}>
        {/* <img src={test[0]?.imgBG} /> */}
        <video
          id="myVideo"
          src={filmDetail?.trailerURL}
          style={{ height: "100%", width: "100%", overflow: "hidden" }}
          autoPlay
          muted
          loop
        />
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

        {muted ? (
          <Button
            style={{
              color: "#fff",
              position: "absolute",
              right: "8%",
            }}
            onClick={() => {
              enableMute();
            }}
          >
            <VolumeUpIcon fontSize="large" />
          </Button>
        ) : (
          <Button
            style={{
              color: "#fff",
              position: "absolute",
              right: "8%",
            }}
            onClick={() => {
              disableMute();
            }}
          >
            <VolumeOffIcon fontSize="large" />
          </Button>
        )}
      </BottomNavigation>
    </Paper>
  );
}
