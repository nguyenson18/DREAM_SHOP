import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, MenuItem, Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormProvider, FSelect, FTextField } from "../../componets/form";
import FUploadAvatar from "../../componets/form/FUploadAvatar";
import { fDate } from "../../utils/formatTime";
import useAuth from "../../hooks/useAuth";
import { Container } from "@mui/system";
import { useDispatch, useSelector } from "react-redux/es";
import { updateUserProfile } from "../../features/userSlice";
import { useSnackbar } from "notistack";


const role = [
  { value: 'normal' },
  { value: 'driver' }]

function AccountPages() {
  const [isSubmit, setIsSubmit] = useState(false);
  const { user } = useAuth();
  const { isLoading } = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setValue("name", user?.name);
    setValue("email", user?.email);
    setValue("phone", user?.phone);
  }, [user]);

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
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    setIsSubmit(!isSubmit);
    dispatch(
      updateUserProfile({ userId: user?._id, ...data }, enqueueSnackbar)
    );
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
      <Typography
        variant="h5"
        sx={{ marginBottom: "10px", color: "tomato", fontWeight: 600 }}
      >
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
                {role !== 'master' && (
                  <FSelect name='role' label="Role" children={role.map((option) => (
                    <MenuItem key={option.value} value={option.value}>{option.value}</MenuItem>
                  ))}/>
                )}
              </Box>

              <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting || isLoading}
                  sx={{
                    backgroundColor: "#001c44",
                    "&:hover": {
                      backgroundColor: "#001c44",
                      color: "white",
                      opacity: 0.8,
                    },
                  }}
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
