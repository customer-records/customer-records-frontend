export default function Header (){
    const switchText = () => {
        let path = location.pathname
        if(path.startsWith('/admin')){
            return 'Панель администратора'
        }else if(path.startsWith('/client')){
            return 'Онлайн запись'
        }
    }
    return (
        <>
            <header className="header">
                <div className="header-background"></div>
                <div className="header-top">
                    <button className="online-booking-button">{switchText()}</button>
                    <button className="burger-menu-button">
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
                    <div className="roundLogo">
                    
                    </div>
                </div>
            </header>
        </>
    )
}