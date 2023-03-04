import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Router from "./routers";
import { SnackbarProvider } from "notistack";
import SnackbarCloseButton from "./componets/notistack";

function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      action={(snackbarKey) => (
        <SnackbarCloseButton snackbarKey={snackbarKey} />
      )}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <AuthProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
