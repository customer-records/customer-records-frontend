import { useLayoutEffect, useRef, useState } from 'react';
import '../ui.css';
import arrowDown from '../../../assets/arrow-down.svg'
import AdressMenu from '../../../../src/assets/AdressMenu.svg'
import phoneMenu from '../../../../src/assets/phoneMenu.svg'
import TGmenu from '../../../../src/assets/TGmenu.svg'
import WAmenu from '../../../../src/assets/WAmenu.svg'
import { Link, useNavigate } from 'react-router-dom';  
import { Typography } from '@mui/material';

interface ServiceListProps {
  specialist: any;
  services: string[];
  currentId: number;
  onClose?: () => void;
  setSyncedHeight?: (height: number) => void;
}

export default function MenuList({ specialist, services, currentId, onClose, setSyncedHeight }: ServiceListProps) {
  const navigate = useNavigate();
  const returnIcon = (indx: number) => {
    switch (indx) {
      case 0: return phoneMenu;
      case 1: return WAmenu;
      case 2: return TGmenu;
      default: return AdressMenu;
    }
  };
  const returnAtrLink = (indx: number) => {
    switch (indx) {
      case 0: return 'tel:+79178585217';
      case 1: return 'https://api.whatsapp.com/send/?phone=79178585217&text=Здравствуйте!%0A%0AПишу+из+приложения.%0A%0A&type=phone_number&app_absent=0';
      case 2: return 'https://t.me/denta_rell';
      case 3: return '/client/contacts'
      default: return '/client';
    }
  };
  const returnLink = (indx: number) => {
    switch (indx) {
      case 0: return '/client/date';
      case 1: return '/client/specialist';
      case 2: return '/client/service';
      default: return '/client/fastreacord'
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleList = () => {
    if (services.length > 0) {
      setIsOpen(!isOpen);
    }
  };

  // Функция для обработки клика по ссылке
  const handleLinkClick = (onClick?: () => void, to?: string) => {
    if (onClose) onClose();
    if (to) {
      navigate(to);
    }
  };

  useLayoutEffect(() => {
    if (setSyncedHeight && contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setSyncedHeight(height);
    }
  }, [setSyncedHeight, services.length]);

  return (
    <div className="dropdown-wrapper">
      <div className="dropdown-container">
        <div
          style={{ userSelect: 'none', width: '100%' }}
          className="dropdown-header"
          onClick={toggleList}
        >
          {specialist.name == 'Онлайн запись' && (
              <div
                style={{
                  fontWeight: '700',
                  color: '#0077FF',
                  fontSize: '14px',
                  lineHeight: '20px',
                  textTransform: 'uppercase',
                  cursor: 'pointer'
                }}
                className="specialist-name"
                onClick={() => handleLinkClick(onClose, '/client/')}
              >
                {specialist.name}
              </div>
          )}
          {specialist.name == 'Контакты' && (
              <div
                style={{
                  fontWeight: '700',
                  color: '#0077FF',
                  fontSize: '14px',
                  lineHeight: '20px',
                  textTransform: 'uppercase',
                  cursor: 'pointer'
                }}
                className="specialist-name"
                onClick={() => handleLinkClick(onClose, '/client/contacts')}
              >
                {specialist.name}
              </div>
          )}
          {specialist.name == 'Акции' && (
              <div
                style={{
                  fontWeight: '700',
                  color: '#0077FF',
                  fontSize: '14px',
                  lineHeight: '20px',
                  textTransform: 'uppercase',
                  cursor: 'pointer'
                }}
                className="specialist-name"
                onClick={() => handleLinkClick(onClose, '/client/stocks')}
              >
                {specialist.name}
              </div>
          )}
          {(specialist.name !== 'Онлайн запись' && specialist.name !== 'Контакты' && specialist.name !== 'Акции') && (
            <Typography
              style={{
                fontWeight: '700',
                color: '#0077FF',
                fontSize: '14px',
                lineHeight: '20px',
                textTransform: 'uppercase'
              }}
              className="specialist-name"
            >
              {specialist.name}
            </Typography>
          )}
          {services.length > 0 && <img src={arrowDown} className={`arrow-icon ${isOpen ? 'open' : ''}`} />}
        </div>

        {services.length > 0 && (
          <div
            className={`services-content ${isOpen ? 'open' : ''}`}
            ref={contentRef}
            style={{
              height: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
              overflow: 'hidden',
              transition: 'height 0.3s ease'
            }}
          >
            <ul className="services-list">
              {services.map((service, indx) => (
                <li
                  key={indx}
                  className="service-item"
                  style={{
                    userSelect: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 23px'
                  }}
                >
                  {specialist.name === 'Контакты' && (
                    <img src={returnIcon(indx)} alt="icon" />
                  )}
                  {specialist.name === 'Контакты' ? (
                    <div
                      onClick={() => {
                        if (onClose) onClose();
                        if (indx < 3) {
                          window.open(returnAtrLink(indx), '_blank');
                        } else {
                          navigate(returnAtrLink(indx));
                        }
                      }}
                      style={{ 
                        color: '#000000DE', 
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      {service}
                    </div>
                  ) : (
                    <div
                      onClick={() => handleLinkClick(onClose, currentId === 1 ? returnLink(indx) : '/client')}
                      style={{ 
                        color: '#000000DE', 
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      {service}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}