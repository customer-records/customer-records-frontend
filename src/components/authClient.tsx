import { useState } from 'react';
import { Box, Button, Snackbar, Alert, createTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import arrow from '../assets/arrow.svg';
import arrowRight from '../assets/arrow-right.svg';
import PhoneEnter from './UI/clientRegAuth/phoneEnter';
import CodeEnter from './UI/clientRegAuth/codeEnter';
import Congratulations from './UI/clientRegAuth/congratulations';
import Header from './UI/header';
const apiUrl = import.meta.env.VITE_API_URL;
export default function AuthClient() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState('+7 ');
    const [code, setCode] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationError, setVerificationError] = useState('');
    const [clientNotFoundError, setClientNotFoundError] = useState(false);
    const [codeError, setCodeError] = useState(false);
    const [codeType, setCodeType] = useState('WA')
    const [useData, setUserData] = useState({name: null, sur_name: null, last_name: null})
    const totalSteps = 3;
    const theme = createTheme({
      breakpoints: {
        values: {
          xs: 0,
          sm: 300,  
          md: 500,   
          lg: 1200,
          xl: 1600,
        },
        },
    });
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const checkClientExists = async (phoneNumber: string) => {
        try {
            const response = await fetch(`${apiUrl}/auth/client/find-by-phone/+${phoneNumber}`);
            
            if (!response.ok) {
                if (response.status === 404) {
                    setClientNotFoundError(true);
                    return false;
                }
                throw new Error('Ошибка при проверке клиента');
            }
            ////записать данные существующего клиента для congratulations компонента  
            let data = await response.json()
            const {name, sur_name, last_name} = data.client
            setUserData({name, sur_name, last_name})
            return true;
        } catch (error) {
            console.error('Ошибка проверки клиента:', error);
            setClientNotFoundError(true);
            return false;
        }
    };

    const verifyCodeAndProceedTG = async () => {
        setIsVerifying(true);
        setVerificationError('');
        setCodeError(false);
        
        try {
            const verifyResponse = await fetch(`${apiUrl}/telegram/verify-code/${code.code}`);

            if (!verifyResponse.ok) {
                if (verifyResponse.status === 404) {
                    setCodeError(true);
                    throw new Error('Неверный код подтверждения');
                }
                const error = await verifyResponse.json();
                throw new Error(error.detail || 'Ошибка проверки кода');
            }

            const { phone: verifiedPhone, status } = await verifyResponse.json();
            console.log('+'+verifiedPhone.replace(/ /g, ''), phone.replace(/ /g, ''))
            if (status === 'success' && '+'+verifiedPhone.replace(/ /g, '') === phone.replace(/ /g, '')) {
                const clearResponse = await fetch(`${apiUrl}/telegram/clear-code/${code.code}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!clearResponse.ok) {
                    throw new Error('Ошибка при очистке кода');
                }

                setStep(3);
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
    const verifyCodeAndProceedWA = async () => {
        setIsVerifying(true);
        setVerificationError('');
        setCodeError(false);
        
        try {
            const verifyResponse = await fetch(`${apiUrl}/whatsapp/verify-code/${code.code}`);

            if (!verifyResponse.ok) {
                if (verifyResponse.status === 404) {
                    setCodeError(true);
                    throw new Error('Неверный код подтверждения');
                }
                const error = await verifyResponse.json();
                throw new Error(error.detail || 'Ошибка проверки кода');
            }
            const { phone, status } = await verifyResponse.json();

            if (status === 'success' && phone.replace(/ /g, '') === phone.replace(/ /g, '').replace(/\D/g, '')) {
                const clearResponse = await fetch(`${apiUrl}/whatsapp/clear-code/${code.code}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!clearResponse.ok) {
                    throw new Error('Ошибка при очистке кода');
                }
                setStep(3);
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
    const handleNext = async () => {
        if (step < totalSteps) {
            if (step === 1 && isPhoneValid) {
                const clientExists = await checkClientExists(phone.replace(/\D/g, ''));
                if(codeType == 'TG' && clientExists){
                let res = await fetch(`${apiUrl}/telegram/send_code/client/+${phone.replace(/\D/g, '')}`, {
                    method: 'POST' 
                })
                }
                else if(codeType == 'WA' && clientExists){
                    const cleanPhone = phone.replace(/\s+/g, '').replace(/\D/g, '');
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
                if (!clientExists) return;
                setStep(2);
            } else if (step === 2) {
                if(codeType == 'TG') await verifyCodeAndProceedTG();
                else if(codeType == 'WA') await verifyCodeAndProceedWA();
            } else {
                setStep(step + 1);
            }
        } else {
            navigate('/');
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            navigate('/');
        }
    };

    const handleRegister = () => {
        navigate('/client/registration');
    };

    const handlePhoneSubmit = (data: { phone: string, isValid: boolean, type: string }) => {
        setPhone(data.phone);
        setIsPhoneValid(data.isValid);
        setClientNotFoundError(false);
        setCodeType(data.type)
        console.log(data)
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
                            <div className="divider" style={{marginTop:'20px', marginBottom:'10px'}}></div>
                        </div>
                        <PhoneEnter phone={phone} onSubmit={handlePhoneSubmit}/>
                    </>    
                )
            case 2:
                return (
                    <>
                        <div className="header-text" style={{marginTop:'20px'}}>
                            <div>
                                <span className="zapisites">Введите </span>
                                <span className="na-priem"> код подтверждения</span>
                            </div>
                            <div className="divider" style={{marginTop:'20px', marginBottom:'10px' }}></div>
                        </div>
                        <CodeEnter onSubmit={(code: string) => setCode(code)} error={verificationError} type={codeType}/>
                    </>
                )
            case 3:
                return (
                    <>
                        <div className="header-text" style={{marginTop:'20px'}}>
                            <div>
                                <span className="zapisites">Спасибо </span>
                            </div>
                            <div className="divider" style={{marginTop:'20px'}}></div>
                        </div>
                        <Congratulations name={{first_name:useData.name,surname:useData.last_name, patronymic:useData.sur_name}}/>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Box
            sx={{
                width: isDesktop ? '50dvh' : '100vw',
                maxWidth: 800,
                margin: '0 auto',
                minHeight: '100dvh',
                height:'auto',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#FFFFFF', 
                
            }}
        >
            <Header/>

            <Box
                component="section"
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0 16px',
                    position: 'relative',
                    justifyContent:'center',
                    backgroundColor: '#ffff'
                }}
            >
                {renderStepContent()}
                <div style={{display:'flex',justifyContent:'center'}}>
                    <div className="divider" style={{ marginTop: "0px" }}></div>
                </div>

                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    mt: 15,
                    gap: 2, 
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '20px',
                }}>
                    {step !== 3 ? (
                        <>
                            <Button 
                                sx={buttonStyle} 
                                onClick={handleNext}
                                disabled={
                                    (step === 1 && !isPhoneValid) || 
                                    (step === 2 && (!code || isVerifying))
                                }
                            >
                                {isVerifying ? 'ПРОВЕРКА...' : (step === 1 ? 'ВОЙТИ' : 'ДАЛЕЕ')}
                                {!isVerifying && <img  loading="eager" fetchPriority="high" src={arrow} alt='далее' />}
                            </Button>

                            {step === 1 ? (
                                <Button 
                                    sx={{ 
                                        ...buttonStyle, 
                                        backgroundColor: 'white', 
                                        border: '1px solid #0077FF', 
                                        color: '#0077FF',
                                        width: '350px'
                                    }}
                                    onClick={handleRegister}
                                >
                                    ЗАРЕГИСТРИРОВАТЬСЯ
                                </Button>
                            ) : (
                                <Button 
                                    sx={{ 
                                        ...buttonStyle, 
                                        backgroundColor: 'white', 
                                        border: '1px solid #0077FF', 
                                        color: '#0077FF' 
                                    }}
                                    onClick={handleBack}
                                >
                                    <img loading="eager" fetchPriority="high" src={arrowRight} alt='назад' />
                                    НАЗАД
                                </Button>
                            )}
                        </>
                    ) : (
                        <Button 
                            sx={buttonStyle} 
                            onClick={handleNext}
                        >
                            перейти на главную
                            <img loading="eager" fetchPriority="high" src={arrow} alt='далее' />
                        </Button>
                    )}
                </Box>
            </Box>

            <Box sx={{
                padding: '0 16px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                background:'#FFFFFF'
            }}>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '10px',
                }}>
                    <button className="round-button" onClick={() => window.open('https://t.me/denta_rell', '_blank')}></button>
                    <button className="round-button" onClick={() => window.open('https://api.whatsapp.com/send/?phone=79178585217&text=Здравствуйте!%0A%0AПишу+из+приложения.%0A%0A&type=phone_number&app_absent=0', '_blank')}></button>
                    <button className="write-button" disabled={true} onClick={() => navigate('/client/chat')}>НАПИСАТЬ</button>
                </Box>
            </Box>

            <Snackbar
                open={clientNotFoundError}
                autoHideDuration={6000}
                onClose={() => setClientNotFoundError(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert 
                    severity="error" 
                    onClose={() => setClientNotFoundError(false)}
                    sx={{ width: '100%' }}
                >
                    Клиент с таким номером телефона не найден. Пожалуйста, зарегистрируйтесь.
                </Alert>
            </Snackbar>

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
    },
    [`@media (max-width: 360px)`]: {
        width: 300,
        height: 50,
        borderRadius: '25px'
      }
};