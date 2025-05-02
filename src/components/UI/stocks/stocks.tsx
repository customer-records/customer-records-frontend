import { Box, createTheme, useMediaQuery } from "@mui/material"
import Header from "../header";
import {Typography} from "@mui/material";
import CartStocks from './cartStocks'
import { useNavigate } from "react-router-dom"; 
import Accordion from "./accordion";
import { stockDescriptions } from "./data";
import { mockStocks } from "./data";

export default function Stocks (){
    const navigate = useNavigate()
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
    return (
        <>
        <Box 
        sx={{
            width: isDesktop ? '50dvh' : '100vw',
            maxWidth: 800,
            margin: '0 auto',
            boxSizing: 'border-box',
            background:'#FFFFFF',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            flex: 1 ,
        }}
        >   
            <Header />
            <Box sx={{
                backgroundColor:'#61617b',
                display:'flex',
                justifyContent:'center',
                padding:'40px 20px',
                borderRadius:'20px',
                mt:.5
            }}>
            <Box sx={{
                width:'80%'
            }}>
            <Typography sx={{
                fontFamily: 'Roboto',
                fontWeight: 700,
                fontSize: '27px',
                lineHeight: '100%',
                letterSpacing: '0%',
                mb: 3,
                textTransform:'uppercase'
            }}>
               Акции
            </Typography>
            <Typography
            sx={{
                fontFamily: 'Roboto',
                fontWeight:400,
                fontSize:'17px'
            }}  
            > 
                Специальные предложения для вашей улыбки:
                акции и скидки от Denta Rell
            </Typography>
            </Box>
            </Box>
            <Box 
            sx={{
                margin:'10px',
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'space-evenly',
                gap:'15px'
            }}
            >
            {
                mockStocks.map(
                (elem, indx)=>
                <>
                    <CartStocks 
                        key={elem.head + indx}
                        head={elem.head} 
                        description={elem.description} 
                        img={elem.img}
                    />
                    <Box sx={{
                        width:'90%'
                    }}>
                        <Typography sx={{
                            color:'black',
                            fontSize:'30px',
                            fontWeight:'700'
                            }}>ПОДРОБНОСТИ</Typography>
                        <Box sx={{
                            marginTop:'10px',
                            }}>
                            <Typography sx={{
                                color:'black',
                                fontWeight:'600',
                                fontSize:'14px',
                                marginBottom:'10px'
                            }}>
                                {stockDescriptions[indx].head}
                            </Typography>
                            <Typography sx={{
                                color:'black',
                                fontSize:'12px'
                            }}>
                                {stockDescriptions[indx].description}
                            </Typography>
                        </Box> 
                    </Box>
                    <Box sx={{
                        width:'90%'
                    }}>
                        {elem.accordion.head.map((element, indx)=>
                            <Accordion title={element}>
                                <ul style={{
                                    padding:'5px 20px'
                                }}>
                                    {elem.accordion.lists[indx].map((elem:any)=>
                                        <li style={{color:"black", fontWeight:'400', fontSize:'13px'}}>{elem}</li> 
                                    )}
                                </ul>
                            </Accordion>
                        )}
                    </Box>
                </>
                )
            }
            </Box>
            <Box sx={{
                width: '100%',
                padding: '20px 5%',
                marginTop: 'auto',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div className="divider" style={{marginTop: "0px"}}></div>
                <div className="buttons-block">
                    <button className="round-button" onClick={() => window.open('https://t.me/denta_rell', '_blank')}></button>
                    <button className="round-button" onClick={() => window.open('https://api.whatsapp.com/send/?phone=79178585217&text=Здравствуйте!%0A%0AПишу+из+приложения.%0A%0A&type=phone_number&app_absent=0', '_blank')}></button>
                    <button className="write-button" disabled={true} onClick={()=>navigate('/client/chat')}>НАПИСАТЬ</button>
                </div>
                <button className="login-button" disabled={true} onClick={() => navigate('/client/login')}>Войти в личный кабинет</button>
            </Box>
        </Box>
        </>
    )
}