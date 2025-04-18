import { ThemeProvider } from "@emotion/react";
import { Box, createTheme, CssBaseline, useMediaQuery } from "@mui/material";
import DoctorChat from "./DoctorChat";

export default function Chat(){
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
            flex: 1 
        }}
        >

            <DoctorChat />

        </Box>

        </>
    )
}