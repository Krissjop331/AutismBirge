import React from 'react'
import './AdminSideBar.css'
import { Navbar } from '../../../components/navbar/Navbar'
import Accordion from 'react-bootstrap/Accordion';
import AccordionS from '../accordion/Accordion';
import { Logo } from '../../../components/logo/Logo';
import { NavLink } from 'react-router-dom';

export const AdminSideBar = () => {

  const items = [
    { title: 'Заголовок 1', content: 'Содержимое 1' },
    { title: 'Заголовок 2', content: 'Содержимое 2' },
    { title: 'Заголовок 3', content: 'Содержимое 3' },
  ];

  return (
    <div className='adminSideBar'>

      <div>
        <Logo />
      </div>

      <ul>
        <li><NavLink to="/admin/forum" activeClassName="active">Форум</NavLink></li>
        {/* <li><NavLink to="/admin/learn" activeClassName="active">Курсы</NavLink></li> */}
        <li><NavLink to="/admin/users" activeClassName="active">Пользователи</NavLink></li>
        <li><NavLink to="/admin/register" activeClassName="active">Регистрация пользователя</NavLink></li>
        <li><NavLink to="/admin/applications" activeClassName="active">Подтверждение</NavLink></li>
        <li><NavLink to="/admin/createresources" activeClassName="active">Создать ресурс</NavLink></li>
        <li><NavLink to="/admin/visit" activeClassName="active">История посещения</NavLink></li>
        <li><NavLink to="/admin/news" activeClassName="active">Создание новости</NavLink></li>
        <li><NavLink to="/admin/createtags" activeClassName="active">Создания тегов</NavLink></li>
        <li><NavLink to="/admin/updatenews" activeClassName="active">Обновить новость </NavLink></li>
        


      </ul>

      
    </div>
  )
}
