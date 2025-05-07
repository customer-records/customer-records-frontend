import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { keyframes } from '@emotion/react';

interface TimeSlotListProps {
  onSelect: (time: string | null) => void;
  TimeSlots: any[];
}

const TimeSlotList = ({ onSelect, TimeSlots }: TimeSlotListProps) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const slotsPerPage = 10;

  const handleTimeSelect = (time: any) => {
    const newSelectedTime = time['id'] === selectedTime ? null : time['id'];
    setSelectedTime(newSelectedTime);
    onSelect(time);
  };

  const totalPages = Math.ceil(TimeSlots.length / slotsPerPage);
  const startIndex = currentPage * slotsPerPage;
  const endIndex = startIndex + slotsPerPage;
  const visibleSlots = TimeSlots.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [TimeSlots]);

  return (
    <Box sx={{ 
      width: '100%',
      maxWidth: 400,
      margin: '0 auto',
      boxSizing: 'border-box',
    }}>
      <TimeHeader>Время</TimeHeader>
      
      <Box sx={{ width: '100%' }}>
        {visibleSlots.map((time) => (
          <TimeSlotItem 
            key={time['id']}
            isSelected={time['id'] === selectedTime}
            onClick={() => handleTimeSelect(time)}
          >
            <TimeText>{time['time_start']}</TimeText>
          </TimeSlotItem>
        ))}
      </Box>

      {TimeSlots.length > slotsPerPage && (
        <PaginationContainer>
          <PaginationButton 
            variant="outlined" 
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
            Назад
          </PaginationButton>
          <Typography sx={{
            color:'black'
          }}>
            {currentPage + 1} / {totalPages}
          </Typography>
          <PaginationButton 
            variant="outlined" 
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
          >
            Вперед
          </PaginationButton>
        </PaginationContainer>
      )}
    </Box>
  );
};

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.98); }
  100% { transform: scale(1); }
`;

const TimeHeader = styled(Typography)({
  fontFamily: 'Roboto',
  fontWeight: 700,
  fontSize: '12px',
  lineHeight: '20px',
  letterSpacing: '0.4px',
  color: '#757575',
  boxShadow: '0px -1px 0px 0px #0000001F inset',
  padding: '10px 16px',
  width: '100%',
  maxWidth: 400,
  margin: '0 auto',
  boxSizing: 'border-box'
});

const TimeSlotItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSelected'
})<{ isSelected: boolean }>(({ isSelected }) => ({
  boxShadow: '0px -1px 0px 0px #0000001F inset',
  width: '100%',
  maxWidth: 400,
  height: '38px',
  padding: '10px 16px',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  backgroundColor: isSelected ? '#E3F2FD' : 'inherit',
  transition: 'background-color 0.3s ease',
  boxSizing: 'border-box',
  '&:hover': {
    backgroundColor: '#F5F5F5'
  },
  '&:active': {
    animation: `${pulse} 0.2s ease`
  }
}));

const TimeText = styled(Typography)({
  fontFamily: 'Roboto',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '0.25px',
  color: '#000000DE',
  width: '100%'
});

const PaginationContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: 400,
  margin: '10px auto 0',
  padding: '0 16px',
  boxSizing: 'border-box'
});

const PaginationButton = styled(Button)({
  minWidth: '80px',
  textTransform: 'none',
  fontWeight: 500,
});
export default TimeSlotList;