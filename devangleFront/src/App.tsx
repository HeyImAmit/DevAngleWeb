import { AuthProvider } from "@/context/AuthProvider";
import AppRouter from "@/routes/AppRouter";
import StoreProvider from "./context/StoreProvider";

function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <AppRouter />
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;
