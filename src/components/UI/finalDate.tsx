import React from 'react';
import { Box, Typography, Avatar, Button } from '@mui/material';
import save from '../../assets/save.png';

interface TimeSlot {
  date: string;
  time_start: string;
  time_end: string;
  specialist_name: string;
}

interface Specialist {
  name: string;
  surname: string;
  category?: string;
}

interface ClientData {
  name: string;
  phone: string;
}

interface FinalStepProps {
  date: Date;
  time: TimeSlot | string | null;
  specialist: Specialist | null;
  clientData: ClientData;
  name: string,
  surname: string,
  category:string,
}

const FinalStep: React.FC<any> = ({ date, time }) => {
    // Функция для форматирования даты
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Функция для получения инициалов
    const getInitials = (name: string, surname: string) => {
        return `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase();
    };

    // Получаем время в правильном формате
    const getTimeString = () => {
        if (!time) return null;
        if (typeof time === 'string') return time;
        return `${time.time_start} - ${time.time_end}`;
    };

    // Получаем имя специалиста
    const getSpecialistName = () => {
        if (!time) return null;
        if (typeof time === 'object' && time !== null && time.name && time.surname) {
            return `${time.name} ${time.surname}`;
        }
        return `${time.name} ${time.surname}`;
    };

    // Адрес клиники
    const clinicAddress = 'Проспект Победы 35б';

    return (
        <Box sx={{ width: '90%', display: 'flex', flexDirection: 'column' }}>
            {/* Заголовок */}
            <Typography sx={{
                fontFamily: 'Roboto',
                fontWeight: 500,
                fontSize: '24px',
                lineHeight: '100%',
                letterSpacing: '0%',
                color: '#0077FF',
                mb: 3
            }}>
                Ваша запись
            </Typography>

            {/* Дата */}
            <Box sx={{ mb: 2 }}>
                <Typography component="span" sx={{
                    fontFamily: 'Roboto',
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    color: '#000000',
                    mr: 1
                }}>
                    Дата:
                </Typography>
                <Typography component="span" sx={{
                    fontFamily: 'Roboto',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    color: '#000000'
                }}>
                    {formatDate(date)}
                </Typography>
            </Box>

            {/* Время */}
            {getTimeString() && (
                <Box sx={{ mb: 2 }}>
                    <Typography component="span" sx={{
                        fontFamily: 'Roboto',
                        fontWeight: 700,
                        fontSize: '14px',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        color: '#000000',
                        mr: 1
                    }}>
                        Время:
                    </Typography>
                    <Typography component="span" sx={{
                        fontFamily: 'Roboto',
                        fontWeight: 400,
                        fontSize: '14px',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        color: '#000000'
                    }}>
                        {getTimeString()}
                    </Typography>
                </Box>
            )}

            {/* Адрес */}
            <Box sx={{ mb: 4 }}>
                <Typography component="span" sx={{
                    fontFamily: 'Roboto',
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    color: '#000000',
                    mr: 1
                }}>
                    Адрес:
                </Typography>
                <Typography component="span" sx={{
                    fontFamily: 'Roboto',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    color: '#000000'
                }}>
                    {clinicAddress}
                </Typography>
            </Box>

            {/* Специалист */}
            {time && (
                <Box sx={{ width: '90%', mb: 4 }}>
                    <Typography sx={{
                        fontFamily: 'Roboto',
                        fontWeight: 400,
                        fontSize: '12px',
                        lineHeight: '20px',
                        letterSpacing: '0.4px',
                        verticalAlign: 'middle',
                        color: '#757575',
                        mb: 1
                    }}>
                        Специалист
                    </Typography>
                    
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        boxShadow: '0px -1px 0px 0px #0000001F inset, 0px 1px 0px 0px #0000001F inset',
                        p: 2
                    }}>
                        <Avatar sx={{
                            bgcolor: '#e0e0e0',
                            color: '#424242',
                            width: 40,
                            height: 40,
                            mr: 2,
                            fontSize: '16px',
                            fontWeight: 500
                        }}>
                            {getInitials(time.name, time.surname)}
                        </Avatar>
                        <Typography sx={{
                            fontFamily: 'Roboto',
                            fontWeight: 400,
                            fontSize: '14px',
                            lineHeight: '20px',
                            letterSpacing: '0.25px',
                            verticalAlign: 'middle',
                            color: '#000000DE'
                        }}>
                            {getSpecialistName()}
                            {time.category && ` (${time.category})`}
                        </Typography>
                    </Box>
                </Box>
            )}



            {/* Полоска */}
            <Box sx={{
                width: '176px',
                height: '1px',
                border: '1px solid #0077FF',
                backgroundColor: '#0077FF',
                mx: 'auto',
                my: 3,
                mb: 6
            }} />

            {/* Блок с напоминаниями */}
            <Box sx={{ mb: 3 }}>
                <Typography sx={{
                    fontFamily: 'Roboto',
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    color: '#000000',
                    mb: 1
                }}>
                    Мы напомним Вам о приходе:
                </Typography>
                
                <Box component="ul" sx={{ 
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
                            color: '#000000'
                        }
                    }
                }}>
                    <Box component="li">В день визита</Box>
                    <Box component="li">За 1 день</Box>
                    <Box component="li">За 3 дня</Box>
                </Box>

                <Typography sx={{
                    fontFamily: 'Roboto',
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    color: '#000000',
                    mb: 2
                }}>
                    Пожалуйста подтвердите запись в Whatsapp
                </Typography>
            </Box>

            {/* Кнопка и текст под ней */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                <Button sx={{
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
                    whiteSpace: 'nowrap' 
                }}>
                    <Typography sx={{
                        fontFamily: 'Roboto',
                        fontWeight: 700,
                        fontSize: '17px',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        textAlign: 'center',
                        textTransform: 'uppercase',
                        color: '#FFFFFF',
                        padding: 0, 
                        whiteSpace: 'nowrap' 
                    }}>
                        Напоминание для календаря
                    </Typography>
                    <img src={save} alt="Save icon" />
                </Button>
                <Typography sx={{
                    fontFamily: 'Roboto',
                    fontWeight: 600,
                    fontSize: '13px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    color: '#000000'
                }}>
                    Скачать файл записи для календаря
                </Typography>
            </Box>
        </Box>
    );
};

export default FinalStep;