import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";

function Dailogconfim({ open, handleClose, title, content, handleDelete }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": { minWidth: "600px" },
        textAlign:"center"
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: "tomato" }}>
          No
        </Button>
        <Button
          onClick={handleDelete}
          autoFocus
          sx={{
            color: "white",
            backgroundColor: "tomato",
            "&:hover": { backgroundColor: "tomato", opacity: 0.9 },
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Dailogconfim;
