import { Box, TextField, useMediaQuery } from '@mui/material';
import { createTheme, styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';

export default function CodeEnter({ onSubmit, initialData = { code: '' } }: any) {
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
  const [code, setCode] = useState(initialData.code);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const formIsValid = code.length === 4;
    if (formIsValid !== isValid) {
      setIsValid(formIsValid);
      onSubmit({ code, isValid: formIsValid });
    }
  }, [code, isValid, onSubmit]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Фильтруем только цифры
    if (value.length <= 4) {
      setCode(value);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '16px', 
      justifyContent: 'center',
      width: '100%', 
      alignItems: 'center',
      height: '20vh'
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        textAlign: 'center'
      }}>
        <Box sx={{
          fontFamily: 'Roboto',
          fontWeight: 700,
          fontSize: isDesktop?'14px':'13px',
          lineHeight: '100%',
          letterSpacing: '0%',
          marginBottom: '24px',
          maxWidth: '402px',
          color:'#000000'
        }}>
          Мы отправили проверочный код в <span style={{ color: '#0077FF' }}>Telegram</span> введите:
        </Box>
        
        <StyledTextField
          value={code}
          onChange={handleCodeChange}
          placeholder="____"
          inputProps={{ 
            maxLength: 4,
            inputMode: 'numeric',
            style: { 
              textAlign: 'center',
              letterSpacing: '10px',
              paddingLeft: '15px',
              fontSize: '24px'
            }
          }}
          FormHelperTextProps={{ style: { display: 'none' }}} // Скрываем helperText
        />
      </Box>
    </Box>
  );
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  
  '& .MuiOutlinedInput-root': {
    [theme.breakpoints.down('sm')]: {
      height: 50,
      width:310
  },

    width: 402,
    height: 60,
    borderRadius: '50px',
    fontFamily: 'Roboto',
    fontWeight: 700,
    padding: '0 25px',
    '& input': {
      padding: 0,
      height: '100%',
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
}));