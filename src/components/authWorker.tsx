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
export default function AuthWorker() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState('+7 ');
    const [code, setCode] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationError, setVerificationError] = useState('');
    const [codeError, setCodeError] = useState(false);
    const [userData, setUserData] = useState<any>(null);
    const [loginError, setLoginError] = useState(false);
    const [clientNotFoundError, setClientNotFoundError] = useState(false);
    const [codeType, setCodeType] = useState('WA')
    const totalSteps = 3;
            const theme = createTheme({
                breakpoints: {
                    values: {
                      xs: 0,
                      sm: 300,  
                      md: 450,   
                      lg: 1200,
                      xl: 1600,
                },
                },
            });
            const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    const loginUser = async () => {
        try {
            const response = await fetch(`${apiUrl}/auth/worker/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone_number: phone.replace(/\D/g, '')
                })
            });

            if (!response.ok) {
                throw new Error('Ошибка авторизации');
            }

            const data = await response.json();
            return data.user;
        } catch (error) {
            console.error('Ошибка авторизации:', error);
            setLoginError(true);
            throw error;
        }
    };
    const checkClientExists = async (phoneNumber: string) => {
        try {
            const response = await fetch(`${apiUrl}/auth/user/find-by-phone/+${phoneNumber}`);
            console.log(response)
            if (!response.ok) {
                if (response.status === 404) {
                    setClientNotFoundError(true);
                    return false;
                }
                throw new Error('Ошибка при проверке клиента');
            }
            
            return true;
        } catch (error) {
            console.error('Ошибка проверки клиента:', error);
            setClientNotFoundError(true);
            return false;
        }
    };
    const verifyCodeAndProceedTg = async () => {
        setIsVerifying(true);
        setVerificationError('');
        setCodeError(false);
        setLoginError(false);
        
        try {
            // Проверка кода
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
            
            if (status === 'success' && '+'+verifiedPhone.replace(/ /g, '') === phone.replace(/ /g, '')) {
                // Очистка кода
                const clearResponse = await fetch(`${apiUrl}/telegram/clear-code/${code.code}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!clearResponse.ok) {
                    throw new Error('Ошибка при очистке кода');
                }

                //  Авторизация пользователя
                console.log(phone.replace(/\D/g, ''))
                const user = await loginUser();
                setUserData(user);
                setStep(3);
            } else {
                throw new Error('Номер телефона не совпадает');
            }
        } catch (error) {
            console.error('Ошибка:', error);
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
                const user = await loginUser();
                setUserData(user);
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
            if (step === 1) {
                const clientExists = await checkClientExists(phone.replace(/\D/g, ''));
                if (!clientExists && codeType == 'WA') return;
                if(codeType == 'TG' && clientExists){
                    let res = await fetch(`${apiUrl}/telegram/send_code/user/+${phone.replace(/\D/g, '')}`, {
                    method: 'POST'  
                    });
                    console.log(res)
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
                setStep(2);
            } else if (step === 2) {
                if(codeType == 'TG')await verifyCodeAndProceedTg();
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
        navigate('/admin/registration');
    };

    const handlePhoneSubmit = (data: { phone: string, isValid: boolean, type: string  }) => {
        setPhone(data.phone);
        setCodeType(data.type);
        console.log(data);
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
                            <div className="divider" style={{marginTop:'20px'}}></div>
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
                        <Congratulations name={{
                            first_name: userData?.name ,
                            surname: userData?.last_name ,
                            patronymic: userData?.sur_name 
                        }}/>
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
                height:'100dvh',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#FFFFFF', 
            }}
        >
            <Box sx={{ flexShrink: 0 }}>
                <Header/>
            </Box>

            <Box
                component="section"
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0 16px',
                    position: 'relative',
                    justifyContent:'center'
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
                                    (step === 1 && !phone) || 
                                    (step === 2 && (!code || isVerifying))
                                }
                            >
                                {isVerifying ? 'ПРОВЕРКА...' : (step === 1 ? 'ВОЙТИ' : 'ДАЛЕЕ')}
                                {!isVerifying && <img loading="eager" fetchPriority="high" src={arrow} alt='далее' />}
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
                            перейти в панель
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
                background:'#FFFFFF',
            }}>
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: '10px',
                }}>
                    <button className="round-button" onClick={() => window.open('https://t.me/denta_rell', '_blank')}></button>
                    <button className="round-button" onClick={() => window.open('https://api.whatsapp.com/send/?phone=79178585217&text=Здравствуйте!%0A%0AПишу+из+приложения.%0A%0A&type=phone_number&app_absent=0', '_blank')}></button>
                    <button className="write-button" disabled={true} onClick={()=>navigate('/client/chat')}>НАПИСАТЬ</button>
                </Box>
            </Box>

            <Snackbar
                open={codeError || loginError}
                autoHideDuration={6000}
                onClose={() => {
                    setCodeError(false);
                    setLoginError(false);
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert 
                    severity="error" 
                    onClose={() => {
                        setCodeError(false);
                        setLoginError(false);
                    }}
                    sx={{ width: '100%' }}
                >
                    {loginError 
                        ? 'Ошибка авторизации. Пожалуйста, попробуйте позже.' 
                        : 'Неверный код подтверждения. Пожалуйста, проверьте код и попробуйте снова.'}
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