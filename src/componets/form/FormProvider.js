import { FormProvider as RHFormProvider } from "react-hook-form";

function FormProvider({form, children, onSubmit, methods }) {
  return (
    <RHFormProvider {...methods}>
      <form ref={form} onSubmit={onSubmit}>{children}</form>
    </RHFormProvider>
  );
}

export default FormProvider;
