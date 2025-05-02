import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
export default function CartStocks({head, description, img}:any){
    return(
        <Box sx={{
            backgroundColor:'#fdeee8',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            width:'90%',
            height:'70%',
            padding:'20px 10px'
        }}>
          <Box sx={{display:'flex',flexDirection:'column', gap:'30px'}}>
            <Typography sx={{
                ontFamily: 'Roboto',
                color:'#1a2c3d',
                fontWeight:'700',
                textTransform:'uppercase'
            }}>
                {head}
            </Typography>
           <ul style={{width:'70%', paddingLeft:'20px'}}>
                {description.map((elem:string)=><li style={{
                    fontFamily: 'Roboto',
                    color:'#1a2c3d', 
                    fontSize:'13px',
                    fontWeight:'600'
                }}>{elem}</li>)}
           </ul>
          </Box>
          <Box sx={{
            display:'flex',
            justifyContent:'space-between', 
            alignItems:'center',
            padding:'10px 10px'
            }}>
            <Link
            to={'/client'}
            style={{
                color:'black',
                textDecoration:'underline',
                fontFamily:'Roboto',
                fontSize:'15px',
                fontWeight:'600'
            }}
            >
                ЗАПИСАТЬСЯ НА ПРИЕМ
            </Link>
            <img style={{width:'20%'}} src={img}></img>
          </Box>
        </Box>
    )
}