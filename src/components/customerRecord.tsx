import React, { useEffect, useState } from "react";
import {
  Box,
  useMediaQuery,
  useTheme,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "./client.css";
import OnDate from "./UI/onDate";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material";
import OnSpecialist from "./UI/onSpecialist";
import OnService from "./UI/onService";
import OnFastRecord from "./UI/onFastRecord";
import Header from "./UI/header";

export default function CustomerRecord() {
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
  const navigate = useNavigate();
  const location = useLocation();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // Функция для определения, какой компонент отображать
  // /client/table_for_two /initial_online_consultation
  // /client/from_four_to_six /standard_online_consultation
  // /client/xbox_from_four_to_six /standard_offline_consultation
  // /client/ps_from_four_to_six
  // /client/vip
  const renderContent = () => {
    return <OnDate />;
  };

  useEffect(() => {
    console.log("Текущий путь:", location.pathname);
  }, [location.pathname]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          width: isDesktop ? "50dvh" : "100vw",
          height: "100dvh",
          maxWidth: 800,
          margin: "0 auto",
          minHeight: "100dvh",
          boxSizing: "border-box",
          background: "#FFFFFF",
        }}
      >
        <Header />

        <section className="section">
          {renderContent()}

          <div className="divider" style={{ marginTop: "0px" }}></div>

          <div className="buttons-block">
            <button
              className="round-button"
            // onClick={() =>
            //   window.open("https://t.me/+4TGijmHMFOkwNTBi", "_blank")
            // }
            ></button>

            <button
              className="write-button"
              disabled={true}
              onClick={() => navigate("/client/chat")}
            >
              НАПИСАТЬ
            </button>
          </div>

          <button
            className="login-button"
            disabled={true}
            onClick={() => navigate("/client/login")}
          >
            Войти в личный кабинет
          </button>
        </section>
      </Box>
    </LocalizationProvider>
  );
}
