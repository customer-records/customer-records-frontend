import { Box, Checkbox, FormControlLabel, TextField, Typography, useMediaQuery } from '@mui/material';
import { createTheme, styled } from '@mui/material/styles';
import { useCallback, useEffect, useState } from 'react';

export default function PhoneEnter({ onSubmit, initialData = { phone: '+7 ' } }: any) {
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
      height: '20vh',
      mb:4,
      mt:3
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        position: 'relative',
        mb:3
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
        <Box sx={{
          height: '20px',
          width: '100%',
          visibility: 'hidden',
          position: 'absolute',
          bottom: '-24px',
          left: 0,
          fontFamily: 'Roboto',
          fontSize: '0.75rem'
        }}>
          &nbsp;
        </Box>
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
            marginLeft: isDesktop ? 7 : '3vw',
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
              marginLeft: isDesktop ? 7 : '3vw',
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
    fontFamily: 'Roboto',
    textTransform: 'none',
    position: 'absolute',
    bottom: '-24px',
    left: '14px',
    margin: 0
  },
});

const RoundCheckbox = styled(Checkbox)(({ theme }) => ({
  width: 24,
  height: 24,
  borderRadius: '50%',
  border: '2px solid #0077FF',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: 'rgba(0, 119, 255, 0.04)',
  },
  '&.Mui-checked': {
    color: 'white',
    backgroundColor: '#0077FF',
    '&:hover': {
      backgroundColor: '#0077FF',
    },
  },
}));