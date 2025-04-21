import { useState } from 'react';
import { Box, Button, Snackbar, Alert, createTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import arrow from '../assets/arrow.svg';
import arrowRight from '../assets/arrow-right.svg';
import PhoneEnter from './UI/clientRegAuth/phoneEnter';
import CodeEnter from './UI/clientRegAuth/codeEnter';
import ClientData from './UI/clientRegAuth/clientData';
import Congratulations from './UI/clientRegAuth/congratulations';
import Header from './UI/header';
import SpecPicker from './UI/adminRegAuth/specPicker';
import '../components/client.css'
import TelegramRedir from './UI/clientRegAuth/telegramRedir';
const apiUrl = import.meta.env.VITE_API_URL;

export default function RegistrationWorker() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [phoneState, setPhone] = useState('+7 ');
    const [code, setCode] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [clientData, setClientData] = useState<any>(null);
    const [isFormValid, setIsFormValid] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [verificationError, setVerificationError] = useState('');
    const [codeError, setCodeError] = useState(false);
    const [registrationError, setRegistrationError] = useState(false);
    const [clientTG, setClientTG] = useState<any>(null);
    const [codeType, setCodeType] = useState('WA')
    const totalSteps = codeType== 'WA' ? 5 : 6;
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
    const registerUser = async (username?:string,chatId?:number) => {
        console.log({
            name: clientData.firstName,
            last_name: clientData.lastName,
            sur_name: clientData.middleName,
            phone_number: phoneState.replace(/\D/g, ''),
            chat_id: chatId || null,
            tg_name: username || null
        })
        try {
            const response = await fetch(`${apiUrl}/auth/worker/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: clientData.firstName,
                    last_name: clientData.lastName,
                    sur_name: clientData.middleName,
                    phone_number: phoneState.replace(/\D/g, ''),
                    chat_id: chatId || null,
                    tg_name: username || null
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Ошибка регистрации');
            }

            return await response.json();
        } catch (error) {
            console.error('Ошибка регистрации:', error);
            setRegistrationError(true);
            throw error;
        }
    };

    const verifyCodeAndProceedTg = async () => {
        setIsVerifying(true);
        setVerificationError('');
        setCodeError(false);
        setRegistrationError(false);
        
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
            const { phone, username, chat_id, status } = await verifyResponse.json();
            console.log(phone, username, chat_id, status )
            console.log(phone, phoneState.replace(/ /g, ''))
            if (status === 'success' && phone === phoneState.replace(/ /g, '')) {
                const clearResponse = await fetch(`${apiUrl}/telegram/clear-code/${code.code}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!clearResponse.ok) {
                    throw new Error('Ошибка при очистке кода');
                }
                setClientTG({username:username, chat_id:chat_id})
                setStep(5);
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
        ///функция отправки кода в WA
    const verifyCodeAndProceedWa = async () => {
            setIsVerifying(true);
            setVerificationError('');
            setCodeError(false);
            setRegistrationError(false);
            
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
                const { phone, username, chat_id, status } = await verifyResponse.json();
                console.log(phone, username, chat_id, status)
                if (status === 'success' && phone.replace(/ /g, '') === phoneState.replace(/ /g, '').replace(/\D/g, '')) {
                    const clearResponse = await fetch(`${apiUrl}/whatsapp/clear-code/${code.code}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
    
                    if (!clearResponse.ok) {
                        throw new Error('Ошибка при очистке кода');
                    }
                    else{
                        setStep(5);
                    }
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
            if(step === 1){
                if(codeType == 'WA') {
                    const cleanPhone = phoneState.replace(/\s+/g, '').replace(/\D/g, '');
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
                }else setStep(step + 1);
            }
            if(step === 2){
                if(codeType == 'WA'){
                    const codeResponse = await verifyCodeAndProceedWa();
                    console.log(codeResponse)
                }else setStep(step + 1);
            }
            if (step === 3) {
                if(codeType == 'TG') await verifyCodeAndProceedTg();
                setStep(4);
            } else if (step === 4) {
                if(codeType == 'TG'){
                    setStep(step + 1);
                }
                if(codeType == 'WA'){
                    let regAnswer = await registerUser();
                    console.log(regAnswer)
                    setStep(step + 1);
                }
            }else if(step === 5 && codeType == 'TG'){
                let regAnswer = await registerUser(clientTG.username, clientTG.chat_id);
                console.log(regAnswer)
                if(regAnswer.status == 'success')setStep(step + 1);
            }else setStep(step + 1);
        } else {
            navigate('/admin');
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            navigate('/');
        }
    };

    const handlePhoneSubmit = (data: { phone: string, isValid: boolean, type: string }) => {
        setPhone(data.phone);
        setIsPhoneValid(data.isValid);
        setCodeType(data.type);
        console.log(data)
    };

    const handleClientDataSubmit = (data: any) => {
        setClientData(data);
        setIsFormValid(data.isValid);
    };

    const handleCodeSubmit = (code: string) => {
        setCode(code);
        setVerificationError('');
    };

    const renderStepContent = () => {
        if(codeType == 'WA'){
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
                            <PhoneEnter phone={phoneState} onSubmit={handlePhoneSubmit}/>
                        </>
                    );
                case 2:
                    return (
                        <>
                        <div className="header-text" style={{marginBottom:'0px', marginTop:'20px'}}>
                            <div>
                                <span className="zapisites">Введите </span>
                                <span className="na-priem"> код подтверждения</span>
                            </div>
                            <div className="divider" style={{marginTop:'20px'}}></div>
                        </div>
                        <CodeEnter onSubmit={handleCodeSubmit} error={verificationError} type={codeType}/>
                    </>
                    );
                case 3:
                    return (
                        <>
                        <div className="header-text" style={{marginBottom:'20px', marginTop:'20px'}}>
                            <div>
                                <span className="zapisites">Укажите </span>
                                <span className="na-priem"> данные</span>
                            </div>
                            <div className="divider" style={{marginTop:'20px'}}></div>
                        </div>
                        <ClientData onSubmit={handleClientDataSubmit}/>
                    </>

                    );    
                case 4:
                    return (
                        <>
                            <div className="header-text" style={{marginBottom:'0px', marginTop:'20px'}}>
                                <div>
                                    <span className="zapisites">Укажите </span>
                                    <span className="na-priem"> Специализацию</span>
                                </div>
                                <div className="divider" style={{marginTop:'20px'}}></div>
                            </div>
                            <SpecPicker />
                        </>
                    );
                case 5:
                    return (
                        <>
                            <div className="header-text" style={{marginBottom:'0px', marginTop:'20px'}}>
                                <div>
                                    <span className="zapisites">Спасибо </span>
                                </div>
                                <div className="divider" style={{marginTop:'20px'}}></div>
                            </div>
                            <Congratulations name={{first_name: clientData?.firstName, patronymic: clientData?.middleName}}/>
                        </>
                    );
                default:
                    return null;
            }
        }else{
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
                            <PhoneEnter phone={phoneState} onSubmit={handlePhoneSubmit}/>
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
                                <div className="divider" style={{marginTop:'20px', marginBottom:'10px'}}></div>
                            </div>
                            <TelegramRedir />
                        </>
                    )
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
                        <CodeEnter onSubmit={handleCodeSubmit} error={verificationError} type={codeType}/>
                    </>
                    );
                case 4:
                    return (
                        <>
                        <div className="header-text" style={{marginBottom:'20px', marginTop:'20px'}}>
                            <div>
                                <span className="zapisites">Укажите </span>
                                <span className="na-priem"> данные</span>
                            </div>
                            <div className="divider" style={{marginTop:'20px'}}></div>
                        </div>
                        <ClientData onSubmit={handleClientDataSubmit}/>
                    </>

                    );    
                case 5:
                    return (
                        <>
                            <div className="header-text" style={{marginBottom:'0px', marginTop:'20px'}}>
                                <div>
                                    <span className="zapisites">Укажите </span>
                                    <span className="na-priem"> Специализацию</span>
                                </div>
                                <div className="divider" style={{marginTop:'20px'}}></div>
                            </div>
                            <SpecPicker />
                        </>
                    );
                case 6:
                    return (
                        <>
                            <div className="header-text" style={{marginBottom:'0px', marginTop:'20px'}}>
                                <div>
                                    <span className="zapisites">Спасибо </span>
                                </div>
                                <div className="divider" style={{marginTop:'20px'}}></div>
                            </div>
                            <Congratulations name={{first_name: clientData?.firstName, patronymic: clientData?.middleName}}/>
                        </>
                    );
                default:
                    return null;
            }
        }
    };

    const renderButtons = () => {
        if(codeType == 'WA'){
            switch(step) {
                case 1:
                    return (
                        <>
                            <Button 
                                sx={buttonStyle} 
                                onClick={handleNext}
                                disabled={!isPhoneValid || phoneState.length < 12}
                            >
                                ЗАРЕГИСТРИРОВАТЬСЯ
                                <img loading="eager" fetchPriority="high" src={arrow} alt='далее' />
                            </Button>
                        </>
                    );
                case 2:
                    return (
                        <>
                            <Button 
                                sx={buttonStyle} 
                                onClick={handleNext}
                                disabled={!code || isVerifying}
                            >
                                {isVerifying ? 'ПРОВЕРКА...' : 'ДАЛЕЕ'}
                                {!isVerifying && <img loading="eager" fetchPriority="high" src={arrow} alt='далее' />}
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
                                <img loading="eager" fetchPriority="high" src={arrowRight} alt='назад' />
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
                                disabled={!isFormValid}
                            >
                                ЗАРЕГИСТРИРОВАТЬСЯ
                                <img loading="eager" fetchPriority="high" src={arrow} alt='далее' />
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
                                <img loading="eager" fetchPriority="high" src={arrowRight} alt='назад' />
                                НАЗАД
                            </Button>
                        </>
                    );
                case 4:
                    return (
                        <>
                            <Button 
                                sx={buttonStyle} 
                                onClick={handleNext}
                            >
                                ДАЛЕЕ
                                <img loading="eager" fetchPriority="high" src={arrow} alt='далее' />
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
                                <img loading="eager" fetchPriority="high" src={arrowRight} alt='назад' />
                                НАЗАД
                            </Button>
                        </>
                    );
                case 5:
                    return (
                        <Button 
                            sx={buttonStyle} 
                            onClick={handleNext}
                        >
                            ПЕРЕЙТИ НА ГЛАВНУЮ
                            <img loading="eager" fetchPriority="high" src={arrow} alt='далее' />
                        </Button>
                    );
                default:
                    return null;
            }
        }else{
                    switch(step) {
            case 1:
                return (
                    <>
                        <Button 
                            sx={buttonStyle} 
                            onClick={handleNext}
                            disabled={!isPhoneValid || phoneState.length < 12}
                        >
                            ЗАРЕГИСТРИРОВАТЬСЯ
                            <img loading="eager" fetchPriority="high" src={arrow} alt='далее' />
                        </Button>
                    </>
                );
            case 2:
                return (
                <>
                        <Button 
                            sx={buttonStyle} 
                            onClick={handleNext}
                            
                        >
                            {'ДАЛЕЕ'}
                            {<img loading="eager" fetchPriority="high" src={arrow} alt='далее' />}
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
                            <img loading="eager" fetchPriority="high" src={arrowRight} alt='назад' />
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
                            disabled={!code || isVerifying}
                        >
                            {isVerifying ? 'ПРОВЕРКА...' : 'ДАЛЕЕ'}
                            {!isVerifying && <img loading="eager" fetchPriority="high" src={arrow} alt='далее' />}
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
                            <img loading="eager" fetchPriority="high" src={arrowRight} alt='назад' />
                            НАЗАД
                        </Button>
                    </>
                );
                
            case 4:
                return (
                    <>
                        <Button 
                            sx={buttonStyle} 
                            onClick={handleNext}
                            disabled={!isFormValid}
                        >
                            ЗАРЕГИСТРИРОВАТЬСЯ
                            <img loading="eager" fetchPriority="high" src={arrow} alt='далее' />
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
                            <img loading="eager" fetchPriority="high" src={arrowRight} alt='назад' />
                            НАЗАД
                        </Button>
                    </>
                );
            case 5:
                return (
                    <>
                        <Button 
                            sx={buttonStyle} 
                            onClick={handleNext}
                        >
                            ДАЛЕЕ
                            <img loading="eager" fetchPriority="high" src={arrow} alt='далее' />
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
                            <img loading="eager" fetchPriority="high" src={arrowRight} alt='назад' />
                            НАЗАД
                        </Button>
                    </>
                );
            case 6:
                return (
                    <Button 
                        sx={buttonStyle} 
                        onClick={handleNext}
                    >
                        ПЕРЕЙТИ НА ГЛАВНУЮ
                        <img loading="eager" fetchPriority="high" src={arrow} alt='далее' />
                    </Button>
                );
            default:
                return null;
        }
        }

    };

    const getButtonMarginTop = () => {
        switch(step) {
            case 2: return 5;
            case 3: return 5;
            default: return 15;
        }
    };

    return (
        <Box
            sx={{
                width: isDesktop ? '50vh' : '100vw',
                maxWidth: 800,
                margin: '0 auto',
                minHeight: '100vh',
                height:'100vh',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#fff',
                overflowY: 'auto',
                background:'#FFFFFF'
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
                    mt: getButtonMarginTop(),
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
                    <button className="write-button" onClick={()=>navigate('/client/chat')}>НАПИСАТЬ</button>
                </Box>
            </Box>

            <Snackbar
                open={codeError || registrationError}
                autoHideDuration={6000}
                onClose={() => {
                    setCodeError(false);
                    setRegistrationError(false);
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert 
                    severity="error" 
                    onClose={() => {
                        setCodeError(false);
                        setRegistrationError(false);
                    }}
                    sx={{ width: '100%' }}
                >
                    {registrationError 
                        ? 'Ошибка регистрации. Пожалуйста, попробуйте позже.' 
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