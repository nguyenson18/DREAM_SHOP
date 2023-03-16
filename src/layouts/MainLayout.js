import React, { useEffect } from "react";
import {
  Outlet,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import MainHearder from "./MainHeader";
import MainFooter from "./MainFooter";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";

function MainLayout() {
  const location = useLocation()
  return (
    <Stack sx={{ minHeight: "100vh", position:"relative" }}>
      <MainHearder />
      <Outlet />
      {location?.pathname != "/account" && (<MainFooter />)}
      
    </Stack>
  );
}

export default MainLayout;
