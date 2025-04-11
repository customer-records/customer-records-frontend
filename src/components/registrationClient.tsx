import { useEffect, useState } from 'react';
import { Box, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import arrow from '../assets/arrow.png';
import arrowRight from '../assets/arrow-right.png';
import PhoneEnter from './UI/clientRegAuth/phoneEnter';
import CodeEnter from './UI/clientRegAuth/codeEnter';
import ClientData from './UI/clientRegAuth/clientData';
import Congratulations from './UI/clientRegAuth/congratulations';
import Header from './UI/header';
const apiUrl = import.meta.env.VITE_API_URL;
export default function RegistrationClient() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        phone: '+7 ',
        code: '', 
        firstName: '',
        middleName: '',
        lastName: '',
        birthDate: '',
        gender: '',
        isValid: false
    });
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationError, setVerificationError] = useState('');
    const [clientCreationError, setClientCreationError] = useState('');
    const [codeError, setCodeError] = useState(false);
    const [codeType, setCodeType] = useState('WA')
    const totalSteps = 4;

    const createClient = async (username = null,chatId = null) => { 
        console.log(username, chatId)
        try {
            const cleanPhone = formData.phone.replace(/\s+/g, '');
            const response = await fetch(`${apiUrl}/auth/client/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.firstName,
                    last_name: formData.lastName,
                    sur_name: formData.middleName,
                    phone_number: cleanPhone,
                    tg_name: username,
                    chat_id: chatId
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Ошибка при создании клиента');
            }

            return await response.json();
        } catch (error) {
            console.error('Ошибка создания клиента:', error);
            setClientCreationError(error.message);
            throw error;
        }
    };
    ///функция отправки кода в тг бот
    const verifyCodeAndProceedTg = async () => {
        setIsVerifying(true);
        setVerificationError('');
        setClientCreationError('');
        setCodeError(false);
        
        try {
            const verifyResponse = await fetch(`${apiUrl}/telegram/verify-code/${formData.code.code}`);

            if (!verifyResponse.ok) {
                if (verifyResponse.status === 404) {
                    setCodeError(true);
                    throw new Error('Неверный код подтверждения');
                }
                const error = await verifyResponse.json();
                throw new Error(error.detail || 'Ошибка проверки кода');
            }
            // console.log(await verifyResponse.json())
            const { phone, username, chat_id, status } = await verifyResponse.json();
            console.log(username, chat_id)
            if (status === 'success' && phone.replace(/ /g, '') === formData.phone.replace(/ /g, '')) {
                const clearResponse = await fetch(`${apiUrl}/telegram/clear-code/${formData.code.code}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!clearResponse.ok) {
                    throw new Error('Ошибка при очистке кода');
                }

                await createClient(username, chat_id);
                setStep(4);
            } else {
                throw new Error('Номер телефона не совпадает');
            }
        } catch (error) {
            console.error('Ошибка проверки кода:', error);
            setVerificationError(error.message);
        } finally {
            setIsVerifying(false);
        }
    };
    ///функция отправки кода в WA
    const verifyCodeAndProceedWa = async () => {
        setIsVerifying(true);
        setVerificationError('');
        setClientCreationError('');
        setCodeError(false);
        
        try {
            const verifyResponse = await fetch(`${apiUrl}/whatsapp/verify-code/${formData.code.code}`);

            if (!verifyResponse.ok) {
                if (verifyResponse.status === 404) {
                    setCodeError(true);
                    throw new Error('Неверный код подтверждения');
                }
                const error = await verifyResponse.json();
                throw new Error(error.detail || 'Ошибка проверки кода');
            }
            const { phone, username, chat_id, status } = await verifyResponse.json();
            console.log(phone, username, chat_id, status)
            if (status === 'success' && phone.replace(/ /g, '') === formData.phone.replace(/ /g, '').replace(/\D/g, '')) {
                const clearResponse = await fetch(`${apiUrl}/whatsapp/clear-code/${formData.code.code}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!clearResponse.ok) {
                    throw new Error('Ошибка при очистке кода');
                }

                await createClient(username, chat_id);
                setStep(4);
            } else {
                throw new Error('Номер телефона не совпадает');
            }
        } catch (error) {
            console.error('Ошибка проверки кода:', error);
            setVerificationError(error.message);
        } finally {
            setIsVerifying(false);
        }
    };
    useEffect(()=>{
        console.log(codeType)
    },[codeType])
    const handleNext = async () => {
        if (step < totalSteps) {
            if (step === 2) {
                if(codeType == 'TG')window.open('https://t.me/technica1lbot?start=activate', '_blank');
                else {
                    const cleanPhone = formData.phone.replace(/\s+/g, '').replace(/\D/g, '');
                    const sendResponse = await fetch(`${apiUrl}/whatsapp/send-code/${cleanPhone}`,{
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      });
                    console.log(sendResponse)
                    if(!sendResponse.ok){
                            setCodeError(true);
                            throw new Error('Неверный номер телефона');
                    }
                }
                setStep(3);
            } else if (step === 3) {
               if(codeType == 'TG') await verifyCodeAndProceedTg();
               else if(codeType == 'WA') await verifyCodeAndProceedWa();
            } else {
                setStep(step + 1);
            }
        } else {
            console.log('Все данные формы:', formData);
            navigate('/client');
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            navigate('/');
        }
    };

    const handlePhoneSubmit = (data: { phone: string, isValid: boolean, type:string }) => {
        setFormData(prev => ({...prev, phone: data.phone}));
        setIsPhoneValid(data.isValid);
        setCodeType(data.type);
        console.log(data)
    };

    const handleClientDataSubmit = (data: any) => {
        setFormData(prev => ({
            ...prev,
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            birthDate: data.birthDate,
            gender: data.gender,
            isValid: data.isValid
        }));
    };

    const handleCodeSubmit = (code: string) => {
        setFormData(prev => ({...prev, code}));
        setVerificationError('');
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <div className="header-text" style={{marginBottom:'0px', marginTop:'20px'}}>
                            <div>
                                <span className="zapisites">Укажите </span>
                                <span className="na-priem"> данные</span>
                            </div>
                            <div className="divider" style={{marginTop:'20px'}}></div>
                        </div>
                        <PhoneEnter phone={formData.phone} onSubmit={handlePhoneSubmit}/>
                    </>
                );
            case 2:
                return (
                    <>
                        <div className="header-text" style={{marginBottom:'0px', marginTop:'20px'}}>
                            <div>
                                <span className="zapisites">Укажите </span>
                                <span className="na-priem"> данные</span>
                            </div>
                            <div className="divider" style={{marginTop:'20px'}}></div>
                        </div>
                        <ClientData onSubmit={handleClientDataSubmit}/>
                    </>
                );
            case 3:
                return (
                    <>
                        <div className="header-text" style={{marginBottom:'0px', marginTop:'20px'}}>
                            <div>
                                <span className="zapisites">Введите </span>
                                <span className="na-priem"> код подтверждения</span>
                            </div>
                            <div className="divider" style={{marginTop:'20px'}}></div>
                        </div>
                        <CodeEnter 
                            onSubmit={handleCodeSubmit}
                            error={verificationError}
                        />
                    </>
                );
            case 4:
                return (
                    <>
                        <div className="header-text" style={{marginBottom:'0px', marginTop:'20px'}}>
                            <div>
                                <span className="zapisites">Спасибо </span>
                            </div>
                            <div className="divider" style={{marginTop:'20px'}}></div>
                        </div>
                        <Congratulations name={{first_name: formData.firstName, patronymic: formData.middleName}}/>
                    </>
                );
            default:
                return null;
        }
    };

    const renderButtons = () => {
        switch(step) {
            case 1:
                return (
                    <>
                        <Button 
                            sx={buttonStyle} 
                            onClick={handleNext}
                            disabled={!isPhoneValid}
                        >
                            ЗАРЕГИСТРИРОВАТЬСЯ
                            <img src={arrow} alt='далее' />
                        </Button>
                        <Button 
                            sx={{ 
                                ...buttonStyle, 
                                backgroundColor: 'white', 
                                border: '1px solid #0077FF', 
                                color: '#0077FF',
                                width: '350px'
                            }}
                            onClick={()=>{navigate('/client')}}
                        >
                            Вернуться на главную
                        </Button>
                    </>
                );
            case 2:
                return (
                    <>
                        <Button 
                            sx={buttonStyle} 
                            onClick={handleNext}
                            disabled={!formData.isValid}
                        >
                            ЗАРЕГИСТРИРОВАТЬСЯ
                            <img src={arrow} alt='далее' />
                        </Button>
                        <Button 
                            sx={{ 
                                ...buttonStyle, 
                                backgroundColor: 'white', 
                                border: '1px solid #0077FF', 
                                color: '#0077FF' 
                            }}
                            onClick={handleBack}
                        >
                            <img src={arrowRight} alt='назад' />
                            НАЗАД
                        </Button>
                    </>
                );
            case 3:
                return (
                    <>
                        <Button 
                            sx={buttonStyle} 
                            onClick={handleNext}
                            disabled={!formData.code || isVerifying}
                        >
                            {isVerifying ? 'ПОДТВЕРЖДАЕМ...' : 'ЗАРЕГИСТРИРОВАТЬСЯ'}
                            {!isVerifying && <img src={arrow} alt='далее' />}
                        </Button>
                        <Button 
                            sx={{ 
                                ...buttonStyle, 
                                backgroundColor: 'white', 
                                border: '1px solid #0077FF', 
                                color: '#0077FF' 
                            }}
                            onClick={handleBack}
                        >
                            <img src={arrowRight} alt='назад' />
                            НАЗАД
                        </Button>
                    </>
                );
            case 4:
                return (
                    <Button 
                        sx={buttonStyle} 
                        onClick={handleNext}
                    >
                        ПЕРЕЙТИ НА ГЛАВНУЮ
                        <img src={arrow} alt='далее' />
                    </Button>
                );
            default:
                return null;
        }
    };

    return (
        <Box
            sx={{
                width: '50vh',
                maxWidth: 800,
                margin: '0 auto',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#fff',
                overflowY: 'auto',
            }}
        >
            <Box sx={{ flexShrink: 0 }}>
                <Header/>
            </Box>

            <Box
                component="main"
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0 16px',
                    overflow: 'visible',
                }}
            >
                {renderStepContent()}
                
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="divider" style={{ marginTop: "0px" }}></div>
                </Box>

                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    mt: step === 2 ? 5 : 15,
                    gap: 2, 
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}>
                    {renderButtons()}
                </Box>
            </Box>

            <Box sx={{ 
                flexShrink: 0,
                padding: '0 16px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
            }}>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '10px',
                }}>
                    <button className="round-button" onClick={() => window.open('https://t.me/denta_rell', '_blank')}></button>
                    <button className="round-button" onClick={() => window.open('https://api.whatsapp.com/send/?phone=79178585217&text=Здравствуйте!%0A%0AПишу+из+приложения.%0A%0A&type=phone_number&app_absent=0', '_blank')}></button>
                    <button className="write-button">НАПИСАТЬ</button>
                </Box>
            </Box>

            <Snackbar
                open={codeError}
                autoHideDuration={6000}
                onClose={() => setCodeError(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert 
                    severity="error" 
                    onClose={() => setCodeError(false)}
                    sx={{ width: '100%' }}
                >
                    Неверный код подтверждения. Пожалуйста, проверьте код и попробуйте снова.
                </Alert>
            </Snackbar>

            <Snackbar
                open={!!clientCreationError}
                autoHideDuration={6000}
                onClose={() => setClientCreationError('')}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert 
                    severity="error" 
                    onClose={() => setClientCreationError('')}
                    sx={{ width: '100%' }}
                >
                    {clientCreationError}
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