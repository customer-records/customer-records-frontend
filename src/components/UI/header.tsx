import { useEffect, useState } from "react";
import BurgerMenu from "./burgerMenu/burgerMenu";
import home from '../../assets/home.svg'
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function Header() {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const [display, SetDisplay] = useState('flex')
    const [height, SetHeight] = useState('30dvh')
    const [MinHeight, SetMinHeight] = useState('25dvh')
    const [jusContent, SetJusContent] = useState('space-between')
    const switchText = () => {
        let path = window.location.pathname;
        if (path.startsWith('/admin')) {
            return 'Панель администратора';
        } else if (path.startsWith('/client')) {
            return 'Онлайн запись';
        }
        return '';
    }
    useEffect(() => {
        let path = window.location.pathname;
        if (path !== '/client' && path !== '/client/') {
            SetDisplay('none')
            SetHeight('auto')
            SetMinHeight('100px')
            SetJusContent('center')
        } else {
            SetDisplay('flex')
            SetHeight('30dvh')
            SetMinHeight('25dvh')
            SetJusContent('space-between')
        }
    }, [])
    const handleHome = () => {
        let path = window.location.pathname;
        console.log(path)
        if (path !== '/client') navigate('/client')
    }
    return (
        <>
            <header style={{ height: height, minHeight: MinHeight, justifyContent: jusContent }} className="header">
                <div className="header-background"></div>
                <div className="header-top">
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={handleHome} className="home">
                            <img src={home}></img>
                        </button>
                        <button
                            disabled={true}
                            className="online-booking-button"
                            style={{
                                outline: 'none',
                                border: 'none',
                                boxShadow: 'none'
                            }}>{switchText()}
                        </button>
                    </div>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="burger-menu-button"
                    >
                        <div className="burger-icon">
                            <div></div>
                        </div>
                    </button>
                </div>
                <div className="headWrap" style={{ display: display }}>
                    <div className="header-bottom">
                        <h1 className="service-name">Стоматология</h1>
                        <p className="company-name">Доктор М</p>
                    </div>
                    <div className="roundLogo"></div>
                </div>
            </header>

            {isOpen && <BurgerMenu onClose={() => setIsOpen(false)} />}
        </>
    );
}