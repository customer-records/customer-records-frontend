import { useState, useEffect } from 'react';
import { Box, TextField, FormControlLabel, Radio, RadioGroup, useMediaQuery, useTheme, styled } from '@mui/material';

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      width: 400,
      height: 60,
      borderRadius: '50px',
      fontFamily: 'Roboto',
      fontWeight: 400,
      fontSize: '16px',
  
      [theme.breakpoints.down('sm')]: {
        height: 50,
        width: 300,
      },
  
      '& input': {
        textAlign: 'center',
        fontFamily: 'Roboto',
        fontWeight: 700,
        textTransform: 'uppercase',
        color: '#000000',
        caretColor: 'black',
        animationName: 'onAutoFillStart',
        animationDuration: '0.01s',
        animationFillMode: 'both',
        '&::placeholder': {
          opacity: 1,
          fontFamily: 'Roboto',
          color: '#000000',
          fontWeight: '700',
          textTransform: 'uppercase',
        },
      },
      '&.Mui-focused': {
        '& input::placeholder': {
          opacity: 0,
        },
      },
      '& fieldset': {
        border: '1px solid #07B0FF',
      },
      '&:hover fieldset': {
        border: '1px solid #07B0FF',
      },
      '&.Mui-focused fieldset': {
        border: '1px solid #07B0FF',
      },
    },
  
    '& input:-webkit-autofill': {
      boxShadow: '0 0 0 1000px white inset',
      WebkitTextFillColor: '#000',
      borderRadius: '50px',
      caretColor: 'black',
      animationName: 'onAutoFillStart',
      animationDuration: '0.01s',
      animationFillMode: 'both',
    },
  
    '@keyframes onAutoFillStart': {
      '0%': {
        caretColor: 'black',
      },
      '100%': {
        caretColor: 'black',
      },
    },
  }));
  
export default function ClientData({ onSubmit }: { onSubmit: (data: any) => void }) {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        birthDate: '',
        gender: ''
    });

    const [isFocused, setIsFocused] = useState(false);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const isValidForm = (
            formData.firstName.trim() !== '' &&
            formData.lastName.trim() !== '' &&
            formData.birthDate.replace(/\D/g, '').length === 8 &&
            formData.gender !== ''
        );
        setIsValid(isValidForm);
        onSubmit({ ...formData, isValid: isValidForm });
    }, [formData, onSubmit]);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const lettersOnly = value.replace(/[^а-яА-ЯёЁa-zA-Z\s]/g, '');
        setFormData(prev => ({ ...prev, [name]: lettersOnly }));
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        
        value = value.slice(0, 8);
        
        if (value.length >= 2) {
            const day = parseInt(value.slice(0, 2), 10);
            if (day < 1 || day > 31) {
                value = value.slice(0, 1);
            }
        }
        
        if (value.length >= 4) {
            const month = parseInt(value.slice(2, 4), 10);
            if (month < 1 || month > 12) {
                value = value.slice(0, 3);
            }
        }
        
        let formattedValue = '';
        if (value.length > 0) formattedValue = value.slice(0, 2);
        if (value.length > 2) formattedValue += ' - ' + value.slice(2, 4);
        if (value.length > 4) formattedValue += ' - ' + value.slice(4, 8);
        
        setFormData(prev => ({ ...prev, birthDate: formattedValue }));
    };

    const handleDateFocus = () => {
        setIsFocused(true);
        if (formData.birthDate === '' || formData.birthDate.includes('_')) {
            setFormData(prev => ({ ...prev, birthDate: '' }));
        }
    };

    const handleDateBlur = () => {
        setIsFocused(false);
        if (formData.birthDate === '') {
            setFormData(prev => ({ ...prev, birthDate: '' }));
        }
    };

    const formatDateDisplay = () => {
        if (isFocused && formData.birthDate === '') {
            return '';
        }
        
        if (!formData.birthDate) {
            return 'дд - мм - гггг'.split('').map(char => 
                char === 'д' || char === 'м' || char === 'г' ? '_' : char
            ).join('');
        }
        
        return formData.birthDate;
    };

    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, gender: e.target.value }));
    };

    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '20px',
            width: '100%',
            maxWidth: isDesktop ? '402px' : '300px',
            margin: '0 auto',
            alignItems:'center'
        }}>
            {['lastName', 'firstName', 'middleName'].map((field) => (
                <StyledTextField
                    key={field}
                    name={field}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleTextChange}
                    placeholder={
                        field === 'lastName' ? 'Фамилия' :
                        field === 'firstName' ? 'Имя' : 'Отчество'
                    }
                    inputProps={{ 
                        maxLength: 30,
                        style: { 
                            textAlign: 'center',
                            fontFamily: 'Roboto',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            color: '#000000'
                        }
                    }}
                />
            ))}

            <Box sx={{ mt: 2 }}>
                <Box sx={{ 
                    fontFamily: 'Roboto',
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    color: '#000000',
                    textAlign: 'left',
                    mb: '8px',
                }}>
                    Дата рождения:
                </Box>
                <StyledTextField
                    name="birthDate"
                    value={formatDateDisplay()}
                    onChange={handleDateChange}
                    onFocus={handleDateFocus}
                    onBlur={handleDateBlur}
                    inputProps={{ 
                        maxLength: 14,
                        style: { 
                            textAlign: 'center',
                            letterSpacing: '1px',
                            fontFamily: 'Roboto',
                            fontWeight: 700,
                            color: '#000000'
                        }
                    }}
                />
            </Box>

            <Box sx={{ mt: 2, mb:4 }}>
                <Box sx={{ 
                    fontFamily: 'Roboto',
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    color: '#000000',
                    textAlign: 'left',
                    mb: '12px'
                }}>
                    Ваш пол:
                </Box>
                <RadioGroup 
                    row 
                    value={formData.gender} 
                    onChange={handleGenderChange}
                    sx={{ gap: '24px' }}
                >
                    <FormControlLabel
                        value="male"
                        control={<Radio sx={{ 
                            color: '#07B0FF',
                            '&.Mui-checked': { color: '#07B0FF' }
                        }} />}
                        label="Мужчина"
                        sx={{
                            '& .MuiTypography-root': {
                                fontFamily: 'Roboto',
                                fontWeight: 400,
                                fontSize: '14px',
                                lineHeight: '20px',
                                letterSpacing: '0.25px',
                                color: '#000000DE',
                                verticalAlign: 'middle'
                            }
                        }}
                    />
                    <FormControlLabel
                        value="female"
                        control={<Radio sx={{ 
                            color: '#07B0FF',
                            '&.Mui-checked': { color: '#07B0FF' }
                        }} />}
                        label="Женщина"
                        sx={{
                            '& .MuiTypography-root': {
                                fontFamily: 'Roboto',
                                fontWeight: 400,
                                fontSize: '14px',
                                lineHeight: '20px',
                                letterSpacing: '0.25px',
                                color: '#000000DE',
                                verticalAlign: 'middle'
                            }
                        }}
                    />
                </RadioGroup>
            </Box>
        </Box>
    );
}