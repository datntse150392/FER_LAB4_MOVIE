import * as React from "react";
import useFetch from "react-hook-usefetch";
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
import { deleteFilmbyid } from "../../api/film";
import Switch from "@mui/material/Switch";
import { useState } from "react";
import { useEffect } from "react";

// Alert
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";

// Pagination

export default function Admin() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState();
  const getFilms = () => {
    fetch("https://64acf61eb470006a5ec514b7.mockapi.io/movie/movie", {
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
    getFilms();
  }, []);

  React.useMemo(() => {
    console.log("USE MEMO BEFORE");
    if (
      localStorage.getItem("email") != null &&
      localStorage.getItem("id") == null
    ) {
      console.log("USE MEMO");
      const getAccountID = () => {
        fetch(
          "https://64acf61eb470006a5ec514b7.mockapi.io/movie/account?email=" +
            localStorage.getItem("email"),
          {
            method: "GET",
            headers: { "content-type": "application/json" },
          }
        )
          .then((res) => {
            if (res.ok) {
              console.log("Successfully");
              return res.json();
            } else {
              console.log("Fail");
            }
          })
          .then((tasks) => {
            console.log(tasks[0].id);
            localStorage.setItem("id", tasks[0].id);
          })
          .catch((error) => {
            console.log("Fail: ", error);
          });
      };
      getAccountID();
    }
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
              <TableCell sx={{ width: "300px" }} align="left">
                Tên phim
              </TableCell>
              <TableCell align="left">Hình ảnh</TableCell>
              <TableCell align="left">Thể loại</TableCell>
              <TableCell align="left">Tác giả</TableCell>
              <TableCell align="left">Trạng thái</TableCell>
              <TableCell align="left">Quảng cáo</TableCell>
              <TableCell align="left">Bật/Tắt Phim</TableCell>
              <TableCell align="left">Chức năng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((data, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={data.id}>
                <TableCell align="left">{data.id}</TableCell>
                <TableCell align="left">{data.title}</TableCell>
                <TableCell align="left">
                  <img
                    style={{ width: "150px", borderRadius: "10px" }}
                    src={data.img}
                  />
                </TableCell>
                <TableCell sx={{ width: "140px" }} align="left">
                  {data.type}
                </TableCell>
                <TableCell sx={{ width: "200px" }} align="left">
                  {data.director}
                </TableCell>
                <TableCell align="left">{data.tag}</TableCell>
                <TableCell align="left">
                  <Switch
                    checked={data.billboard}
                    onChange={(e) => {
                      e.preventDefault();
                      if (
                        window.confirm(
                          "Bạn chắc chắn muốn thay đổi trạng thái quảng cáo cho phim này không?"
                        )
                      ) {
                        fetch(
                          `https://64acf61eb470006a5ec514b7.mockapi.io/movie/movie/${data.id}`,
                          {
                            method: "PUT", // or PATCH
                            headers: { "content-type": "application/json" },
                            body: JSON.stringify({
                              billboard: !data.billboard,
                            }),
                          }
                        )
                          .then(() => {
                            getFilms();
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
                  <Switch
                    checked={data.isActive}
                    onChange={(e) => {
                      e.preventDefault();
                      if (
                        window.confirm(
                          "Bạn chắc chắn muốn thay đổi trạng thái cho phim này không?"
                        )
                      ) {
                        fetch(
                          `https://64acf61eb470006a5ec514b7.mockapi.io/movie/movie/${data.id}`,
                          {
                            method: "PUT", // or PATCH
                            headers: { "content-type": "application/json" },
                            body: JSON.stringify({
                              isActive: !data.isActive,
                            }),
                          }
                        )
                          .then(() => {
                            getFilms();
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
                  <IconButton
                    onClick={() => {
                      deleteFilmbyid(data.id);
                    }}
                    aria-label="delete"
                  >
                    <DeleteIcon sx={{ color: "red" }} />
                  </IconButton>
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
