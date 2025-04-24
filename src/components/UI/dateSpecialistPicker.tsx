import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import Calendare from './calendare';
import SpecialistSelector from './specialistTimePicker';

interface Specialist {
  id: number;
  name: string;
  surname: string;
  slots: string[];
}

interface DateSpecialistPickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onSelect: (specialist: Specialist | null, time: string | null) => void;
  serviceId:any
}

export default function DateSpecialistPicker({
  selectedDate,
  onDateChange,
  onSelect,
  serviceId
}: DateSpecialistPickerProps) {
  useEffect(()=>{
    console.log(selectedDate)
  },[])
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: 400,
      margin: '0 auto'
    }}>
      <SpecialistSelector 
        selectedDate={selectedDate.toISOString().split('T')[0]}
        onSelect={onSelect}
        serviceId={serviceId}
      />
      {/* Календарь - передаем текущую дату и обработчик изменения */}
      <Calendare 
        selectedDate={selectedDate} 
        onDateChange={onDateChange} 
      />
      <Box sx={{
        width: 176,
        height: 1,
        border: '1px solid #0077FF',
        margin: '16px auto',
        backgroundColor: '#0077FF'
      }} />
    </Box>
  );
}