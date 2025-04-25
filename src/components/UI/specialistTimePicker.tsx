import { useState, useEffect, useRef } from 'react';
import { 
  Avatar, 
  List, 
  ListItem, 
  MenuItem, 
  Select,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

const apiUrl = import.meta.env.VITE_API_URL;

const getInitials = (name: string, surname: string) => {
  return `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase();
};

const SpecialistSelector = ({ onSelect, selectedDate, serviceId }: any) => {
    const [specialists, setSpecialists] = useState<any[]>([]);
    const [selectedSpecialist, setSelectedSpecialist] = useState<any | null>(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<any | null>(null);
    const [allTimeSlots, setAllTimeSlots] = useState<any[]>([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const containerRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let specialistsResponse 
                if(serviceId) specialistsResponse = await fetch(`${apiUrl}/calendar/specialists/?category_id=${serviceId}`);
                else specialistsResponse = await fetch(`${apiUrl}/calendar/specialists/`);
                if (!specialistsResponse.ok) {
                    throw new Error('Ошибка при загрузке специалистов');
                }
                const specialistsData: any[] = await specialistsResponse.json();
                
                const slotsResponse = await fetch(`${apiUrl}/calendar/timeslots/${selectedDate}`);
                if (!slotsResponse.ok) {
                    throw new Error('Ошибка при загрузке временных слотов');
                }
                const slotsData: any[] = await slotsResponse.json();
                setAllTimeSlots(slotsData);

                const formattedSpecialists = specialistsData.map(spec => ({
                    id: spec.id,
                    name: spec.name,
                    surname: spec.last_name,
                    category: spec.category_name,
                    slots: []
                }));
                
                setSpecialists(formattedSpecialists);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedDate]);

    useEffect(() => {
        const handleScroll = () => {
            if (open) setOpen(false);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [open]);

    const handleSpecialistChange = (event: any) => {
        const spec = event.target.value;
        const filteredSlots = allTimeSlots.filter(slot => 
            slot.specialist_name === `${spec.name} ${spec.surname}`
        );
        
        const updatedSpecialist = {
            ...spec,
            slots: filteredSlots
        };
        
        setSelectedSpecialist(updatedSpecialist);
        setSelectedTimeSlot(null);
        setOpen(false); 
        onSelect(null, null);
    };

    const handleTimeSelect = (timeSlot: any) => {
        setSelectedTimeSlot(timeSlot);
        if (selectedSpecialist) {
            onSelect(selectedSpecialist, timeSlot);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 85
            }}>
                <CircularProgress sx={{ width: '24px !important', height: '24px !important' }}/>
            </Box>
        );
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box ref={containerRef} sx={{ width: '100%' }}>
            <SelectContainer>
                <WideSelect
                    displayEmpty
                    value={selectedSpecialist || ''}
                    onChange={handleSpecialistChange}
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    IconComponent={() => null}
                    MenuProps={{
                        container: containerRef.current,
                        disablePortal: true,
                        PaperProps: {
                            sx: {
                                width: '33%',
                                maxHeight: 300,
                                boxShadow: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
                                left: '50% !important',
                                transform: 'translateX(-50%) !important',
                                marginTop: '4px',
                                overflowY: 'auto'
                            }
                        }
                    }}
                    renderValue={(selected) => {
                        if (!selected) {
                            return (
                                <SelectContent>
                                    <span>Выберите специалиста</span>
                                    <SelectArrow>
                                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                    </SelectArrow>
                                </SelectContent>
                            );
                        }
                        const spec = selected as any;
                        return (
                            <SelectContent>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    {`${spec.name} ${spec.surname}`} 
                                </Box>
                                <SelectArrow>
                                    {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                </SelectArrow>
                            </SelectContent>
                        );
                    }}
                >
                    <MenuItem value="" disabled>
                        Выберите специалиста
                    </MenuItem>
                    {specialists.map((spec) => (
                        <MenuItem 
                            key={spec.id} 
                            value={spec} 
                            sx={{ minHeight: '48px' }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {`${spec.name} ${spec.surname} `}
                            </Box>
                        </MenuItem>
                    ))}
                </WideSelect>
            </SelectContainer>

            {selectedSpecialist && (
                <List sx={{ width: '100%' }}>
                    <ListItem sx={{ padding: 0, minHeight: '48px' }}>
                        <Box sx={{ 
                            display: 'flex', 
                            width: '100%',
                            borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
                        }}>
                            <Box sx={{ width: '50%' }}>
                                <SpecialistHeader>Специалист</SpecialistHeader>
                            </Box>
                            <Box sx={{ width: '50%' }}>
                                <TimeHeader>Время</TimeHeader>
                            </Box>
                        </Box>
                    </ListItem>
                    
                    {selectedSpecialist.slots.length > 0 ? (
                        selectedSpecialist.slots.map((slot: any) => (
                            <ListItem 
                                key={slot.id}
                                sx={{ 
                                    padding: 0,
                                    minHeight: '56px',
                                    backgroundColor: selectedTimeSlot?.id === slot.id ? '#E3F2FD' : 'inherit',
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleTimeSelect(slot)}
                            >
                                <TimeSlotItem>
                                    <Box sx={{ 
                                        width: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        paddingLeft: '16px'
                                    }}>
                                        <SpecialistAvatar>
                                            {getInitials(selectedSpecialist.name, selectedSpecialist.surname)}
                                        </SpecialistAvatar>
                                        <SlotText>
                                            {`${selectedSpecialist.name} ${selectedSpecialist.surname}`}
                                        </SlotText>
                                    </Box>
                                    <Box sx={{ width: '50%' }}>
                                        <SlotText>{slot.time_start} - {slot.time_end}</SlotText>
                                    </Box>
                                </TimeSlotItem>
                            </ListItem>
                        ))
                    ) : (
                        <ListItem>
                            <SlotText>Нет доступных слотов для записи</SlotText>
                        </ListItem>
                    )}
                </List>
            )}
        </Box>
    );
};

export default SpecialistSelector;

const HeaderText = styled(Typography)({
    fontFamily: 'Roboto',
    fontSize: 12,
    lineHeight: '24px',
    letterSpacing: '0.4px',
    verticalAlign: 'middle',
    color: '#757575',
    padding: '10px 16px'
});

const TimeHeader = styled(HeaderText)({
    fontWeight: 700
});

const SpecialistHeader = styled(HeaderText)({
    fontWeight: 400
});

const SlotText = styled(Typography)({
    fontFamily: 'Roboto',
    fontWeight: 400,
    fontSize: 14,
    lineHeight: '24px',
    letterSpacing: '0.25px',
    verticalAlign: 'middle',
    color: '#000000DE',
    padding: '14px 16px'
});

const SelectContainer = styled(Box)({
    margin: '16px auto',
    position: 'relative'
});

const WideSelect = styled(Select)({
    width: '100%',
    boxShadow: '0px -1px 0px 0px #0000001F inset',
    border: 'none',
    '& .MuiSelect-select': {
      padding: '14px 32px 14px 16px',
      display: 'flex',
      alignItems: 'center',
      position: 'relative'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    }
});

const SelectContent = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between'
});

const SelectArrow = styled(Box)({
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center'
});

const TimeSlotItem = styled(Box)({
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    minHeight: '56px',
    boxShadow: '0px -1px 0px 0px #0000001F inset',
    '&:hover': {
      backgroundColor: '#F5F5F5'
    }
});

const SpecialistAvatar = styled(Avatar)({
    width: 36,
    height: 36,
    marginRight: '16px',
    backgroundColor: '#e0e0e0',
    color: '#424242',
    fontSize: '14px',
    fontWeight: 500
});
