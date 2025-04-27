import { Box, TextField } from '@mui/material';
export default function Congratulations({name}:any){
    return (
        <>
        <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '16px', 
        justifyContent: 'center',
        width: '100%', 
        alignItems: 'center',
        height: '20dvh'
        }}>
        <Box sx={{
            fontFamily: 'Roboto',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0%',
            marginBottom: '24px',
            textAlign:'center',
            color:'#000000',
            p:1
        }}>   
        Уважаемый <span style={{fontWeight:'700'}}>{name.first_name} {name.patronymic}</span>  теперь для Вас доступен персональный доктор,
         а также доступ в Личный кабинет
        </Box>
        </Box>
        </>
    )
}