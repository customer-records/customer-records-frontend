import { ThemeProvider } from "@emotion/react";
import { Box, createTheme, CssBaseline, useMediaQuery } from "@mui/material";
import DoctorChat from "./DoctorChat";
import Header from "../header";
import { useNavigate } from "react-router-dom";
export default function Chat(){
    const navigate = useNavigate()
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

    return(
        <>
        <Box
        sx={{
            width: isDesktop ? '50vh' : '100vw',
            maxWidth: 800,
            margin: '0 auto',
            boxSizing: 'border-box',
            background:'white',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            gap:'20px',
            height: '100dvh',
            overflowY: 'auto', 
            paddingBottom: 'env(safe-area-inset-bottom)' // для устройств с "вырезом"
        }}
        >
            <Header/>
            <div className="header-text" style={{marginTop:'20px'}}>
                <div>
                    <span className="zapisites">У вас  </span>
                    <span className="na-priem"> вопрос?</span>
                </div>
                <div className="divider" style={{marginTop:'20px'}}></div>
            </div>
            <DoctorChat />
            <div className="divider" style={{marginTop:'20px'}}></div>
            <Box sx={{width:'100%', display:'flex', justifyContent:'center', pb:2.5}}>
            <button className="login-button" onClick={()=>navigate('./login')}>Войти в личный кабинет</button>
            </Box>
        </Box>

        </>
    )
}