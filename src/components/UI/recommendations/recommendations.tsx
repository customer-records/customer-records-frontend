import React, { useState } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  createTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "../header";
import MenuList from "../burgerMenu/menuList";
import { useNavigate } from "react-router-dom";

export default function RecomendationPage() {
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

  const mockDetailContent = (
    <AccordionDetails>
      <Typography>
        Это пример рекомендаций по уходу. Проконсультируйтесь с лечащим врачом
        для более подробной информации.
      </Typography>
      <Typography sx={{ mt: 1, fontWeight: 700 }}>Советы:</Typography>
      <Box component="ul" sx={{ pl: 2, m: 0 }}>
        <Typography component="li">Использовать утром и вечером</Typography>
        <Typography component="li">Не глотать</Typography>
        <Typography component="li">Избегать приёма пищи сразу после</Typography>
      </Box>
    </AccordionDetails>
  );

  return (
    <Box
      sx={{
        width: isDesktop ? "50dvh" : "100vw",
        maxWidth: 800,
        mx: "auto",
        minHeight: "100vh",
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ mt: "20px", fontSize: "24px" }}
        >
          <Box component="span" sx={{ color: "#0077FF", fontWeight: 700 }}>
            ВАШИ{" "}
          </Box>
          <Box component="span" sx={{ fontWeight: 500, color: "#0077FF" }}>
            РЕКОМЕНДАЦИИ
          </Box>
        </Typography>

        <div
          className="divider"
          style={{ marginTop: "10px", marginBottom: "20px" }}
        ></div>

        <Accordion
          sx={{
            backgroundColor: "#0077FF",
            color: "#fff",
            borderRadius: "20px",
            mb: 2,
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon sx={{ color: "#fff", minHeight: "70px" }} />
            }
          >
            <Typography sx={{ fontWeight: 700, textTransform: "uppercase" }}>
              💊 Приём антибиотиков
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Ваш лечащий врач назначил антибиотик: Амоксиклав 875/125 mg
            </Typography>
            <Typography sx={{ mt: 0.5 }}>Курс: 7 дней</Typography>

            <Typography sx={{ mt: 1, fontWeight: 700 }}>
              Схема приёма:
            </Typography>
            <Box component="ul" sx={{ pl: 2, m: 0 }}>
              <Typography component="li">
                По 1 таблетке 2 раза в день (утром и вечером)
              </Typography>
              <Typography component="li">
                Принимать во время еды или сразу после
              </Typography>
              <Typography component="li">
                Запивать водой (не соком, не молоком)
              </Typography>
            </Box>

            <Typography sx={{ mt: 1, fontWeight: 700 }}>⚠️ Важно:</Typography>
            <Box component="ul" sx={{ pl: 2, m: 0 }}>
              <Typography component="li">Не пропускайте приём</Typography>
              <Typography component="li">Не увеличивайте дозу сами</Typography>
              <Typography component="li">
                Если почувствуете сыпь, боли в животе или понос – сообщите врачу
              </Typography>
            </Box>

            <Typography sx={{ mt: 1, fontWeight: 700 }}>🟢 Совет:</Typography>
            <Box component="ul" sx={{ pl: 2, m: 0 }}>
              <Typography component="li">
                Для защиты микрофлоры кишечника принимайте пробиотик (например,
                Линекс) через 1–2 часа после антибиотика
              </Typography>
              <Typography component="li">
                Избегайте алкоголя на время лечения
              </Typography>
            </Box>

            <Box
              sx={{
                mt: 2,
                p: 1,
                backgroundColor: "#fff",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Avatar sx={{ width: 32, height: 32 }} />
              <Box>
                <Typography sx={{ fontWeight: 700, color: "#000" }}>
                  Ринат Леонидович
                </Typography>
                <Typography sx={{ fontSize: 12, color: "#000" }}>
                  Терапевт
                </Typography>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{
            backgroundColor: "#0077FF",
            color: "#fff",
            borderRadius: "20px",
            width: "100%",
            mb: 2,
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon sx={{ color: "#fff", minHeight: "70px" }} />
            }
          >
            <Typography sx={{ fontWeight: 700, textTransform: "uppercase" }}>
              💧 Антисептики (для полоскания)
            </Typography>
          </AccordionSummary>
          {mockDetailContent}
        </Accordion>

        <Accordion
          sx={{
            backgroundColor: "#0077FF",
            color: "#fff",
            borderRadius: "20px",
            width: "100%",
            mb: 2,
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon sx={{ color: "#fff", minHeight: "70px" }} />
            }
          >
            <Typography sx={{ fontWeight: 700, textTransform: "uppercase" }}>
              🧴 Мази и гели – при воспалении
            </Typography>
          </AccordionSummary>
          {mockDetailContent}
        </Accordion>

        <Accordion
          sx={{
            backgroundColor: "#4CAF50",
            color: "#fff",
            borderRadius: "20px",
            mb: 2,
            width: "100%",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon sx={{ color: "#fff", minHeight: "70px" }} />
            }
          >
            <Typography sx={{ fontWeight: 700, textTransform: "uppercase" }}>
              🕒 Профилактическая чистка (запись на прием)
            </Typography>
          </AccordionSummary>
          {mockDetailContent}
        </Accordion>

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
