import { useState } from "react";
import BurgerMenu from "./burgerMenu/burgerMenu";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    
    const switchText = () => {
        let path = window.location.pathname;
        if(path.startsWith('/admin')){
            return 'Панель администратора';
        }else if(path.startsWith('/client')){
            return 'Онлайн запись';
        }
        return ''; 
    }

    return (
        <>
            <header className="header">
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
                <div className="headWrap">
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