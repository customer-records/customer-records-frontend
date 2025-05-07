import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function CartStocks({ head, description, img }: any) {
  return (
    <Box sx={{
      backgroundColor: "#fdeee8",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "20px 10px",
      backgroundImage: `url('${img}')`,
      backgroundSize: "25% auto",
      backgroundPosition: "right bottom",
      backgroundRepeat: "no-repeat",
      width: '95%',
      minHeight: '300px',
      position: 'relative',
      boxSizing: 'border-box'
    }}>
      <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection:'column',

            height: '100%',
            gap: '1dvh',
      }}>
        <Typography sx={{
          fontFamily: 'Roboto',
          color: '#1a2c3d',
          fontWeight: '700',
          textTransform: 'uppercase',
          marginBottom: '20px'
        }}>
          {head}
        </Typography>
        
        <Box component="ul" sx={{
          paddingLeft: '20px',
          margin: 0,
          width: 'calc(75% - 10px)', 
          marginRight: '25%', 
          '& li': {
            fontFamily: 'Roboto',
            color: '#1a2c3d',
            fontSize: '13px',
            fontWeight: '500',
            marginBottom: '8px',
            lineHeight: 1.4
          }
        }}>
          {description.map((elem: string, index: number) => (
            <li key={index}>{elem}</li>
          ))}
        </Box>
      </Box>

      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '10px 10px 0 10px',
        width: '100%',
        marginTop: 'auto'
      }}>
        <Link
          to={'/client'}
          style={{
            color: 'black',
            textDecoration: 'underline',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: '500',
            paddingLeft: '10px'
          }}
        >
          ЗАПИСАТЬСЯ НА ПРИЕМ
        </Link>
      </Box>
    </Box>
  )
}