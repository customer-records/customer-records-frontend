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
  selectedServiceId: number | null;
  currentId:number;
  onSelect: (name: string | null, id?: number | null) => void; 
}

const ServiceList = ({ specialist, services, selectedService, currentId, selectedServiceId, onSelect }: ServiceListProps) => {
  console.log(services, currentId, selectedServiceId)
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const handleServiceClick = (name: string, id: number) => {
    if (selectedService === name && selectedServiceId == id) {
      onSelect(null); 
    } else {
      console.log(name, id)
      onSelect(name, id); 
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
                style={{userSelect: 'none'}}
                key={indx} 
                className={`service-item ${(selectedService === service  && currentId === selectedServiceId) ? 'selected' : ''}`}
                onClick={() => handleServiceClick(service, specialist.id)}
              >
                {service}
                {(selectedService === service && currentId === selectedServiceId) && (
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

export default ServiceList;