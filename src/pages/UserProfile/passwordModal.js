import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useMemo } from "react";

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
import FormHelperText from "@mui/material/FormHelperText";
import { Alert, AlertTitle, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from "@mui/material";


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
  const [password, setPassword] = useState();
  //SET ERROR CHO NHẬP PASSWORD MỚI VÀ REPASSWORD
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  //SET ERROR CHO NHẬP PASSWORD MỚI VÀ REPASSWORD

  //SET ERROR CHO NHẬP LẠI PASSWORD CŨ
  const [error2, setError2] = useState(false);
  const [helperText2, setHelperText2] = useState("");
  //SET ERROR CHO NHẬP LẠI PASSWORD CŨ

  const [isFinish, setIsFinish] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    formik.resetForm({ values: { ...formik.initialValues } });
    setHelperText("");
    setError(false);
    setDisplayPassword(false);
    setOpen(false);
  };

  //XỬ LÝ LẤY THÔNG TIN PASSWORD
  useMemo(() => {
    if (!password) {
      const getAccountID = async () => {
        try {
          const response = await fetch(
            "https://64acf61eb470006a5ec514b7.mockapi.io/movie/account?email=" +
            localStorage.getItem("email"),
            {
              method: "GET",
              headers: { "content-type": "application/json" },
            }
          );

          if (response.ok) {
            console.log("Successfully lấy thông tin password");
            const tasks = await response.json();
            setPassword(tasks[0].password);
          } else {
            console.log("Fail lấy thông tin password");
          }
        } catch (error) {
          console.log("Fail lấy thông tin password: ", error);
        }
      };
      getAccountID();
    }
  }, [password]);

  //XỬ LÝ HIỂN THỊ PASSWORD
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

  //XỬ LÝ SO SÁNH PASSWORD VÀ RE-PASSWORD
  const handleCompare = (password, rePassword) => {
    if (password == "" || rePassword == "") {
      setHelperText("Vui lòng nhập đầy đủ thông tin");
      setError(true);
      return false;
    } else {
      if (password == rePassword) {
        setHelperText("");
        setError(false);
        return true;
      } else {
        setHelperText("Password nhập lại không chính xác");
        setError(true);
        return false;
      }
    }
  };

  //XỬ LÝ ĐỔI GIÁ TRỊ INPUT CŨ = GIÁ TRỊ INPUT MỚI
  const handleInputChange = (event) => {
    const name = event.target.name;
    const newValue = event.nativeEvent.data || "";
    formik.setFieldValue(name, newValue);
    setHelperText("");
    setError(false);
  };

  //XỬ LÝ NHẬP PASSWORD CŨ
  const handleInputOldPassword = () => {
    const inputPassword = document.getElementById("password") || "";
    if (inputPassword == "") {
      return true;
    } else {
      if (inputPassword.value != password) {
        setError2(true);
        setHelperText2("Password nhập không chính xác");
        return false;
      } else {
        return true;
      }
    }
  };

  //XỬ LÝ ONCHANGE NHẬP PASSWORD CŨ
  const handleOnChangeOldPassword = () => {
    setHelperText2("");
    setError2(false);
  };

  //XỬ LÝ AUTO FOCUS NEXT INPUT
  const handleKeyUp = (index, event) => {
    const inputPassword1DOM = document.getElementById("inputPassword1");
    const inputPassword2DOM = document.getElementById("inputPassword2");
    const inputPassword3DOM = document.getElementById("inputPassword3");
    const inputPassword4DOM = document.getElementById("inputPassword4");
    const inputPassword5DOM = document.getElementById("inputPassword5");
    const inputPassword6DOM = document.getElementById("inputPassword6");
    const inputRepassword1 = document.getElementById("inputRepassword1");
    const inputRepassword2 = document.getElementById("inputRepassword2");
    const inputRepassword3 = document.getElementById("inputRepassword3");
    const inputRepassword4 = document.getElementById("inputRepassword4");
    const inputRepassword5 = document.getElementById("inputRepassword5");
    const inputRepassword6 = document.getElementById("inputRepassword6");
    switch (event.target.id) {
      case "inputPassword1":
        if (
          (event.keyCode >= 48 && event.keyCode <= 57) ||
          (event.keyCode >= 96 && event.keyCode <= 105)
        ) {
          inputPassword2DOM.focus();
        } else if (event.keyCode == 8) {
          inputPassword1DOM.focus();
        } else {
          inputPassword1DOM.focus();
        }
        break;
      case "inputPassword2":
        if (
          (event.keyCode >= 48 && event.keyCode <= 57) ||
          (event.keyCode >= 96 && event.keyCode <= 105)
        ) {
          inputPassword3DOM.focus();
        } else if (event.keyCode == 8) {
          inputPassword1DOM.focus();
        } else {
          inputPassword2DOM.focus();
        }
        break;
      case "inputPassword3":
        if (
          (event.keyCode >= 48 && event.keyCode <= 57) ||
          (event.keyCode >= 96 && event.keyCode <= 105)
        ) {
          inputPassword4DOM.focus();
        } else if (event.keyCode == 8) {
          inputPassword2DOM.focus();
        } else {
          inputPassword3DOM.focus();
        }
        break;
      case "inputPassword4":
        if (
          (event.keyCode >= 48 && event.keyCode <= 57) ||
          (event.keyCode >= 96 && event.keyCode <= 105)
        ) {
          inputPassword5DOM.focus();
        } else if (event.keyCode == 8) {
          inputPassword3DOM.focus();
        } else {
          inputPassword4DOM.focus();
        }
        break;
      case "inputPassword5":
        if (
          (event.keyCode >= 48 && event.keyCode <= 57) ||
          (event.keyCode >= 96 && event.keyCode <= 105)
        ) {
          inputPassword6DOM.focus();
        } else if (event.keyCode == 8) {
          inputPassword4DOM.focus();
        } else {
          inputPassword5DOM.focus();
        }
        break;
      case "inputPassword6":
        if (
          (event.keyCode >= 48 && event.keyCode <= 57) ||
          (event.keyCode >= 96 && event.keyCode <= 105)
        ) {
          inputPassword6DOM.focus();
        } else if (event.keyCode == 8) {
          inputPassword5DOM.focus();
        } else {
          inputPassword6DOM.focus();
        }
        break;

      case "inputRepassword1":
        if (
          (event.keyCode >= 48 && event.keyCode <= 57) ||
          (event.keyCode >= 96 && event.keyCode <= 105)
        ) {
          inputRepassword2.focus();
        } else if (event.keyCode == 8) {
          inputRepassword1.focus();
        } else {
          inputRepassword1.focus();
        }
        break;
      case "inputRepassword2":
        if (
          (event.keyCode >= 48 && event.keyCode <= 57) ||
          (event.keyCode >= 96 && event.keyCode <= 105)
        ) {
          inputRepassword3.focus();
        } else if (event.keyCode == 8) {
          inputRepassword1.focus();
        } else {
          inputRepassword2.focus();
        }
        break;
      case "inputRepassword3":
        if (
          (event.keyCode >= 48 && event.keyCode <= 57) ||
          (event.keyCode >= 96 && event.keyCode <= 105)
        ) {
          inputRepassword4.focus();
        } else if (event.keyCode == 8) {
          inputRepassword2.focus();
        } else {
          inputRepassword3.focus();
        }
        break;
      case "inputRepassword4":
        if (
          (event.keyCode >= 48 && event.keyCode <= 57) ||
          (event.keyCode >= 96 && event.keyCode <= 105)
        ) {
          inputRepassword5.focus();
        } else if (event.keyCode == 8) {
          inputRepassword3.focus();
        } else {
          inputRepassword4.focus();
        }
        break;
      case "inputRepassword5":
        if (
          (event.keyCode >= 48 && event.keyCode <= 57) ||
          (event.keyCode >= 96 && event.keyCode <= 105)
        ) {
          inputRepassword6.focus();
        } else if (event.keyCode == 8) {
          inputRepassword4.focus();
        } else {
          inputRepassword5.focus();
        }
        break;
      case "inputRepassword6":
        if (
          (event.keyCode >= 48 && event.keyCode <= 57) ||
          (event.keyCode >= 96 && event.keyCode <= 105)
        ) {
          inputRepassword6.focus();
        } else if (event.keyCode == 8) {
          inputRepassword5.focus();
        } else {
          inputRepassword6.focus();
        }
        break;
      default:
        break;
    }
  };

  //KHAI BÁO INITIAL VALUES
  const formik = useFormik({
    initialValues: {
      inputPassword1: "",
      inputPassword2: "",
      inputPassword3: "",
      inputPassword4: "",
      inputPassword5: "",
      inputPassword6: "",
      inputRepassword1: "",
      inputRepassword2: "",
      inputRepassword3: "",
      inputRepassword4: "",
      inputRepassword5: "",
      inputRepassword6: "",
      stringInputPassword: "",
      stringInputRePassword: "",
    },

    onSubmit: (values, { resetForm }) => {
      // Convert inputPassword1 to inputPassword6 values to a single string
      const stringPassword = Object.values(values)
        .filter((value, index) => index >= 0 && index <= 5)
        .join("");

      // Convert inputRepassword1 to inputRepassword6 values to a single string
      const stringRePassword = Object.values(values)
        .filter((value, index) => index >= 6 && index <= 11)
        .join("");

      // Update the stringInputPassword and stringInputRePassword fields in the formik values
      formik.setFieldValue("stringInputPassword", stringPassword);
      formik.setFieldValue("stringInputRePassword", stringRePassword);
      const checkedOldPassword = handleInputOldPassword();
      const checked = handleCompare(stringPassword, stringRePassword);
      if (checked && checkedOldPassword) {
        setHelperText2("");
        setError2(false);
        handleUpdateProfile(stringRePassword);
        resetForm({ values: { ...formik.initialValues } });
        handleClose();
      }
    },
  });

  const handleUpdateProfile = (values) => {
    fetch(
      `https://64acf61eb470006a5ec514b7.mockapi.io/movie/account/` +
      localStorage.getItem("id"),
      {
        method: "PUT", // or PATCH
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password: values }),
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("Successfully update password");
          setPassword(values);
          setIsFinish(true);
          return res.json();
        } else {
          console.log("Fail update password");
        }
      })
      .catch((error) => {
        console.log("Fail update password: ", error);
      });
  };

  //XỬ LÝ POPUP THÔNG BÁO
  const handleCloseFinish = () => {
    setIsFinish(false);
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
            <form onSubmit={formik.handleSubmit}>
              <Item key={1} sx={{ paddingBottom: 2 }}>
                <Typography variant="h6" color="#333333">
                  Thay đổi mật khẩu
                </Typography>
              </Item>

              {/* NHẬP LẠI PASSWORD CŨ*/}
              {password != "null" && (
                <>
                  <Item key={2} sx={{ paddingBottom: 1 }}>
                    <Typography variant="p" color="rgba(0, 0, 0, 0.6)">
                      Nhập lại mât khẩu hiện tại
                    </Typography>
                  </Item>
                  <Item key={3} sx={{ paddingBottom: 1, textAlign: "center" }}>
                    <TextField
                      id="password"
                      hiddenLabel
                      type="password"
                      variant="outlined"
                      fontFamily="'Manrope, sans-serif'"
                      onChange={handleOnChangeOldPassword}
                      defaultValue={password}
                      size="small"
                      sx={{ width: 320, color: "#333333" }}
                      InputProps={{
                        endAdornment: displayPassword ? (
                          <MyVisibilityIcon onClick={handleDisplayPassword} />
                        ) : (
                          <MyVisibilityOffIcon
                            onClick={handleDisplayPassword}
                          />
                        ),
                      }}
                    >
                      {password}
                    </TextField>
                    <FormHelperText error={error2}>
                      {helperText2}
                    </FormHelperText>
                  </Item>
                </>
              )}

              {/* END NHẬP LẠI PASSWORD CŨ*/}

              {/* NHẬP PASSWORD MỚI */}
              <Item key={4} sx={{ paddingBottom: 1 }}>
                <Typography variant="p" color="rgba(0, 0, 0, 0.6)">
                  Nhập mật khẩu mới gồm 6 chữ số
                </Typography>
              </Item>
              <Item key={5} sx={{ paddingBottom: 1 }}>
                <Grid container justifyContent={"center"}>
                  <Grid key={6} item xs={2}>
                    <MyInputPassword
                      error={error}
                      type="password"
                      name="inputPassword1"
                      id="inputPassword1"
                      onKeyUp={(event) => handleKeyUp(0, event)}
                      value={formik.values.inputPassword1}
                      onChange={handleInputChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                  <Grid key={7} item xs={2}>
                    <MyInputPassword
                      error={error}
                      type="password"
                      onKeyUp={(event) => handleKeyUp(1, event)}
                      name="inputPassword2"
                      id="inputPassword2"
                      value={formik.values.inputPassword2}
                      onChange={handleInputChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <MyInputPassword
                      error={error}
                      type="password"
                      onKeyUp={(event) => handleKeyUp(2, event)}
                      name="inputPassword3"
                      id="inputPassword3"
                      value={formik.values.inputPassword3}
                      onChange={handleInputChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                  <Grid key={8} item xs={2}>
                    <MyInputPassword
                      error={error}
                      type="password"
                      onKeyUp={(event) => handleKeyUp(3, event)}
                      name="inputPassword4"
                      id="inputPassword4"
                      value={formik.values.inputPassword4}
                      onChange={handleInputChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                  <Grid key={9} item xs={2}>
                    <MyInputPassword
                      error={error}
                      type="password"
                      onKeyUp={(event) => handleKeyUp(4, event)}
                      name="inputPassword5"
                      id="inputPassword5"
                      value={formik.values.inputPassword5}
                      onChange={handleInputChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                  <Grid key={11} item xs={2}>
                    <MyInputPassword
                      error={error}
                      type="password"
                      onKeyUp={(event) => handleKeyUp(5, event)}
                      name="inputPassword6"
                      id="inputPassword6"
                      value={formik.values.inputPassword6}
                      onChange={handleInputChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                </Grid>
              </Item>
              {/*END NHẬP PASSWORD MỚI */}

              {/*NHẬP LẠI PASSWORD MỚI */}
              <Item key={12} sx={{ paddingBottom: 1 }}>
                <Typography variant="p" color="rgba(0, 0, 0, 0.6)">
                  Nhập lại mật khẩu mới
                </Typography>
              </Item>
              <Item key={13} sx={{ paddingBottom: 1 }}>
                <Grid container justifyContent={"center"}>
                  <Grid key={14} item xs={2}>
                    <MyInputPassword
                      error={error}
                      type="password"
                      name="inputRepassword1"
                      id="inputRepassword1"
                      onKeyUp={(event) => handleKeyUp(7, event)}
                      value={formik.values.inputRepassword1}
                      onChange={handleInputChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                  <Grid key={15} item xs={2}>
                    <MyInputPassword
                      error={error}
                      type="password"
                      name="inputRepassword2"
                      id="inputRepassword2"
                      onKeyUp={(event) => handleKeyUp(8, event)}
                      value={formik.values.inputRepassword2}
                      onChange={handleInputChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                  <Grid key={16} item xs={2}>
                    <MyInputPassword
                      error={error}
                      type="password"
                      name="inputRepassword3"
                      id="inputRepassword3"
                      onKeyUp={(event) => handleKeyUp(9, event)}
                      value={formik.values.inputRepassword3}
                      onChange={handleInputChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                  <Grid key={17} item xs={2}>
                    <MyInputPassword
                      error={error}
                      type="password"
                      name="inputRepassword4"
                      id="inputRepassword4"
                      onKeyUp={(event) => handleKeyUp(10, event)}
                      value={formik.values.inputRepassword4}
                      onChange={handleInputChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                  <Grid key={18} item xs={2}>
                    <MyInputPassword
                      error={error}
                      type="password"
                      name="inputRepassword5"
                      id="inputRepassword5"
                      onKeyUp={(event) => handleKeyUp(11, event)}
                      value={formik.values.inputRepassword5}
                      onChange={handleInputChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                  <Grid key={19} item xs={2}>
                    <MyInputPassword
                      error={error}
                      type="password"
                      name="inputRepassword6"
                      id="inputRepassword6"
                      onKeyUp={(event) => handleKeyUp(11, event)}
                      value={formik.values.inputRepassword6}
                      onChange={handleInputChange}
                      onBlur={formik.handleBlur}
                    />
                  </Grid>
                </Grid>
              </Item>
              {/*END NHẬP LẠI PASSWORD MỚI */}
              <FormHelperText error={error}>{helperText}</FormHelperText>

              <MyButton2 type="submit" variant="contained" size="medium">
                Submit
              </MyButton2>
            </form>
          </Stack>
        </Box>
      </Modal>

      <Dialog
        open={isFinish}
        onClose={handleCloseFinish}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Congraturation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Alert severity="success">
              <AlertTitle>Đổi mật khẩu thành công</AlertTitle>
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseFinish}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
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

const MyInputPassword = styled(TextField)({
  width: "3rem",
  height: "2.5rem",
  fontSize: "1.5rem",
  fontWeight: "bold",
  textAlign: "center",
  background: "none",
  boxShadow: "none",
  outline: "none",
  padding: 0,
  textAlignLast: "center",
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
});

const MyButton2 = styled(Button)({
  borderRadius: "10rem",
  width: "8rem",
  "&:hover": {
    backgroundColor: "#12A7FF",
  },
});
