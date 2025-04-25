import React, { useEffect } from 'react';
import {
  Avatar,
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  Divider,
  useMediaQuery,
  createTheme,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const DoctorChat: React.FC = ({onBlur, onFocus}:any) => {
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
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const doctor = {
    name: 'Ринат Леонидович',
    status: 'ОНЛАЙН',
    role: 'Врач терапевт',
    avatarUrl: 'https://via.placeholder.com/40', 
    message: {
      title: 'ПРОСТО НАПИШИТЕ В ЧАТ — И Я ПОМОГУ!',
      list: [
        'ПОДБЕРУ ОПТИМАЛЬНЫЙ ДЛЯ ВАС КОМПЛЕКС МЕДИЦИНСКИХ УСЛУГ',
        'ОРГАНИЗУЮ ИХ ПОЛУЧЕНИЕ В ПРОВЕРЕННЫХ МЕДИЦИНСКИХ УЧРЕЖДЕНИЯХ',
        'ПРОКОНТРОЛИРУЮ РЕЗУЛЬТАТЫ',
      ],
    },
  };

  return (

    <Box
    sx={{
      width: '80%',
      height: { xs: '60dvh', md: '55dvh' },
      minHeight: 300, // минимальная высота
      border: '1px solid #c6d2f0',
      borderRadius: 3,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      fontFamily: 'Arial',
      background:'#F1F1F1',
      // Добавьте:
      flexShrink: 0, // предотвращает сжатие
      position: 'relative'
    }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
        <Avatar src={doctor.avatarUrl} sx={{ mr: 1 }} />
        <Box>
          <Typography sx={{
            fontSize: isDesktop ? "14px" : '11px',
            color:'#000000DE'
          }} variant="subtitle2" fontWeight="bold">
            {doctor.name} <Typography
            sx={{
              fontSize: isDesktop ? "14px" : '11px',
            }}
            component="span" color="primary">| {doctor.status}</Typography>
          </Typography>
          <Typography  variant="caption" color="text.secondary">
            {doctor.role}
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Message */}
      <Paper
        elevation={0}
        sx={{
          m: 1,
          p: 1.5,
          bgcolor: '#fff',
          borderRadius: 2,
        }}
      >
        <Typography sx={{
          fontSize: isDesktop ? '13px' : '10px'
        }} fontWeight="bold" gutterBottom>
          {doctor.message.title}
        </Typography>
        <ul style={{ paddingLeft: '1.2em', margin: 0 }}>
          {doctor.message.list.map((item, idx) => (
            <li key={idx}>
              <Typography sx={{
                fontSize: isDesktop ? "11px" : '9.5px'
              }}>{item}</Typography>
            </li>
          ))}
        </ul>
      </Paper>
      <Box sx={{ mt: 'auto', display: 'flex', borderTop: '1px solid #ddd', px: 1, py: 0.5, alignItems:'center' }}>
        <TextField
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="Напишите нам свой вопрос"
          variant="standard"
          fullWidth
          InputProps={{ disableUnderline: true }}
          sx={{ fontSize: isDesktop ? '14px' : '11px' }}
        />
        <IconButton color="primary">
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DoctorChat;
