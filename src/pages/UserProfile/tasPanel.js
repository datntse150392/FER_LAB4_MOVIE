import * as React from "react";
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
            <Grid item xs={8} textAlign={"left"}>
              <Stack>
                <Typography variant="p" fontWeight={1000} color="#333333">
                  Bạn chưa có Gói 4AE Siêu Việt. Đăng ký ngay?
                </Typography>
                <Typography variant="p" color="rgba(0, 0, 0, 0.6)">
                  Gói 4AE Siêu Việt với hơn 8.000 giờ phim bộ đặc sắc và các
                  siêu phẩm điện ảnh bom tấn thế giới cùng với các bộ Phim Việt
                  có phí mới nhất đang chờ bạn.
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={4} textAlign={"right"}>
              <MyButton variant="contained" size="medium">
                Đăng ký ngay
              </MyButton>
            </Grid>
          </Grid>
        </Paper>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Paper>
          <Typography variant="p" fontWeight={1000} color="#333333">
            Bạn chưa có thanh toán nào
          </Typography>
        </Paper>
      </CustomTabPanel>
    </Box>
  );
}

const MyButton = styled(Button)({
  "&:hover": {
    backgroundColor: "#12A7FF",
  },
});
