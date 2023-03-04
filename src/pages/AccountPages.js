import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormProvider, FTextField } from "../componets/form";
import FUploadAvatar from "../componets/form/FUploadAvatar";
import { fDate } from "../utils/formatTime";
import useAuth from "../hooks/useAuth";
import { Container } from "@mui/system";
import { useDispatch } from "react-redux/es";
import { updateUserProfile } from "../freature/userSlice";

function AccountPages() {
  const { user } = useAuth();

  let defaultValues = {
    name: user?.name || "",
    email: user?.email || "",
    avatarUrl: user?.avatarUrl || "",
    phone: user?.phone || "",
    address: user?.address || "",
    role: user?.role || "",
  };
  const methods = useForm({ defaultValues });
  const dispatch = useDispatch();
  const {
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    console.log(data);
    dispatch(updateUserProfile({ userId: user._id, ...data }));
  };

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
  return (
    <Container sx={{ marginTop: 5 }}>
      <Typography variant="h5" sx={{ marginBottom: "10px" }}>
        Account Settings
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
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
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3, borderRadius: "10px" }}>
              <Box
                sx={{
                  display: "grid",
                  rowGap: 3,
                  columnGap: 2,
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                  },
                }}
              >
                <FTextField name="name" label="Name" />
                <FTextField name="email" label="Email" disabled />

                <FTextField name="phone" label="Phone Number" />
                <FTextField name="address" label="Address" />
              </Box>

              <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Save Changes
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </Container>
  );
}

export default AccountPages;
