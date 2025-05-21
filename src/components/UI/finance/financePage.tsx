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
import { useState } from "react";
import MenuList from "../burgerMenu/menuList";
import DownloadIcon from "@mui/icons-material/Download";
import Header from "../header";
import { useNavigate } from "react-router-dom";
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
export default function FinancesPage() {
  const navigate = useNavigate();
  const theme = createTheme({
    breakpoints: {
      values: { xs: 0, sm: 300, md: 500, lg: 1200, xl: 1600 },
    },
  });
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [, setSharedHeight] = useState<number | null>(null);
  const checkDates = [
    "12.04.2025",
    "11.02.2025",
    "27.11.2024",
    "11.08.2024",
    "23.02.2024",
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
        alignItems: "center",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Header />

      <Box
        sx={{
          flex: 1,
          px: 2,
          pt: 2,
          width: "100%",
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
          Финансы
        </Typography>

        <div
          className="divider"
          style={{ marginTop: "20px", marginBottom: "10px" }}
        ></div>

        <List sx={{ width: "100%" }} disablePadding>
          {checkDates.map((date) => (
            <ListItem
              key={date}
              disableGutters
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 1,
                py: 2,
                borderBottom: "1px solid #e0e0e0",
                color: "#000000DE",
              }}
            >
              <ListItemText
                primary={
                  <Typography fontSize={14}>
                    Чек{" "}
                    <Box component="span" fontWeight={700}>
                      {date}
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

        {secMenuItem.map(
          (
            item: { specialist: any; id: number; services: string[] },
            index: number
          ) => (
            <MenuList
              key={index}
              specialist={{ name: item.specialist, id: item.id }}
              services={item.services}
              currentId={item.id}
              setSyncedHeight={setSharedHeight}
            />
          )
        )}
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
