import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./mainHeader.scss";
import useAuth from "../hooks/useAuth";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { FormProvider, FTextField } from "../componets/form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import { LIST_OPTIONS_NAV } from "../options/option";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getOther, resfreshData } from "../features/addCartSlice";
import { LogoWhite } from "../componets/logo";
import { getListBrowsProduct } from "../features/browseProducts";
import { getOrder } from "../features/oderCartSlice";

const schemaChangePassword = Yup.object()
  .shape({
    password: Yup.string().required(""),
    changePassword: Yup.string().required("Change Password is required"),
    passwordConfirmation: Yup.string()
      .required()
      .oneOf([Yup.ref("changePassword")], "Password must match"),
  })
  .required();

const defaultValues = {
  password: "",
  changePassword: "",
  passwordConfirmation: "",
};

function MainHeader() {
  const [anchorElAvatar, setAnchorElAvatar] = useState(null);
  const [anchorElMobile, setAnchorElMobile] = useState(null);
  const [newPassword, setNewPassword] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState(false);
  const [password, setPassword] = useState(false);
  const [open, setOpen] = useState(false);

  const { listOrther } = useSelector((state) => state.addcart, shallowEqual);
  const { listBrowseProducts } = useSelector((state) => state?.browseproduct);
  const { listOrder } = useSelector((state) => state?.ordercart);

  const { enqueueSnackbar } = useSnackbar();
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isMenuOpen = Boolean(anchorElAvatar);
  const isMobileOpen = Boolean(anchorElMobile);
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schemaChangePassword),
  });
  const {
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = methods;

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
      await auth.logout(() => {
        navigate("/login");
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleOpenDailog = () => {
    setAnchorElAvatar(null);
    setOpen(true);
  };
  const handleCloseDailog = async () => {
    setOpen(false);
    setNewPassword(false);
    setPassword(false);
    setPasswordConfirmation(false);
    clearErrors();
  };
  const onSubmit = async (data) => {
    const { password, changePassword } = data;
    try {
      await auth.handleChangePassword(
        {
          password,
          changePassword,
          userId: auth?.user?._id,
        },
        enqueueSnackbar
      );
      reset();
      setOpen(false);
      setNewPassword(false);
      setPassword(false);
      setPasswordConfirmation(false);
    } catch (error) {
      reset();
      setError("responseError", error.message);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  const handleCheckout = () => {
    if (!auth?.isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  useEffect(() => {
    if (auth.isAuthenticated && auth?.role =='master') {
      dispatch(getListBrowsProduct(enqueueSnackbar));
      dispatch(getOrder(enqueueSnackbar));
    } else if(auth.isAuthenticated && auth?.role =='normal'){
      dispatch(getOther(enqueueSnackbar));
      dispatch(getOrder(enqueueSnackbar));
    }else {dispatch(resfreshData());}
  }, []);

  const handleBage = (e) => {
    let data = []
     listBrowseProducts?.forEach((item) => {
      if(item?.ortherItems?.length){
        item?.ortherItems?.forEach((item) => {data.push(item)});
      }
    })

    if (e?.value == "Checkout") {
      return listOrther?.length;
    }
    if (e?.value == "Order" && auth?.role == "master") {
      return data?.length;
    }
    if (e?.value == "Order" && auth?.role !== "master") {
      return listOrder?.length;
    }
    return null;
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
            right: 25,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
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
        Account Settings
      </MenuItem>

      <Divider sx={{ borderStyle: "dashed" }} />
      <MenuItem onClick={handleOpenDailog} sx={{ mx: 1 }}>
        Change the password
      </MenuItem>

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
          <Badge badgeContent={listOrther?.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Add To Cart</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        {auth?.isAuthenticated ? (
          <IconButton onClick={handleProfileMenuOpen}>
            <Avatar
              alt={auth?.user?.name}
              src={auth?.user?.avatarUrl}
              sx={{ width: 45, height: 45 }}
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
        <p>{auth?.user?.name ? auth?.user?.name : "Login"}</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ backgroundColor: "rgb(255, 255, 255)" }}>
      <AppBar
        position="fixed"
        color="transparent"
        sx={{ backgroundColor: "#001c44", padding: "0 10px", height:'75px' }}
      >
        <Toolbar>
          <LogoWhite
            sx={{ margin: "10px 0", width: "50px", paddingRight: "10px" }}
          />
          <Typography
            variant="h6"
            noWrap
            sx={{ display: { xs: "none", sm: "block" }, color: "white" }}
          >
            DREAM SHOP
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            {auth?.user?.role != "master" && (
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={handleCheckout}
              >
                <Badge badgeContent={listOrther?.length} color="error">
                  <ShoppingCartIcon sx={{ color: "white", fontSize: "30px" }} />
                </Badge>
              </IconButton>
            )}
            {auth?.isAuthenticated ? (
              <IconButton onClick={handleProfileMenuOpen}>
                <Avatar
                  alt={auth?.user?.name}
                  src={auth?.user?.avatarUrl}
                  sx={{ width: 45, height: 45 }}
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
              <MoreIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <div
        style={{
          display: "flex",
          minHeight: "55px",
          width: "100%",
          boxShadow: "rgb(43 52 69 / 10%) 0px 4px 16px",
          justifyContent: "space-around",
          position: "relative",
          paddingTop: "80px",
        }}
      >
        <Container
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: "15px",
          }}
        >
          <div
            className="link-effect-3"
            style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
          >
            {LIST_OPTIONS_NAV.map((e) => {
              const checkRole = e?.role?.includes(auth?.role);
              const path = location?.pathname;
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                  key={e?.value}
                >
                  {checkRole && (
                    <>
                      <Badge badgeContent={handleBage(e)} color="error">
                        <a
                          style={{
                            color:
                              path == e?.navigateValue ? "tomato" : "#001c44",
                          }}
                          onClick={() => {
                            navigate(e?.navigateValue);
                          }}
                          data-hover={e?.value}
                        >
                          {e?.value}
                        </a>
                      </Badge>
                      {e?.line}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </div>

      <Dialog
        open={open}
        onClose={handleCloseDailog}
        sx={{ width: "32em", margin: "0 auto" }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle
            sx={{
              backgroundColor: "#001c44",
              color: "white",
              textAlign: "center",
              borderBottomLeftRadius: "5px",
              borderBottomRightRadius: "5px",
            }}
          >
            Change the password
          </DialogTitle>
          <DialogContent>
            <FTextField
              sx={{ marginTop: "20px" }}
              name="password"
              label="Current Password"
              type={password ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setPassword(!password)}
                      edge="end"
                    >
                      {password ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FTextField
              sx={{ my: 3 }}
              name="changePassword"
              label="New Password"
              type={newPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setNewPassword(!newPassword)}
                      edge="end"
                    >
                      {newPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FTextField
              sx={{ marginBottom: "10px" }}
              name="passwordConfirmation"
              label="passwordConfirmation"
              type={passwordConfirmation ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setPasswordConfirmation(!passwordConfirmation)
                      }
                      edge="end"
                    >
                      {passwordConfirmation ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                border: " 1px solid tomato ",
                color: "tomato",
                "&:hover": { color: "tomato", border: " 1px solid tomato " },
              }}
              variant="outlined"
              onClick={handleCloseDailog}
            >
              No
            </Button>
            <LoadingButton
              sx={{
                backgroundColor: "#001c44",
                "&:hover": {
                  backgroundColor: "#001c44",
                  color: "white",
                  opacity: 0.9,
                },
              }}
              variant="contained"
              type="submit"
              loading={isSubmitting}
              autoFocus
            >
              yes
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </Box>
  );
}

export default MainHeader;
