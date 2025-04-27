import React, { useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import './client.css';
import calendarIcon from '../assets/calendar.svg';
import chelikIcon from '../assets/chelik.svg';
import teethIcon from '../assets/teeth.svg';
import zipIcon from '../assets/zip.svg';
import { useNavigate } from "react-router-dom";
import Header from './UI/header';
export default function ClientPage() {
  const navigate = useNavigate();
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 300,  
        md: 500,   
        lg: 1200,
        xl: 1600,
      },
    },
  });
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const handleClick = (route: string) => {
    navigate(route)
  }
  return (
    <Box
      sx={{
        width: isDesktop ? '50dvh' : '100vw',
        maxWidth: 800,
        margin: '0 auto',
        minHeight: '100dvh',
        boxSizing: 'border-box',
        background:'#FFFFFF'
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
              <img loading="eager" fetchPriority="high" src={calendarIcon} alt="Календарь" />
            </span>
            <span className="button-text">На определённую дату</span>
          </button>
          <button onClick={()=>handleClick('/client/specialist')} className="custom-button">
            <span className="button-icon">
              <img loading="eager" fetchPriority="high" src={chelikIcon} alt="Специалист" />
            </span>
            <span className="button-text">К специалисту</span>
          </button>
          <button onClick={()=>handleClick('/client/service')} className="custom-button">
            <span className="button-icon">
              <img loading="eager" fetchPriority="high" src={teethIcon} alt="Услуга" />
            </span>
            <span className="button-text">На услугу</span>
          </button>
        </div>

        <div className="additional-button-container">
          <button onClick={()=>handleClick('/client/fastreacord')} className="custom-button fast">
            <span className="button-icon">
              <img loading="eager" fetchPriority="high" src={zipIcon} alt="Быстрая запись" />
            </span>
            <span className="button-text">Быстрая запись</span>
          </button>
        </div>

        <div className="divider"></div>

        <div className="buttons-block">
          <button className="round-button" onClick={() => window.open('https://t.me/denta_rell', '_blank')}></button>
          <button className="round-button" onClick={() => window.open('https://api.whatsapp.com/send/?phone=79178585217&text=Здравствуйте!%0A%0AПишу+из+приложения.%0A%0A&type=phone_number&app_absent=0', '_blank')}></button>
          <button className="write-button" disabled={true} onClick={()=>navigate('/client/chat')}>НАПИСАТЬ</button>
        </div>

        <button className="login-button" disabled={true} onClick={()=>navigate('./login')}>Войти в личный кабинет</button>
      </section>
    </Box>
  );
}