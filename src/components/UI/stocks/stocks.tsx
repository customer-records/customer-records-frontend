import { Box, createTheme, useMediaQuery } from "@mui/material"
import Header from "../header";
import {Typography} from "@mui/material";
import CartStocks from './cartStocks'
import { useNavigate } from "react-router-dom"; 
import Accordion from "./accordion";
const mockStocks = [
    {
        head:'Имплантат с установкой от 11 800 руб.',
        description:['Консультация специалиста и составление плана лечения',
            'Сам имплантат из биосовместимых материалов',
            'Установка имплантата с использованием современных методик'],
        img:'https://optim.tildacdn.com/tild3832-6331-4466-b837-636239313337/-/cover/210x321/center/center/-/format/webp/827ddfdc-0b1e-4f12-8.png.webp',
        accordion:{
            head:[
                'Что входит в акцию?',
                'Для кого подходит акция?',
                'Как воспользоваться акцией?',
                'Акция действует ограниченное время!'
                ],
            lists:[
                [
                    'Первичная консультация и диагностика – БЕСПЛАТНО',
                    'Установка премиального импланта по акционной цене',
                    'Подбор оптимального метода имплантации',
                    'Рассрочка 0% без переплат'
                ],
                [
                    'Первичная консультация и диагностика – БЕСПЛАТНО',
                    'Установка премиального импланта по акционной цене',
                    'Подбор оптимального метода имплантации',
                    'Рассрочка 0% без переплат'
                ],
                [
                    'Первичная консультация и диагностика – БЕСПЛАТНО',
                    'Установка премиального импланта по акционной цене',
                    'Подбор оптимального метода имплантации',
                    'Рассрочка 0% без переплат'
                ],
                [
                    'Наш адрес: г. Казань, Проспект Победы, 35Б​2, офис 1, 1 этаж.',
                    'Запись по телефону: +7 (917) 858‒52‒17',
                    'Скорее воспользуйтесь акцией!',
                    '*Акция действует до '
                ],
            ]
        }
    },
    {
        head:'Профессиональная чистка зубов 2500 руб.',
        description:['Удаление зубного налета и камня',
            'Здоровые десны и свежее дыхание',
            'Осветление эмали без вреда для зубов',
            'Приятный бонус каждому пациенту'],
        img:'https://optim.tildacdn.com/tild3033-6338-4231-a366-633361383631/-/cover/423x427/center/center/-/format/webp/5700da90-baa6-4ad4-8.png.webp',
        accordion:{
            head:[
                'Что входит в акцию?',
                'Для кого подходит акция?',
                'Как воспользоваться акцией?',
                'Акция действует ограниченное время!'
                ],
            lists:[
                [
                    'Консультация стоматолога – осмотр полости рта, выявление скрытых проблем.',
                    'Диагностика зубов и десен – определение кариеса, воспалений, налета и зубного камня.',
                    'Оценка прикуса и состояния пломб – проверка на наличие повреждений и необходимость коррекции.',
                    'План лечения (при необходимости) – рекомендации по уходу за зубами и возможному лечению.',
                    'Цифровая рентген-диагностика (по показаниям) – при необходимости делаем снимок для более точной диагностики.'
                ],
                [
                    'Если не делали чистку более полугода.',
                    'Если есть налет от кофе, чая, сигарет.',
                    'Если беспокоит кровоточивость или воспаление десен.',
                    'Если хотите сохранить зубы здоровыми и избежать дорогостоящего лечения.',
                    'Не откладывайте заботу о здоровье зубов – запишитесь прямо сейчас'
                ],
                [
                    'Оставьте заявку на сайте или позвоните нам.',
                    'Выберите удобное время для процедуры.',
                    'Пройдите профессиональную чистку зубов.',
                    'Получите приятный бонус от клиники.',
                ],
                [
                    'Наш адрес: г. Казань, Проспект Победы, 35Б​2, офис 1, 1 этаж.',
                    'Запись по телефону: +7 (917) 858‒52‒17',
                    'Скорее воспользуйтесь акцией!',
                    '*Акция действует до '
                ],
            ]
        }
    },
    {
        head:'Отбеливание зубов от 6.000 руб.',
        description:[
            'Эффективное осветление эмали без повреждения зубов',
            'Безопасная процедура с мгновенным результатом',
            'Ровный и естественный оттенок улыбки',
            'Долговременный эффект при правильном уходе'
        ],
        img:'https://static.tildacdn.com/tild3630-3838-4439-a261-333539316164/ehsteticheskaya-stom.png',
        accordion:{
            head:[
                'Что входит в акцию?',
                'Для кого подходит акция?',
                'Как воспользоваться акцией?',
                'Акция действует ограниченное время!'
                ],
            lists:[
                [
                    'Консультация стоматолога – осмотр полости рта и подбор оптимального метода отбеливания.',
                    'Профессиональная подготовка – удаление налета и полировка эмали для лучшего результата.',
                    'Отбеливание по современной технологии – безопасное осветление эмали с моментальным эффектом.',
                    'Фторирование (по показаниям) – укрепление эмали для защиты зубов.',
                    'Рекомендации по уходу – советы по сохранению белоснежного оттенка зубов'
                ],
                [
                    'Тем, кто хочет осветлить зубы на несколько тонов.',
                    'Если зубная эмаль потемнела от кофе, чая, сигарет или вина.',
                    'Для тех, кто планирует важное событие и хочет сияющую улыбку.',
                    'Если давно мечтали об эстетичном улучшении улыбки.',
                    'При отсутствии противопоказаний (определяется на консультации)'
                ],
                [
                    'Оставьте заявку на сайте или позвоните нам.',
                    'Придите на консультацию, где врач подберет оптимальный метод отбеливания.',
                    'Пройдите процедуру в комфортной обстановке.',
                    'Наслаждайтесь белоснежной улыбкой!'
                ],
                [
                    'Наш адрес: г. Казань, Проспект Победы, 35Б​2, офис 1, 1 этаж.',
                    'Запись по телефону: +7 (917) 858‒52‒17',
                    'Звоните и скорее воспользуйтесь акцией!',
                    '*Акция действует до '
                ],
            ]
        }
    },
]
export default function Stocks (){
    const navigate = useNavigate()
    const theme = createTheme({
        breakpoints: {
          values: {
            xs: 0,
            sm: 300,
            md: 500,
            lg: 1200,
            xl: 1600,
          },
        },
  });
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    return (
        <>
        <Box 
        sx={{
            width: isDesktop ? '50dvh' : '100vw',
            maxWidth: 800,
            margin: '0 auto',
            boxSizing: 'border-box',
            background:'#FFFFFF',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            flex: 1 ,
        }}
        >   
            <Header />
            <Box sx={{
                backgroundColor:'#61617b',
                display:'flex',
                justifyContent:'center',
                padding:'40px 20px',
                borderRadius:'20px',
                mt:.5
            }}>
            <Box sx={{
                width:'80%'
            }}>
            <Typography sx={{
                fontFamily: 'Roboto',
                fontWeight: 700,
                fontSize: '27px',
                lineHeight: '100%',
                letterSpacing: '0%',
                mb: 3,
                textTransform:'uppercase'
            }}>
               Акции
            </Typography>
            <Typography
            sx={{
                fontFamily: 'Roboto',
                fontWeight:400,
                fontSize:'17px'
            }}  
            > 
                Специальные предложения для вашей улыбки:
                акции и скидки от Denta Rell
            </Typography>
            </Box>
            </Box>
            <Box 
            sx={{
                margin:'10px',
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'space-evenly',
                gap:'15px'
            }}
            >
            {
                mockStocks.map(
                (elem, indx)=>
                <>
                    <CartStocks 
                        key={elem.head + indx}
                        head={elem.head} 
                        description={elem.description} 
                        img={elem.img}
                    />
                    <Box sx={{
                        width:'90%'
                    }}>
                        <Typography sx={{
                            color:'black',
                            fontSize:'30px',
                            fontWeight:'700'
                            }}>ПОДРОБНОСТИ</Typography>
                        <Box sx={{
                            marginTop:'10px',
                            }}>
                            <Typography sx={{
                                color:'black',
                                fontWeight:'600',
                                fontSize:'14px',
                                marginBottom:'10px'
                                }}>АКЦИЯ: ИМПЛАНТ С УСТАНОВКОЙ</Typography>
                            <Typography sx={{
                                color:'black',
                                fontSize:'12px'
                                }}>Потеря зуба – это не просто эстетическая проблема, 
                                    но и риск для здоровья всей челюсти.
                                    Имплантация – это современный и надежный способ восстановить 
                                    улыбку без ущерба для соседних зубов.</Typography>
                        </Box> 
                    </Box>
                    <Box sx={{
                        width:'90%'
                    }}>
                        {elem.accordion.head.map((element, indx)=>
                            <Accordion title={element}>
                                <ul style={{
                                    padding:'5px 20px'
                                }}>
                                    {elem.accordion.lists[indx].map((elem:any)=>
                                        <li style={{color:"black", fontWeight:'400', fontSize:'13px'}}>{elem}</li> 
                                    )}
                                </ul>
                            </Accordion>
                        )}
                    </Box>
                </>
                )
            }
            </Box>
            <Box sx={{
                width: '100%',
                padding: '20px 5%',
                marginTop: 'auto',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div className="divider" style={{marginTop: "0px"}}></div>
                <div className="buttons-block">
                    <button className="round-button" onClick={() => window.open('https://t.me/denta_rell', '_blank')}></button>
                    <button className="round-button" onClick={() => window.open('https://api.whatsapp.com/send/?phone=79178585217&text=Здравствуйте!%0A%0AПишу+из+приложения.%0A%0A&type=phone_number&app_absent=0', '_blank')}></button>
                    <button className="write-button" disabled={true} onClick={()=>navigate('/client/chat')}>НАПИСАТЬ</button>
                </div>
                <button className="login-button" disabled={true} onClick={() => navigate('/client/login')}>Войти в личный кабинет</button>
            </Box>
        </Box>
        </>
    )
}