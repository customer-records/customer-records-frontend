import { useEffect, useState } from "react";

export default function YandexMap() {
  const [isVisible, setIsVisible] = useState(false);

  // Автоматически монтируется/размонтируется при появлении в DOM
  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false); // Размонтирование при удалении
  }, []);

  if (!isVisible) return null;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "135px",
        minHeight: "135px",
        flexShrink: 0,
        overflow: "hidden",
        borderRadius: "12px",
        border: "1px solid #9C07FF",
      }}
    >
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A837625ec43db33cdd3225c5d0ffd941ebf995a3f334a8b71d14e85c0e6a8bea3&source=constructor"
        width="358px"
        height="135px"
        style={{
          border: 0,
          display: "block",
          borderRadius: "10px",
        }}
        frameBorder="0"
        allowFullScreen
        title="Yandex Map"
      />
    </div>
  );
}
