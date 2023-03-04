import { Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

function BlankLayout() {
  return (
    <Stack minHeight="100vh" justifyContent="center" alignItems="center">
      <Outlet />
    </Stack>
  );
}

export default BlankLayout;
