import { Box, Button } from "@mui/material";
import React from "react";
import logoImg from "../../img/logo.png";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { getAllProducts } from "../../features/productSlice";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

function Logo({ disabledLink = false, sx, onClick }) {
  const location = useLocation();
  console.log(location);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleResetApp = async () => {
    dispatch(
      getAllProducts({ search: "", type: "",price:[], page: 1 }, enqueueSnackbar)
    );
  };
  const logo = (
    <Box sx={{ width: "70px", ...sx }}>
      <img src={logoImg} alt="logo" width="100%" />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }
  if (location?.pathname != "/") {
    return <RouterLink to="/">{logo}</RouterLink>;
  }else {
    return <Button onClick={handleResetApp}>{logo}</Button>
  }
}

export default Logo;
