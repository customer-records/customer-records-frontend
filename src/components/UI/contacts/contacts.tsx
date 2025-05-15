import { Box, createTheme, Typography, useMediaQuery } from "@mui/material";
import MenuListOpened from "./openedMenu";
import MenuList from "../burgerMenu/menuList";
import { useState } from "react";
import YandexMaps from "../../../../src/assets/YandexMaps.svg";
import GIS from "../../../../src/assets/2GIS.svg";
import ButtonMap from "./buttonMap";
import YandexMap from "./YandexMap";
import Header from "../header";
import { useNavigate } from "react-router-dom";

const menuItems: any = [
  {
    id: 4,
    specialist: "Свяжитесь с нами",
    services: [
      "+7 (995) - 007 - 51 - 75",
      "+7 (995) - 007 - 51 - 75",
      "+7 (995) - 007 - 51 - 75",
    ],
  },
];
const secMenuItem = [
  {
    id: 1,
    specialist: "Онлайн запись ",
    services: [
      "Для двоих",
      "от 4 до 6 гостей ",
      "Xbox: от 4 до 6 гостей",
      "Быстрая запись",
    ],
  },
];
const mapButton = [
  {
    name: "Построить маршрут",
    img: YandexMaps,
  },
  {
    name: "Построить маршрут",
    img: GIS,
  },
];
export default function Contacts() {
  const navigate = useNavigate();
  const [sharedHeight, setSharedHeight] = useState<number | null>(null);
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
          gap: "20px",
          flex: 1,
        }}
      >
        <Header />
        <div>
          <span className="zapisites">Контакты </span>
        </div>
        <div className="divider" style={{ marginTop: "0px" }}></div>
        <YandexMap />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              sx={{
                font: "Roboto",
                color: "#000000DE",
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: "700",
              }}
            >
              Адрес:
            </Typography>
            <Typography
              sx={{
                font: "Roboto",
                color: "#000000DE",
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: "400",
              }}
            >
              Мавлютого 46 ,вход со стороны Яндекс Лавки
            </Typography>
            <Typography
              sx={{
                font: "Roboto",
                color: "#000000DE",
                fontSize: "14px",
                lineHeight: "20px",
                fontWeight: "400",
              }}
            >
              Горки-1 м-н, Приволжский район, Казань
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {mapButton.map((elem, indx) => (
            <ButtonMap
              key={indx}
              type={indx === 0 ? "YA" : "2GIS"}
              name={elem.name}
              img={elem.img}
            />
          ))}
        </Box>
        {menuItems.map(
          (
            item: { specialist: any; id: number; services: string[] },
            index: number
          ) => (
            <MenuListOpened
              key={index}
              specialist={{ name: item.specialist, id: item.id }}
              services={item.services}
              currentId={item.id}
              syncedHeight={sharedHeight}
            />
          )
        )}
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
              onClick={() =>
                window.open("https://t.me/+4TGijmHMFOkwNTBi", "_blank")
              }
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
