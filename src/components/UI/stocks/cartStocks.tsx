import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

type CartStocksProps = {
  head: [string, string];
  description: string[];
  img: string;
};

export default function CartStocks({
  head,
  description,
  img,
}: CartStocksProps) {
  const [titleLine, subtitleLine] = head;

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#fdeee8",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", // выравнивание по верху
        padding: "20px 10px",
        width: "95%",
        minHeight: "445px",
        boxSizing: "border-box",

        "&::before": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "80%",
          backgroundImage: `url(${img})`,
          backgroundSize: "auto 100%",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
          filter: "blur(3px)",
          zIndex: 0,
        },

        "& > *": {
          position: "relative",
          zIndex: 1,
        },
      }}
    >
      {/* Заголовок: две строки, выровненные влево */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start", // выравниваем по левому краю
          mb: 2,
          padding: "13px 10px",
        }}
      >
        <Typography
          component="div"
          sx={{
            fontFamily: "Roboto",
            color: "#1a2c3d",
            fontWeight: 700,
            fontSize: "1.5rem",
            lineHeight: 1.2,
          }}
        >
          {titleLine}
        </Typography>
        <Typography
          component="div"
          sx={{
            fontFamily: "Roboto",
            color: "#1a2c3d",
            fontWeight: 400,
            fontSize: "1.25rem",
            lineHeight: 1.2,
          }}
        >
          {subtitleLine}
        </Typography>
      </Box>

      {/* Список и ссылка — прижимаем к низу */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1dvh",
          marginTop: "auto",
          width: "100%",
        }}
      >
        <Box
          component="ul"
          sx={{
            p: "15px 20px",
            m: 0,
            width: "calc(95% - 10px)",
            background: "#FFFFFFB2",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            "& li": {
              fontFamily: "Roboto",
              color: "#000000",
              fontSize: "14px",
              fontWeight: 400,
            },
          }}
        >
          {description.map((text, i) => (
            <li key={i}>{text}</li>
          ))}
        </Box>
        <Link
          to="/client"
          style={{
            color: "#1A2C3D",
            textDecoration: "underline",
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: 600,
            paddingLeft: "10px",
          }}
        >
          ЗАПИСАТЬСЯ НА ПРИЕМ
        </Link>
      </Box>
    </Box>
  );
}