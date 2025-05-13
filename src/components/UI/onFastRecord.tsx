import { useEffect, useState } from 'react';
import { Box, Button, Snackbar, Alert } from '@mui/material';
import '../client.css';
import arrow from '../../assets/arrow.svg';
import arrowRight from '../../assets/arrow-right.svg';
import ClientDataForm from './clientDataForm';
import DateTimePicker from './fastRecTimePicker';
import FinalStep from './finalDate';
const apiUrl = import.meta.env.VITE_API_URL;
interface ClientData {
  name: string;
  phone: string;
}

export default function OnFastRecord() {
    const [isFormValid, setIsFormValid] = useState(false);
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [selectedTime, setSelectedTime] = useState<any | null>(null);
    const [clientData, setClientData] = useState<ClientData>({ name: '', phone: '+7 ' });
    const [showAlert, setShowAlert] = useState(false);
    const [companyId, SetCompanyId] = useState<number | any>(null)
    const [clientId, SetClientId] = useState<null | number>(null)
    const [icsContent, setIcsContent] = useState<string | null>(null);

    const totalSteps = 3;

    useEffect(()=>{
        console.log(selectedTime)
    },[selectedTime])
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

    const handleNext = async () => {
        if (step === 1 && !selectedDate) {
            setShowAlert(true);
            return;
        }

        if (step === 2 && !selectedTime) {
            setShowAlert(true);
            return;
        }
        if(step == 2){
            console.log('делаем запрос')
            console.log('запрос')
            const res = await createUser(clientData.name, clientData.phone)
            /// selectedTime.id - id временного слота+
            /// selectedSpecialist.id - id сотрудника +
            /// companyId +
            ///clientId - id созданного клиента +
            if(res){
                console.log(selectedTime.id, res, companyId, selectedTime.specialist_id)
                let reult = await bookingTime(selectedTime.id, res, companyId, selectedTime.specialist_id)
                console.log('запрос', reult)
            }
        }
        if (step === totalSteps) {
            logAllData();
            // Здесь можно добавить навигацию или отправку данных
        }

        if (step < totalSteps) {
            setStep(step + 1);
        }
    }

    const logAllData = () => {
        console.log('Данные быстрой записи:', {
            date: selectedDate?.toLocaleDateString('ru-RU') || 'Не выбрано',
            time: selectedTime || 'Не выбрано',
            client: {
                name: clientData.name || 'Не указано',
                phone: clientData.phone || 'Не указан'
            }
        });
    }

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    }

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        // Сбрасываем выбранное время при смене даты
        if (!date || (date && date !== selectedDate)) {
            setSelectedTime(null);
        }
        setShowAlert(false);
    }

    const handleTimeSelect = (time: string | null) => {
        setSelectedTime(time);
        console.log(time)
        setShowAlert(false);
    }

    const handleFormSubmit = (data: { name: string; phone: string, isValid: boolean }) => {
        setClientData({
            name: data.name,
            phone: data.phone
        });
        setIsFormValid(data.isValid);
    };

    const isNextDisabled = () => {
        if (step === 1) return !selectedTime;
        if (step === 2) return !selectedTime;
        if (step === 3) return !isFormValid;
        return false;
    }

    const getButtonText = () => {
        if (step === totalSteps) return 'ЗАПИСАТЬСЯ';
        return 'ДАЛЕЕ';
    }

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <div className="header-text">
                            <div>
                                <span className="zapisites">Выберите </span>
                                <span className="na-priem"> дату</span>
                            </div>
                            <div className="divider"></div>
                        </div>
                        <DateTimePicker
                            selectedDate={selectedDate}
                            onDateChange={handleDateChange}
                            onTimeSelect={handleTimeSelect}
                        />
                    </>
                );
            case 2:
                return (
                    <>
                        <div className="header-text">
                            <div>
                                <span className="zapisites">Выберите </span>
                                <span className="na-priem"> время</span>
                            </div>
                            <div className="divider"></div>
                        </div>
                        <ClientDataForm onSubmit={handleFormSubmit}/>
                    </>
                );
            case 3:
                return (
                    <>
                        <div className="header-text">
                            <div>
                                <span className="zapisites">Укажите </span>
                                <span className="na-priem"> данные</span>
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
    }

    const getAlertMessage = () => {
        if (step === 1) return "Пожалуйста, выберите дату";
        if (step === 2) return "Пожалуйста, выберите время";
        return "";
    }

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

            {step < totalSteps && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, gap: 2, flexDirection:'column' }}>
                    <Button 
                        sx={buttonStyle} 
                        onClick={handleNext}
                        disabled={isNextDisabled()}
                    >
                        {getButtonText()}
                        <img loading="eager" fetchPriority="high" src={arrow} alt='далее' />
                    </Button>
                    {step > 1 && step < 3 && (
                        <Button 
                            sx={{ ...buttonStyle, backgroundColor: 'white', border:'1px solid #9C07FF', color:'#9C07FF'}}
                            onClick={handleBack}
                        >
                            <img src={arrowRight} alt='назад' loading="eager" fetchPriority="high"></img>
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