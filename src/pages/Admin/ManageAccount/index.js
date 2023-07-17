import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import Switch from "@mui/material/Switch";
import { useState } from "react";
import { useEffect } from "react";

// Alert
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";

// Pagination

export default function ManageAccount() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState();
  const getAccount = () => {
    fetch("https://64acf61eb470006a5ec514b7.mockapi.io/movie/account", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // handle error
      })
      .then((tasks) => {
        // Do something with the list of tasks
        setData(tasks);
      })
      .catch((error) => {
        // handle error
      });
  };
  useEffect(() => {
    getAccount();
  }, []);

  const [checked, setChecked] = React.useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Paper sx={{ width: "100%", marginTop: 10 }}>
      <TableContainer sx={{ maxHeight: "100%" }}>
        <Box sx={{ width: "100%" }}>
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Bạn đã cập nhật thành công!
            </Alert>
          </Collapse>
        </Box>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Họ và tên</TableCell>
              <TableCell align="left">Hình ảnh</TableCell>
              <TableCell align="left">Số điện thoại</TableCell>
              <TableCell align="left">Giới tính</TableCell>
              <TableCell align="left">Thành viên</TableCell>
              <TableCell align="left">Thời hạn gói</TableCell>
              <TableCell align="left">Bật/Tắt Thành viên</TableCell>
              <TableCell align="left">Chức năng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((data, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={data.id}>
                <TableCell align="left">{data.id}</TableCell>
                <TableCell align="left">{data.fullName}</TableCell>
                <TableCell align="left">
                  <img
                    style={{ width: "100px", borderRadius: "10px" }}
                    src={data.avatar}
                  />
                </TableCell>
                <TableCell sx={{ width: "140px" }} align="left">
                  {data.phone === true ? "..." : "Đang cập nhật"}
                </TableCell>
                <TableCell align="left">
                  {data.gender === true ? "Nam" : "Nữ"}
                </TableCell>
                <TableCell align="left">
                  {data.memberShip === true
                    ? "Đã đăng kí "
                    : "Chưa đăng kí gói"}
                </TableCell>
                <TableCell align="left">
                  {data.expiredDate === true ? "..." : "Thời gian chưa có"}
                </TableCell>
                <TableCell align="left">
                  <Switch
                    checked={data.memberShip}
                    onChange={(e) => {
                      e.preventDefault();
                      if (
                        window.confirm(
                          "Bạn chắc chắn muốn thay đổi trạng thái thành viên này không?"
                        )
                      ) {
                        fetch(
                          `https://64acf61eb470006a5ec514b7.mockapi.io/movie/account/${data.id}`,
                          {
                            method: "PUT", // or PATCH
                            headers: { "content-type": "application/json" },
                            body: JSON.stringify({
                              memberShip: !data.memberShip,
                            }),
                          }
                        )
                          .then(() => {
                            getAccount();
                            setOpen(true);
                            const { scrollTop, scrollHeight, clientHeight } =
                              document.documentElement;
                            const topPosition = 0;
                            window.scrollTo({
                              top: topPosition,
                              behavior: "smooth",
                            });
                          })
                          .catch((err) => {
                            console.log(err.message);
                          });
                      }
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                </TableCell>
                <TableCell align="left">
                  <IconButton>
                    <Link to={`/admin/updateFilm/${data.id}`}>
                      <EditIcon sx={{ color: "black" }} />
                    </Link>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
