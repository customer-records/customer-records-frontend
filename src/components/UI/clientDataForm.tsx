import React, { useState, useEffect, useCallback } from 'react';
import { Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ClientDataFormProps {
  onSubmit: (data: { name: string; phone: string; isValid: boolean }) => void;
  initialData?: { name: string; phone: string };
}

const ClientDataForm: React.FC<ClientDataFormProps> = ({ onSubmit, initialData = { name: '', phone: '' } }) => {
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
    const rawPhone = phone.replace(/\s/g, '');
  
    setIsValid(formIsValid);
  
    onSubmit({ name, phone: rawPhone, isValid: formIsValid });
  }, [name, phone, phoneError, validateForm, onSubmit]);

  useEffect(() => {
    const preventScroll = (e: TouchEvent) => {
      if (document.activeElement?.tagName === 'INPUT') {
        e.preventDefault();
      }
    };

    const handleFocus = () => {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.addEventListener('touchmove', preventScroll, { passive: false });
      setTimeout(() => {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement) {
          activeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    };

    const handleBlur = () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.removeEventListener('touchmove', preventScroll);
    };

    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
    });

    return () => {
      inputs.forEach(input => {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      });
      document.body.removeEventListener('touchmove', preventScroll);
    };
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    
    let digits = input.replace(/\D/g, '');

    if (digits.startsWith('8')) {
      digits = '7' + digits.slice(1);
    } else if (digits.startsWith('9')) {
      digits = '7' + digits;
    } else if (!digits.startsWith('7')) {
      digits = '7' + digits;
    }
  
    digits = digits.slice(0, 11);
  
    let formattedPhone = '+7';
    if (digits.length > 1) formattedPhone += ' ' + digits.slice(1, 4);
    if (digits.length > 4) formattedPhone += ' ' + digits.slice(4, 7);
    if (digits.length > 7) formattedPhone += ' ' + digits.slice(7, 9);
    if (digits.length > 9) formattedPhone += ' ' + digits.slice(9, 11);
  
    setPhone(formattedPhone);
    console.log(formattedPhone)
    const isValid = digits.length === 11;
    setPhoneError(!isValid && digits.length > 1 ? 'Введите 10 цифр номера' : '');
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
        onPaste={(e) => {
          e.preventDefault();
          const pasted = e.clipboardData.getData('Text');
          handlePhoneChange({ target: { value: pasted } } as React.ChangeEvent<HTMLInputElement>);
        }}
        error={!!phoneError}
        helperText={phoneError}
        placeholder="+7 912 345 67 89"
        required
        inputProps={{ maxLength: 16 }}
      />
    </Box>
  );
};

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
      caretColor: 'black',
      animationName: 'onAutoFillStart',
      animationDuration: '0.01s',
      animationFillMode: 'both',
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
});

export default ClientDataForm;