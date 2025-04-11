import React, { useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import './client.css';
import calendarIcon from '../assets/calendar.png';
import chelikIcon from '../assets/chelik.png';
import teethIcon from '../assets/teeth.png';
import zipIcon from '../assets/zip.png';
import { useNavigate } from "react-router-dom";
import Header from './UI/header';
export default function ClientPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const handleClick = (route: string) => {
    navigate(route)
  }
  return (
    <Box
      sx={{
        width: isDesktop ? '50vh' : '50vh',
        maxWidth: 800,
        margin: '0 auto',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <Header/>

      <section className="section">
        <div className="header-text">
          <div>
            <span className="zapisites">ЗАПИШИТЕСЬ</span>
            <span className="na-priem"> НА ПРИЕМ</span>
          </div>
        </div>

        <div className="buttons-container">
          <button onClick={()=>handleClick('/client/date')} className="custom-button">
            <span className="button-icon">
              <img src={calendarIcon} alt="Календарь" />
            </span>
            <span className="button-text">На определённую дату</span>
          </button>
          <button onClick={()=>handleClick('/client/specialist')} className="custom-button">
            <span className="button-icon">
              <img src={chelikIcon} alt="Специалист" />
            </span>
            <span className="button-text">К специалисту</span>
          </button>
          <button onClick={()=>handleClick('/client/service')} className="custom-button">
            <span className="button-icon">
              <img src={teethIcon} alt="Услуга" />
            </span>
            <span className="button-text">На услугу</span>
          </button>
        </div>

        <div className="additional-button-container">
          <button onClick={()=>handleClick('/client/fastreacord')} className="custom-button fast">
            <span className="button-icon">
              <img src={zipIcon} alt="Быстрая запись" />
            </span>
            <span className="button-text">Быстрая запись</span>
          </button>
        </div>

        <div className="divider"></div>

        <div className="buttons-block">
          <button className="round-button" onClick={() => window.open('https://t.me/denta_rell', '_blank')}></button>
          <button className="round-button" onClick={() => window.open('https://api.whatsapp.com/send/?phone=79178585217&text=Здравствуйте!%0A%0AПишу+из+приложения.%0A%0A&type=phone_number&app_absent=0', '_blank')}></button>
          <button className="write-button">НАПИСАТЬ</button>
        </div>

        <button className="login-button" onClick={()=>navigate('./login')}>Войти в личный кабинет</button>
      </section>
    </Box>
  );
}