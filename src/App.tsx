import "./App.css";
import { useState, useEffect, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "normalize.css";
import { Box, createTheme, useMediaQuery } from "@mui/material";
import back from "./assets/back.jpg";
import ClientPage from "./components/clientPage";
import CustomerRecord from "./components/customerRecord";
import logoBack from "./assets/logoBack.svg";
const RegistrationClient = lazy(
  () => import("./components/registrationClient")
);
const AuthClient = lazy(() => import("./components/authClient"));
const RegistrationWorker = lazy(
  () => import("./components/registrationWorker")
);
const AuthWorker = lazy(() => import("./components/authWorker"));
const AdminPanel = lazy(() => import("./components/adminPanel"));
const Contacts = lazy(() => import("./components/UI/contacts/contacts"));
const Chat = lazy(() => import("./components/UI/chat/chat"));
const Stocks = lazy(() => import("./components/UI/stocks/stocks"));

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!user;

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 300,
        md: 500,
        lg: 1200,
        xl: 1600,
      },
    },
  });
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Router>
      {isDesktop && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            background: `#D6D5D5`,
            backgroundSize: "cover",
            backgroundPosition: "right bottom",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 0,
        }}
      >
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Routes>
            <Route
              path="/admin/registration"
              element={<RegistrationWorker />}
            />
            <Route path="/admin/login" element={<AuthWorker />} />
            <Route
              path="/admin/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <Navigate to="/admin/registration" replace />
                )
              }
            />
            <Route
              path="/admin"
              element={
                isAuthenticated ? (
                  <AdminPanel />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />
            <Route path="/" element={<Navigate to="/client" replace />} />
            <Route path="/client/stocks" element={<Stocks />} />
            <Route path="/client/chat" element={<Chat />} />
            <Route path="/client/contacts" element={<Contacts />} />
            <Route path="/client/login" element={<AuthClient />} />
            <Route
              path="/client/registration"
              element={<RegistrationClient />}
            />
            <Route path="/client" element={<ClientPage />} />
            <Route path="/client/:step" element={<CustomerRecord />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
