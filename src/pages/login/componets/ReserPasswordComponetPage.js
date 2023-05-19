import { Alert, Container, Link, Stack } from "@mui/material";
import React, { useRef } from "react";
import { FormProvider, FTextField } from "../../../componets/form";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { useSnackbar } from "notistack";

const defaultValues = {
  email: "",
};

function ReserPasswordComponetPage({ setCurrentTab }) {
  const methods = useForm({ defaultValues });
  const form = useRef();
  const auth = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;
  console.log(errors);
  const onSubmit = async (data) => {
    const { email } = data;
    try {
      await auth.resetPassword({ email }, setCurrentTab, enqueueSnackbar);
    } catch (error) {
      console.log(error);
      reset();
      setError("responseError", error);
      enqueueSnackbar(error.message || "Not Found", { variant: "error" });
    }
  };
  return (
    <Container
      maxWidth="xs"
      style={{ marginBottom: "20px", marginTop: "10px" }}
    >
      <FormProvider
        form={form}
        methods={methods}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={3} style={{ marginBottom: "30px" }}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
          <Alert severity="info">
            Don't have an account?{" "}
            <Link
              sx={{ color: "tomato", textDecorationColor: "tomato" }}
              variant="subtitle2"
              onClick={() => setCurrentTab("REGISTER")}
            >
              Get Started
            </Link>
          </Alert>
          <FTextField
            variant="standard"
            name="email"
            label="Full Email"
            id="sendEmail"
          />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          style={{ backgroundColor: "tomato" }}
          loading={isSubmitting}
        >
          SEND
        </LoadingButton>
      </FormProvider>
    </Container>
  );
}

export default ReserPasswordComponetPage;
