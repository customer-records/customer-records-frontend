import React, { useEffect } from 'react';
import { Box, Typography, Avatar, Button } from '@mui/material';
import save from '../../assets/save.png';

// Импорт аватаров из папки ../../assets/avatars
import RG from '../../assets/avatars/RG.png';
import RS from '../../assets/avatars/RS.png';
import BS from '../../assets/avatars/BS.png';
import SA from '../../assets/avatars/SA.png';

interface TimeSlotDetail {
  date: string;
  time_start: string;
  time_end: string;
  name: string;
  surname: string;
  category?: string;
}

interface FinalStepProps {
  date: Date;
  time: TimeSlotDetail | string | null;
  ics?: string;
}

const nameToAvatar: Record<string, string> = {
  'Ренат Гадисов': RG,
  'Ринат Сергеев': RS,
  'Светлана Бареева': BS,
  'Альфия Шарипова': SA,
};

const FinalStep: React.FC<FinalStepProps> = ({ date, time, ics }) => {
  // Для отладки
  useEffect(() => {
    if (time && typeof time !== 'string') {
      console.log('Specialist:', time.name, time.surname);
    }
    console.log(time)
  }, [time]);

  const formatDate = (d: Date) =>
    d.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  // Получаем [name, surname] или null
  const getNameSurname = (): [string, string] | null => {
    console.log(time.name, time.surname)
    if (!time || typeof time === 'string') return null;
    return [time.name, time.surname];
  };

  const getInitials = (name: string, surname: string) =>
    `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase();

  const getTimeString = () => {
    if (!time || typeof time === 'string') return null;
    return `${time.time_start} - ${time.time_end}`;
  };

  const getSpecialistName = () => {
    const ns = getNameSurname();
    return ns ? `${ns[0]} ${ns[1]}` : null;
  };

  const avatarSrc = () => {
    if (!time || typeof time === 'string') return undefined;
    const full = `${time.name} ${time.surname}`;
    console.log(full === 'Ринат Сергеев', nameToAvatar[full])
    return nameToAvatar[full];
  };

  return (
    <Box sx={{ width: '90%', display: 'flex', flexDirection: 'column' }}>
      {/* Заголовок */}
      <Typography
        sx={{
          fontFamily: 'Roboto',
          fontWeight: 500,
          fontSize: '24px',
          lineHeight: '100%',
          letterSpacing: '0%',
          color: '#0077FF',
          mb: 3,
        }}
      >
        Ваша запись
      </Typography>

      {/* Дата */}
      <Box sx={{ mb: 2 }}>
        <Typography
          component="span"
          sx={{
            fontFamily: 'Roboto',
            fontWeight: 700,
            fontSize: '14px',
            lineHeight: '100%',
            letterSpacing: '0%',
            color: '#000000',
            mr: 1,
          }}
        >
          Дата:
        </Typography>
        <Typography
          component="span"
          sx={{
            fontFamily: 'Roboto',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '100%',
            letterSpacing: '0%',
            color: '#000000',
          }}
        >
          {formatDate(date)}
        </Typography>
      </Box>

      {/* Время */}
      {getTimeString() && (
        <Box sx={{ mb: 2 }}>
          <Typography
            component="span"
            sx={{
              fontFamily: 'Roboto',
              fontWeight: 700,
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#000000',
              mr: 1,
            }}
          >
            Время:
          </Typography>
          <Typography
            component="span"
            sx={{
              fontFamily: 'Roboto',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#000000',
            }}
          >
            {getTimeString()}
          </Typography>
        </Box>
      )}

      {/* Адрес */}
      <Box sx={{ mb: 4 }}>
        <Typography
          component="span"
          sx={{
            fontFamily: 'Roboto',
            fontWeight: 700,
            fontSize: '14px',
            lineHeight: '100%',
            letterSpacing: '0%',
            color: '#000000',
            mr: 1,
          }}
        >
          Адрес:
        </Typography>
        <Typography
          component="span"
          sx={{
            fontFamily: 'Roboto',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '100%',
            letterSpacing: '0%',
            color: '#000000',
          }}
        >
          Чистопольская улица, 85
        </Typography>
      </Box>

      {/* Специалист */}
      {getSpecialistName() && (
        <Box sx={{ width: '90%', mb: 4 }}>
          <Typography
            sx={{
              fontFamily: 'Roboto',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '20px',
              letterSpacing: '0.4px',
              verticalAlign: 'middle',
              color: '#757575',
              mb: 1,
            }}
          >
            Специалист
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              boxShadow:
                '0px -1px 0px 0px #0000001F inset, 0px 1px 0px 0px #0000001F inset',
            }}
          >
            <Avatar
              src={avatarSrc()}
              alt={getSpecialistName() || undefined}
              sx={{
                bgcolor: '#e0e0e0',
                color: '#424242',
                width: 40,
                height: 40,
                mr: 2,
                fontSize: '16px',
                fontWeight: 500,
              }}
            >
              {(() => {
                const ns = getNameSurname();
                return ns ? getInitials(ns[0], ns[1]) : '';
              })()}
            </Avatar>
            <Typography
              sx={{
                fontFamily: 'Roboto',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '0.25px',
                verticalAlign: 'middle',
                color: '#000000DE',
              }}
            >
              {getSpecialistName()}
              {typeof time !== 'string' && time.category && ` (${time.category})`}
            </Typography>
          </Box>
        </Box>
      )}

      {/* Разделитель */}
      <Box
        sx={{
          width: '176px',
          height: '1px',
          border: '1px solid #0077FF',
          backgroundColor: '#0077FF',
          mx: 'auto',
          my: 3,
          mb: 6,
        }}
      />

      {/* Напоминания */}
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            fontFamily: 'Roboto',
            fontWeight: 700,
            fontSize: '14px',
            lineHeight: '100%',
            letterSpacing: '0%',
            color: '#000000',
            mb: 1,
          }}
        >
          Мы напомним Вам о приходе:
        </Typography>

        <Box
          component="ul"
          sx={{
            pl: 2,
            mb: 3,
            '& li': {
              fontFamily: 'Roboto',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: '0%',
              color: '#000000',
              mb: 1,
              position: 'relative',
              '&:before': {
                content: '"•"',
                position: 'absolute',
                left: '-15px',
                color: '#000000',
              },
            },
          }}
        >
          <Box component="li">В день визита</Box>
          <Box component="li">За 1 день</Box>
          <Box component="li">За 3 дня</Box>
        </Box>

        <Typography
          sx={{
            fontFamily: 'Roboto',
            fontWeight: 700,
            fontSize: '14px',
            lineHeight: '100%',
            letterSpacing: '0%',
            color: '#000000',
            mb: 2,
          }}
        >
          Пожалуйста подтвердите запись в Whatsapp
        </Typography>
      </Box>

      {/* Кнопка календаря */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
        <Button
          onClick={() => {
            if (!ics) return;
            const blob = new Blob([ics], { type: 'text/calendar' });
            const url = window.URL.createObjectURL(blob);
            window.open(url, '_blank'); // сразу открываем
          }}
          sx={{
            width: 352,
            height: 40,
            padding: 0,
            gap: '13px',
            borderRadius: '20px',
            borderWidth: '2px',
            background: '#0077FF',
            border: '2px solid #0077FF',
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Roboto',
              fontWeight: 700,
              fontSize: '17px',
              lineHeight: '100%',
              letterSpacing: '0%',
              textAlign: 'center',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              padding: 0,
              whiteSpace: 'nowrap',
            }}
          >
            Напоминание для календаря
          </Typography>
          <img loading="eager" fetchPriority="high" src={save} alt="Save icon" />
        </Button>
        <Typography
          sx={{
            fontFamily: 'Roboto',
            fontWeight: 600,
            fontSize: '13px',
            lineHeight: '100%',
            letterSpacing: '0%',
            textAlign: 'center',
            textTransform: 'uppercase',
            color: '#000000',
          }}
        >
          Скачать файл записи для календаря
        </Typography>
      </Box>
    </Box>
  );
};

export default FinalStep;