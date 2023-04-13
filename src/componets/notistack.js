import { IconButton } from "@mui/material";
import { useSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";

function SnackbarCloseButton({ snackbarKey }) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)}>
      <CloseIcon sx={{ color: "white" }} />
    </IconButton>
  );
}

export default SnackbarCloseButton;
