import { useEffect, useState } from "react";
import BurgerMenu from "./burgerMenu/burgerMenu";
import home from "../../assets/home.svg";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

export default function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [display, SetDisplay] = useState("flex");
  const [height, SetHeight] = useState("30dvh");
  const [MinHeight, SetMinHeight] = useState("25dvh");
  const [jusContent, SetJusContent] = useState("space-between");

  // пока условие всегда true, позже замените своей логикой
  const showAvatar = true;

  const switchText = () => {
    let path = window.location.pathname;
    if (path.startsWith("/admin")) {
      return "Панель администратора";
    } else if (path.startsWith("/client")) {
      return "Онлайн запись";
    }
    return "";
  };

  useEffect(() => {
    let path = window.location.pathname;
    if (path !== "/client" && path !== "/client/") {
      SetDisplay("none");
      SetHeight("auto");
      SetMinHeight("100px");
      SetJusContent("center");
    } else {
      SetDisplay("flex");
      SetHeight("30dvh");
      SetMinHeight("25dvh");
      SetJusContent("space-between");
    }
  }, []);

  const handleHome = () => {
    let path = window.location.pathname;
    if (path !== "/client") navigate("/client");
  };

  return (
    <>
      <header
        style={{
          height: height,
          minHeight: MinHeight,
          justifyContent: jusContent,
        }}
        className="header"
      >
        <div className="header-background"></div>
        <div className="header-top">
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button onClick={handleHome} className="home">
              <img src={home} alt="home" />
            </button>

            {showAvatar && (
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  border: "1px solid #0077FF",
                  cursor: "pointer",
                }}
              />
            )}

            <button
              disabled
              className="online-booking-button"
              style={{
                outline: "none",
                border: "none",
                boxShadow: "none",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                /* убрали жёсткое ограничение по ширине */
                display: "inline-block",
                cursor: "default",
              }}
            >
              {switchText()}
            </button>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="burger-menu-button"
          >
            <div className="burger-icon">
              <div></div>
            </div>
          </button>
        </div>

        <div className="headWrap" style={{ display: display }}>
          <div className="header-bottom">
            <h1 className="service-name">Стоматология</h1>
            <p className="company-name">Denta - rell</p>
          </div>
          <div className="roundLogo"></div>
        </div>
      </header>

      {isOpen && <BurgerMenu onClose={() => setIsOpen(false)} />}
    </>
  );
}
