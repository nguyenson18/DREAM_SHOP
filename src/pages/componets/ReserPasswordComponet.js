import { Alert, Container, Link, Stack } from "@mui/material";
import React from "react";
import { FormProvider, FTextField } from "../../componets/form";
import { Link as RouterLink } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";

const defaultValues = {
  email: "",
};

function ReserPasswordComponet({ setCurrentTab }) {
  const methods = useForm({ defaultValues });

  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = methods;
  const onSubmit = () => {};
  return (
    <Container
      maxWidth="xs"
      style={{ marginBottom: "20px", marginTop: "10px" }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} style={{ marginBottom: "30px" }}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
          <Alert severity="info">
            Don't have an account?{" "}
            <Link variant="subtitle2" onClick={() => setCurrentTab("REGISTER")}>
              Get Started
            </Link>
          </Alert>
          <FTextField variant="standard" name="name" label="Full Email" />
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

export default ReserPasswordComponet;