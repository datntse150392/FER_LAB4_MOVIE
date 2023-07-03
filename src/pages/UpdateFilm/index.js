import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

// SELECT MUI
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NativeSelect from "@mui/material/NativeSelect";

// Button MUI
import Button from "@mui/material/Button";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function UpdateFilm() {
  const navigate = useNavigate();

  const [filmDetail, setFilmDetail] = useState();

  // Get Params
  const FilmID = useParams();
  async function getFilmByID(id) {
    try {
      const response = await axios.get(
        "https://6491295d2f2c7ee6c2c7cfa0.mockapi.io/Films/" + id
      );
      setFilmDetail(response?.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFilmByID(FilmID.id);
  }, []);

  console.log(filmDetail);
  const handlesubmit = (e) => {
    e.preventDefault();
    if (window.confirm("Bạn chắc chắn muốn cập nhật phim này không?")) {
      fetch(`https://6491295d2f2c7ee6c2c7cfa0.mockapi.io/Films/${FilmID.id}`, {
        method: "PUT", // or PATCH
        headers: { "content-type": "application/json" },
        body: JSON.stringify(filmDetail),
      })
        .then(() => {
          navigate("/admin");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  return (
    <React.Fragment>
      <form onSubmit={handlesubmit}>
        <Container maxWidth="md" sx={{ marginTop: 12, marginBottom: 12 }}>
          <Box
            sx={{
              height: "100%",
              padding: "20px",
              border: "1px solid #fff",
            }}
          >
            <h1 style={{ color: "white", fontSize: "20px", height: "40px" }}>
              CẬP NHẬT THÔNG TIN PHIM
            </h1>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
              {/* Title */}
              <Box gridColumn="span 8">
                <Item>
                  <TextField
                    sx={{ width: "100%" }}
                    value={filmDetail?.title}
                    onChange={(e) =>
                      setFilmDetail((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    id="filled-basic"
                    variant="filled"
                    required
                  />
                </Item>
              </Box>
              {/* Type */}
              <Box gridColumn="span 4">
                <Item sx={{ height: "72px", overflow: "hidden" }}>
                  <FormControl sx={{ m: 1, minWidth: 120, width: "90%" }}>
                    <NativeSelect
                      defaultValue={filmDetail?.type}
                      inputProps={{
                        name: "age",
                        id: "uncontrolled-native",
                      }}
                      value={filmDetail?.type}
                      onChange={(e) =>
                        setFilmDetail((prev) => ({
                          ...prev,
                          type: e.target.value,
                        }))
                      }
                    >
                      <option value={"Horror"}>Phim kinh dị</option>
                      <option value={"Korean"}>Phim Hàn Quốc</option>
                      <option value={"Anime"}>Phim Anime</option>
                      <option value={"Disney"}>Phim Disney</option>
                      <option value={"Action"}>
                        Phim hành động & phiêu lưu
                      </option>
                      <option value={"China"}>Phim Trung Quốc</option>
                      <option value={"USUK"}>Phim Âu Mỹ</option>
                      <option value={"TVShow"}>TV Show</option>
                      <option value={"THTT"}>Truyền hình thực tế</option>
                    </NativeSelect>
                    <FormHelperText>Mời bạn chọn thể loại phim</FormHelperText>
                  </FormControl>
                </Item>
              </Box>
              {/* Duration */}
              <Box gridColumn="span 3">
                <Item>
                  <TextField
                    sx={{ width: "100%" }}
                    value={filmDetail?.duration}
                    onChange={(e) =>
                      setFilmDetail((prev) => ({
                        ...prev,
                        duration: e.target.value,
                      }))
                    }
                    id="filled-basic"
                    variant="filled"
                    required
                  />
                  <FormHelperText>Thời lượng phim</FormHelperText>
                </Item>
              </Box>
              {/* Director */}
              <Box gridColumn="span 3">
                <Item>
                  <TextField
                    sx={{ width: "100%" }}
                    value={filmDetail?.director}
                    onChange={(e) =>
                      setFilmDetail((prev) => ({
                        ...prev,
                        director: e.target.value,
                      }))
                    }
                    id="filled-basic"
                    variant="filled"
                    required
                  />
                  <FormHelperText>Đạo diễn</FormHelperText>
                </Item>
              </Box>
              {/* Actor */}
              <Box gridColumn="span 6">
                <Item>
                  <TextField
                    sx={{ width: "100%" }}
                    value={filmDetail?.actor}
                    onChange={(e) =>
                      setFilmDetail((prev) => ({
                        ...prev,
                        actor: e.target.value,
                      }))
                    }
                    id="filled-basic"
                    variant="filled"
                    required
                  />
                  <FormHelperText>Diễn viên</FormHelperText>
                </Item>
              </Box>
              {/* Discription */}
              <Box gridColumn="span 12">
                <Item>
                  <TextField
                    sx={{ width: "100%" }}
                    value={filmDetail?.description}
                    onChange={(e) =>
                      setFilmDetail((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    id="filled-basic"
                    variant="filled"
                    required
                    multiline
                  />
                  <FormHelperText>Mô tả phim</FormHelperText>
                </Item>
              </Box>
              {/* State */}
              <Box gridColumn="span 3">
                <Item sx={{ height: "100%", overflow: "hidden" }}>
                  <FormControl sx={{ m: 1, minWidth: 120, width: "90%" }}>
                    <NativeSelect
                      defaultValue={filmDetail?.state}
                      inputProps={{
                        name: "age",
                        id: "uncontrolled-native",
                      }}
                      value={filmDetail?.state}
                      onChange={(e) =>
                        setFilmDetail((prev) => ({
                          ...prev,
                          state: e.target.value,
                        }))
                      }
                    >
                      <option value={""}>Mặc định</option>
                      <option value={"Trending"}>Xu hướng</option>
                    </NativeSelect>
                    <FormHelperText>Trạng thái</FormHelperText>
                  </FormControl>
                </Item>
              </Box>
              {/* Trailer */}
              <Box gridColumn="span 9">
                <Item>
                  <TextField
                    sx={{ width: "100%" }}
                    value={filmDetail?.trailerURL}
                    onChange={(e) =>
                      setFilmDetail((prev) => ({
                        ...prev,
                        trailerURL: e.target.value,
                      }))
                    }
                    id="filled-basic"
                    variant="filled"
                    multiline
                    required
                  />
                  <FormHelperText>Trailer</FormHelperText>
                </Item>
              </Box>
              {/* Img */}
              <Box gridColumn="span 12">
                <Item>
                  <TextField
                    sx={{ width: "100%" }}
                    value={filmDetail?.img}
                    onChange={(e) =>
                      setFilmDetail((prev) => ({
                        ...prev,
                        img: e.target.value,
                      }))
                    }
                    id="filled-basic"
                    variant="filled"
                    multiline
                    required
                  />
                  <FormHelperText>Đường dẫn hình ảnh</FormHelperText>
                </Item>
              </Box>
              {/* ImgBG */}
              <Box gridColumn="span 12">
                <Item>
                  <TextField
                    sx={{ width: "100%" }}
                    value={filmDetail?.imgBG}
                    onChange={(e) =>
                      setFilmDetail((prev) => ({
                        ...prev,
                        imgBG: e.target.value,
                      }))
                    }
                    id="filled-basic"
                    variant="filled"
                    multiline
                  />
                  <FormHelperText>Đường dẫn hình nền</FormHelperText>
                </Item>
              </Box>
              {/* ImgLogo */}
              <Box gridColumn="span 12">
                <Item>
                  <TextField
                    sx={{ width: "100%" }}
                    value={filmDetail?.imgLogo}
                    onChange={(e) =>
                      setFilmDetail((prev) => ({
                        ...prev,
                        imgLogo: e.target.value,
                      }))
                    }
                    id="filled-basic"
                    variant="filled"
                    multiline
                  />
                  <FormHelperText>Đường dẫn logo</FormHelperText>
                </Item>
              </Box>
              {/*Button Submit */}
              <Button
                type="submit"
                sx={{ width: "150px" }}
                variant="contained"
                color="info"
              >
                CẬP NHẬT
              </Button>
              {/* End FORM */}
            </Box>
          </Box>
        </Container>
      </form>
    </React.Fragment>
  );
}
