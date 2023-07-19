import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate, redirect, Link } from "react-router-dom";
export default function AccountMenu() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("images");
    localStorage.removeItem("gender");
    localStorage.removeItem("memberShip");
    localStorage.removeItem("phone");
    localStorage.removeItem("id");
    localStorage.removeItem("password");
    localStorage.removeItem("_paypal_storage_");
    navigate("/login");
    window.location.reload();
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{ width: 32, height: 32 }}
              alt="Remy Sharp"
              src={localStorage.getItem("images")}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        // id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar
            sx={{ width: 32, height: 32 }}
            alt="Remy Sharp"
            src={localStorage.getItem("images")}
          />{" "}
          {localStorage.getItem("name")}
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>
          <Avatar /> Tài khoản của tôi
        </MenuItem> */}
        <Divider />
        {localStorage.getItem("email") == "datntse150392@fpt.edu.vn" && (
          <Link to="/admin">
            <MenuItem sx={{ color: "#333" }}>
              <ListItemIcon>
                <DashboardIcon fontSize="small" />
              </ListItemIcon>
              Dashboard
            </MenuItem>
          </Link>
        )}

        <Link to="/film/homePage">
          <MenuItem sx={{ color: "#333" }}>
            <ListItemIcon>
              <HomeIcon fontSize="small" />
            </ListItemIcon>
            Trang chủ
          </MenuItem>
        </Link>
        <Link to="/account/userprofile">
          <MenuItem sx={{ color: "#333" }}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            Tài khoản
          </MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
