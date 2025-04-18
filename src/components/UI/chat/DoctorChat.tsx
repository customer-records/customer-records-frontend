import React from 'react';
import {
  Avatar,
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  Divider,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const DoctorChat: React.FC = () => {
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
        width: 320,
        border: '1px solid #c6d2f0',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: 'Arial',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
        <Avatar src={doctor.avatarUrl} sx={{ mr: 1 }} />
        <Box>
          <Typography variant="subtitle2" fontWeight="bold" sx={{color:'#000000DE'}}>
            {doctor.name} <Typography component="span" color="primary">| {doctor.status}</Typography>
          </Typography>
          <Typography variant="caption" color="text.secondary">
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
        <Typography fontWeight="bold" gutterBottom>
          {doctor.message.title}
        </Typography>
        <ul style={{ paddingLeft: '1.2em', margin: 0 }}>
          {doctor.message.list.map((item, idx) => (
            <li key={idx}>
              <Typography fontSize="14px">{item}</Typography>
            </li>
          ))}
        </ul>
      </Paper>

      {/* Input */}
      <Box sx={{ mt: 'auto', display: 'flex', borderTop: '1px solid #ddd', px: 1, py: 0.5 }}>
        <TextField
          placeholder="Напишите нам свой вопрос"
          variant="standard"
          fullWidth
          InputProps={{ disableUnderline: true }}
          sx={{ fontSize: '14px' }}
        />
        <IconButton color="primary">
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DoctorChat;
