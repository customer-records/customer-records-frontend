import { Box, useTheme, useMediaQuery, createTheme } from "@mui/material";
import MenuList from "./menuList";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    id: 1,
    specialist: "Онлайн запись",
    services: ["На определённую дату", "К специалисту", "На услугу"],
  },
  {
    id: 2,
    specialist: "Услуги",
    services: [
      "Хирургия",
      "Терапия",
      "Подпункт меню",
      "Подпункт меню",
      "Подпункт меню",
      "Подпункт меню",
    ],
  },
  {
    id: 3,
    specialist: "Личный кабинет",
    services: [
      "Ваш чат с доктором",
      "Ваши записи",
      "Ваш план лечения",
      "Рекомендации специалиста",
      "Ваши финансы",
      "Ваши справки",
    ],
  },
  {
    id: 4,
    specialist: "Контакты",
    services: [
      "+7 (917) 858 – 52 – 17",
      "+7 (917) 858 – 52 – 17",
      "+7 (917) 858 – 52 – 17",
      "Проспект победы 356",
    ],
  },
  {
    id: 5,
    specialist: "Акции",
    services: [],
  },
];

export default function BurgerMenu({ onClose }: any) {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 300,
        md: 450,
        lg: 1200,
        xl: 1600,
      },
    },
  });

  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: isDesktop ? "-18px" : "0",
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: isDesktop ? "center" : "flex-start",
        alignItems: "flex-start",
        overflowY: "auto",
        backgroundColor: "#f5f5f5",
        minHeight: "100dvh",
        zIndex: 1300,
      }}
    >
      <Box
        sx={{
          width: isDesktop ? "50dvh" : "100vw",
          maxWidth: 800,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: isDesktop ? "0 0 20px rgba(0,0,0,0.1)" : "none",
          position: "relative",
          minHeight: "100dvh",
          backgroundColor: "#FFFFFF",
        }}
      >
        <button
          className="on-close-burger"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            padding: isDesktop ? "40px 40px" : "20px 20px",
            background: "none",
            border: "none",
            fontSize: "34px",
            cursor: "pointer",
            zIndex: 1000,
            color: "#0077FF",
            outline: "none",
          }}
        >
          ×
        </button>

        <Box
          sx={{
            width: "100%",
            padding: isDesktop ? "24px 5%" : "16px 5%",
            boxSizing: "border-box",
          }}
        >
          <div className="header-text">
            <div>
              <span className="zapisites">Выберите </span>
              <span className="na-priem"> услугу</span>
            </div>
            <div className="divider"></div>
          </div>
        </Box>

        <Box
          sx={{
            width: "90%",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {menuItems.map((item, index) => (
            <MenuList
              key={index}
              specialist={{ name: item.specialist, id: item.id }}
              services={item.services}
              currentId={item.id}
              onClose={onClose}
            />
          ))}
        </Box>

        <Box
          sx={{
            width: "100%",
            padding: "20px 5%",
            marginTop: "auto",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="divider" style={{ marginTop: "0px" }}></div>
          <div className="buttons-block">
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
          </div>
          <button
            className="login-button"
            onClick={() => navigate("/client/login")}
          >
            Войти в личный кабинет
          </button>
        </Box>
      </Box>
    </Box>
  );
}
