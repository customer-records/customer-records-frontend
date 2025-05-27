import { useEffect, useRef } from 'react';
import '../ui.css';
import AdressMenu from '../../../../src/assets/AdressMenu.svg';
import phoneMenu from '../../../../src/assets/phoneMenu.svg';
import TGmenu from '../../../../src/assets/TGmenu.svg';
import WAmenu from '../../../../src/assets/WAmenu.svg';
import { Link } from 'react-router-dom';

interface ServiceListProps {
  specialist: any;
  services: string[];
  currentId: number;

}

export default function MenuListOpened({
  specialist,
  services,

}: ServiceListProps) {



  const returnIcon = (indx: number) => {
    switch (indx) {
      case 0: return phoneMenu;
      case 1: return WAmenu;
      case 2: return TGmenu;
      default: return AdressMenu;
    }
  };

  return (
    <div className="dropdown-wrapper">
      <div className="dropdown-container">
        <div
          style={{ userSelect: 'none', width: '100%' }}
          className="dropdown-header"
        >
          <Link
            to={'/client/'}
            style={{
              fontWeight: '700',
              color: '#07B0FF',
              fontSize: '14px',
              lineHeight: '20px',
              textTransform: 'uppercase'
            }}
            className="specialist-name"
          >
            {specialist.name}
          </Link>
        </div>

        <div
          className="services-content open"
          style={{
            height: 'auto',
            overflow: 'visible'
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
                  padding: '12px 23px',
                  boxShadow:
                    indx !== services.length - 1
                      ? '0px -1px 0px 0px rgba(0, 0, 0, 0.12) inset'
                      : 'none'
                }}
              >
                {specialist.name === 'Свяжитесь с нами' && (
                  <img src={returnIcon(indx)} alt="icon" />
                )}
                <Link
                  style={{ color: '#000000DE', fontSize: '14px' }}
                  to={'/client'}
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
