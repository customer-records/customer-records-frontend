import React, { useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import './client.css';
import calendarIcon from '../assets/calendar.svg';
import chelikIcon from '../assets/chelik.svg';
import teethIcon from '../assets/teeth.svg';
import hookan from '../assets/hokah.svg'
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
            <span className="zapisites">Забронируй</span>
            <span className="na-priem"> Столик</span>
          </div>
        </div>

        <div className="buttons-container">
          <button onClick={()=>handleClick('/client/date')} className="custom-button">
            <span className="button-icon">
              <img loading="eager" fetchPriority="high" src={hookan} alt="Календарь" />
            </span>
            <span className="button-text">Для двоих</span>
          </button>
          <button onClick={()=>handleClick('/client/specialist')} className="custom-button">
            <span className="button-icon">
              <img loading="eager" fetchPriority="high" src={hookan} alt="Специалист" />
            </span>
            <span className="button-text">от 4 до 6 гостей</span>
          </button>
          <button onClick={()=>handleClick('/client/service')} className="custom-button">
            <span className="button-icon">
              <img loading="eager" fetchPriority="high" src={hookan} alt="Услуга" />
            </span>
            <span className="button-text">Xbox: от 4 до 6 гостей</span>
          </button>
          <button onClick={()=>handleClick('/client/service')} className="custom-button">
            <span className="button-icon">
              <img loading="eager" fetchPriority="high" src={hookan} alt="Услуга" />
            </span>
            <span className="button-text">play station: от 4 до 6 </span>
          </button>
          <button onClick={()=>handleClick('/client/service')} className="custom-button">
            <span className="button-icon">
              <img loading="eager" fetchPriority="high" src={hookan} alt="Услуга" />
            </span>
            <span className="button-text">VIP комната: от 4 до 6 </span>
          </button>
        </div>

        <div className="divider"></div>

        <div className="buttons-block">
          <button className="round-button" onClick={() => window.open('https://t.me/denta_rell', '_blank')}></button>
          
          <button className="write-button" disabled={true} onClick={()=>navigate('/client/chat')}>НАПИСАТЬ</button>
        </div>

        <button className="login-button" disabled={true} onClick={()=>navigate('./login')}>Войти в личный кабинет</button>
      </section>
    </Box>
  );
}