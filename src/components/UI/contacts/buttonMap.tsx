import { Button } from "@mui/material";

export default function ButtonMap({ img, name, type }: any) {
  const handleClick = (type: string) => {
    if (type === "YA") {
      window.open(
        "https://yandex.ru/maps/-/CHvZJT45",
        "_blank",
        "noopener,noreferrer"
      );
    } else {
      window.open("https://go.2gis.com/MgZZE", "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <Button
        sx={{
          ...buttonStyle,
          border: "1px solid #07B0FF",
          color: "#FFFFFF",
          fontWeight: "700",
          fontSize: "14px",
          textWrap: "nowrap",
        }}
        onClick={() => handleClick(type)}
      >
        <img loading="eager" fetchPriority="high" src={img} alt="назад"></img>
        {name}
      </Button>
    </>
  );
}
const buttonStyle = {
  width: 227,
  height: 40,
  borderRadius: "20px",
  gap: "7px",
  borderWidth: "2px",
  backgroundColor: "#07B0FF",
  color: "white",
  textTransform: "uppercase",
  fontFamily: "Roboto",
  fontWeight: 700,
  lineHeight: "32px",
};
