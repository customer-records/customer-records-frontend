import { useState, useCallback, useEffect } from 'react';
import { Box, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from "react-router-dom";
import '../client.css';
import arrow from '../../assets/arrow.svg';
import arrowRight from '../../assets/arrow-right.svg';
import ClientDataForm from './clientDataForm';
import FinalStep from './finalDate';
import DateSpecialistPicker from './dateSpecialistPicker';
const apiUrl = import.meta.env.VITE_API_URL;
interface Specialist {
  id: number;
  name: string;
  surname: string;
  slots: string[];
}

interface ClientData {
  name: string;
  phone: string;
}

export default function OnSpecialist() {
    const navigate = useNavigate();
    const [isFormValid, setIsFormValid] = useState(false);
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [clientData, setClientData] = useState<ClientData>({ name: '', phone: '+7 ' });
    const [showAlert, setShowAlert] = useState(false);
    const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null)
    const [companyId, SetCompanyId] = useState<number | any>(null)
    const [clientId, SetClientId] = useState<null | number>(null)
    const [icsContent, setIcsContent] = useState<string | null>(null);
    
    const totalSteps = 3;
    const getCompanyId = async () => {
        const result = await fetch(`${apiUrl}/calendar/company/`)
        const data = await result.json()
        SetCompanyId(data.id)
    }
    async function bookingTime(time_slot_id: any, client_id: any, company_id: any, employer_id: any) {
        try {
            const result = await fetch(`${apiUrl}/calendar/bookings/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    time_slot_id,
                    client_id,
                    company_id,
                    employer_id
                })
            });
    
            if (!result.ok) throw new Error(`HTTP error! status: ${result.status}`);
    
            const blob = await result.blob();
            const reader = new FileReader();
            reader.onloadend = () => {
                const text = reader.result as string;
                setIcsContent(text);
            };
            reader.readAsText(blob);
        } catch (e) {
            console.error('Ошибка при бронировании и получении ICS файла:', e);
        }
    }
    async function createUser(name:string, phone_number:string){
        try{
            const response = await fetch(`${apiUrl}/auth/client/create`,{
                method:"POST",
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    phone_number:phone_number 
                })
            })
            if(!response.ok)throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            console.log('Клиент создан', data);
            SetClientId(data.client.id)
            return data.client.id
        }
        catch(e){
            throw new Error(`ошибка:${e}`)
        }
    }
    useEffect(()=>{
        getCompanyId()
    },[])
    // Обработчик изменения даты
    const handleDateChange = useCallback((date: Date | null) => {
        if (date) {
            setSelectedDate(date);
            // Сбрасываем выбор специалиста и времени при изменении даты
            setSelectedSpecialist(null);
            setSelectedTime(null);
            setShowAlert(false);
            console.log('Выбранная дата:', date.toLocaleDateString('ru-RU'));
        }
    }, []);

    // Обработчик выбора специалиста и времени
    const handleSpecialistTimeSelect = useCallback((specialist: Specialist | null, time: any | null) => {
        setSelectedSpecialist(specialist);
        setSelectedTime({
            name: time.specialist_name.split(' ')[0],
            surname: time.specialist_name.split(' ')[1],
            category:time.service_name,
            ...time
        });
        setShowAlert(false);
        if (specialist && time) {
            console.log('Выбран специалист:', `${specialist.name} ${specialist.surname}`, 'на время:', time);
        }
    }, []);

    // Обработчик данных формы
    const handleFormSubmit = useCallback((data: { name: string; phone: string, isValid: boolean }) => {
        console.log('Получены данные формы:', {
            name: data.name,
            phone: data.phone,
            isValid: data.isValid
        });
        
        setClientData({
            name: data.name,
            phone: data.phone
        });
        setIsFormValid(data.isValid);

        if (data.isValid) {
            console.log('Форма валидна, можно продолжить');
        }
    }, []);

    const handleNext = async () => {
        if (step === 1 && (!selectedSpecialist || !selectedTime)) {
            setShowAlert(true);
            return;
        }

        if (step === 2 && !isFormValid) {
            setShowAlert(true);
            return;
        }
        if(step === 2){
            console.log('запрос')
            const res = await createUser(clientData.name, clientData.phone)
            /// selectedTime.id - id временного слота+
            /// selectedSpecialist.id - id сотрудника +
            /// companyId +
            ///clientId - id созданного клиента +
            if(res){
                console.log(selectedTime.id, res, companyId, selectedSpecialist.id)
                bookingTime(selectedTime.id, res, companyId, selectedSpecialist.id)
                console.log('запрос')
            }
        }
        if (step === totalSteps) {
            logAllData();
        }

        if (step < totalSteps) {
            setStep(step + 1);
        }
    };

    const logAllData = () => {
        const completeData = {
            date: selectedDate.toLocaleDateString('ru-RU'),
            specialist: selectedSpecialist 
                ? `${selectedSpecialist.name} ${selectedSpecialist.surname}` 
                : 'Не выбрано',
            time: selectedTime || 'Не выбрано',
            client: {
                name: clientData.name || 'Не указано',
                phone: clientData.phone || 'Не указан'
            },
            timestamp: new Date().toISOString()
        };
        
        console.log('Все данные для записи:', completeData);
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleClick = (route: string) => {
        navigate(route);
    };

    const isNextDisabled = () => {
        if (step === 1) return !selectedSpecialist || !selectedTime;
        if (step === 2) return !isFormValid;
        return false;
    };

    const getButtonText = () => {
        if (step === 2) return 'ЗАПИСАТЬСЯ';
        else if (step === 1) return 'ДАЛЕЕ';
    };

    const getAlertMessage = () => {
        if (step === 1) {
            if (!selectedSpecialist) return "Пожалуйста, выберите специалиста";
            if (!selectedTime) return "Пожалуйста, выберите время";
        }
        if (step === 2) return "Пожалуйста, заполните все обязательные поля";
        return "";
    };
    const getTimeSlotData = () => {
        if (!selectedTime) return null;
        return {
            date: selectedDate?.toISOString() || new Date().toISOString(),
            time_start: selectedTime['time_start'],
            time_end: selectedTime['time_end'],
            name: `${selectedTime['specialist_name'].split(' ')[0]}`,
            surname:`${selectedTime['specialist_name'].split(' ')[1]}`,
            category: selectedTime['service_name']
        };
    };
    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <div className="header-text">
                            <div>
                                <span className="zapisites">Выберите </span>
                                <span className="na-priem"> специалиста </span>
                            </div>
                            <div className="divider"></div>
                        </div>
                        <DateSpecialistPicker
                            selectedDate={selectedDate}
                            onDateChange={handleDateChange}
                            onSelect={handleSpecialistTimeSelect}
                            serviceId={selectedServiceId}
                        />
                    </>
                );
            case 2:
                return (
                    <>
                        <div className="header-text">
                            <div>
                                <span className="zapisites">Укажите </span>
                                <span className="na-priem"> данные</span>
                            </div>
                            <div className="divider"></div>
                        </div>
                        <ClientDataForm 
                            onSubmit={handleFormSubmit}
                            initialData={clientData}
                        />
                    </>
                );
                case 3:
                    return (
                        <>
                            <div className="header-text">
                                <div>
                                    <span className="zapisites">Спасибо, вы записались </span>
                                </div>
                                <div className="divider"></div>
                            </div>
                            <FinalStep 
                                date={selectedDate}
                                time={getTimeSlotData()}
                                ics={icsContent}
                            />
                        </>
                    );
            default:
                return null;
        }
    };

    return (
        <Box sx={{ 
            margin: '40px auto', 
            boxSizing: 'border-box',
            width: '100%',
            maxWidth: 800,
            display: 'flex',
            flexDirection: 'column',
            alignItems:'center',
        }}>
            {renderStepContent()}

            {step <= totalSteps-1 && (
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    mt: 3, 
                    gap: 2, 
                    flexDirection:'column' 
                }}>
                    <Button 
                        sx={buttonStyle} 
                        onClick={handleNext}
                        disabled={isNextDisabled()}
                    >
                        {getButtonText()}
                        <img loading="eager" fetchPriority="high" src={arrow} alt='далее' />
                    </Button>
                    {step > 1 && (
                        <Button 
                            sx={{ 
                                ...buttonStyle, 
                                backgroundColor: 'white', 
                                border:'1px solid #9C07FF', 
                                color:'#9C07FF'
                            }}
                            onClick={handleBack}
                        >
                            <img loading="eager" fetchPriority="high" src={arrowRight} alt='назад'></img>
                            НАЗАД
                        </Button>
                    )}
                </Box>
            )}

            <Snackbar
                open={showAlert}
                autoHideDuration={6000}
                onClose={() => setShowAlert(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="warning" sx={{ width: '100%' }}>
                    {getAlertMessage()}
                </Alert>
            </Snackbar>
        </Box>
    );
}

const buttonStyle = {
    width: 350,
    height: 40,
    borderRadius: '20px',
    gap: '13px',
    borderWidth: '2px',
    paddingRight: '14px',
    paddingLeft: '14px',
    backgroundColor: '#9C07FF',
    color: 'white',
    textTransform: 'uppercase',
    fontFamily: 'Roboto',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '32px',
    '&:disabled': {
        backgroundColor: '#cccccc',
        color: '#666666'
    }
};