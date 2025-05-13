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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '135px',
        minHeight: '135px', 
        flexShrink: 0,
        overflow: 'hidden',
        borderRadius: '12px',
        border: '1px solid #9C07FF'
      }}
    >
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A176c06a0f2e2278b53b4acd488fb2c0152b45f89242f5c34a8b4eae578857153&amp;source=constructor"
        width="358px"
        height="135px"
        style={{ border: 0, display: 'block',borderRadius:'10px' }}
        frameBorder="0"
        allowFullScreen
        title="Yandex Map"
      />
    </div>
  );
}
