import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Grid from "@mui/material/Grid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [displayPassword, setDisplayPassword] = useState(false);

  const handleDisplayPassword = () => {
    const password = document.getElementById("password");
    setDisplayPassword(!displayPassword);
    if (displayPassword) {
      password.type = "password";
    } else {
      password.type = "text";
    }
  };

  return (
    <div>
      <TypographyLink onClick={handleOpen} variant="h6">
        Đổi mật khẩu
      </TypographyLink>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack>
            <Item sx={{ paddingBottom: 2 }}>
              <Typography variant="h6" color="#333333">
                Thay đổi mật khẩu
              </Typography>
            </Item>
            <Item sx={{ paddingBottom: 1 }}>
              <Typography variant="p" color="rgba(0, 0, 0, 0.6)">
                Nhập lại mât khẩu hiện tại
              </Typography>
            </Item>
            <Item sx={{ paddingBottom: 1, textAlign: "center" }}>
              <TextField
                hiddenLabel
                type="password"
                variant="outlined"
                fontFamily="'Manrope, sans-serif'"
                id="password"
                defaultValue="06112001"
                size="small"
                sx={{ width: 320, color: "#333333" }}
                InputProps={{
                  endAdornment: displayPassword ? (
                    <MyVisibilityIcon onClick={handleDisplayPassword} />
                  ) : (
                    <MyVisibilityOffIcon onClick={handleDisplayPassword} />
                  ),
                }}
              >
                06112001
              </TextField>
            </Item>
            <Item sx={{ paddingBottom: 1 }}>
              <Typography variant="p" color="rgba(0, 0, 0, 0.6)">
                Nhập mật khẩu mới gồm 6 chữ số
              </Typography>
            </Item>
            <Item sx={{ paddingBottom: 1 }}>
              <Grid container justifyContent={"center"}>
                <Grid item xs={2}>
                  <MyInputPassword type="text">1</MyInputPassword>
                </Grid>
                <Grid item xs={2}>
                  <MyInputPassword type="text">1</MyInputPassword>
                </Grid>
                <Grid item xs={2}>
                  <MyInputPassword type="text">1</MyInputPassword>
                </Grid>
                <Grid item xs={2}>
                  <MyInputPassword type="text">1</MyInputPassword>
                </Grid>
                <Grid item xs={2}>
                  <MyInputPassword type="text">1</MyInputPassword>
                </Grid>
                <Grid item xs={2}>
                  <MyInputPassword type="text">1</MyInputPassword>
                </Grid>
              </Grid>
            </Item>
            <Item sx={{ paddingBottom: 1 }}>
              <Typography variant="p" color="rgba(0, 0, 0, 0.6)">
                Nhập lại mật khẩu mới
              </Typography>
            </Item>
            <Item sx={{ paddingBottom: 1 }}>
              <Grid container justifyContent={"center"}>
                <Grid item xs={2}>
                  <MyInputPassword type="text">1</MyInputPassword>
                </Grid>
                <Grid item xs={2}>
                  <MyInputPassword type="text">1</MyInputPassword>
                </Grid>
                <Grid item xs={2}>
                  <MyInputPassword type="text">1</MyInputPassword>
                </Grid>
                <Grid item xs={2}>
                  <MyInputPassword type="text">1</MyInputPassword>
                </Grid>
                <Grid item xs={2}>
                  <MyInputPassword type="text">1</MyInputPassword>
                </Grid>
                <Grid item xs={2}>
                  <MyInputPassword type="text">1</MyInputPassword>
                </Grid>
              </Grid>
            </Item>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

const TypographyLink = styled(Typography)({
  fontFamily: "Manrope, sans-serif",
  fontSize: "16px",
  color: "#0a75ff",
  fontWeight: "bold",
  "&:hover": {
    color: "#12A7FF",
    transition: "color 0.5s",
    cursor: "pointer",
  },
});

const Item = styled(Paper)(({ theme }) => ({
  boxShadow: "none",
  borderRadius: 0,
  backgroundColor: "background.default",
  ...theme.typography.body2,
  paddingTop: 2,
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const MyVisibilityOffIcon = styled(VisibilityOffIcon)({
  "&:hover": {
    cursor: "pointer",
  },
});

const MyVisibilityIcon = styled(VisibilityIcon)({
  "&:hover": {
    cursor: "pointer",
  },
});

const MyInputPassword = styled(Typography)({
  width: "3rem",
  height: "100%",
  fontSize: "1.5rem",
  color: "transparent",
  textShadow: "rgb(29, 29, 29) 0px 0px 0px",
  fontWeight: "bold",
  textAlign: "center",
  background: "none",
  boxShadow: "none",
  outline: "none",
  padding: 0,
  borderRadius: "8px",
  border: "1px solid rgb(108, 108, 108)",
});
