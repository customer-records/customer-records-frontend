import { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Header from "../header";
import { useNavigate } from "react-router-dom";
import MenuList from "../burgerMenu/menuList";

export default function TreatmentPlanPage() {
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

  const plans = [
    {
      date: "12.04.2025",
      done: ["12.04 – Лечение кариеса зуба 2.6 – 4 500 ₽"],
      planned: [
        "15 мая (среда), 10:30",
        "Установка пломбы (зуб 2.6)",
        "Врач: Ринат Леонидович",
        "Стоимость: 3 200 ₽",
        "Длительность: 40 минут",
      ],
      notes: [
        "20 мая (понедельник), 11:00",
        "Гигиеническая чистка зубов",
        "Врач: Ринат Леонидович",
        "Стоимость: 3 000 ₽",
        "Длительность: 60 минут",
        "Включает Air Flow и фторирование",
      ],
      doctor: { name: "Ринат Леонидович", title: "Терапевт" },
    },
    {
      date: "12.04.2024",
      done: ["12.04 – Удаление зуба 1.4 – 2 000 ₽"],
      planned: [],
      notes: ["План лечения завершен"],
    },
    {
      date: "27.08.2024",
      done: ["27.08 – Пломбировка канала 3.6 – 3 500 ₽"],
      planned: [],
      notes: ["План лечения завершен"],
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
        mx: "auto",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
      }}
    >
      <Header />

      <Box
        sx={{
          flex: 1,
          px: 2,
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
            ВАШ ПЛАН{" "}
          </Box>
          <Box component="span" sx={{ fontWeight: 500, color: "#0077FF" }}>
            ЛЕЧЕНИЯ
          </Box>
        </Typography>

        <div
          className="divider"
          style={{ marginTop: "20px", marginBottom: "30px" }}
        ></div>

        {plans.map((plan, idx) => {
          const isFirst = idx === 0;
          const bg = isFirst ? "#0077FF" : "#989898";
          return (
            <Accordion
              key={plan.date}
              defaultExpanded={isFirst}
              sx={{
                width: "100%",
                backgroundColor: bg,
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
                sx={{
                  px: 2,
                  py: isFirst ? 1 : 1.3,
                  borderRadius: isFirst ? "20px 20px 0 0" : "20px",
                  "& .MuiAccordionSummary-content": { margin: 0 },
                }}
              >
                <Typography
                  sx={{ fontWeight: 700, textTransform: "uppercase" }}
                >
                  {plan.date} – ПЛАН ЛЕЧЕНИЯ
                </Typography>
              </AccordionSummary>

              <AccordionDetails
                sx={{
                  p: 2,
                  bgcolor: bg,
                  color: "#fff",
                  borderRadius: "0 0 20px 20px",
                }}
              >
                {plan.done && plan.done.length > 0 && (
                  <>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: 700,
                        mb: 1,
                      }}
                    >
                      <CheckCircleIcon sx={{ mr: 1, color: "lightgreen" }} />
                      Что уже сделано:
                    </Typography>
                    <Box component="ul" sx={{ pl: 3, m: 0 }}>
                      {plan.done.map((item, i) => (
                        <Typography component="li" key={i}>
                          {item}
                        </Typography>
                      ))}
                    </Box>
                  </>
                )}

                {plan.planned && plan.planned.length > 0 && (
                  <>
                    <Typography sx={{ fontWeight: 700, mt: 2, mb: 1 }}>
                      📅Что запланировано:
                    </Typography>
                    <Box component="ul" sx={{ pl: 3, m: 0 }}>
                      {plan.planned.map((item, i) => (
                        <Typography component="li" key={i}>
                          {item}
                        </Typography>
                      ))}
                    </Box>
                  </>
                )}

                {plan.notes && plan.notes.length > 0 && (
                  <>
                    <Typography sx={{ fontWeight: 700, mt: 2, mb: 1 }}>
                      Дополнительно:
                    </Typography>
                    <Box component="ul" sx={{ pl: 3, m: 0, mb: 2 }}>
                      {plan.notes.map((item, i) => (
                        <Typography component="li" key={i}>
                          {item}
                        </Typography>
                      ))}
                    </Box>
                  </>
                )}

                {plan.doctor && (
                  <Box
                    sx={{
                      p: 1,
                      backgroundColor: "#fff",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Avatar sx={{ width: 32, height: 32 }} />
                    <Box>
                      <Typography sx={{ fontWeight: 700, color: "#000" }}>
                        {plan.doctor.name}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: "#000" }}>
                        {plan.doctor.title}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>
          );
        })}

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
