import React, { useState } from 'react';
import { 
  Box, 
  Checkbox, 
  FormControlLabel, 
  Typography 
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Моковые данные специализаций
const specializations = [
  { id: 1, name: 'Терапевтическая стоматология' },
  { id: 2, name: 'Хирургическая стоматология' },
  { id: 3, name: 'Ортодонтия' },
  { id: 4, name: 'Пародонтология' },
  { id: 5, name: 'Ортопедическая стоматология' },
  { id: 6, name: 'Детская стоматология' },
];

// Кастомный круглый чекбокс
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

export default function SpecPicker() {
  const [selectedSpecs, setSelectedSpecs] = useState<number[]>([]);

  const handleToggle = (specId: number) => {
    setSelectedSpecs(prev => 
      prev.includes(specId) 
        ? prev.filter(id => id !== specId) 
        : [...prev, specId]
    );
  };

  return (
    <Box sx={{ 
      width: '100%',
      maxWidth: 500,
      padding: '0 16px', // Добавлены отступы по бокам
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: '40px auto 30px', // Центрирование и отступы сверху/снизу
      boxSizing: 'border-box' // Учитываем padding в общей ширине
    }}>
      {/* Заголовок */}
      <Typography 
        sx={{
          fontFamily: 'Roboto',
          fontWeight: 700,
          fontSize: '14px',
          lineHeight: '100%',
          letterSpacing: '0%',
          color: '#000000',
          textAlign: 'left',
          mb: 3
        }}
      >
        Укажите вашу специализацию:
      </Typography>

      {/* Список специализаций */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        width: '100%'
      }}>
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
              mb: 2.5,
              alignItems: 'flex-start',
              width: '100%',
              marginLeft: 0,
              marginRight: 0
            }}
          />
        ))}
      </Box>
    </Box>
  );
}