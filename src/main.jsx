import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./global.css";
import { SocketContextProvider } from "./context/socketContext.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AuthContextProvider>
    <SocketContextProvider>
      <App />
      <Toaster position="top-right" />
    </SocketContextProvider>
  </AuthContextProvider>
  // </StrictMode>
);
