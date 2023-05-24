import { Box } from "@mui/material";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HowToRegIcon from "@mui/icons-material/HowToReg";

export function statusComfim(status) {
  if (status === "paid") {
    return (
      <Box
        sx={{
          color: "#007FFF",
          display: "flex",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        {status}
        <HourglassTopIcon />
      </Box>
    );
  }
  if (status === "delivery") {
    return (
      <Box
        sx={{
          color: "tomato",
          display: "flex",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        {status}
        <LocalShippingIcon />
      </Box>
    );
  }
  if (status === "confirmed") {
    return (
      <Box
        sx={{
          color: "#4caf50",
          display: "flex",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        {status}
        <HowToRegIcon />
      </Box>
    );
  }
  if (status === "done") {
    return (
      <Box
        sx={{
          color: "rgb(46, 125, 50)",
          display: "flex",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        {status}
        <TaskAltIcon />
      </Box>
    );
  }
}
