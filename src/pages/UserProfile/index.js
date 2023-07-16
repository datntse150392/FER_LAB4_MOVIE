import React, { useState } from "react";
import BasicTabs from "./tasPanel";
import BasicModal from "./passwordModal";

//IMPORT MUI
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function UserProfile() {
  const [updateAccount, setUpdateAccount] = useState(false);
  //Chỉnh sửa tài khoản
  const handleChangeAccount = () => {
    setUpdateAccount(!updateAccount);
  };

  return (
    <Box sx={{ flexGrow: 1, marginTop: 9, width: "100%", height: 600 }}>
      <Grid
        container
        paddingX={10}
        sx={{ bgcolor: "white", height: "100%", width: "100%" }}
      >
        <Grid
          item
          direction={"column"}
          xs={3}
          sx={{
            overflowY: "hidden",
            height: "100%",
            bgcolor: "rgb(245, 245, 245)",
          }}
        >
          <Grid item xs={5} sx={{ overflowY: "hidden", padding: 0 }}>
            <StyledPaper>
              <Stack>
                <Item sx={{ paddingTop: 2 }}>
                  <svg
                    version="1.1"
                    id="icon-premium"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    height="4rem"
                    width="4rem"
                    viewBox="0 0 370.04 370.04"
                    fill="rgba(0,0,0,0.28)"
                  >
                    <g>
                      <g id="Layer_5_21_">
                        <g>
                          <path d="M341.668,314.412c0,0-41.071-70.588-48.438-83.248c8.382-2.557,17.311-4.815,21.021-11.221 c6.183-10.674-4.823-28.184-1.933-39.625c2.977-11.775,20.551-21.964,20.551-33.933c0-11.661-18.169-25.284-21.148-36.99 c-2.91-11.439,8.063-28.968,1.86-39.629c-6.203-10.662-26.864-9.786-35.369-17.97c-8.751-8.422-8.724-29.028-19.279-34.672 c-10.598-5.665-27.822,5.784-39.589,3.072C207.711,17.515,197.318,0,185.167,0c-12.331,0-31.944,19.868-35.02,20.583 c-11.761,2.734-29.007-8.687-39.594-2.998c-10.545,5.663-10.48,26.271-19.215,34.707c-8.491,8.199-29.153,7.361-35.337,18.035 c-6.183,10.672,4.823,28.178,1.934,39.625c-2.897,11.476-21.083,23.104-21.083,36.376c0,11.97,17.618,22.127,20.613,33.896 c2.911,11.439-8.062,28.966-1.859,39.631c3.377,5.805,11.039,8.188,18.691,10.479c0.893,0.267,2.582,1.266,1.438,2.933 c-5.235,9.036-47.37,81.755-47.37,81.755c-3.352,5.784-0.63,10.742,6.047,11.023l32.683,1.363 c6.677,0.281,15.053,5.133,18.617,10.786l17.44,27.674c3.564,5.653,9.219,5.547,12.57-0.236c0,0,48.797-84.246,48.817-84.27 c0.979-1.144,1.963-0.909,2.434-0.509c5.339,4.546,12.782,9.081,18.994,9.081c6.092,0,11.733-4.269,17.313-9.03 c0.454-0.387,1.559-1.18,2.367,0.466c0.013,0.026,48.756,83.811,48.756,83.811c3.36,5.776,9.016,5.874,12.569,0.214 l17.391-27.707c3.554-5.657,11.921-10.528,18.598-10.819l32.68-1.424C342.315,325.152,345.028,320.187,341.668,314.412z M239.18,238.631c-36.136,21.023-79.511,18.77-112.641-2.127c-48.545-31.095-64.518-95.419-35.335-145.788 c29.516-50.95,94.399-68.928,145.808-40.929c0.27,0.147,0.537,0.299,0.805,0.449c0.381,0.211,0.761,0.425,1.14,0.641 c15.86,9.144,29.613,22.415,39.461,39.342C308.516,141.955,290.915,208.533,239.18,238.631z"></path>
                          <path d="M230.916,66.103c-0.15-0.087-0.302-0.168-0.452-0.254C203.002,49.955,168,48.793,138.665,65.86 c-43.532,25.326-58.345,81.345-33.019,124.876c7.728,13.284,18.318,23.888,30.536,31.498c1.039,0.658,2.09,1.305,3.164,1.927 c43.579,25.247,99.568,10.333,124.814-33.244C289.405,147.338,274.495,91.35,230.916,66.103z M241.818,137.344l-15.259,14.873 c-4.726,4.606-7.68,13.698-6.563,20.203l3.602,21.001c1.116,6.505-2.75,9.314-8.592,6.243l-18.861-9.916 c-5.842-3.071-15.401-3.071-21.243,0l-18.86,9.916c-5.842,3.071-9.709,0.262-8.593-6.243l3.602-21.001 c1.116-6.505-1.838-15.597-6.564-20.203l-15.258-14.873c-4.727-4.606-3.249-9.152,3.282-10.102l21.086-3.064 c6.531-0.949,14.265-6.568,17.186-12.486l9.43-19.107c2.921-5.918,7.701-5.918,10.621,0l9.431,19.107 c2.921,5.918,10.654,11.537,17.186,12.486l21.086,3.064C245.067,128.192,246.544,132.738,241.818,137.344z"></path>
                        </g>
                      </g>
                    </g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                  </svg>
                  <Typography variant="h6" fontWeight={1000} color="#333333">
                    0903.802.264
                  </Typography>
                </Item>
                <Item>
                  <Typography variant="p" color={"#333333"}>
                    Bạn chưa có gói 4AE Movie
                  </Typography>
                </Item>
                <Item>
                  <MyButton variant="contained" size="medium">
                    Đăng ký gói
                  </MyButton>
                </Item>
              </Stack>
            </StyledPaper>
          </Grid>
          <Grid item xs={7}>
            <Paper>
              <Stack>
                <Item2 sx={{ paddingTop: 2, paddingBottom: 2 }}>
                  <Grid container>
                    <Grid item xs={2}>
                      <PersonIcon sx={{ color: "#333333", height: "100%" }} />
                    </Grid>
                    <Grid item xs={10} textAlign={"left"} alignSelf={"center"}>
                      <Typography variant="p" color={"#333333"}>
                        Tài khoản
                      </Typography>
                    </Grid>
                  </Grid>
                </Item2>

                <Item2 sx={{ paddingTop: 2, paddingBottom: 2 }}>
                  <Grid container>
                    <Grid item xs={2}>
                      <LogoutIcon sx={{ color: "#333333", height: "100%" }} />
                    </Grid>
                    <Grid item xs={10} textAlign={"left"} alignSelf={"center"}>
                      <Typography variant="p" color={"#333333"}>
                        Đăng xuất
                      </Typography>
                    </Grid>
                  </Grid>
                </Item2>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={9} sx={{ height: "100%", width: "100%" }}>
          <Grid xs={12} sx={{ marginLeft: 3 }}>
            <StyledPaper>
              <Stack>
                <ItemRight sx={{ paddingTop: 2 }}>
                  <Grid container>
                    <Grid xs={9}>
                      <Typography variant="h6" color="#333333">
                        Thông tin tài khoản
                      </Typography>
                    </Grid>
                    <Grid xs={3} textAlign={"right"}>
                      <Link
                        href="#"
                        onClick={handleChangeAccount}
                        underline="none"
                      >
                        <TypographyLink variant="h6">Chỉnh sửa</TypographyLink>
                      </Link>
                    </Grid>
                  </Grid>
                </ItemRight>
                <ItemRight>
                  <Grid container alignItems={"center"}>
                    <Grid xs={2}>
                      <Typography variant="p">Họ và tên</Typography>
                    </Grid>
                    <Grid xs={6}>
                      <TextField
                        hiddenLabel
                        variant="outlined"
                        width={200}
                        id="accountName"
                        defaultValue="Nguyễn Huy Khải"
                        size="small"
                        sx={{ width: 290 }}
                        InputProps={{
                          readOnly: !updateAccount,
                        }}
                      />
                    </Grid>
                  </Grid>
                </ItemRight>
                <ItemRight>
                  <Grid container alignItems={"center"}>
                    <Grid xs={2}>
                      <Typography variant="p">Email</Typography>
                    </Grid>
                    <Grid xs={6}>
                      <TextField
                        hiddenLabel
                        variant="outlined"
                        width={250}
                        id="filled-hidden-label-small"
                        defaultValue="khainhse161766@fpt.edu.vn"
                        size="small"
                        sx={{ width: 290 }}
                        InputProps={{
                          readOnly: !updateAccount,
                          endAdornment: <CheckCircleIcon color="success" />,
                        }}
                      />
                    </Grid>
                  </Grid>
                </ItemRight>
                <ItemRight>
                  <Grid container alignItems={"center"}>
                    <Grid xs={2}>
                      <Typography variant="p">Giới tính</Typography>
                    </Grid>
                    <Grid xs={6}>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue={"female"}
                      >
                        <CustomFormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Nữ"
                          sx={{
                            pointerEvents: updateAccount ? "auto" : "none",
                          }}
                        />
                        <CustomFormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Nam"
                          sx={{
                            pointerEvents: updateAccount ? "auto" : "none",
                          }}
                        />
                        <CustomFormControlLabel
                          value="other"
                          control={<Radio />}
                          label="Khác"
                          sx={{
                            pointerEvents: updateAccount ? "auto" : "none",
                          }}
                        />
                      </RadioGroup>
                    </Grid>
                  </Grid>
                </ItemRight>
                <ItemRight>
                  <Grid container alignItems={"center"}>
                    <Grid xs={2}>
                      <Typography variant="p">Số điện thoại</Typography>
                    </Grid>
                    <Grid xs={6}>
                      <Typography variant="p" color={"#333333"}>
                        0903 802 264
                      </Typography>
                    </Grid>
                  </Grid>
                </ItemRight>

                {updateAccount && (
                  <ItemRight>
                    <Grid container alignItems={"center"}>
                      <Grid xs={2}></Grid>
                      <Grid xs={4}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <MyButton2 variant="contained" size="medium">
                            Lưu
                          </MyButton2>
                          <MyButton3 variant="outlined" size="medium">
                            Hủy
                          </MyButton3>
                        </Box>
                      </Grid>
                    </Grid>
                  </ItemRight>
                )}

                <ItemRight>
                  <Grid container alignItems={"center"}>
                    <Grid xs={2}>
                      <Typography variant="p">Mật khẩu</Typography>
                    </Grid>
                    <Grid xs={6}>
                      <TextField
                        hiddenLabel
                        type="password"
                        variant="outlined"
                        fontFamily="'Manrope, sans-serif'"
                        width={200}
                        id="filled-hidden-label-small"
                        defaultValue="Nguyễn Huy Khải"
                        size="small"
                        sx={{ width: 290, color: "#333333" }}
                        InputProps={{
                          readOnly: true,
                        }}
                      >
                        06112001
                      </TextField>
                    </Grid>
                    <Grid xs={4} textAlign={"right"}>
                      <BasicModal />
                    </Grid>
                  </Grid>
                </ItemRight>
              </Stack>
            </StyledPaper>
          </Grid>
          <Grid xs={12} sx={{ marginLeft: 3 }}>
            <StyledPaperRight>
              <Stack>
                <ItemRight sx={{ paddingTop: 2 }}>
                  <Typography variant="h6" color="#333333">
                    Tài khoản
                  </Typography>
                </ItemRight>
                <ItemRight>
                  <BasicTabs />
                </ItemRight>
              </Stack>
            </StyledPaperRight>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  boxShadow: "none",
  borderRadius: 0,
  backgroundColor: "rgb(245, 245, 245)",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Item2 = styled(Paper)(({ theme }) => ({
  boxShadow: "none",
  borderRadius: 0,
  backgroundColor: "rgb(245, 245, 245)",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  "&:hover": {
    backgroundColor: "rgba(0,119,200,0.2)",
    color: "black",
    cursor: "pointer",
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginBottom: 1,
  borderRadius: 0,
  backgroundColor: "rgb(245, 245, 245)",
  ...theme.typography.body2,
  color: theme.palette.text.primary,
}));

const StyledPaperRight = styled(Paper)(({ theme }) => ({
  marginBottom: 1,
  borderRadius: 0,
  backgroundColor: "background.default",
  ...theme.typography.body2,
  color: theme.palette.text.primary,
}));

const ItemRight = styled(Paper)(({ theme }) => ({
  boxShadow: "none",
  borderRadius: 0,
  backgroundColor: "background.default",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const CustomFormControlLabel = styled(FormControlLabel)({
  fontFamily: "Manrope, sans-serif",
  fontSize: "16px",
  color: "#333333",
});

const TypographyLink = styled(Typography)({
  fontFamily: "Manrope, sans-serif",
  fontSize: "16px",
  color: "#0a75ff",
  fontWeight: "bold",
  "&:hover": {
    color: "#12A7FF",
    transition: "color 0.5s",
  },
});

const MyButton = styled(Button)({
  "&:hover": {
    backgroundColor: "#12A7FF",
  },
});

const MyButton2 = styled(Button)({
  borderRadius: "10rem",
  width: "8rem",
  "&:hover": {
    backgroundColor: "#12A7FF",
  },
});

const MyButton3 = styled(Button)({
  borderRadius: "10rem",
  width: "8rem",
});
