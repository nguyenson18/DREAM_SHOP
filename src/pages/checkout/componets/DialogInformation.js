import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormProvider, FTextField } from "../../../componets/form";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  getOther,
  inFoUserBooking,
  ortherConfim,
} from "../../../features/addCartSlice";
import { useSnackbar } from "notistack";

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const schemaInfoUser = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  phone: Yup.number().required("Phone is reqiured"),
  address: Yup.string().required("Address is required"),
  streetsName: Yup.string().required("StreetsName is required"),
  district: Yup.string().required("District is required"),
  city: Yup.string().required("City is required"),
});

const defaultValue = {
  name: "",
  phone: "",
  email: "",
  address: "",
  streetsName: "",
  district: "",
  city: "",
};

const DialogInformation = React.memo(
  ({ open, handleClose, title, content }) => {
    const { listOrther, infoUserBooking } = useSelector(
      (state) => state?.addcart
    );
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
      dispatch(inFoUserBooking());
    }, [open]);

    useEffect(() => {
      setValue("name", infoUserBooking?.name);
      setValue("phone", infoUserBooking?.phone);
      setValue("email", infoUserBooking?.email);
      setValue("address", infoUserBooking?.address);
      setValue("streetsName", infoUserBooking?.streetsName);
      setValue("district", infoUserBooking?.district);
      setValue("city", infoUserBooking?.city);
    }, [infoUserBooking]);

    const methods = useForm({
      defaultValue,
      resolver: yupResolver(schemaInfoUser),
    });
    const { handleSubmit, setValue } = methods;

    const onSubmit = async (data) => {
      let dataOrthersId = [];
      for (let i = 0; i < listOrther?.length; i++) {
        const element = listOrther[i];
        if (element.check === true) {
          dataOrthersId.push({ _id: element?._id });
        }
      }
      dispatch(
        ortherConfim({ data, dataOrthers: dataOrthersId }, enqueueSnackbar)
      );
      dispatch(getOther(enqueueSnackbar));
      handleClose();
    };

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
            minWidth: "1000px",
          },
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
                height: "40px",
                padding: "12px 16px",
                color: "tomato",
                backgroundColor: "#001c44",
                my: 2,
                borderRadius: "5px",
              }}
            >
              <LocalShippingIcon
                sx={{ fontSize: "40px", marginRight: "5px" }}
              />
              <Typography variant="h6">{title}</Typography>
            </Box>
          </DialogTitle>
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
                label="Email address"
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
                name="streetsName"
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
  }
);

export default DialogInformation;
