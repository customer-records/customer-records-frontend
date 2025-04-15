import { useState, useCallback, useEffect } from 'react';
import { Box, Typography, Button, Snackbar, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom";
import ServiceList from './serviceList';
import '../client.css';
import arrow from '../../assets/arrow.png';
import arrowRight from '../../assets/arrow-right.png';
import ClientDataForm from './clientDataForm';
import FinalStep from './finalDate';
import DateSpecialistPicker from './dateSpecialistPicker';

const apiUrl = import.meta.env.VITE_API_URL;

interface Service {
  id: number;
  name: string;
}

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

export default function OnService() {
    const navigate = useNavigate();
    const [isFormValid, setIsFormValid] = useState(false);
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [clientData, setClientData] = useState<ClientData>({ name: '', phone: '+7 ' });
    const [showAlert, setShowAlert] = useState(false);
    const [servicesData, setServicesData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedServiceName, setSelectedServiceName] = useState<string | null>(null);
    const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
    const [companyId, SetCompanyId] = useState<number | any>(null);
    const [clientId, SetClientId] = useState<null | number>(null);

    const getCompanyId = async () => {
        const result = await fetch(`${apiUrl}/calendar/company/`);
        const data = await result.json();
        SetCompanyId(data.id);
    };

    async function bookingTime(time_slot_id: any, client_id: any, company_id: any, employer_id: any) {
        try {
            const result = await fetch(`${apiUrl}/calendar/bookings/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    time_slot_id: time_slot_id,
                    client_id: client_id,
                    company_id: company_id,
                    employer_id: employer_id
                })
            });
            if (!result.ok) throw new Error(`HTTP error! status: ${result.status}`);
            const data = await result.json();
            console.log('Бронирование создано:', data);
        } catch (e) {
            throw new Error(`HTTP error! status: ${e}`);
        }
    }

    async function createUser(name: string, phone_number: string) {
        try {
            const response = await fetch(`${apiUrl}/auth/client/create`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    phone_number: phone_number
                })
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            console.log('Клиент создан', data);
            SetClientId(data.client.id);
            return data.client.id;
        } catch (e) {
            throw new Error(`ошибка:${e}`);
        }
    }

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`${apiUrl}/calendar/services/`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setServicesData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
        getCompanyId();
    }, []);

    const totalSteps = 4;

    const transformServicesData = () => {
        return servicesData.map(category => ({
            specialist: category.name_category,
            id: category.id,
            services: category.services_array.map((service: any) => service)
        }));
    };

    const handleClick = (route: string) => {
        navigate(route);
    };

    const handleNext = async () => {
        if (step === 1 && !selectedServiceName) {
            setShowAlert(true);
            return;
        }

        if (step === 2 && (!selectedDate || !selectedSpecialist || !selectedTime)) {
            setShowAlert(true);
            return;
        }

        if (step === 3) {
            console.log('запрос');
            const res = await createUser(clientData.name, clientData.phone);
            
            if (res) {
                console.log(selectedTime?.id, res, companyId, selectedSpecialist?.id);
                bookingTime(selectedTime.id, res, companyId, selectedSpecialist.id);
                console.log('запрос');
            }
        }
        if (step < totalSteps) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleSelectService = useCallback((name: string | null, id?: null | number) => {
        setSelectedServiceName(name);
        if (id) setSelectedServiceId(id);
        setShowAlert(false);
    }, []);

    const handleDateChange = useCallback((date: Date | null) => {
        if (date) {
            setSelectedDate(date);
            setSelectedSpecialist(null);
            setSelectedTime(null);
            setShowAlert(false);
        }
    }, []);

    const handleSpecialistTimeSelect = useCallback((specialist: Specialist | null, time: any | null) => {
        setSelectedSpecialist(specialist);
        setSelectedTime({
            name: time.specialist_name.split(' ')[0],
            surname: time.specialist_name.split(' ')[1],
            category: time.service_name,
            ...time
        });
        console.log(time);
        setShowAlert(false);
    }, []);

    const handleFormSubmit = useCallback((data: { name: string; phone: string, isValid: boolean }) => {
        setClientData({
            name: data.name,
            phone: data.phone
        });
        setIsFormValid(data.isValid);
    }, []);

    const isNextDisabled = () => {
        if (step === 1) return !selectedServiceName;
        if (step === 2) return !selectedDate || !selectedSpecialist || !selectedTime;
        if (step === 3) return !isFormValid;
        return false;
    };

    const getButtonText = () => {
        if (step === 3) return 'ЗАПИСАТЬСЯ';
        return 'ДАЛЕЕ';
    };

    const getAlertMessage = () => {
        if (step === 1) return "Пожалуйста, выберите услугу перед продолжением";
        if (step === 2) {
            if (!selectedDate) return "Пожалуйста, выберите дату";
            if (!selectedSpecialist) return "Пожалуйста, выберите специалиста";
            if (!selectedTime) return "Пожалуйста, выберите время";
        }
        return "";
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <div className="header-text">
                            <div>
                                <span className="zapisites">Выберите </span>
                                <span className="na-priem"> услугу</span>
                            </div>
                            <div className="divider"></div>
                            <div className="additional-button-container">
                                <button onClick={() => handleClick('/client/fastreacord')} className="custom-button fast center">
                                    <span className="button-text">Быстрая запись</span>
                                </button>
                            </div>
                        </div>
                        {loading ? (
                            <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                height: 180 
                            }}>
                                <CircularProgress size={24} />
                            </Box>
                        ) : (
                            transformServicesData().map((item, index) => (
                                <ServiceList
                                    key={index}
                                    specialist={{ name: item.specialist, id: item.id }}
                                    services={item.services}
                                    selectedService={selectedServiceName}
                                    onSelect={handleSelectService}
                                    
                                />
                            ))
                        )}
                    </>
                );
            case 2:
                return (
                    <>
                        <div className="header-text">
                            <div>
                                <span className="zapisites">Выберите </span>
                                <span className="na-priem"> дату и специалиста</span>
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
                        <ClientDataForm onSubmit={handleFormSubmit} />
                    </>
                );
            case 4:
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
    };

    return (
        <Box sx={{ 
            margin: '40px auto', 
            boxSizing: 'border-box',
            width: '100%',
            maxWidth: 800,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            {renderStepContent()}

            {step < totalSteps && (
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    mt: 3, 
                    gap: 2, 
                    flexDirection: 'column' 
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
                                border: '1px solid #0077FF', 
                                color: '#0077FF'
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