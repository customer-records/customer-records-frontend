import { Box, Link } from '@mui/material';
export default function TelegramRedir() {
    return (
        <>
        <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '16px', 
        justifyContent: 'center',
        width: '100%', 
        alignItems: 'center',
        height: '20vh'
        }}>
        <Box sx={{
            fontFamily: 'Roboto',
            fontWeight: 700,
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0%',
            marginBottom: '14px',
            textAlign:'center',
            color:'#000000'
        }}>   
        Перейдите по ссылке чтобы получить код для авторизации:
        </Box>
        <Link
            href="https://t.me/technica1lbot?start=activate"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover" 
            color="inherit"   
            sx={{
                fontFamily: 'Roboto',
                fontWeight: 700,
                color:'#0077FF',
                fontSize: '24px', 
                textTransform:'uppercase',
            }}
        >
            T.me/.....
        </Link>
        </Box>
        </>
    ) 
}