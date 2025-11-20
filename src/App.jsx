import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContextProvider"; // adjust the path according to your file structure
import { AuthRouter, MainRouter } from "./routes";
import { Toaster } from "@/components/ui/toaster";
import { ConfigProvider, theme as antdTheme } from "antd";
import frFR from "antd/lib/locale/fr_FR";
import { ModeToggle } from "./components/custom/mode-toggle";
import { useTheme } from "./contexts/ThemeContextProvider";
const { darkAlgorithm,  defaultAlgorithm } = antdTheme;
const App = () => {
  const { isLoggedIn } = React.useContext(AuthContext);
  const {theme} = useTheme();

  useEffect(() => {
    console.log("theme changed", theme)
  }, [theme]);
  return (
    <ConfigProvider
      locale={frFR}
      theme={{
        token: {
          colorPrimary: "#2463eb",
          colorInfo: "#2463eb",
        },
        components: {
          DatePicker: {
            colorBorder: "rgb(226, 232, 240)",
            activeBorderColor: "rgb(36, 99, 235)",
            colorTextPlaceholder: "rgb(100, 117, 139)",
            fontSizeLG: 13.5,
            fontHeightLG: 18,
          },
        },
        algorithm: [
          theme === "light" ? defaultAlgorithm : darkAlgorithm
        ],
      }}
    >
      <Router basename={import.meta.env.BASE_URL}>
        {!isLoggedIn ? <AuthRouter /> : <MainRouter />}
        <Toaster />
        <ModeToggle />
      </Router>
    </ConfigProvider>
  );
};

export default App;
