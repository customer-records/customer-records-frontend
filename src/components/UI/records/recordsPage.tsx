import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Badge,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "../header";
import MenuList from "../burgerMenu/menuList";
import { useNavigate } from "react-router-dom";

interface RecordItem {
  name: string;
  avatar?: string;
  date: string;
  time: string;
  statusColor?: "success" | "error" | "info" | "warning";
}

export default function RecordsPage() {
  const navigate = useNavigate();
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
  const [, setSharedHeight] = useState<number | null>(null);

  const records: RecordItem[] = [
    {
      name: "Ринат Леонидович",
      date: "21.04.25",
      time: "08:00",
      statusColor: "success",
    },
    {
      name: "Герман Ахатович",
      date: "22.04.25",
      time: "16:00",
      statusColor: "error",
    },
    {
      name: "Герман Ахатович",
      date: "22.04.25",
      time: "16:00",
      statusColor: "error",
    },
    {
      name: "Герман Ахатович",
      date: "22.04.25",
      time: "16:00",
      statusColor: "error",
    },
    {
      name: "Ринат Леонидович",
      date: "22.04.25",
      time: "16:00",
      statusColor: "success",
    },
  ];

  const secMenuItem = [
    {
      id: 1,
      specialist: "Онлайн запись",
      services: [
        "На определённую дату",
        "К специалисту",
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
        margin: "0 auto",
        minHeight: "100dvh",
        boxSizing: "border-box",
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header />
      <Box
        component="section"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ mt: "20px", fontSize: "24px" }}
        >
          <Box component="span" sx={{ color: "#0077FF", fontWeight: 700 }}>
            ВАШИ
          </Box>{" "}
          <Box component="span" sx={{ fontWeight: 500, color: "#0077FF" }}>
            ЗАПИСИ
          </Box>
        </Typography>

        <div
          className="divider"
          style={{ marginTop: "20px", marginBottom: "10px" }}
        ></div>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Специалист</TableCell>
              <TableCell>Дата и время</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((rec, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Badge
                      variant="dot"
                      color={rec.statusColor}
                      overlap="circular"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                    >
                      <Avatar src={rec.avatar} />
                    </Badge>
                    <Typography>{rec.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  {rec.date} / {rec.time}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <button
            className="round-button"
            onClick={() => window.open("https://t.me/denta_rell", "_blank")}
          ></button>
          <button
            className="round-button"
            onClick={() =>
              window.open(
                "https://api.whatsapp.com/send/?phone=79178585217&text=Здравствуйте!%0A%0AПишу+из+приложения.%0A%0A&type=phone_number&app_absent=0",
                "_blank"
              )
            }
          ></button>
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
