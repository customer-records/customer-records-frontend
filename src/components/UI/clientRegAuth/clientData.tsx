import { useState, useEffect } from 'react';
import { Box, TextField, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function ClientData({ onSubmit }: { onSubmit: (data: any) => void }) {
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
            maxWidth: '402px',
            margin: '0 auto',
        }}>
            <h1 style={{
                fontFamily: 'Roboto',
                fontWeight: 700,
                fontSize: '24px',
                textAlign: 'center',
                marginBottom: '20px'
            }}>Введите данные</h1>

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
                            color: '#0077FF',
                            '&.Mui-checked': { color: '#0077FF' }
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
                            color: '#0077FF',
                            '&.Mui-checked': { color: '#0077FF' }
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

const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        width: 402,
        height: 60,
        borderRadius: '50px',
        fontFamily: 'Roboto',
        fontWeight: 400,
        fontSize: '16px',

        '& input': {
            textAlign: 'center',
            fontFamily: 'Roboto',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#000000',
            '&::placeholder': {
                opacity: 1,
                fontFamily: 'Roboto',
                color: '#000000',
                fontWeight: '700',
                textTransform: 'uppercase'
            }
        },
        '&.Mui-focused': {
            '& input::placeholder': {
                opacity: 0
            }
        },
        '& fieldset': {
            border: '1px solid #0077FF',
        },
        '&:hover fieldset': {
            border: '1px solid #0077FF',
        },
        '&.Mui-focused fieldset': {
            border: '1px solid #0077FF',
        },
    },
});
