import { useState, useEffect } from 'react';
import { Box, Typography, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from "react-router-dom";
import ServiceList from './serviceList';
import '../client.css';
import Calendare from './calendare';
import arrow from '../../assets/arrow.png';
import arrowRight from '../../assets/arrow-right.png';
import SpecialistSelector from './specialistTimePicker';
import ClientDataForm from './clientDataForm';
import FinalStep from './finalDate';
const apiUrl = import.meta.env.VITE_API_URL;

export default function OnDate() {
    const navigate = useNavigate();
    const [isFormValid, setIsFormValid] = useState(false);
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [dateForPicker, setDateForPicker] = useState<any>(selectedDate.toISOString().split('T')[0]);
    const [selectedServiceName, setSelectedServiceName] = useState<string | null>(null);
    const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null)
    const [selectedSpecialist, setSelectedSpecialist] = useState<any | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [clientData, setClientData] = useState<any>({ name: '', phone: '+7 ' });
    const [showAlert, setShowAlert] = useState(false);
    const [servicesData, setServicesData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [companyId, SetCompanyId] = useState<number | any>(null)
    const [clientId, SetClientId] = useState<null | number>(null)
    const totalSteps = 5;
    /// selectedTime.id - id временного слота
    /// selectedSpecialist.id - id сотрудника 

    /// selectedServiceId - id выбранного сервиса
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
    const getCompanyId = async () => {
        const result = await fetch(`${apiUrl}/calendar/company/`)
        const data = await result.json()
        SetCompanyId(data.id)
    }
    async function bookingTime(time_slot_id:any, client_id:any, company_id:any, employer_id:any){
        try{
            const result = await fetch(`${apiUrl}/calendar/bookings/`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    time_slot_id: time_slot_id,
                    client_id: client_id,
                    company_id: company_id,
                    employer_id: employer_id
                  })
            })
            if(!result.ok)throw new Error(`HTTP error! status: ${result.status}`);
            const data = await result.json();
            console.log('Бронирование создано:', data);
        }catch(e){
            throw new Error(`HTTP error! status: ${e}`);
        }
    }
    // useEffect(()=>{
    //     console.log( selectedServiceId, selectedSpecialist, selectedTime)
    // },[step])
    // Загрузка данных с сервера
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`${apiUrl}/calendar/services/`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data)
                setServicesData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
        getCompanyId()
    }, []);

    // Преобразование данных для ServiceList
    const transformServicesData = () => {
        return servicesData.map(category => ({
            specialist: category.name_category,
            id: category.id,
            services: category.services_array.map((service:any) => service)
        }));
    };
    useEffect(()=>{console.log(transformServicesData())},[servicesData])
    const handleClick = (route: string) => {
        navigate(route);
    }

    const handleNext = async () => {
        if (step === 2 && !selectedServiceName) {
            setShowAlert(true);
            return;
        }

        if (step === 3 && (!selectedSpecialist || !selectedTime)) {
            setShowAlert(true);
            return;
        }
        if(step == 4) {
            //clientData- для создания клиента
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
        if (step < totalSteps) {
            setStep(step + 1);
        }
    }


    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    }

    const handleSelectService = (name: string | null, id?: null | number) => {
        setSelectedServiceName(name);
        if(id)setSelectedServiceId(id)
        setShowAlert(false);
    }

    const handleSpecialistTimeSelect = (specialist: any | null, time: any | null) => {
        console.log(time)
        setSelectedSpecialist(specialist);
        setSelectedTime({
            name: time?.specialist_name.split(' ')[0],
            surname: time?.specialist_name.split(' ')[1],
            category:time.service_name,
            ...time
        });
        setShowAlert(false);
    }

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setSelectedDate(date);
            const formattedDate = date.toISOString().split('T')[0];
            setDateForPicker(formattedDate)
            console.log(formattedDate); // Формат YYYY-MM-DD
        }
    }
    const handleFormSubmit = (data: { name: string; phone: string, isValid: boolean }) => {
        setClientData({
            name: data.name,
            phone: data.phone
        });
        setIsFormValid(data.isValid);
    };

    const isNextDisabled = () => {
        if (step === 2) return !selectedServiceName;
        if (step === 3) return !selectedSpecialist || !selectedTime;
        if (step === 4) return !isFormValid;
        return false;
    }

    const getButtonText = () => {
        if (step === 4) return 'ЗАПИСАТЬСЯ';
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
                            <div className="additional-button-container">
                                <button onClick={() => handleClick('/client/fastreacord')} className="custom-button fast center">
                                    <span className="button-text">Быстрая запись</span>
                                </button>
                            </div>
                        </div>
                        <Calendare selectedDate={selectedDate} onDateChange={handleDateChange} />
                    </>
                );
            case 2:
                if (loading) return <div>Загрузка услуг...</div>;
                if (error) return <div>Ошибка: {error}</div>;
                
                return (
                    <>
                        <div className="header-text">
                            <div>
                                <span className="zapisites">Выберите </span>
                                <span className="na-priem"> услугу</span>
                            </div>
                            <div className="divider"></div>
                        </div>
                        {transformServicesData().map((item, index) => (
                            <ServiceList
                                key={index}
                                specialist={{name:item.specialist, id:item.id}}
                                services={item.services}
                                selectedService={selectedServiceName}
                                onSelect={handleSelectService}
                            />
                        ))}
                    </>
                );
            case 3:
                return (
                    <>
                        <div className="header-text">
                            <div>
                                <span className="zapisites">Выберите </span>
                                <span className="na-priem"> специалиста</span>
                            </div>
                            <div className="divider"></div>
                        </div>
                        <SpecialistSelector 
                            onSelect={handleSpecialistTimeSelect}
                            selectedDate={dateForPicker}
                            serviceId={selectedServiceId}
                        />
                    </>
                );
            case 4:
                return (
                    <>
                        <div className="header-text">
                            <div>
                                <span className="zapisites">Укажите </span>
                                <span className="na-priem"> данные</span>
                            </div>
                            <div className="divider"></div>
                        </div>
                        <ClientDataForm onSubmit={handleFormSubmit}/>
                    </>
                );
            case 5:
                return (
                    <>
                        <div className="header-text">
                            <div>
                                <span className="zapisites">Спасибо, вы записались</span>
                            </div>
                            <div className="divider"></div>
                        </div>
                        <FinalStep
                            date={selectedDate}
                            time={selectedTime}
                        />
                    </>
                );
            default:
                return null;
        }
    }

    const getAlertMessage = () => {
        if (step === 2) return "Пожалуйста, выберите услугу перед продолжением";
        if (step === 3) {
            if (!selectedSpecialist) return "Пожалуйста, выберите специалиста";
            if (!selectedTime) return "Пожалуйста, выберите время";
        }
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
                    {step > 1 && (
                        <Button 
                            sx={{ ...buttonStyle, backgroundColor: 'white', border:'1px solid #0077FF', color:'#0077FF'}}
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
    backgroundColor: '#0077FF',
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