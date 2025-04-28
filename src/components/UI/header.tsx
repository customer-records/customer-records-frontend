import { useEffect, useState } from "react";
import BurgerMenu from "./burgerMenu/burgerMenu";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [display, SetDisplay] = useState('flex')
    const [height, SetHeight] = useState('30dvh')
    const [MinHeight, SetMinHeight] = useState('25dvh')
    const [jusContent, SetJusContent] = useState('space-between')
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
            SetHeight('auto')
            SetMinHeight('100px')
            SetJusContent('center')
        }else{
            SetDisplay('flex')
            SetHeight('30dvh')
            SetMinHeight('25dvh')
            SetJusContent('space-between')
        }
        fetch('http://localhost:5000/send-appointment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              client_name: "Иван Петров",
              phone: "+79123456789",
              appointment_time: "2023-12-25 14:00"
            })
          })
          .then(res => res.json())
          .then(data => console.log(data))
          .catch(err => console.error('Error:', err));
    },[])
    return (
        <>
            <header style={{height:height, minHeight:MinHeight, justifyContent: jusContent}} className="header">
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