import { Box, Button } from "@mui/material";
import React from "react";
import logoImg from "../../img/logowhite.png";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { getAllProducts } from "../../features/productSlice";

function Logo({ disabledLink = false, sx }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleResetApp = async () => {
    dispatch(
      getAllProducts({ search: "", type: "", price:[], page: 1 }, enqueueSnackbar)
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
  } else {
    return <Button onClick={handleResetApp}>{logo}</Button>;
  }
}

export default Logo;
