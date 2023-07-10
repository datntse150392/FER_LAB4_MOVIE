import React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import Button from "@mui/material/Button";
import { Paper, Stack } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import styles from "./DetailFilm.module.css";
// Icon
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
export default function DetailFilm() {
  const [value, setValue] = React.useState(0);
  const filmID = useParams();
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={1}
    >
      <div className={styles["background-image"]}>
        <div className={styles["info-container"]}>
          <div className={styles["billboard-title"]}>
            <img
              alt=""
              className={styles["title-logo"]}
              src="https://static2.vieon.vn/vieplay-image/title_card_dark/2023/05/29/igj0jqy5_title-culuanenduyen-nendene86e73a666cb111177a691d62a72d049_815_255.webp"
              title=""
            />
          </div>
          <div className={styles["info-wrapper"]}>
            <p>
              Màn bắt tay chống lại cái ác của bộ đôi trái tính - thiên tài lừa
              đảo lãnh cảm cùng luật sư đồng cảm thái quá, do Chun Woo Hee cùng
              Kim Dong Wook đóng chính.
            </p>
          </div>

          {/* info-main */}
          <div className={styles["info-main"]}>
            <div className={styles["list-type"]}>
              <div className={styles["list-actor"]}>
                <p>Diễn viên: Avin Lu, Khánh Vân, Vũ Phương Linh</p>
              </div>
              <div className={styles["list-actor"]}>
                <p>Đạo diễn: Thắng Vũ</p>
              </div>
              <div className={styles["list-actor"]}>
                <p>Thể loại: Phim Việt, Lãng mạn, Tình cảm</p>
              </div>
            </div>
          </div>
          {/* info-main */}

          <div className={styles["action"]}>
            <Stack direction={"row"}>
              <Link to={"#"}>
                <button className={styles["register-btn"]}>
                  <PlayArrowIcon />
                  Đăng kí gói
                </button>
              </Link>
              <Link to={"/film/trailerFilm/1"}>
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
      </div>
    </Paper>
  );
}
