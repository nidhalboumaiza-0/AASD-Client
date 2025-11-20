import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import AuthContextProvider from "@/contexts/AuthContextProvider";
import "./index.css";
import { ThemeProvider } from "./contexts/ThemeContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </AuthContextProvider>
);
