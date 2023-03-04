import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import MainHearder from "./MainHeader";
import MainFooter from "./MainFooter";
import { Stack } from "@mui/material";
import AlertMsg from "../componets/AlertMsg";

function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHearder />
      <AlertMsg />
      <Outlet />
      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
