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

function MainLayout() {
  const location = useLocation()
  console.log(location)
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHearder />
      <Outlet />
      {location?.pathname != "/account" && (<MainFooter />)}
      
    </Stack>
  );
}

export default MainLayout;
