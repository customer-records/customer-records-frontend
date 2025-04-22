import { useLayoutEffect, useRef, useState } from 'react';
import '../ui.css';
import arrowDown from '../../../assets/arrow-down.svg'
import AdressMenu from '../../../../src/assets/AdressMenu.svg'
import phoneMenu from '../../../../src/assets/phoneMenu.svg'
import TGmenu from '../../../../src/assets/TGmenu.svg'
import WAmenu from '../../../../src/assets/WAmenu.svg'
import { Link } from 'react-router-dom';  
import { Typography } from '@mui/material';

interface ServiceListProps {
  specialist: any;
  services: string[];
  currentId: number;
  onClose?: () => void;
  setSyncedHeight?: (height: number) => void;
}

export default function MenuList({ specialist, services, currentId, onClose, setSyncedHeight }: ServiceListProps) {
  const returnIcon = (indx: number) => {
    switch (indx) {
      case 0: return phoneMenu;
      case 1: return WAmenu;
      case 2: return TGmenu;
      default: return AdressMenu;
    }
  };

  const returnLink = (indx: number) => {
    switch (indx) {
      case 0: return '/client/date';
      case 1: return '/client/specialist';
      default: return '/client/service';
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleList = () => {
    setIsOpen(!isOpen);
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
              <Link
                to={'/client/'}
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
              </Link>
          )}
          {specialist.name == 'Контакты' && (
              <Link
                  to={'/client/contacts'}
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
              </Link>
          )}
          {(specialist.name !== 'Онлайн запись' && specialist.name !== 'Контакты') && (
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
          <img src={arrowDown} className={`arrow-icon ${isOpen ? 'open' : ''}`} />
        </div>

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
                <Link
                  onClick={onClose}
                  style={{ color: '#000000DE', fontSize: '14px' }}
                  to={currentId === 1 ? returnLink(indx) : '/client'}
                >
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
