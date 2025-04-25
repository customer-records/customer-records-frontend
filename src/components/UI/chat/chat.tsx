import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import DoctorChat from './DoctorChat';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: isDesktop ? '50vh' : '100vw',
        maxWidth: 800,
        margin: '0 auto',
        boxSizing: 'border-box',
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <Header />

      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <div className="header-text" style={{ marginTop: '20px' }}>
          <div>
            <span className="zapisites">У вас </span>
            <span className="na-priem"> вопрос?</span>
          </div>
          <div className="divider" style={{ marginTop: '20px' }}></div>
        </div>

        <DoctorChat />

        <div className="divider" style={{ marginTop: '20px' }}></div>

        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', pb: 2.5 }}>
          <button className="login-button" onClick={() => navigate('./login')}>
            Войти в личный кабинет
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
