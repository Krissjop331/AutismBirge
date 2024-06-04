import React, { useState } from 'react'
import './NavbarMobile.css'
import { ADMIN_ROUTE, FORUM_ROUTE, HOME_ROUTE, LEARN_ROUTE, LOGIN_ROUTE, NEWS_ROUTE, PROFILE_ROUTE, RESOURCES_ROUTE } from '../../consts'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const NavbarMobile = (props) => {

    const {isAuth} = useSelector(state => state.main)
    const {isAdmin} = useSelector(state => state.main) || {}
    const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`navbarMobile ${props.className}`}>
    {/* <div className="navbarMobile"> */}
        <div className="logo"></div>


            <div className={`menu ${isOpen ? 'open' : ''}`} >
                <ul>
                    <li><Link to={HOME_ROUTE}>Главная</Link></li>
                    <li><Link to={FORUM_ROUTE}>Форум</Link></li>
                    <li><Link to={LEARN_ROUTE}>Обучение</Link></li>
                    <li><Link to={RESOURCES_ROUTE}>Ресурсы</Link></li>
                    <li> { isAdmin && <a href={ADMIN_ROUTE}>Админ</a> } </li>
                    <li>{ isAuth 
                        ? <Link to={PROFILE_ROUTE + '/1'}>Profile</Link>
                        : <Link to={LOGIN_ROUTE}>Авторизация</Link>
                    }</li>
                </ul>   
                <p className="number">+1(702) 910 - 9163</p>
            </div>

        
        <div className="menu_btn" onClick={() => setIsOpen(!isOpen)} />       
        
    </div>
    )
}
