import { Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import AlertMsg from "../componets/AlertMsg";

function BlankLayout() {
  return (
    <Stack minHeight="100vh" justifyContent="center" alignItems="center">
      <AlertMsg />
      <Outlet />
    </Stack>
  );
}

export default BlankLayout;
