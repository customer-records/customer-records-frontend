import { Button } from "@mui/material";

export default function ButtonMap({img,name, type}:any){
    const handleClick = (type:string) => {
        if(type == 'YA') window.open('https://yandex.ru/maps/org/denta_rell/1352511434/?ll=49.212080%2C55.753306&z=14', '_blank', 'noopener,noreferrer');
        else window.open('https://2gis.ru/kazan/search/дента%20рель%20/firm/2956015536907162/49.212087%2C55.753295?m=49.212065%2C55.753312%2F17.7', '_blank', 'noopener,noreferrer');
    }
return (
    <>
    <Button                
    sx={{ 
        ...buttonStyle,  
        border: '1px solid #9C07FF', 
        color: '#FFFFFF',
        fontWeight:'700',
        fontSize:'14px',
        textWrap:'nowrap'
    }}
    onClick={()=>handleClick(type)}
    >
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
    backgroundColor: '#9C07FF',
    color: 'white',
    textTransform: 'uppercase',
    fontFamily: 'Roboto',
    fontWeight: 700,
    lineHeight: '32px',
};