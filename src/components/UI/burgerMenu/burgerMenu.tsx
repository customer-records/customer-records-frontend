import { Box, useTheme, useMediaQuery, createTheme } from "@mui/material";
import MenuList from "./menuList";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    id: 1,
    specialist: "Онлайн запись",
    services: ["ON line - консультация", "OFF line - консультация", "На услугу"],
  },
  {
    id: 4,
    specialist: "Контакты",
    services: ["+7 (995) - 007 - 51 - 75", "Проспект победы 35б"],
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
            color: "#07B0FF",
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
        </Box>
      </Box>
    </Box>
  );
}
