// ClientDataForm.tsx (оптимизированная версия)
import React, { useState, useEffect, useCallback } from 'react';
import { Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ClientDataFormProps {
  onSubmit: (data: { name: string; phone: string; isValid: boolean }) => void;
  initialData?: { name: string; phone: string };
}

const ClientDataForm: React.FC<ClientDataFormProps> = ({ onSubmit, initialData = { name: '', phone: '+7 ' } }) => {
  const [name, setName] = useState(initialData.name);
  const [phone, setPhone] = useState(initialData.phone);
  const [phoneError, setPhoneError] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validateForm = useCallback(() => {
    const numDigits = phone.replace(/\D/g, '').length - 1;
    return name.trim().length > 0 && numDigits === 10 && !phoneError;
  }, [name, phone, phoneError]);

  useEffect(() => {
    const formIsValid = validateForm();
    if (formIsValid !== isValid) {
      setIsValid(formIsValid);
      onSubmit({ name, phone, isValid: formIsValid });
    }
  }, [name, phone, phoneError, validateForm, isValid, onSubmit]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const digits = value.replace(/[^\d+]/g, '');
    
    if (!digits.startsWith('+7') || digits.length > 12) {
      return;
    }
    
    let formattedPhone = '+7 ' + digits.substring(2, 5);
    if (digits.length > 5) formattedPhone += ' ' + digits.substring(5, 8);
    if (digits.length > 8) formattedPhone += ' ' + digits.substring(8, 10);
    if (digits.length > 10) formattedPhone += ' ' + digits.substring(10, 12);
    
    setPhone(formattedPhone);
    setPhoneError(digits.length < 12 && digits.length > 2 ? 'Введите 10 цифр номера' : '');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
      <StyledTextField
        label="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <StyledTextField
        label="Телефон"
        value={phone}
        onChange={handlePhoneChange}
        error={!!phoneError}
        helperText={phoneError}
        placeholder="+7 912 345 67 89"
        required
        inputProps={{ maxLength: 16 }}
      />
    </Box>
  );
};

// Стили остаются без изменений
const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    width: 350,
    height: 60,
    borderRadius: '50px',
    fontFamily: 'Roboto',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '100%',
    textTransform: 'uppercase',
    padding: '0 14px',
    '& input': {
      padding: 0,
      height: '100%',
      display: 'flex',
      alignItems: 'center',
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
  '& .MuiInputLabel-root': {
    fontFamily: 'Roboto',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '100%',
    textTransform: 'uppercase',
    color: '#000000',
    '&.Mui-focused': {
      color: '#0077FF',
    },
  },
  '& .MuiFormHelperText-root': {
    marginLeft: '14px',
    fontFamily: 'Roboto',
    textTransform: 'none',
  },
});

export default ClientDataForm;