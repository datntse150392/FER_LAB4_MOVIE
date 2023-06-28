import React from "react";
import styles from "./Modal.module.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
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
                <button className={styles["login-btn"]}>Xem Ngay</button>
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
