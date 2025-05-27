import { Box, Checkbox, FormControlLabel, TextField, Typography, useMediaQuery } from '@mui/material';
import { createTheme, styled } from '@mui/material/styles';
import { useCallback, useEffect, useState } from 'react';

export default function PhoneEnter({ onSubmit, initialData = { phone: '' } }: any) {
  const [phone, setPhone] = useState(initialData.phone);
  const [phoneError, setPhoneError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [selectedSpecs, setSelectedSpecs] = useState<number[]>([1]);
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 369,  
        md: 450,   
        lg: 1200,
        xl: 1600,
      },
    },
  });
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const validateForm = useCallback(() => {
    const numDigits = phone.replace(/\D/g, '').length - 1;
    return numDigits === 10 && !phoneError;
  }, [phone, phoneError]);

  const submitForm = useCallback((specs?: number[]) => {
    const formIsValid = validateForm();
    setIsValid(formIsValid);
    const currentSpecs = specs || selectedSpecs;
    const type = currentSpecs[0] === 1 ? 'WA' : 'TG';
    onSubmit({ phone, isValid: formIsValid, type });
  }, [phone, validateForm, selectedSpecs, onSubmit]);

  useEffect(() => {
    const formIsValid = validateForm();
    if (formIsValid !== isValid) {
      submitForm();
    }
  }, [phone, phoneError, validateForm, isValid, submitForm]);

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
        const input = document.querySelector('input');
        if (input) {
          input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    };

    const handleBlur = () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.removeEventListener('touchmove', preventScroll);
    };

    const input = document.querySelector('input');
    if (input) {
      input.addEventListener('focus', handleFocus);
      input.addEventListener('blur', handleBlur);
    }

    return () => {
      if (input) {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
      }
      document.body.removeEventListener('touchmove', preventScroll);
    };
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, '');

    if (input.startsWith('8')) {
      input = '7' + input.slice(1);
    } else if (input.startsWith('9')) {
      input = '7' + input;
    } else if (!input.startsWith('7')) {
      input = '7' + input;
    }

    input = input.slice(0, 11);
    let formatted = '+7';
    if (input.length > 1) formatted += ' ' + input.slice(1, 4);
    if (input.length > 4) formatted += ' ' + input.slice(4, 7);
    if (input.length > 7) formatted += ' ' + input.slice(7, 9);
    if (input.length > 9) formatted += ' ' + input.slice(9, 11);

    setPhone(formatted);
    setPhoneError(input.length < 11 && input.length > 1 ? 'Введите 10 цифр номера' : '');
  };

  const handleToggle = (specId: number) => {
    const newSelectedSpecs = [specId];
    setSelectedSpecs(newSelectedSpecs);
    submitForm(newSelectedSpecs);
  };

  const specializations = [
    { id: 1, name: 'WhatsApp' },
    { id: 2, name: 'Telegram' }
  ];

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center',
      width: '100%', 
      alignItems: 'center',
      height: '25dvh',
      minHeight:'200px',
      mb: 4,
      mt: isDesktop ? 3 : '10vw',
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        position: 'relative',
        mb: 3
      }}>
        <StyledTextField
          label="Телефон"
          value={phone}
          onChange={handlePhoneChange}
          error={!!phoneError}
          helperText={phoneError || ' '} 
          placeholder="+7 912 345 67 89"
          required
          inputProps={{ maxLength: 16 }}
          FormHelperTextProps={{
            sx: {
              height: '20px',
              margin: '4px 0 0 14px',
              visibility: phoneError ? 'visible' : 'hidden'
            }
          }}
        />
      </Box>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        width: '100%'
      }}>
        <Typography 
          sx={{
            fontFamily: 'Roboto',
            fontWeight: 700,
            fontSize: '14px',
            lineHeight: '100%',
            letterSpacing: '0%',
            color: '#000000',
            textAlign: 'left',
            mb: 1.5,
            marginLeft: isDesktop ? 3 : '5vw',
          }}
        >
          Мы отправим проверочный код в мессенджер:
        </Typography>
        {specializations.map(spec => (
          <FormControlLabel
            key={spec.id}
            control={
              <RoundCheckbox 
                checked={selectedSpecs.includes(spec.id)}
                onChange={() => handleToggle(spec.id)}
                icon={<span style={{ width: 24, height: 24 }} />}
                checkedIcon={
                  <span style={{ 
                    width: 24, 
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    ✓
                  </span>
                }
                sx={{
                  marginRight: '8px' 
                }}
              />
            }
            label={spec.name}
            sx={{
              '& .MuiTypography-root': {
                fontFamily: 'Roboto',
                fontSize: '16px',
                color: '#000000',
                whiteSpace: 'normal'
              },
              mb: 1.5,
              alignItems: 'center',
              justifyContent:'start',
              marginLeft: isDesktop ? 3 : '5vw',
              marginRight: 0
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

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
      border: '1px solid #07B0FF',
    },
    '&:hover fieldset': {
      border: '1px solid #07B0FF',
    },
    '&.Mui-focused fieldset': {
      border: '1px solid #07B0FF',
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
      color: '#07B0FF',
    },
  },
  '& input:-webkit-autofill': {
    boxShadow: '0 0 0 1000px white inset',
    WebkitTextFillColor: '#000',
    caretColor: 'black',
    borderRadius: '50px',
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

  [`@media (max-width: 360px)`]: {
    '& .MuiOutlinedInput-root': {
      width: 280,
      height: 50,
    },
    '& .MuiInputLabel-root': {
      fontSize: '14px',
    }
  }
});

const RoundCheckbox = styled(Checkbox)(({ theme }) => ({
  width: 24,
  height: 24,
  borderRadius: '50%',
  border: '2px solid #07B0FF',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: 'rgba(0, 119, 255, 0.04)',
  },
  '&.Mui-checked': {
    color: 'white',
    backgroundColor: '#07B0FF',
    '&:hover': {
      backgroundColor: '#07B0FF',
    },
  },
}));