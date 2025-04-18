import { Button } from "@mui/material";

export default function ButtonMap({img,name}:any){
return (
    <>
    <Button                
    sx={{ 
        ...buttonStyle,  
        border: '1px solid #0077FF', 
        color: '#FFFFFF',
        fontWeight:'700',
        fontSize:'14px',
        textWrap:'nowrap'
    }}>
        <img loading="eager" fetchPriority="high" src={img} alt='назад'></img>
        {name}
    </Button>
    </>
)
}
const buttonStyle = {
    width: 227,
    height: 40,
    borderRadius: '20px',
    gap: '7px',
    borderWidth: '2px',
    backgroundColor: '#0077FF',
    color: 'white',
    textTransform: 'uppercase',
    fontFamily: 'Roboto',
    fontWeight: 700,
    lineHeight: '32px',
};