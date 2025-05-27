import { Box, useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import "./client.css";
import calendar from "../assets/calendar.svg";
import { useNavigate } from "react-router-dom";
import Header from "./UI/header";
export default function ClientPage() {
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
  const handleClick = (route: string) => {
    navigate(route);
  };
  return (
    <Box
      sx={{
        width: isDesktop ? "50dvh" : "100vw",
        maxWidth: 800,
        margin: "0 auto",
        minHeight: "100dvh",
        boxSizing: "border-box",
        background: "#FFFFFF",
      }}
    >
      <Header />

      <section className="section">
        <div className="header-text">
          <div>
            <span className="zapisites">Запись</span>
            <span className="na-priem"> на консультацию</span>
          </div>
          <div className="divider" ></div>
        </div>
        <div className="buttons-container">
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px'
          }}>
            <div>
              <span className="zapisites">On</span>
              <span className="na-priem"> line</span>
            </div>
            <button
              onClick={() => handleClick("/client/initial_online_consultation")}
              className="custom-button"
            >
              <span className="button-icon">
                <img
                  loading="eager"
                  fetchPriority="high"
                  src={calendar}
                  alt="Календарь"
                />
              </span>
              <span className="button-text">Первая консультация</span>
            </button>
            <button
              onClick={() => handleClick("/client/standard_online_consultation")}
              className="custom-button"
            >
              <span className="button-icon">
                <img
                  loading="eager"
                  fetchPriority="high"
                  src={calendar}
                  alt="Специалист"
                />
              </span>
              <span className="button-text">станд. консультация</span>
            </button>
            <div className="divider" ></div>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px'
          }}>
            <div>
              <span className="zapisites">Off</span>
              <span className="na-priem"> line</span>
            </div>
            <button
              onClick={() => handleClick("/client/standard_offline_consultation")}
              className="custom-button"
            >
              <span className="button-icon">
                <img
                  loading="eager"
                  fetchPriority="high"
                  src={calendar}
                  alt="Услуга"
                />
              </span>
              <span className="button-text">станд. консультация</span>
            </button>
          </Box>

        </div>

        <div className="divider"></div>

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
          onClick={() => navigate("./login")}
        >
          Войти в личный кабинет
        </button>
      </section>
    </Box>
  );
}
