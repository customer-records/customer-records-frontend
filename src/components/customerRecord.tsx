import React, { useEffect, useState } from 'react';
import { Box, useMediaQuery, useTheme, Avatar, Typography, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import './client.css';
import OnDate from './UI/onDate';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {createTheme} from '@mui/material'
import OnSpecialist from './UI/onSpecialist'; 
import OnService from './UI/onService'; 
import OnFastRecord from './UI/onFastRecord'; 
import Header from './UI/header';

export default function CustomerRecord() {
    const theme = createTheme({
      breakpoints: {
        values: {
          xs: 0,
          sm: 300,  
          md: 450,   
          lg: 1200,
          xl: 1600,
        },
      },
    });
  const navigate = useNavigate()
  const location = useLocation();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  // Функция для определения, какой компонент отображать
  const renderContent = () => {
    switch(location.pathname) {
      case '/client/date':
        return <OnDate />;
      case '/client/specialist':
        return <OnSpecialist />;
      case '/client/service':
        return <OnService />;
      case '/client/fastreacord':
        return <OnFastRecord />;
      default:
        return <OnDate />; // Компонент по умолчанию
    }
  };

  useEffect(() => {
    console.log('Текущий путь:', location.pathname);
  }, [location.pathname]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          width: isDesktop ? '50vh' : '100vw',
          height:'100dvh',
          maxWidth: 800,
          margin: '0 auto',
          minHeight: '100dvh',
          boxSizing: 'border-box',
          background:'#FFFFFF'
        }}
      >
        <Header/>

        <section className="section">
          {renderContent()}

          <div className="divider" style={{marginTop:"0px"}}></div>

          <div className="buttons-block">
            <button className="round-button" onClick={() => window.open('https://t.me/denta_rell', '_blank')}></button>
            <button className="round-button" onClick={() => window.open('https://api.whatsapp.com/send/?phone=79178585217&text=Здравствуйте!%0A%0AПишу+из+приложения.%0A%0A&type=phone_number&app_absent=0', '_blank')}></button>
            <button className="write-button" onClick={()=>navigate('/client/chat')}>НАПИСАТЬ</button>
          </div>

          <button className="login-button" onClick={()=>navigate('/client/login')}>Войти в личный кабинет</button>
        </section>
      </Box>
    </LocalizationProvider>
  );
}