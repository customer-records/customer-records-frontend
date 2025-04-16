import { useRef, useState } from 'react';
import '../ui.css';
import arrowDown from '../../../assets/arrow-down.svg'
import AdressMenu from '../../../../src/assets/AdressMenu.svg'
import phoneMenu from '../../../../src/assets/phoneMenu.svg'
import TGmenu from '../../../../src/assets/TGmenu.svg'
import WAmenu from '../../../../src/assets/WAmenu.svg'
import { Link } from 'react-router-dom';  
  interface ServiceListProps {
    specialist: any;
    services: string[];
    currentId:number;
    onClose: ()=>void 
  }
  
export default function MenuList({ specialist, services , currentId, onClose}: ServiceListProps){
      const returnIcon = (indx:number) => {
        switch(indx){
            case 0:
                return phoneMenu
            case 1:
                return WAmenu
            case 2:
                return TGmenu
            default:
                return AdressMenu
        }
      }
      const returnLink = (indx:number) => {
        switch(indx){
          case 0:
            return('/client/date')
          case 1:
            return('/client/specialist')
          default:
            return('/client/service')
        }
      }
      const [isOpen, setIsOpen] = useState(false);
      const contentRef = useRef<HTMLDivElement>(null);
    
      const toggleList = () => {
        setIsOpen(!isOpen);
      };
    
    
      return (
        <div className="dropdown-wrapper">
          <div className="dropdown-container">
            <div style={{userSelect: 'none', width:'100%'}} className="dropdown-header" onClick={toggleList}>
              <span style={{fontWeight:'700',color:'#0077FF', fontSize:'14px', lineHeight:'20px', textTransform:'uppercase'}} className="specialist-name">{specialist.name}</span>
              <img src={arrowDown} className={`arrow-icon ${isOpen ? 'open' : ''}`} />
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
                    style={{
                        userSelect: 'none',
                        display:'flex',
                        alignItems:'center',
                        gap:'10px',
                        padding:'12px 23px'
                    }}
                    key={indx} 
                    className={`service-item`}
                  >
                    {specialist.name === 'Контакты' ? <img src={returnIcon(indx)}></img> : null}
                    <Link 
                    onClick={onClose} 
                    style={{color:'#000000DE', fontSize:'14px'}} 
                    to={currentId == 1 ? returnLink(indx) : '/client'}>
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