import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Stack,
} from "@mui/material";
import { FCheckbox, FormProvider, FTextField } from "../../../componets/form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "../../../hooks/useAuth";
import { useSnackbar } from "notistack";

const schemaLogin = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

function LoginComponetPage({ setCurrentTab }) {
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(schemaLogin),
  });

  const {
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      await auth.login({ email, password }, () => {
        navigate("/");
      });
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
        <Stack spacing={3}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
          <Alert severity="info">
            Don’t have an account?{" "}
            <Link
              sx={{ color: "tomato", textDecorationColor: "tomato" }}
              variant="subtitle2"
              onClick={() => setCurrentTab("REGISTER")}
            >
              Get started
            </Link>
          </Alert>

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
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FCheckbox name="remember" label="Remember me" />
          <Link
            sx={{ color: "tomato", textDecorationColor: "tomato" }}
            component={RouterLink}
            variant="subtitle2"
            onClick={() => setCurrentTab("RESER PASSWORD")}
          >
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          style={{ marginBottom: "10px", backgroundColor: "tomato" }}
          loading={isSubmitting}
        >
          LOGIN
        </LoadingButton>
        {/* <Divider>Or</Divider>
        <Box sx={{ my: 2, display: "flex", justifyContent: "space-between" }}>
          <Button sx={{ width: "40%",backgroundColor: "#001c44" }} variant="contained">
            <FacebookIcon />
          </Button>
          <Button sx={{ width: "40%",backgroundColor: "#001c44" }} variant="contained">
            <GoogleIcon />
          </Button>
        </Box> */}
      </FormProvider>
    </Container>
  );
}

export default LoginComponetPage;
