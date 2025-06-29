import React, { useEffect, useState, useRef } from 'react';
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

type ChatMessage = {
  text: string;
  from: 'user' | 'bot';
};

const DoctorChat: React.FC = () => {
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

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const SAFE_FALLBACK_ANSWER =
    'Извините, сервис временно недоступен. Мы свяжемся с вами позже.';

  const handleSend = async () => {
    if (inputValue.trim() === '') return;

    const userMessage: ChatMessage = {
      text: inputValue.trim(),
      from: 'user',
    };
    setMessages((prev) => [...prev, userMessage]);
    const textToSend = inputValue.trim();
    setInputValue('');

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/giga-chat/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToSend }),
      });

      if (!response.ok) {
        throw new Error('Giga Chat сервис не отвечает');
      }

      const data = await response.json();
      const botMessage: ChatMessage = {
        text: data.answer || SAFE_FALLBACK_ANSWER,
        from: 'bot',
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const botMessage: ChatMessage = {
        text: SAFE_FALLBACK_ANSWER,
        from: 'bot',
      };
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box
      sx={{
        width: '80%',
        maxHeight: { xs: '70%', md: '70%' },
        minHeight: 400,
        border: '1px solid #c6d2f0',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: 'Arial',
        background: '#F1F1F1',
        flexGrow: 1,
        flexShrink: 0,
        position: 'relative',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
        <Avatar src={doctor.avatarUrl} sx={{ mr: 1 }} />
        <Box>
          <Typography
            sx={{ fontSize: isDesktop ? '14px' : '11px', color: '#000000DE' }}
            variant="subtitle2"
            fontWeight="bold"
          >
            {doctor.name}{' '}
            <Typography
              component="span"
              sx={{ fontSize: isDesktop ? '14px' : '11px' }}
              color="primary"
            >
              | {doctor.status}
            </Typography>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {doctor.role}
          </Typography>
        </Box>
      </Box>

      <Divider />

      <Paper
        elevation={0}
        sx={{
          m: 1,
          p: 1.5,
          bgcolor: '#fff',
          borderRadius: 2,
          display: messages.length > 0 ? 'none' : 'block',
        }}
      >
        <Typography
          sx={{ fontSize: isDesktop ? '13px' : '10px' }}
          fontWeight="bold"
          gutterBottom
        >
          {doctor.message.title}
        </Typography>
        <ul style={{ paddingLeft: '1.2em', margin: 0 }}>
          {doctor.message.list.map((item, idx) => (
            <li key={idx}>
              <Typography sx={{ fontSize: isDesktop ? '11px' : '9.5px' }}>
                {item}
              </Typography>
            </li>
          ))}
        </ul>
      </Paper>

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 2,
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
              my: 0.5,
            }}
          >
            <Paper
              elevation={1}
              sx={{
                p: 1,
                bgcolor: msg.from === 'user' ? '#1976d2' : '#e0e0e0',
                color: msg.from === 'user' ? '#fff' : '#000',
                borderRadius: 2,
                maxWidth: '80%',
              }}
            >
              <Typography sx={{ fontSize: isDesktop ? '12px' : '10px' }}>
                {msg.text}
              </Typography>
            </Paper>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          borderTop: '1px solid #ddd',
          px: 1,
          py: 0.5,
          alignItems: 'center',
        }}
      >
        <TextField
          placeholder="Напишите нам свой вопрос"
          variant="standard"
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSend();
            }
          }}
          InputProps={{ disableUnderline: true }}
          sx={{ fontSize: isDesktop ? '14px' : '11px' }}
        />
        <IconButton color="primary" onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DoctorChat;
