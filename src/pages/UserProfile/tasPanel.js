import * as React from "react";
import { Link } from "react-router-dom";
import { useMemo, useEffect, useState, useLayoutEffect } from "react";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AssignmentIcon from "@mui/icons-material/Assignment";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  //Lưu gói mua gần đây
  const [recentPackage, setRecentPackage] = useState({});
  const [generatedPakage, setGeneratedPakage] = useState(false);
  //Lưu tất cả lịch sử payment của email
  const [historyPayment, setHistoryPayment] = useState([]);
  const [generatedHistory, setGeneratedHistory] = useState(false);
  //Lưu danh sách gói
  const [listPackage, setListPackage] = useState([]);
  const [generatedValue, setGeneratedValue] = useState(false);
  //Lưu danh sách Join gói đang sử dụng dùng để display
  const [joinedArray, setJoinedArray] = useState({});
  const [generatedJoinRecent, setGeneratedJoinRecent] = useState(false);
  const [isValidJoinArray, setIsValidJoinArray] = useState(false);
  //Lưu danh sách Join lịch sử giao dịch dùng để display
  const [joinedArrayPayment, setJoinedArrayPayment] = useState([]);
  const [generatedJoinPayment, setGeneratedJoinPayment] = useState(false);
  const [isValidJoinPayment, setIsValidJoinPayment] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  //XỬ LÝ LẤY GÓI PACKAGE ĐANG KÍCH HOẠT CỦA EMAIL
  useEffect(() => {
    const generateValue = () => {
      if (localStorage.getItem("email")) {
        const getPaymentByEmail = () => {
          const url = new URL(
            "https://64acf61eb470006a5ec514b7.mockapi.io/movie/payment"
          );
          url.searchParams.append(
            "accountEmail",
            localStorage.getItem("email")
          ); //https://PROJECT_TOKEN.mockapi.io/tasks?completed=false
          url.searchParams.append("sortBy", "create_Time");
          url.searchParams.append("order", "desc");
          url.searchParams.append("page", 1); //https://PROJECT_TOKEN.mockapi.io/tasks?completed=false&page=1
          url.searchParams.append("limit", 1); //https://PROJECT_TOKEN.mockapi.io/tasks?completed=false&page=1&limit=10

          fetch(url, {
            method: "GET",
            headers: { "content-type": "application/json" },
          })
            .then((res) => {
              if (res.ok) {
                console.log("LẤY GÓI KÍCH HOẠT THÀNH CÔNG");
                return res.json();
              } else {
                console.log("LẤY GÓI KÍCH HOẠT THẤT BẠI");
              }
            })
            .then((tasks) => {
              setRecentPackage(tasks[0]);
              console.log("LẤY GÓI KÍCH HOẠT THÀNH CÔNG");

              return true;
            })
            .catch((error) => {
              console.log("LẤY GÓI KÍCH HOẠT THẤT BẠI: ", error);
              return false;
            });
        };
        getPaymentByEmail();
      }
    };
    const checked = generateValue();
    setGeneratedValue(checked);
  }, []);

  //XỬ LÝ LẤY PAYMENT HISTORY
  useEffect(() => {
    const generatedHistory = () => {
      if (localStorage.getItem("email")) {
        const getHistoryPaymentByEmail = () => {
          const url = new URL(
            "https://64acf61eb470006a5ec514b7.mockapi.io/movie/payment"
          );
          url.searchParams.append(
            "accountEmail",
            localStorage.getItem("email")
          ); //https://PROJECT_TOKEN.mockapi.io/tasks?completed=false

          fetch(url, {
            method: "GET",
            headers: { "content-type": "application/json" },
          })
            .then((res) => {
              if (res.ok) {
                console.log("GET HISTORY PAYENT SUCCESSFULL");
                return res.json();
              } else {
                console.log("GET HISTORY PAYENT FAIL");
              }
            })
            .then((tasks) => {
              setHistoryPayment(tasks);
              return true;
            })
            .catch((error) => {
              console.log("GET HISTORY PAYENT FAIL: ", error);
              return false;
            });
        };
        getHistoryPaymentByEmail();
      }
    };
    const checked = generatedHistory();
    setGeneratedHistory(checked);
  }, []);

  //XỬ LÝ LẤY THÔNG TIN
  useEffect(() => {
    const generatedPakage = () => {
      if (localStorage.getItem("email")) {
        const getPackage = () => {
          const url = new URL(
            "https://64acf61eb470006a5ec514b7.mockapi.io/movie/package"
          );

          fetch(url, {
            method: "GET",
            headers: { "content-type": "application/json" },
          })
            .then((res) => {
              if (res.ok) {
                console.log("GET PACKAGE SUCCESSFULL");
                return res.json();
              } else {
                console.log("GET PACKAGE FAIL");
              }
            })
            .then((tasks) => {
              setListPackage(tasks);
              return true;
            })
            .catch((error) => {
              console.log("GET PACKAGE FAIL: ", error);
              return false;
            });
        };
        getPackage();
      }
    };
    const checked = generatedPakage();
    setGeneratedPakage(checked);
  }, []);

  //XỬ LÝ MAPPING THÀNH THÔNG TIN CHUNG
  useEffect(() => {
    if (!recentPackage?.hasOwnProperty("accountEmail")) {
      setIsValidJoinArray(false);
      setGeneratedJoinRecent(true);
    } else {
      const generateJoinedArray = () => {
        const foundPackage = listPackage.find(
          (item) => item.slug === recentPackage.packageSlug
        );
        if (foundPackage) {
          const givenDate = new Date(recentPackage.create_Time);
          const expireDate = new Date(
            givenDate.getFullYear(),
            givenDate.getMonth() + foundPackage.duration,
            givenDate.getDate()
          );
          const options = { day: "2-digit", month: "2-digit", year: "numeric" };

          const joinMain = {
            packageName: foundPackage.packageName,
            duration: foundPackage.duration,
            price: foundPackage.price,
            slug: foundPackage.slug,
            create_Time: recentPackage.create_Time,
            expireDate: expireDate.toLocaleDateString("en-GB", options),
          };
          setIsValidJoinArray(true);
          setJoinedArray(joinMain);
          return true;
        }
      };
      const checked = generateJoinedArray();
      setGeneratedJoinRecent(checked);
    }
  }, [listPackage, recentPackage, isValidJoinArray]);

  //XỬ LÝ MAPPING LỊCH SỬ THANH TOÁN
  useEffect(() => {
    if (historyPayment?.length > 0) {
      const generateJoinedArray = () => {
        const arrayTemp = [];
        const foundPackage = historyPayment.map((item) => {
          listPackage.map((itemPackage) => {
            if (item.packageSlug === itemPackage.slug) {
              const givenDate = new Date(item.create_Time);
              const options = {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              };

              const joinMain = {
                packageName: itemPackage.packageName,
                duration: itemPackage.duration,
                price: itemPackage.price,
                slug: itemPackage.slug,
                create_Time: givenDate.toLocaleDateString("en-GB", options),
              };
              arrayTemp.push(joinMain);
            }
          });
          return arrayTemp;
        });
        setJoinedArrayPayment(foundPackage);
        return true;
      };
      const checked = generateJoinedArray();
      setIsValidJoinPayment(true);
      setGeneratedJoinPayment(checked);
    } else {
      setIsValidJoinPayment(false);
      setGeneratedJoinPayment(false);
    }
  }, [listPackage, historyPayment, isValidJoinPayment]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Đăng ký gói" {...a11yProps(0)} />
          <Tab label="Lịch sử thanh toán" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Paper>
          <Grid container>
            {localStorage.getItem("memberShip") == "false" && (
              <>
                <Grid key={1} item xs={12} md={8} textAlign={"left"}>
                  <Stack>
                    <Typography variant="p" fontWeight={1000} color="#333333">
                      Bạn chưa có Gói 4AE Siêu Việt. Đăng ký ngay?
                    </Typography>
                    <Typography variant="p" color="rgba(0, 0, 0, 0.6)" textAlign={"justify"} paddingTop={2}>
                      Gói 4AE Siêu Việt với hơn 8.000 giờ phim bộ đặc sắc và các
                      siêu phẩm điện ảnh bom tấn thế giới cùng với các bộ Phim
                      Việt có phí mới nhất đang chờ bạn.
                    </Typography>
                  </Stack>
                </Grid>
                <Grid key={2} item xs={12} md={4} textAlign={{ xs: "left", md: "right" }} paddingTop={{ xs: 2, md: 0 }}>
                  <Link to="/pay/1">
                    <MyButton variant="contained" size="medium">
                      Đăng ký ngay
                    </MyButton>
                  </Link>
                </Grid>
              </>
            )}
            {localStorage.getItem("memberShip") == "true" && (
              <>
                <Grid key={1} item xs={12} md={8} textAlign={"left"}>
                  <Stack>
                    {!isValidJoinArray ? (
                      <Typography variant="p" fontWeight={1000} color="#333333">
                        "Loading..."
                      </Typography>
                    ) : (
                      <>
                        <Typography
                          variant="p"
                          fontWeight={1000}
                          color="#333333"
                        >
                          {joinedArray.packageName} - THỜI HẠN:{" "}
                          {joinedArray.duration} tháng
                        </Typography>
                      </>
                    )}

                    {!isValidJoinArray ? (
                      <Typography variant="p" color="rgba(0, 0, 0, 0.6)">
                        Loading...
                      </Typography>
                    ) : (
                      <Demo>
                        <List dense={dense}>
                          <ListItem>
                            <ListItemText>
                              <Typography variant="p">
                                Gói của bạn sẽ tự động gia hạn ngày:{" "}
                                {joinedArray.expireDate}
                              </Typography>
                            </ListItemText>
                          </ListItem>
                        </List>
                      </Demo>
                    )}
                  </Stack>
                </Grid>
                <Grid key={2} item xs={4} display={{ xs: "none", md: "block" }} textAlign={"right"}>
                  <Avatar variant="square">
                    <img
                      id="logo"
                      src="//assets.glxplay.io/web/images/logoglx.svg"
                      width="200"
                    ></img>
                  </Avatar>
                </Grid>
              </>
            )}
          </Grid>
        </Paper>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {localStorage.getItem("memberShip") == "false" && !isValidJoinPayment && (
          <Item3 sx={{ borderRadius: 2, marginX: { xs: 2, md: 10 } }}>
            <Stack>
              <Item2 sx={{ paddingTop: 2, paddingBottom: 2, paddingX: 2 }}>
                <Grid container>
                  <Grid item xs={12} textAlign={"center"} alignSelf={"center"}>
                    <Typography variant="p" fontWeight={1000} color={"#333333"}>
                      Chưa có thông tin lịch sử thanh toán
                    </Typography>
                  </Grid>
                </Grid>
              </Item2>
            </Stack>
          </Item3>
        )}
        {localStorage.getItem("memberShip") == "true" && isValidJoinPayment && (
          <>
            {!generatedJoinPayment ? (
              <Item3 sx={{ borderRadius: 2, marginX: { xs: 2, md: 10 } }}>
                <Stack>
                  <Item1 key={1} sx={{ paddingTop: 2, paddingBottom: 2, paddingX: 2 }}>
                    <Grid container>
                      <Grid
                        item
                        xs={10}
                        textAlign={"left"}
                        alignSelf={"center"}
                      >
                        <Typography variant="p" color={"#333333"}>
                          Thời gian: Loading...
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={2}
                        textAlign={"right"}
                        alignSelf={"center"}
                      >
                        <Typography variant="p" color={"#333333"}>
                          Giá: Loading...
                        </Typography>
                      </Grid>
                    </Grid>
                  </Item1>
                  <Item2 key={2} sx={{ paddingTop: 2, paddingBottom: 2, paddingX: 2 }}>
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        textAlign={"left"}
                        alignSelf={"center"}
                      >
                        <Typography variant="p" color={"#333333"}>
                          Tên gói: Loading...
                        </Typography>
                      </Grid>
                    </Grid>
                  </Item2>
                </Stack>
              </Item3>
            ) : (
              joinedArrayPayment?.[0]?.map((item, index) => (
                <>
                  <Item3 key={index} sx={{ borderRadius: 2, marginX: { xs: 2, md: 10 } }}>
                    <Stack>
                      <Item1 key={1}
                        sx={{ paddingTop: 2, paddingBottom: 2, paddingX: 2 }}
                      >
                        <Grid container>
                          <Grid
                            item
                            xs={10}
                            textAlign={"left"}
                            alignSelf={"center"}
                          >
                            <Typography variant="p" color={"#333333"}>
                              Thời gian:{" "}
                              {joinedArrayPayment?.[0]?.[index]?.create_Time}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={2}
                            textAlign={"right"}
                            alignSelf={"center"}
                          >
                            <Typography variant="p" color={"#333333"}>
                              Giá: {joinedArrayPayment?.[0]?.[index]?.price}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Item1>
                      <Item2 key={2}
                        sx={{ paddingTop: 2, paddingBottom: 2, paddingX: 2 }}
                      >
                        <Grid container>
                          <Grid
                            item
                            xs={12}
                            textAlign={"left"}
                            alignSelf={"center"}
                          >
                            <Typography variant="p" color={"#333333"}>
                              Tên gói:{" "}
                              {joinedArrayPayment?.[0]?.[index]?.packageName}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Item2>
                    </Stack>
                  </Item3>
                </>
              ))
            )}
          </>
        )}
      </CustomTabPanel>
    </Box>
  );
}

const MyButton = styled(Button)({
  "&:hover": {
    backgroundColor: "#12A7FF",
  },
});

const ItemRight = styled(Paper)(({ theme }) => ({
  boxShadow: "none",
  borderRadius: 0,
  backgroundColor: "background.default",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const Item3 = styled(Paper)(({ theme }) => ({
  borderRadius: 10,
  backgroundColor: "background.default",
  ...theme.typography.body2,
  textAlign: "center",
  borderRadius: 2,
  color: theme.palette.text.secondary,
  margin: 1,
  marginBottom: 50,
}));

const Item2 = styled(Paper)(({ theme }) => ({
  boxShadow: "none",
  borderRadius: 0,
  backgroundColor: "background.default",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Item1 = styled(Paper)(({ theme }) => ({
  boxShadow: "none",
  borderRadius: 0,
  backgroundColor: "#E3E6E8",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
