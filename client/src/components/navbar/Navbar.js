import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, HOME_ROUTE, LEARN_ROUTE, LOGIN_ROUTE, NEWS_ROUTE, PROFILE_ROUTE, RESOURCES_ROUTE } from '../../consts';
import { useDispatch, useSelector } from 'react-redux';
import { MdLogout } from "react-icons/md";
import { setIsAdmin, setIsAuth } from '../../store/mainReducer';
import { useMutation } from 'react-query';
import { fetchLogout } from '../../http/authAPI';

export const Navbar = (props) => {

  const { isAuth } = useSelector(state => state.main);
  const [isAdmin, setIsAdminState] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutMutation = useMutation(fetchLogout, {
    onSuccess: (data) => {
      console.log(data);
      dispatch(setIsAuth(false));
      dispatch(setIsAdmin(false));
      localStorage.removeItem('token');
      localStorage.removeItem('role'); // Очистим роль из локального хранилища при выходе из системы
      navigate(HOME_ROUTE); // Перенаправляем на домашнюю страницу
      window.location.reload();
    },
    onError: (error) => {
      console.error('Logout error:', error);
    }
  });

  const handleLogout = (event) => {
    event.preventDefault();
    logoutMutation.mutate();
  };

  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // Получаем роль пользователя из локального хранилища
    setHasToken(!!token); // Преобразуем значение токена в булево и устанавливаем соответствующее состояние
    if (token) {
      setIsAdminState(role === 'admin'); // Устанавливаем isAdminState в true только для роли "admin"
    }
  }, [isAuth]); // Проверяем наличие токена при изменении статуса авторизации

  return (
    <div className={`navbar ${props.className}`}>
        <div className="logo"></div>

        <div className="menu">
          <ul>
            <li><Link to={HOME_ROUTE}>Главная</Link></li>
            <li><Link to={LEARN_ROUTE}>Обучение</Link></li>
            <li><Link to={RESOURCES_ROUTE}>Ресурсы</Link></li>
            <li><Link to={NEWS_ROUTE}>Новости</Link></li>
            {isAdmin && <li><Link to={ADMIN_ROUTE}>Админ</Link></li>}
          </ul>
        </div>

        {hasToken ? (
          <div className='profile_block'>
            <div className='profile'>
              <Link to={PROFILE_ROUTE}>Profile</Link>
              {isAdmin && <div className='adminCaption'>Админ</div>}
            </div>
            <MdLogout className='logout' onClick={handleLogout}/>
          </div>
        ) : (
          <Link to={LOGIN_ROUTE}>Авторизация</Link>
        )}
    </div>
  )
}
