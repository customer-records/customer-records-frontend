import { useRef, useState } from 'react';
import './ui.css';

interface Service {
  id: number;
  name: string;
}

interface ServiceListProps {
  specialist: any;
  services: Service[];
  selectedService: string | null;
  onSelect: (name: string | null, id?: number | null) => void; // Изменён тип параметра
}

const ServiceList = ({ specialist, services, selectedService, onSelect }: ServiceListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const handleServiceClick = (name: string, id: number) => {
    if (selectedService === name) {
      onSelect(null); // Снимаем выбор при повторном клике
    } else {
      console.log(name, id)
      onSelect(name, id); // Выбираем услугу
    }
  };

  return (
    <div className="dropdown-wrapper">
      <div className="dropdown-container">
        <div className="dropdown-header" onClick={toggleList}>
          <span className="specialist-name">{specialist.name}</span>
          <div className={`arrow-icon ${isOpen ? 'open' : ''}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10L12 15L17 10H7Z" fill="#757575"/>
            </svg>
          </div>
        </div>
        
        <div 
          className={`services-content ${isOpen ? 'open' : ''}`}
          ref={contentRef}
          style={{
            height: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px'
          }}
        >
          <ul className="services-list">
            {services.map((service,indx) => (
              <li 
                key={indx} 
                className={`service-item ${selectedService === service ? 'selected' : ''}`}
                onClick={() => handleServiceClick(service, specialist.id)}
              >
                {service}
                {selectedService === service && (
                  <span className="checkmark">✓</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// ... (моковые данные остаются без изменений)

export const mockData = [
  {
    specialist: "Терапевт",
    services: [
      { id: 1, name: "Консультация терапевта" },
      { id: 2, name: "Диагностика заболеваний" },
      { id: 3, name: "Назначение лечения" }
    ]
  },
  {
    specialist: "Хирург",
    services: [
      { id: 4, name: "Консультация хирурга" },
      { id: 5, name: "Плановые операции" },
      { id: 6, name: "Экстренные операции" },
      { id: 7, name: "Перевязки" }
    ]
  },
  {
    specialist: "Офтальмолог",
    services: [
      { id: 8, name: "Проверка зрения" },
      { id: 9, name: "Подбор очков" },
      { id: 10, name: "Лечение глазных заболеваний" }
    ]
  }
];

export default ServiceList;