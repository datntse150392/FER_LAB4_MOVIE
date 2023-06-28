import React from "react";
import styles from "./Modal.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import MovieIcon from "@mui/icons-material/Movie";
import { useNavigate } from "react-router-dom";
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
export default function ModalUI({ Film_detail, open, handleClose }) {
  const navigate = useNavigate();
  const convertURL = (url) => {
    return url?.replace("watch?v=", "embed/");
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ overflowY: "hidden", border: "none" }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className={styles["container-movie-film"]}>
              <embed src={convertURL(Film_detail.trailerURL)} />
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 0 }}>
            <div className={styles["container-movie-content"]}>
              <div className={styles["container-movie-content-right"]}>
                <h2 className={styles["container-movie-content-right-title"]}>
                  {Film_detail.title}
                </h2>
                <p
                  className={
                    styles["container-movie-content-right-description"]
                  }
                >
                  {Film_detail.description}
                </p>
                <button className={styles["login-btn"]}>
                  <MovieIcon />
                </button>
                {/* Lưu vào danh sách yêu thích nếu chưa có danh sách yêu thích của bộ phim này */}
                {localStorage.getItem("accessToken") &&
                  (Film_detail.myList === false ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (
                          window.confirm(
                            "Bạn chắc chắn muốn lưu phim này vào danh sách yêu thích không?"
                          )
                        ) {
                          fetch(
                            `https://6491295d2f2c7ee6c2c7cfa0.mockapi.io/Films/${Film_detail.id}`,
                            {
                              method: "PUT", // or PATCH
                              headers: { "content-type": "application/json" },
                              body: JSON.stringify({
                                myList: true,
                              }),
                            }
                          )
                            .then(() => {
                              const { scrollTop, scrollHeight, clientHeight } =
                                document.documentElement;
                              const topPosition = 0;
                              window.scrollTo({
                                top: topPosition,
                                behavior: "smooth",
                              });
                              navigate("/film/myList");
                            })
                            .catch((err) => {
                              console.log(err.message);
                            });
                        }
                      }}
                      className={styles["mylist-btn"]}
                    >
                      <FavoriteBorderIcon color="#fff" />
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (
                          window.confirm(
                            "Bạn chắc chắn muốn loại bỏ phim này ra khỏi danh sách yêu thích không?"
                          )
                        ) {
                          fetch(
                            `https://6491295d2f2c7ee6c2c7cfa0.mockapi.io/Films/${Film_detail.id}`,
                            {
                              method: "PUT", // or PATCH
                              headers: { "content-type": "application/json" },
                              body: JSON.stringify({
                                myList: false,
                              }),
                            }
                          )
                            .then(() => {
                              const { scrollTop, scrollHeight, clientHeight } =
                                document.documentElement;
                              const topPosition = 0;
                              window.scrollTo({
                                top: topPosition,
                                behavior: "smooth",
                              });
                              navigate("/film/myList");
                            })
                            .catch((err) => {
                              console.log(err.message);
                            });
                        }
                      }}
                      className={styles["mylist-btn"]}
                    >
                      <BookmarkRemoveIcon color="#fff" />
                    </button>
                  ))}
                {/* Lưu vào danh sách yêu thích nếu chưa có danh sách yêu thích của bộ phim này */}
              </div>
              <div className={styles["container-movie-content-lef"]}>
                <div className={styles["container-movie-content-lef-director"]}>
                  <span>Đạo diễn: </span>
                  <p> {Film_detail.director}</p>
                </div>
                <div className={styles["container-movie-content-lef-actor"]}>
                  <span>Diễn viên:</span>
                  <p> {Film_detail.actor}</p>
                </div>
                <div className={styles["container-movie-content-lef-type"]}>
                  <span>Thể loại: </span>
                  <p> {Film_detail.type}</p>
                </div>
                <div className={styles["container-movie-content-lef-duration"]}>
                  <span>Thời lượng: </span>
                  <p> {Film_detail.duration}</p>
                </div>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
