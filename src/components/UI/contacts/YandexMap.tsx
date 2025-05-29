import { useEffect, useState } from "react";

export default function YandexMap() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
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
        border: '1px solid #0077FF'
      }}
    >
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3Afa7dc5035bc173ff6bb297f3733e70895f44fc1d335752213d8c118bdb212f67&amp;source=constructor"
        width="358px"
        height="135px"
        style={{ border: 0, display: 'block', borderRadius: '10px' }}
        frameBorder="0"
        allowFullScreen
        title="Yandex Map"
      />
    </div>
  );
}
