import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";

const  Dailogconfim = React.memo(
  ({ open, handleClose, title, content, handleDelete }) =>  {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": { minWidth: "600px" },
          textAlign:"center"
        }}
      >
        <DialogTitle sx={{color:'tomato'}}>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}  sx={{
                border: " 1px solid tomato ",
                color: "tomato",
                "&:hover": { color: "tomato", border: " 1px solid tomato " },
              }}
              variant="outlined"
              >
            No
          </Button>
          <Button
            onClick={handleDelete}
            autoFocus
            sx={{
              color: "white",
              backgroundColor: "#001c44",
              "&:hover": { backgroundColor: "#001c44", opacity: 0.9 },
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
)

export default Dailogconfim;
