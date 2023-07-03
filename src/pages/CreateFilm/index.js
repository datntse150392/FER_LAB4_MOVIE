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

// Button MUI
import Button from "@mui/material/Button";

// useNavigate
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function CreateFilm() {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    title: "",
    billboard: true,
    state: "",
    type: "Phim kinh dị",
    duration: "",
    director: "",
    actor: "",
    img: "",
    imgBG: "",
    imgLogo: "",
    trailerURL: "",
    description: "",
    isActive: false,
    myList: false,
  });

  const handlesubmit = (e) => {
    e.preventDefault();
    if (window.confirm("Bạn có muốn xác thực tạo phim hay không?")) {
      fetch("https://6491295d2f2c7ee6c2c7cfa0.mockapi.io/Films", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formValue),
      })
        .then(() => {
          navigate("/admin");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  console.log(formValue);

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
              ĐIỀN ĐẦY ĐỦ THÔNG TIN ĐỂ TẠO MỚI PHIM
            </h1>
            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
              {/* Title */}
              <Box gridColumn="span 8">
                <Item>
                  <TextField
                    sx={{ width: "100%" }}
                    onChange={(e) =>
                      setFormValue((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    id="filled-basic"
                    label="Mời bạn nhập tên Phim"
                    variant="filled"
                    required
                  />
                </Item>
              </Box>
              {/* Type */}
              <Box gridColumn="span 4">
                <Item sx={{ height: "72px", overflow: "hidden" }}>
                  <FormControl sx={{ m: 1, minWidth: 120, width: "90%" }}>
                    <Select
                      value={formValue.type}
                      onChange={(e) =>
                        setFormValue((prev) => ({
                          ...prev,
                          type: e.target.value,
                        }))
                      }
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{ height: "30px", width: "100%", overflow: "hidden" }}
                    >
                      <MenuItem value={"Horror"}>Phim kinh dị</MenuItem>
                      <MenuItem value={"Korean"}>Phim Hàn Quốc</MenuItem>
                      <MenuItem value={"Action"}>
                        Phim hành động & phiêu lưu
                      </MenuItem>
                      <MenuItem value={"Anime"}>Phim Anime</MenuItem>
                      <MenuItem value={"Disney"}>Phim Disney</MenuItem>
                      <MenuItem value={"China"}>Phim Trung Quốc</MenuItem>
                      <MenuItem value={"USUK"}>Phim Âu Mỹ</MenuItem>
                      <MenuItem value={"TVShow"}>TV Show</MenuItem>
                      <MenuItem value={"THTT"}>Truyền hình thực tế</MenuItem>
                    </Select>
                    <FormHelperText>Mời bạn chọn thể loại phim</FormHelperText>
                  </FormControl>
                </Item>
              </Box>
              {/* Duration */}
              <Box gridColumn="span 3">
                <Item>
                  <TextField
                    sx={{ width: "100%" }}
                    onChange={(e) =>
                      setFormValue((prev) => ({
                        ...prev,
                        duration: e.target.value,
                      }))
                    }
                    id="filled-basic"
                    label="Thời lượng phim"
                    variant="filled"
                  />
                </Item>
              </Box>
              {/* Director */}
              <Box gridColumn="span 3">
                <Item>
                  <TextField
                    sx={{ width: "100%" }}
                    onChange={(e) =>
                      setFormValue((prev) => ({
                        ...prev,
                        director: e.target.value,
                      }))
                    }
                    id="filled-basic"
                    label="Tác giả"
                    variant="filled"
                  />
                </Item>
              </Box>
              {/* Actor */}
              <Box gridColumn="span 6">
                <Item>
                  <TextField
                    sx={{ width: "100%" }}
                    onChange={(e) =>
                      setFormValue((prev) => ({
                        ...prev,
                        actor: e.target.value,
                      }))
                    }
                    id="filled-basic"
                    label="Diễn viên"
                    variant="filled"
                    required
                  />
                </Item>
              </Box>
              {/* Discription */}
              <Box gridColumn="span 12">
                <Item>
                  <TextField
                    sx={{ width: "100%" }}
                    onChange={(e) =>
                      setFormValue((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    id="filled-basic"
                    label="Mô tả phim"
                    variant="filled"
                    required
                    multiline
                  />
                </Item>
              </Box>
              {/* State */}
              <Box gridColumn="span 3">
                <Item sx={{ height: "72px", overflow: "hidden" }}>
                  <FormControl sx={{ m: 1, minWidth: 120, width: "90%" }}>
                    <Select
                      value={formValue.state}
                      onChange={(e) =>
                        setFormValue((prev) => ({
                          ...prev,
                          state: e.target.value,
                        }))
                      }
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{ height: "30px", width: "100%", overflow: "hidden" }}
                    >
                      <MenuItem value={""}>Mặc định</MenuItem>
                      <MenuItem value={"Trending"}>Xu hướng</MenuItem>
                    </Select>
                    <FormHelperText>Trạng thái</FormHelperText>
                  </FormControl>
                </Item>
              </Box>
              {/* Billboard */}
              <Box gridColumn="span 3">
                <Item sx={{ height: "72px", overflow: "hidden" }}>
                  <FormControl sx={{ m: 1, minWidth: 120, width: "90%" }}>
                    <Select
                      value={formValue.billboard}
                      onChange={(e) =>
                        setFormValue((prev) => ({
                          ...prev,
                          billboard: e.target.value,
                        }))
                      }
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      sx={{ height: "30px", width: "100%", overflow: "hidden" }}
                    >
                      <MenuItem value={true}>Bật</MenuItem>
                      <MenuItem value={false}>Tắt</MenuItem>
                    </Select>
                    <FormHelperText>Quảng cáo</FormHelperText>
                  </FormControl>
                </Item>
              </Box>
              {/* Trailer */}
              <Box gridColumn="span 6">
                <Item>
                  <TextField
                    sx={{ width: "100%" }}
                    onChange={(e) =>
                      setFormValue((prev) => ({
                        ...prev,
                        trailerURL: e.target.value,
                      }))
                    }
                    id="filled-basic"
                    label="Trailer"
                    variant="filled"
                    multiline
                    required
                  />
                </Item>
              </Box>
              {/* Img */}
              <Box gridColumn="span 12">
                <Item>
                  <TextField
                    sx={{ width: "100%" }}
                    onChange={(e) =>
                      setFormValue((prev) => ({ ...prev, img: e.target.value }))
                    }
                    id="filled-basic"
                    label="Đường dẫn hình ảnh đại diện phim"
                    variant="filled"
                    multiline
                    required
                  />
                </Item>
              </Box>
              {/* ImgBG */}
              <Box gridColumn="span 12">
                <Item>
                  <TextField
                    sx={{ width: "100%" }}
                    onChange={(e) =>
                      setFormValue((prev) => ({
                        ...prev,
                        imgBG: e.target.value,
                      }))
                    }
                    id="filled-basic"
                    label="Đường dẫn hình nền phim"
                    variant="filled"
                    multiline
                  />
                </Item>
              </Box>
              {/* ImgLogo */}
              <Box gridColumn="span 12">
                <Item>
                  <TextField
                    sx={{ width: "100%" }}
                    onChange={(e) =>
                      setFormValue((prev) => ({
                        ...prev,
                        imgLogo: e.target.value,
                      }))
                    }
                    id="filled-basic"
                    label="Đường dẫn Logo phim"
                    variant="filled"
                    multiline
                  />
                </Item>
              </Box>
              {/*Button Submit */}
              <Button
                type="submit"
                sx={{ width: "150px" }}
                variant="contained"
                color="success"
              >
                Thêm mới phim
              </Button>
              {/* End FORM */}
            </Box>
          </Box>
        </Container>
      </form>
    </React.Fragment>
  );
}
