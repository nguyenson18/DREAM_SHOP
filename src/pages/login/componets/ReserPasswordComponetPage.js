import { Alert, Container, Link, Stack } from "@mui/material";
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
  const auth = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const {
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    clearErrors("root"); 
    try {
      await auth.resetPassword({ email: data.email }, setCurrentTab, enqueueSnackbar);
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || "Not Found";

      setError("root", { type: "server", message }); 
      enqueueSnackbar(message, { variant: "error" });
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginBottom: 20, marginTop: 10 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} style={{ marginBottom: 30 }}>
          {!!errors.root && (
            <Alert severity="error">{errors.root.message}</Alert>
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

          <FTextField variant="standard" name="email" label="Full Email" />
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
