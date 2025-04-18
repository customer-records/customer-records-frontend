import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box } from '@mui/material';

interface CalendareProps {
    selectedDate: Date;
    onDateChange: (date: Date | null) => void;
}

export default function Calendare({ selectedDate, onDateChange }: CalendareProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
            <Box sx={{
                width: '100%',
                flex: '1 1 auto',
                display: 'flex',
                flexDirection: 'column',
                my: 2
            }}>
                
                <DateCalendar
                    value={selectedDate}
                    onChange={onDateChange}
                    sx={{
                        width: '100%',
                        height: 'auto',
                        minHeight: 445,
                        '& .MuiPickersCalendarHeader-root': {
                            paddingLeft: '12px',
                            paddingRight: '12px',
                            marginBottom: 1,
                            height: 'auto'
                        },
                        '& .MuiDayCalendar-header': {
                            justifyContent: 'space-around !important',
                            marginBottom: 1,
                            height: 'auto',
                            '& .MuiDayCalendar-weekDayLabel': {
                                fontSize: '0.875rem',
                                width: 44,
                                height: 44,
                                margin: '4px'
                            }
                        },
                        '& .MuiPickersDay-root': { 
                            color: 'black',
                            width: 44,
                            height: 44,
                            fontSize: '1rem',
                            margin: '4px',
                            '&.Mui-selected': { 
                                backgroundColor: '#1976D2', 
                                color: 'white' 
                            },
                            '&.MuiPickersDay-today': { 
                                borderColor: '#1976D2', 
                                color: '#1976D2',
                                borderWidth: 2
                            },
                            '&.Mui-selected.MuiPickersDay-today': { 
                                backgroundColor: '#1976D2', 
                                color: 'white',
                                borderColor: '#1976D2'
                            }
                        },
                        '& .MuiPickersCalendarHeader-label': { 
                            color: 'black',
                            fontSize: '1rem',
                            fontWeight: 500,
                            textTransform: 'uppercase',
                        },
                        '& .MuiTypography-root': {
                            fontFamily: '"Roboto", sans-serif',
                            textTransform: 'uppercase',
                        },
                        '& .MuiPickersDay-dayLabel': {
                            fontSize: '1rem',
                        },
                        '& .MuiDayCalendar-monthContainer': {
                            width: '100%',
                            height: 'auto',
                            minHeight: 300
                        },
                        '& .MuiDayCalendar-weekContainer': {
                            justifyContent: 'space-around',
                            height: '52px',
                            margin: '3px 0'
                        },
                        '& .MuiDayCalendar-slideTransition': {
                            height: 'auto',
                            minHeight: 420,
                            display: 'flex',
                            flexDirection: 'column'
                        }
                    }}
                />
            </Box>
        </LocalizationProvider>
    )
}