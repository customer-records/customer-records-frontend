import { Box, createTheme, useMediaQuery } from "@mui/material";
import Header from "../header";
import { Typography } from "@mui/material";
import CartStocks from "./cartStocks";
import { useNavigate } from "react-router-dom";
import { mockStocks } from "./data";

export default function Stocks() {
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
  return (
    <>
      <Box
        sx={{
          width: isDesktop ? "50dvh" : "100vw",
          maxWidth: 800,
          margin: "0 auto",
          boxSizing: "border-box",
          background: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Header />

        <Box
          sx={{
            margin: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: "15px",
          }}
        >
          {mockStocks.map((elem, indx) => (
            <>
              <CartStocks
                key={elem.head + indx}
                head={elem.head}
                description={elem.description}
                img={elem.img}
              />
            </>
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
            // onClick={() => window.open("https://t.me/denta_rell", "_blank")}
            ></button>
            <button
              className="round-button"
            // onClick={() =>
            //   window.open(
            //     "https://api.whatsapp.com/send/?phone=79178585217&text=Здравствуйте!%0A%0AПишу+из+приложения.%0A%0A&type=phone_number&app_absent=0",
            //     "_blank"
            //   )
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
    </>
  );
}