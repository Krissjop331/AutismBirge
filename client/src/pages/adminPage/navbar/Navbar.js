import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, FORUM_ROUTE, HOME_ROUTE, LEARN_ROUTE, LOGIN_ROUTE, NEWS_ROUTE, PROFILE_ROUTE, RESOURCES_ROUTE } from '../../.././consts';
import { useDispatch, useSelector } from 'react-redux';
import { MdLogout } from "react-icons/md";
import { setIsAdmin, setIsAuth } from '../../../store/mainReducer';
import { useMutation } from 'react-query';
import { fetchLogout } from '../../../http/authAPI';

export const Navbar = (props) => {

  const { isAuth, isAdmin } = useSelector(state => state.main);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutMutation = useMutation(fetchLogout, {
    onSuccess: (data) => {
      console.log(data);
      dispatch(setIsAuth(false));
      dispatch(setIsAdmin(false));
      navigate(HOME_ROUTE); // Перенаправляем на домашнюю страницу
      
    },
    onError: (error) => {
      console.error('Login error:', error);
    }
  });

  const handleLogout = (event) => {
    event.preventDefault();
    logoutMutation.mutate();
  };

  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setHasToken(true);
    } else {
      setHasToken(false);
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
            
          </ul>
        </div>
        
        { hasToken 
          ? (
            <div className='profile_block'>
              <div className='profile'> 
                <Link to={PROFILE_ROUTE }>Profile</Link> 
                {isAdmin && <div className='adminCaption'>Админ</div>} 
              </div>
              <MdLogout className='logout' onClick={handleLogout}/>
            </div>
          ) : (
            <Link to={LOGIN_ROUTE}>Авторизация</Link>
          )
        }
    </div>
  )
}
