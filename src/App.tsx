import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import { CardProvider } from "./context/cardContext";
import { AuthProvider } from "./context/authContext";
function App() {
  return (
    <>
      <AuthProvider>
        <CardProvider>
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/auth/login" element={<Login />} />
            </Route>

            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </CardProvider>
      </AuthProvider>
    </>
  );
}

export default App;
