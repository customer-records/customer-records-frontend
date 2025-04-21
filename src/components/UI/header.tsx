import { useEffect, useState } from "react";
import BurgerMenu from "./burgerMenu/burgerMenu";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [display, SetDisplay] = useState('flex')
    const [height, SetHeight] = useState('30vh')
    const [MinHeight, SetMinHeight] = useState('25vh')
    const switchText = () => {
        let path = window.location.pathname;
        if(path.startsWith('/admin')){
            return 'Панель администратора';
        }else if(path.startsWith('/client')){
            return 'Онлайн запись';
        }
        return ''; 
    }
    useEffect(()=>{
        let path = window.location.pathname;
        if(path !== '/client' && path !== '/client/') {
            SetDisplay('none')
            SetHeight('10vh')
            SetMinHeight('13vh')
        }else{
            SetDisplay('flex')
            SetHeight('30vh')
            SetMinHeight('25vh')
        }
    },[])
    return (
        <>
            <header style={{height:height, minHeight:MinHeight}} className="header">
                <div className="header-background"></div>
                <div className="header-top">
                    <button 
                    disabled={true} 
                    className="online-booking-button"
                    style={{  
                        outline: 'none',
                        border: 'none',
                        boxShadow: 'none'
                        }}>{switchText()}</button>
                    <button 
                        onClick={() => setIsOpen(true)} 
                        className="burger-menu-button"
                    >
                        <div className="burger-icon">
                            <div></div>
                        </div>
                    </button>
                </div>
                <div className="headWrap" style={{display:display}}>
                    <div className="header-bottom">
                        <h1 className="service-name">Стоматология</h1>
                        <p className="company-name">Denta - rell</p>
                    </div>
                    <div className="roundLogo"></div>
                </div>
            </header>

            {isOpen && <BurgerMenu onClose={()=>setIsOpen(false)} />}
        </>
    );
}