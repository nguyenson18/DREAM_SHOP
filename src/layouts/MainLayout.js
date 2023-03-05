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
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHearder />
      <Outlet />
      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
