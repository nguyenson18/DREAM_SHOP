import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import FormProvider from "./form/FormProvider";
import FTextField from "./form/FTextField";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import styled from "@emotion/styled";

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const defaultValue = {
  name: "",
  phone: "",
  email: "",
  address: "",
  ward: "",
  district: "",
  city: "",
};

function DialogInformation({
  open,
  handleClose,
  title,
  content,
  handleDelete,
}) {
  const methods = useForm({ defaultValue });
  const {
    handleSubmit,
    reset,
    getValues,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": { minWidth: "1000px" },
        textAlign: "center",
      }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            height: "40px",
            padding: "12px 16px",
            color: "tomato",
            backgroundColor: "#001c44",
            my: 2,
            borderRadius: "5px",
          }}
        >
          <LocalShippingIcon sx={{ fontSize: "40px", marginRight: "5px" }} />
          <Typography variant="h6">{title}</Typography>
        </Box>
      </DialogTitle>
      <FormProvider methods={methods} onSubmit={handleSubmit}>
        <DialogContent>
          <StyledBox>
            <FTextField
              variant="standard"
              name="name"
              label="First and last name"
              sx={{ width: "45%" }}
            />
            <FTextField
              variant="standard"
              name="phone"
              label="Contact phone number"
              sx={{ width: "45%" }}
            />
          </StyledBox>
          <StyledBox sx={{ margin: "30px 0" }}>
            <FTextField
              variant="standard"
              name="email"
              label="Contact Email"
              sx={{ width: "35%" }}
            />
            <FTextField
              variant="standard"
              name="address"
              label="Address"
              sx={{ width: "28%" }}
            />
            <FTextField
              variant="standard"
              name="ward"
              label="Street names"
              sx={{ width: "28%" }}
            />
          </StyledBox>

          <StyledBox sx={{ marginBottom: "20px" }}>
            <FTextField
              variant="standard"
              name="district"
              label="District"
              sx={{ width: "45%" }}
            />
            <FTextField
              variant="standard"
              name="city"
              label="City"
              sx={{ width: "45%" }}
            />
          </StyledBox>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
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
      </FormProvider>
    </Dialog>
  );
}

export default DialogInformation;
