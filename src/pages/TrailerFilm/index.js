import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import Button from "@mui/material/Button";
import { Paper, Stack } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import styles from "./TrailerFilm.module.css";

export default function TrailerFilm() {
  const [value, setValue] = React.useState(0);
  const filmID = useParams();
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={1}
    >
      <div className={styles["motion-background"]}>
        {/* <img src={test[0]?.imgBG} /> */}
        <video
          src="https://trailer.vieon.vn/Teaser_DelightfullyDeceiful.mp4"
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
        <Link to={"/film/detailFilm/1"}>
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

        <Link to={"/film/trailerFilm/1"}>
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
    </Paper>
  );
}
