import {
  Alert,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { FormProvider, FTextField } from "../../../componets/form";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";

const schemaRegister = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Password must match"),
});

const defaultValues = {
  email: "",
  password: "",
  name: "",
  passwordConfirmation: "",
  remember: true,
};

function RegisterComponetPage({ setCurrentTab }) {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const auth = useAuth();
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schemaRegister),
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    try {
      await auth.register(
        { name, email, password },
        enqueueSnackbar,
        setCurrentTab
      );
    } catch (error) {
      reset();
      setError("responseError", error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <Container
      maxWidth="xs"
      style={{ marginBottom: "20px", marginTop: "10px" }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ my: 2 }}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
          <Alert severity="info">
            Already have an account?{" "}
            <Link
              sx={{ color: "tomato", textDecorationColor: "tomato" }}
              variant="subtitle2"
              onClick={() => setCurrentTab("LOGIN")}
            >
              Sing in
            </Link>
          </Alert>
          <FTextField variant="standard" name="name" label="Full Name" />
          <FTextField variant="standard" name="email" label="Email address" />

          <FTextField
            name="password"
            label="Password"
            variant="standard"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FTextField
            name="passwordConfirmation"
            label="passwordConfirmation"
            variant="standard"
            type={passwordConfirmation ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setPasswordConfirmation(!passwordConfirmation)
                    }
                    edge="end"
                  >
                    {passwordConfirmation ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          style={{ marginBottom: "10px", backgroundColor: "tomato" }}
          loading={isSubmitting}
        >
          REGISTER
        </LoadingButton>
      </FormProvider>
    </Container>
  );
}

export default RegisterComponetPage;
