import { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import Calendare from './calendare';
import TimeSlotList from './timeSlotsList';

const apiUrl = import.meta.env.VITE_API_URL;

interface DateTimePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  onTimeSelect: (time: string | null) => void;
}

interface Specialist {
  id: number;
  name: string;
  surname: string;
  category: string;
}

interface TimeSlot {
  date: string;
  id: number;
  service_name: string;
  specialist_name: string;
  time_end: string;
  time_start: string;
  specialist_id?: number | null;
}

export default function DateTimePicker({
  selectedDate,
  onDateChange,
  onTimeSelect
}: DateTimePickerProps) {
  const [allTimeSlots, setAllTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [forMapSlots, setForMapSlots] = useState<TimeSlot[]>([]);

  const enrichSlotsWithSpecialistId = (slots: TimeSlot[], specialists: Specialist[]): TimeSlot[] => {
    return slots.map(slot => {
      const [firstName, lastName] = slot.specialist_name.split(' ');
      const specialist = specialists.find(s => 
        s.name === firstName && s.surname === lastName
      );
      return {
        ...slot,
        specialist_id: specialist?.id || null
      };
    });
  };

  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const response = await fetch(`${apiUrl}/calendar/specialists/`);
        if (!response.ok) throw new Error('Ошибка загрузки специалистов');
        const data = await response.json();
        return data.map((spec: any) => ({
          id: spec.id,
          name: spec.name,
          surname: spec.last_name,
          category: spec.category_name
        }));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        return [];
      }
    };

    const fetchTimeSlots = async (date: Date, specialistsList: Specialist[]) => {
      try {
        const response = await fetch(
          `${apiUrl}/calendar/timeslots/${date.toISOString().split('T')[0]}`
        );
        if (!response.ok) throw new Error('Ошибка загрузки слотов');
        const slotsData: TimeSlot[] = await response.json();
        return enrichSlotsWithSpecialistId(slotsData, specialistsList);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        return [];
      }
    };

    const fetchData = async () => {
      if (!selectedDate) return;
      
      setIsLoading(true);
      setError(null);

      try {
        // Сначала загружаем специалистов (если еще не загружены)
        const specialistsList = specialists.length > 0 
          ? specialists 
          : await fetchSpecialists();
        
        if (specialistsList.length > 0 && specialists.length === 0) {
          setSpecialists(specialistsList);
        }

        // Затем загружаем слоты с использованием актуального списка специалистов
        const enrichedSlots = await fetchTimeSlots(selectedDate, specialistsList);
        setAllTimeSlots(enrichedSlots);
        setForMapSlots(enrichedSlots);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedDate]);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: 400,
      margin: '0 auto',
      minHeight: 300,
      position: 'relative'
    }}>
      <Calendare 
        selectedDate={selectedDate} 
        onDateChange={onDateChange} 
      />
      
      {selectedDate && (
        <Box sx={{
          width: '80%',
          height: 1,
          border: '1px solid #9C07FF',
          margin: '16px auto',
          backgroundColor: '#9C07FF'
        }} />
      )}

      <Box sx={{
        width: '100%',
        px: 2,
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {isLoading ? (
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1
          }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ 
            color: 'error.main',
            textAlign: 'center',
            py: 2
          }}>
            {error}
          </Box>
        ) : selectedDate && forMapSlots.length > 0 ? (
          <TimeSlotList 
            onSelect={onTimeSelect}
            TimeSlots={forMapSlots}
          />
        ) : selectedDate ? (
          <Box sx={{
            textAlign: 'center',
            py: 2,
            color: 'text.secondary'
          }}>
            Нет доступных слотов на выбранную дату
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}