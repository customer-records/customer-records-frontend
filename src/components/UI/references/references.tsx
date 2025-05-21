import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import Header from "../header";
import MenuList from "../burgerMenu/menuList";

export default function ReferencesPage() {
  const navigate = useNavigate();
  const theme = createTheme({
    breakpoints: {
      values: { xs: 0, sm: 300, md: 500, lg: 1200, xl: 1600 },
    },
  });
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [, setSharedHeight] = useState<number | null>(null);

  const docs = [
    { label: "Выписка №3", date: "12.04.2025" },
    { label: "Справка №45", date: "11.02.2025" },
  ];

  const secMenuItem = [
    {
      id: 1,
      specialist: "Онлайн запись ",
      services: [
        "На определённую дату",
        "К специалисту ",
        "На услугу",
        "Быстрая запись",
      ],
    },
  ];

  return (
    <Box
      sx={{
        width: isDesktop ? "50dvh" : "100vw",
        maxWidth: 800,
        mx: "auto",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Header />

      <Box
        sx={{
          flex: 1,
          px: 2,
          pt: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          align="center"
          gutterBottom
          sx={{
            color: "#0077FF",
            fontWeight: 700,
            textTransform: "uppercase",
            fontSize: "24px",
          }}
        >
          Справки
        </Typography>

        <div
          className="divider"
          style={{ marginTop: "20px", marginBottom: "30px" }}
        ></div>

        <List sx={{ width: "100%" }} disablePadding>
          {docs.map((doc, i) => (
            <ListItem
              key={i}
              disableGutters
              sx={{
                display: "flex",
                justifyContent: "space-between",
                color: "#000000DE",
                alignItems: "center",
                px: 1,
                py: 2,
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <ListItemText
                primary={
                  <Typography fontSize={14}>
                    {doc.label}{" "}
                    <Box component="span" fontWeight={700}>
                      {doc.date}
                    </Box>
                  </Typography>
                }
              />
              <IconButton size="small">
                <DownloadIcon sx={{ color: "#0077FF" }} />
              </IconButton>
            </ListItem>
          ))}
        </List>

        {secMenuItem.map((item, index) => (
          <MenuList
            key={index}
            specialist={{ name: item.specialist, id: item.id }}
            services={item.services}
            currentId={item.id}
            setSyncedHeight={setSharedHeight}
          />
        ))}
      </Box>

      <Box
        sx={{
          padding: "0 16px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          background: "#FFFFFF",
        }}
      >
        <div
          className="divider"
          style={{ marginTop: "20px", marginBottom: "10px" }}
        ></div>
        <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <button
            className="round-button"
            onClick={() => window.open("https://t.me/denta_rell", "_blank")}
          />
          <button
            className="round-button"
            onClick={() =>
              window.open(
                "https://api.whatsapp.com/send/?phone=79178585217&text=Здравствуйте!%0A%0AПишу+из+приложения.%0A%0A&type=phone_number&app_absent=0",
                "_blank"
              )
            }
          />
          <button
            className="write-button"
            onClick={() => navigate("/client/chat")}
          >
            НАПИСАТЬ
          </button>
        </Box>
      </Box>
    </Box>
  );
}
