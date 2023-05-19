import { Box, Button, Card, Container, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { FTextField, FormProvider } from "../../componets/form";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FUploadAvatar from "../../componets/form/FUploadAvatar";
import { fDate } from "../../utils/formatTime";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "30px 0",
});

const schemaInfoUser = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  brand: Yup.number().required("brand is reqiured"),
  address: Yup.string().required("Address is required"),
  streetsName: Yup.string().required("StreetsName is required"),
  district: Yup.string().required("District is required"),
  city: Yup.string().required("City is required"),
});

const defaultValue = {
  name: "",
  brand: "",
  old_price: "",
  latest_price: "",
  model: "",
  statusProduct: "",
  memory_size: "",
};

function CreateProduct() {
  const methods = useForm({
    defaultValue,
    resolver: yupResolver(schemaInfoUser),
  });
  const {
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "avatarUrl",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const onSubmit = async (data) => {};

  return (
    <Container sx={{ paddingBottom: "400px", marginTop: 5, textAlign: "end" }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ width: "45%" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                height: "40px",
                padding: "12px 16px",
                margin: "0 !important",
                color: "tomato",
                backgroundColor: "#001c44",
                my: 2,
                borderRadius: "5px",
              }}
            >
              <PlaylistAddIcon sx={{ fontSize: "40px", marginRight: "5px" }} />
              <Typography variant="h6">Create Product</Typography>
            </Box>
            <StyledBox>
              <FTextField
                variant="standard"
                name="name"
                label="Name product"
                sx={{ width: "45%" }}
              />
              <FTextField
                variant="standard"
                name="brand"
                label="Brand product"
                sx={{ width: "45%" }}
              />
            </StyledBox>
            <StyledBox sx={{ margin: "30px 0" }}>
              <FTextField
                variant="standard"
                name="old_price"
                label="Price Old"
                sx={{ width: "35%" }}
              />
              <FTextField
                variant="standard"
                name="latest_price"
                label="Price latest"
                sx={{ width: "28%" }}
              />
              <FTextField
                variant="standard"
                name="model"
                label="Model names"
                sx={{ width: "28%" }}
              />
            </StyledBox>

            <StyledBox sx={{ marginBottom: "20px" }}>
              <FTextField
                variant="standard"
                name="statusProduct"
                label="Status Product"
                sx={{ width: "45%" }}
              />
              <FTextField
                variant="standard"
                name="memory_size"
                label="Memory Size"
                sx={{ width: "45%" }}
              />
            </StyledBox>
          </Box>

          <Box sx={{ width: "45%" }}>
            <Card
              sx={{ py: 10, px: 3, textAlign: "center", borderRadius: "10px" }}
            >
              <FUploadAvatar
                name="avatarUrl"
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: "auto",
                      display: "block",
                      textAlign: "center",
                      color: "text.secondary",
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fDate(3145728)}
                  </Typography>
                }
              />
            </Card>
          </Box>
        </Box>
        <Button
          type="submit"
          // onClick={handleSubmit(onSubmit)}
          autoFocus
          sx={{
            color: "white",
            backgroundColor: "#001c44",
            "&:hover": { backgroundColor: "#001c44", opacity: 0.9 },
            marginTop: "20px",
          }}
        >
          Add Product
        </Button>
      </FormProvider>
    </Container>
  );
}

export default CreateProduct;
