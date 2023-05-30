import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Typography,
  alpha,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FTextField, FormProvider } from "../../../componets/form";
import apiService from "../../../app/apiService";
import { useSnackbar } from "notistack";

const defaultValue = {
  content:'',
  rating:0
}

const EvaluateComfirm = ({ open, handleClose, title, id, content }) => {
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({...defaultValue});
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await apiService.post(`/reviews/${id}`, data);
      handleClose();
      enqueueSnackbar("successful product review", { variant: "success" });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
      handleClose();
    }
    reset({...defaultValue})
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": { minWidth: "700px" },
        textAlign: "center",
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              height: "35px",
              padding: "12px 16px",
              color: "tomato",
              backgroundColor: "#001c44",
              my: 2,
              borderRadius: "5px",
            }}
          >
            <Typography variant="h6">{title}</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <FTextField
            name="content"
            multiline
            fullWidth
            rows={4}
            placeholder="Share what you are thinking here..."
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
          />
          <Controller
            name="rating"
            control={control}
            render={(field) => (
              <Rating
                style={{ marginTop: "5px" }}
                value={field.value}
                precision={0.5}
                onChange={(event, newValue) => {
                  setValue("rating", newValue);
                }}
              />
            )}
          />
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
            type="submit"
            // onClick={handleSubmit(onSubmit)}
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
};

export default EvaluateComfirm;
