import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  Divider,
  useMediaQuery,
  createTheme,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

type Message = {
  id: number;
  from: "doctor" | "user";
  text: string;
};

const DoctorChat: React.FC = () => {
  const theme = createTheme({
    breakpoints: { values: { xs: 0, sm: 300, md: 450, lg: 1200, xl: 1600 } },
  });
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const doctor = {
    name: "Ринат Леонидович",
    status: "ОНЛАЙН",
    role: "Врач терапевт",
    avatarUrl: "https://via.placeholder.com/40",
    message: {
      title: "ПРОСТО НАПИШИТЕ В ЧАТ — И Я ПОМОГУ!",
      list: [
        "ПОДБЕРУ ОПТИМАЛЬНЫЙ ДЛЯ ВАС КОМПЛЕКС МЕДИЦИНСКИХ УСЛУГ",
        "ОРГАНИЗУЮ ИХ ПОЛУЧЕНИЕ В ПРОВЕРЕННЫХ МЕДИЦИНСКИХ УЧРЕЖДЕНИЯХ",
        "ПРОКОНТРОЛИРУЮ РЕЗУЛЬТАТЫ",
      ],
    },
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const input = document.querySelector("input");
    if (!input) return;
    const preventScroll = (e: TouchEvent) => e.preventDefault();
    const handleFocus = () => {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.addEventListener("touchmove", preventScroll, {
        passive: false,
      });
      setTimeout(
        () => input.scrollIntoView({ behavior: "smooth", block: "center" }),
        300
      );
    };
    const handleBlur = () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.removeEventListener("touchmove", preventScroll);
    };
    input.addEventListener("focus", handleFocus);
    input.addEventListener("blur", handleBlur);
    return () => {
      input.removeEventListener("focus", handleFocus);
      input.removeEventListener("blur", handleBlur);
      document.body.removeEventListener("touchmove", preventScroll);
    };
  }, []);

  const sendMessage = () => {
    const text = inputValue.trim();
    if (!text) return;
    setInputValue("");
    setMessages((msgs) => [
      ...msgs,
      { id: msgs.length + 1, from: "user", text },
    ]);
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        {
          id: msgs.length + 1,
          from: "doctor",
          text: "В данный момент чат недоступен. Приносим извинения за неудобства.",
        },
      ]);
    }, 500);
  };

  return (
    <Box
      sx={{
        width: "80%",
        maxHeight: { xs: "60dvh", md: "55dvh" },
        minHeight: 500,
        border: "1px solid #0077FF",
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "Arial",
        bgcolor: "#F1F1F1",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1,
          background: "#0000001F",
        }}
      >
        <Avatar src={doctor.avatarUrl} sx={{ mr: 1 }} />
        <Box>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            sx={{
              fontSize: isDesktop ? "15px" : "11px",
              color: "#000000DE",
              lineHeight: 1,
            }}
          >
            {doctor.name}{" "}
            <Typography
              component="span"
              color="primary"
              sx={{ fontSize: isDesktop ? "15px" : "11px", lineHeight: 1 }}
            >
              | {doctor.status}
            </Typography>
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 0, lineHeight: 1 }}
          >
            {doctor.role}
          </Typography>
        </Box>
      </Box>

      <Divider />

      {messages.length === 0 && (
        <Paper
          elevation={0}
          sx={{ m: 1, p: 1.5, bgcolor: "#fff", borderRadius: 2 }}
        >
          <Typography
            sx={{ fontSize: isDesktop ? "13px" : "10px" }}
            fontWeight="bold"
            gutterBottom
          >
            {doctor.message.title}
          </Typography>
          <ul style={{ paddingLeft: "1.2em", margin: 0 }}>
            {doctor.message.list.map((item, idx) => (
              <li key={idx}>
                <Typography sx={{ fontSize: isDesktop ? "11px" : "9.5px" }}>
                  {item}
                </Typography>
              </li>
            ))}
          </ul>
        </Paper>
      )}

      <Box
        sx={{
          flexGrow: 1,
          px: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              display: "flex",
              justifyContent: msg.from === "doctor" ? "flex-start" : "flex-end",
              mb: 1,
              mt: 1,
            }}
          >
            <Paper
              sx={{
                p: 1,
                bgcolor: msg.from === "doctor" ? "#FFFFFF" : "#CBE3FF",
                color: msg.from === "doctor" ? "text.primary" : "#000000",
                borderRadius: 2,
                maxWidth: "70%",
              }}
            >
              <Typography sx={{ fontSize: isDesktop ? "13px" : "11px" }}>
                {msg.text}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          mt: "auto",
          display: "flex",
          borderTop: "1px solid #000000",
          px: 1,
          py: 0.5,
          alignItems: "center",
          color: "#4B4B4B",
        }}
      >
        <TextField
          placeholder="Напишите нам свой вопрос"
          variant="standard"
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          InputProps={{ disableUnderline: true }}
          sx={{
            fontSize: isDesktop ? "14px" : "11px",
            "& .MuiInputBase-input::placeholder": {
              color: "#4B4B4B",
              opacity: 1,
            },
          }}
        />
        <IconButton color="primary" onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DoctorChat;
