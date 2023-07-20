import {
  Alert,
  AlertTitle,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@mui/material";
import { Stack } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Payment.css";
import PaypalModal from "./Paypal";
//outside function

export default function Payment() {
  const [isFinish, setIsFinish] = useState(false);
  const [reset, setReset] = useState(false);
  const packageURL =
    "https://64acf61eb470006a5ec514b7.mockapi.io/movie/package";
  const [Package, setPackage] = useState({});
  const [open, setOpen] = useState(false);
  const [isPaypal, setPaypal] = useState(false);
  const PackageID = useParams();
  console.log("Packaged ID: ", PackageID);
  const navigate = useNavigate();
  //Create and Format currentDate
  var currentDate = new Date(Date.now());
  var random = 0;

  //PopUp finish
  const handleCloseFinish = () => {
    setIsFinish(false);
    navigate("/film/homePage");
  };

  //Expire Date
  function formatDate(id) {
    var month = 1;
    switch (id) {
      case "2":
        month = 3;
        break;
      case "3":
        month = 6;
        break;
      case "4":
        month = 12;
        break;
    }

    const today = new Date();
    let yyyy = today.getFullYear();
    let mm = today.getMonth() + month + 1; // Months start at 0!
    let dd = today.getDate();
    if (mm > 12) {
      yyyy += 1;
      mm -= 12;
    }

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = dd + "/" + mm + "/" + yyyy;
    return formattedToday;
  }

  const expiredDate = useMemo(() => formatDate(PackageID.id), [PackageID.id]);
  //Format price by VND locale
  var x = Package.salePrice || 0;
  x = x.toLocaleString("it-IT", { style: "currency", currency: "VND" });

  function handleOnChange(e) {

    switch (e.target.value) {
      case "1":
        navigate("/pay/1");
        break;
      case "2":
        navigate("/pay/2");
        break;
      case "3":
        navigate("/pay/3");
        break;
      case "4":
        navigate("/pay/4");
        // expireDate.setMonth(expireDate.getMonth() + 12);
        break;
        setReset(!reset);
    }
  }

  useEffect(() => {
    fetch(packageURL + "/" + PackageID.id)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setPackage(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [PackageID.id]);

  const paymentInformationContentItemStyle = {
    display: "flex",
    minHeight: "2rem",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "0.5rem",
  };

  const pStyle = {
    color: "rgb(51, 51, 51)",
    textAlign: "left",
    fontSize: "16px",
    marginBottom: "10px",
  };

  //style configuration of modal timeout
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "15px",
  };

  // function called if the countdown is finish;
  const Completionist = () => {
    setOpen(true);
    return <span>Payment is out of time !</span>;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  //Refresh countdown when user change payment or change package
  function refreshTime(e) {
    handleEventClickPayment(e);

    if (reset === true) {
      setReset(false);
    }
    if (reset === false) {
      setReset(true);
    }

  }

  useEffect(() => { }, [reset]);



  const handlePaymentOnClickActive = (paymentItem) => {
    const paymentMethodActive = document.querySelector(
      ".payment-method-item.active"
    );
    if (paymentMethodActive != null) {
      paymentMethodActive.classList.remove("active");
    }
    paymentItem.closest(".payment-method-item").classList.add("active");
  };

  const handleEventClickPayment = (e) => {
    const paymentItem = e.target;
    if (paymentItem.closest(".visa")) {
      setPaypal(true);
    } else {
      setPaypal(false);
    }
    handlePaymentOnClickActive(paymentItem);
  };

  //OUTLINE FUNCTION

  function convertVNDtoUSD(amount) {
    return Math.round(Math.round(amount / 23000));
  }

  var price = convertVNDtoUSD(Package.salePrice);
  //END OUTLINE FUNCTION

  // Generate the QR code
  const PaymentHisURL = "https://oauth.casso.vn/v2/transactions";
  const headers = {
    Authorization:
      "Apikey AK_CS.a275bac0246711ee95443fd42c1b6bc4.zlCQg686SfppFHtZfqTOSmoWA4MBHkbygy0tYmNVXTB3rflgqlXqGYeiSwQUejelVksl8Jm1",
  };

  function refreshTime2(e) {
    handleEventClickPayment(e);
    random = parseInt(Math.random() * 100000);
    if (sessionStorage.getItem("specialNum") == null) {
      sessionStorage.setItem("specialNum", random);
    }

    if (reset === true) {
      setReset(false);
    }
    if (reset === false) {
      setReset(true);
    }

    const intervalID = setInterval(() => {
      fetch(PaymentHisURL, { headers })
        .then((response) => response.json())
        .then((data) => {
          // Xử lý dữ liệu ở đây

          var filtered = data.data.records.filter((record) => {
            return record.description.includes(
              sessionStorage.getItem("specialNum")

            );
          });
          if (filtered.length !== 0) {
            setIsFinish(true);

            handlePaymentSubmit_Qr(filtered[0]);
            sessionStorage.removeItem("specialNum");
            clearInterval(intervalID);
          }
        })
        .catch((error) => {
          // Xử lý lỗi ở đây
          console.error(error);
        });
    }, 60000);
  }
  //Thêm payment vô trong mockAPI
  async function handleChangeStatusAccount_Qr(accountID) {
    const res = await fetch(
      "https://64acf61eb470006a5ec514b7.mockapi.io/movie/account/" + accountID,
      {
        method: "PUT", // or 'PUT'
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberShip: true,
          expiredDate: expiredDate,
        }),
      }
    );

    const result = res.json();
    console.log(result);
    if (!res.ok) {
      return new Error("HTTP has occured error at: " + res.status);
    }
    return;
  }

  async function handlePaymentSubmit_Qr(QrData) {
    const accountEmail = localStorage.getItem("email");
    const data = {
      accountEmail: accountEmail,
      payer: {
        email: "sb-i8ana26795360@personal.example.com",
        payerID: QrData.accountId,
      },
      orderID: QrData.tid,
      status: "COMPLETED",
      purchase_Time: QrData.when,
      create_Time: QrData.when,
      description: QrData.description,
      paymentMethod: QrData.bankCodeName,
      packageSlug: Package.slug,
      price: {
        currency_VN: QrData.amount,
        currency_EN: 0,
      },
      currencyCode: "VND",
    };
    try {
      const res = await fetch(
        "https://64acf61eb470006a5ec514b7.mockapi.io/movie/payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = res.json();
      if (result) {
        const accountID = localStorage.getItem("id");
        handleChangeStatusAccount_Qr(accountID);
      }
      return result;
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  return (
    <div
      style={{
        margin: "0 50px",
      }}
    >
      {/* <Container maxWidth="lg"> */}
      <Box
        sx={{
          marginTop: "100px",
          bgcolor: "#FDFEFE",
          height: "100%",
          borderRadius: "7px 7px 0 0",
          padding: "20px 40px",
        }}
      >
        <div className="wrapper-header">
          <div className="header-title">
            <h1>Phương thức thanh toán</h1>
          </div>
          <p className="header-subtitle">Hủy bất cứ lúc nào</p>
          <br></br>
          <div className="line-header"></div>
        </div>
        {/* <div className="wrapper-body">
                        <div className="wrapper-package-body">
                            <div className="package-left">

                            </div>
                            <div className="package-right">

                            </div>
                        </div>
                    </div> */}

        <Grid container rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={5.4} marginRight={"3rem"}>
            <div
              className="wrapper-payment-top-left"
              style={{
                backgrdoundColor: "white",
                padding: "1.5rem",
                margin: "0px auto 1.5rem",
                borderRadius: "6px",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 8px 0px",
              }}
            >
              <div className="payment-radio">
                <p className="payment-term-header">Các gói thanh toán</p>
                <div className="input-package-section">
                  <div className="input-package-content">
                    <input
                      type="radio"
                      name="checkbox-package"
                      value={1}
                      onChange={handleOnChange}
                      id="label0"
                      checked={Package.id === "1" ? true : false}
                    />
                    <div className="checkmark"></div>
                    <label className="payment-duration-title" for="label0">
                      {" "}
                      1 tháng
                    </label>
                  </div>
                  <div className="input-package-content-left">
                    <p className="main-price" for="label0">
                      99.000đ
                    </p>
                  </div>
                </div>
                <div className="input-package-section">
                  <div className="input-package-content">
                    <input
                      type="radio"
                      name="checkbox-package"
                      value={2}
                      onChange={handleOnChange}
                      id="label1"
                      checked={Package.id === "2" ? true : false}
                    />
                    <div className="checkmark"></div>
                    <div className="package-infor-bottom">
                      <label className="payment-duration-title" for="label1">
                        {" "}
                        3 tháng
                      </label>
                      <label className="title-watch-on" for="label1">
                        Tiết kiệm 17%
                      </label>
                    </div>
                  </div>
                  <div className="input-package-content-left">
                    <p className="main-price" for="label1">
                      249.000đ
                    </p>
                    <p className="save-price" for="label1">
                      300.000đ
                    </p>
                  </div>
                </div>
                <div className="input-package-section">
                  <div className="input-package-content">
                    <input
                      type="radio"
                      name="checkbox-package"
                      value={3}
                      onChange={handleOnChange}
                      id="label2"
                      checked={Package.id === "3" ? true : false}
                    />
                    <div className="checkmark"></div>
                    <div className="package-infor-bottom">
                      <label className="payment-duration-title" for="label2">
                        {" "}
                        6 tháng
                      </label>
                      <label className="title-watch-on" for="label2">
                        Tiết kiệm 24%
                      </label>
                    </div>
                  </div>
                  <div className="input-package-content-left">
                    <p className="main-price" for="label2">
                      449.000đ
                    </p>
                    <p className="save-price" for="label2">
                      600.000đ
                    </p>
                  </div>
                </div>
                <div className="input-package-section">
                  <div className="input-package-content">
                    <input
                      type="radio"
                      name="checkbox-package"
                      value={4}
                      onChange={handleOnChange}
                      id="label3"
                      checked={Package.id === "4" ? true : false}
                    />
                    <div className="checkmark"></div>
                    <div className="package-infor-bottom">
                      <label className="payment-duration-title" for="label3">
                        12 tháng <p className="popular-tag">Phổ biến</p>
                      </label>
                      <label className="title-watch-on" for="label3">
                        Tiết kiệm 33%
                      </label>
                    </div>
                  </div>
                  <div className="input-package-content-left">
                    <p className="main-price" for="label3">
                      799.000đ
                    </p>
                    <p
                      className="save-price"
                      style={{
                        textDecoration: "line-through",
                      }}
                      for="label3"
                    >
                      1.200.000đ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div
              style={{
                backgroundColor: "white",
                padding: "1.5rem",
                margin: "0px auto 1.5rem",
                borderRadius: "6px",
              }}
              className="wrapper-payment-top-right"
            >
              <div className="titleHead">
                <p className="payment-term-header">
                  Chọn phương thức thanh toán
                </p>
              </div>
              <br></br>
              <div
                style={{
                  marginBottom: "20px",
                }}
                className="payment-methodTab"
              >
                <Box
                  sx={{
                    flexGrow: 1,
                    alignItems: "flex-start",
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  <Grid container>
                    {/**paypal payment*/}
                    <Grid item sx={3}>
                      <div
                        onClick={refreshTime}
                        className="payment-method-item visa"
                      >
                        <div className="payment-method-item-image">
                          <p>Thẻ tín dụng</p>
                          <img
                            alt=""
                            style={{
                              height: "52px",
                            }}
                            src="https://assets.glxplay.io/static/files/payment-partner-icon-card-group_1654075215587.png"
                          />
                        </div>
                      </div>
                    </Grid>
                    {/**end paypal payment*/}

                    <Grid item sx={3}>
                      <div
                        onClick={refreshTime2}
                        className="payment-method-item active vnpay"
                      >
                        <div className="payment-method-item-image">
                          <p>Viet QR</p>
                          <img
                            alt=""
                            style={{
                              height: "52px",
                            }}
                            src="https://assets.glxplay.io/static/files/payment-partner-icon-vnpay_1653885983853.png"
                          />
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </div>
          </Grid>
          {/* Hoàn Thành */}
          <Grid item xs={5.4} style={{ marginRight: "3rem" }}>
            <div
              style={{
                backgroundColor: "white",
                padding: "1.5rem",
                margin: "0px auto 1.5rem",
                borderRadius: "6px",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    fontSize: "1rem",
                    color: "#1F2325",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  Thông tin thanh toán
                </div>
                <div>
                  <Link
                    style={{
                      color: "#0a75ff",
                      fontSize: "1 rem",
                    }}
                  >
                    Thay đổi gói
                  </Link>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                <img
                  alt=""
                  src="https://galaxyplay.vn/main/assets/img/cup-platinum.png"
                  style={{
                    width: "7.875rem",
                    marginRight: "1rem",
                    borderRadius: "0.5rem",
                  }}
                />
                <div
                  style={{
                    flexGrow: 1,
                    marginBottom: "1rem",
                  }}
                >
                  <div style={paymentInformationContentItemStyle}>
                    <div>Tài khoản</div>
                    <div>0326 548 580</div>
                  </div>
                  <div style={paymentInformationContentItemStyle}>
                    <div>Tên gói</div>
                    <div>{Package.packageName}</div>
                  </div>
                  <div style={paymentInformationContentItemStyle}>
                    <div style={{ color: "#0A75FF" }}>Thời hạn*</div>
                    <div style={{ color: "#0A75FF" }}>
                      {Package.duration} tháng
                    </div>
                  </div>
                  <div style={paymentInformationContentItemStyle}>
                    <div>Ngày hiệu lực</div>
                    <div>{currentDate.toLocaleDateString("en-GB")}</div>
                  </div>
                  <div style={paymentInformationContentItemStyle}>
                    <div>Ngày hết hạn</div>
                    <div>{expiredDate}</div>
                  </div>
                  <div style={paymentInformationContentItemStyle}>
                    <div style={{ color: "#0A75FF" }}>Đơn giá</div>

                    <div style={{ color: "#0A75FF" }}>{x}</div>
                  </div>
                  <hr />
                  <div
                    style={{
                      display: "flex",
                      minHeight: "2rem",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "0.5rem",
                      fontWeight: "700",
                      paddingTop: "0.5rem",
                      borderTop: "1px solid #DEDEDE",
                    }}
                  >
                    <div>Tổng cộng</div>
                    <div>{x}</div>
                  </div>
                </div>
              </div>
              <div>
                * Thuê bao tự động gia hạn hằng tháng trừ phi bạn hủy thuê bao
                ít nhất 24 giờ trước khi hết hạn.
              </div>
              <div></div>
            </div>
          </Grid>
          {/* Chưa Hoàn thành */}
          <Grid item xs={5}>
            <div
              style={{
                boxSizing: "inherit",
              }}
            >
              <div>
                {!isPaypal && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        margin: "0px -15px",
                      }}
                    >
                      <img
                        style={{ width: "190px", maxWidth: "unset" }}
                        src={`https://img.vietqr.io/image/BIDV-31810000556049-compact.png?accountName=AE%20MOVIE%20&amount=10000&addInfo=${sessionStorage.getItem(
                          "specialNum"
                        )}`}
                        alt="QR code"
                      />
                    </div>
                    <div
                      style={{
                        marginLeft: "15px",
                        padding: "0px 0px 0px 1rem",
                        position: "relative",
                      }}
                    >
                      <p style={pStyle}>Dùng điện thoại quét mã QR</p>
                      <p style={pStyle}>
                        Bước 1: Chọn chức năng QR và quét mã QR.
                      </p>
                      <p style={pStyle}>
                        Bước 2: Giữ nguyên thông tin thanh toán.{" "}
                      </p>
                      <p style={pStyle}>Bước 3: Ấn xác nhận thanh toán. </p>

                      <p
                        style={{
                          color: "rgb(51, 51, 51)",
                          textAlign: "left",
                          fontSize: "16px",
                        }}
                      >
                        Thời gian còn lại:{" "}
                        <span id="paytime-countdown">
                          <Countdown date={Date.now() + 600000}>
                            <Completionist />
                          </Countdown>
                        </span>
                      </p>
                    </div>
                  </div>
                )}
                {isPaypal && (
                  <PaypalModal
                    packageInfo={Package}
                    setIsFinish={setIsFinish}
                    expiredDate={expiredDate}
                    price={price}
                  />
                )}
              </div>
              <div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "red",
                    fontStyle: "italic",
                    paddingTop: "20px",
                    fontWeight: "bold",
                  }}
                >
                  *Sau khi thanh toán xin vui lòng chờ ít phút tới khi trang web
                  hiện hoàn thành thanh toán hóa đơn. (Thường sẽ mất 3-4 phút)
                </p>
              </div>
              <div
                style={{
                  margin: "20px 0px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  alt=""
                  width={70}
                  style={{ maxWidth: "100%", margin: "0px 8px" }}
                  src="https://galaxyplay.vn/main/assets/img/ssl-secured.png"
                />
                <img
                  alt=""
                  width={70}
                  style={{ maxWidth: "100%", margin: "0px 8px" }}
                  src="https://galaxyplay.vn/main/assets/img/DSS-PCI.png"
                />
              </div>
              <div
                style={{
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                <Link
                  to={`/`}
                  style={{
                    color: "#0a75ff",
                    textDecoration: "none",
                    lineHeight: "24px",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  Xem kho phim thanh toán tại
                </Link>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h5" component="h2">
              Gửi lại biểu mẫu.
            </Typography>
            <Divider></Divider>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Đã quá thời hạn thanh toán, bạn có muốn gửi lại biểu mẫu thanh
              toán không ?
              <Stack
                direction="horizontal"
                style={{
                  marginTop: "10px",
                  textAlign: "right",
                }}
              >
                <Button
                  sx={{
                    marginRight: "10px",
                  }}
                  variant="outlined"
                >
                  Gửi lại
                </Button>
                <Button variant="outlined" onClick={() => setOpen(false)}>
                  Hủy
                </Button>
              </Stack>
            </Typography>
          </Box>
        </Fade>
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
              <AlertTitle>Purchase successful!</AlertTitle>
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button>
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              Dashboard
            </Link>
          </Button>
          <Button autoFocus onClick={handleCloseFinish}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* </Container> */}
    </div>
  );
}
