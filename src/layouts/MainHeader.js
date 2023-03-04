import {
  alpha,
  AppBar,
  Avatar,
  Badge,
  Box,
  Container,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import AvatarImg from "../img/avatar.jpg";
import Logo from "../componets/Logo";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styled from "@emotion/styled";
import "./mainHeader.scss";
import useAuth from "../hooks/useAuth";
import LockOpenIcon from "@mui/icons-material/LockOpen";

function MainHeader() {
  const [anchorElAvatar, setAnchorElAvatar] = useState(null);
  const [anchorElMobile, setAnchorElMobile] = useState(null);
  const auth = useAuth();
  const navigate = useNavigate();
  const { isInitialized, isAuthenticated, logout } = auth;
  console.log(auth);
  const isMenuOpen = Boolean(anchorElAvatar);
  const isMobileOpen = Boolean(anchorElMobile);

  const handleProfileMenuOpen = (event) => {
    setAnchorElAvatar(event.currentTarget);
    setAnchorElMobile(null);
  };

  const handleMenuClose = () => {
    setAnchorElAvatar(null);
  };

  const handleMobileMenuClose = () => {
    setAnchorElMobile(null);
  };

  const handleMobileMenuOpen = (event) => {
    setAnchorElMobile(event.currentTarget);
  };

  const handleLogout = async () => {
    try {
      handleMenuClose();
      await logout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorElAvatar}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ mt: "45px" }}
    >
      <Box sx={{ my: 1.5, px: 2.5 }}>
        <Typography variant="subtitle2" noWrap>
          {auth?.user?.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {auth?.user?.email}
        </Typography>
      </Box>

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem
        onClick={handleMenuClose}
        to="/account"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        My Profile
      </MenuItem>

      <MenuItem
        onClick={handleMenuClose}
        to="/account"
        component={RouterLink}
        sx={{ mx: 1 }}
      >
        Account Settings
      </MenuItem>

      <Divider sx={{ borderStyle: "dashed" }} />

      <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      id={mobileMenuId}
      anchorEl={anchorElMobile}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={1} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Thêm vào giỏ</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton onClick={handleProfileMenuOpen}>
          <Avatar
            alt="Trường sơn"
            src={AvatarImg}
            sx={{ width: 32, height: 32 }}
          />
        </IconButton>
        <p>Trường sơn</p>
      </MenuItem>
    </Menu>
  );
  return (
    <Box sx={{ backgroundColor: "rgb(255, 255, 255)" }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Logo sx={{ margin: "10px 0", width: "60px", paddingRight: "7px" }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            DREAM SHOP
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={0} color="error">
                <ShoppingCartIcon sx={{ color: "#020659" }} />
              </Badge>
            </IconButton>
            {isAuthenticated ? (
              <IconButton onClick={handleProfileMenuOpen}>
                <Avatar
                  alt={auth?.user?.name}
                  src={auth?.user?.avatarUrl}
                  sx={{ width: 40, height: 40 }}
                />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  navigate("/login");
                }}
              >
                <LockOpenIcon
                  sx={{ fontSize: "30px", color: "rgb(237, 50, 56)" }}
                />
              </IconButton>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <div
        style={{
          display: "flex",
          height: "70px",
          width: "100%",
          boxShadow: "rgb(43 52 69 / 10%) 0px 4px 16px",
          justifyContent: "space-around",
        }}
      >
        <Container
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div></div>
          <div
            className="link-effect-3"
            style={{ display: "flex", alignItems: "center" }}
          >
            <a href="/" data-hover="Home">
              Home
            </a>
            <Divider
              orientation="vertical"
              style={{ height: "30px", margin: "0 10px" }}
            />
            <a href="/checkout" data-hover="Checkout">
              Checkout
            </a>
            <Divider
              orientation="vertical"
              style={{ height: "30px", margin: "0 10px" }}
            />
            <a href="/order" data-hover="Order">
              Order
            </a>
            <Divider
              orientation="vertical"
              style={{ height: "30px", margin: "0 10px" }}
            />
            <a href="/customrcare" data-hover="CustomerCare">
              CustomerCare
            </a>
          </div>
        </Container>
      </div>
    </Box>
  );
}

export default MainHeader;
