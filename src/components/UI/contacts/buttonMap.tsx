import { Button } from "@mui/material";

export default function ButtonMap({ img, name, type }: any) {
    const handleClick = (type: string) => {
        if (type == 'YA') window.open('https://yandex.ru/maps/org/doktor_m/1335410661/?ll=49.154084%2C55.824219&z=15', '_blank', 'noopener,noreferrer');
        else window.open('https://2gis.ru/kazan/firm/70000001029827693', '_blank', 'noopener,noreferrer');
    }
    return (
        <>
            <Button
                sx={{
                    ...buttonStyle,
                    border: '1px solid #0077FF',
                    color: '#FFFFFF',
                    fontWeight: '700',
                    fontSize: '14px',
                    textWrap: 'nowrap'
                }}
                onClick={() => handleClick(type)}
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
    backgroundColor: '#0077FF',
    color: 'white',
    textTransform: 'uppercase',
    fontFamily: 'Roboto',
    fontWeight: 700,
    lineHeight: '32px',
};