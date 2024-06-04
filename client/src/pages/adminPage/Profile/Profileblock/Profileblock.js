import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { $authHost } from '../../../../http';
import './Profileblock.css';

const Profileblock = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    login: '',
    birthday: '',
    phone_number: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setErrorMessage('Token is missing');
          return;
        }

        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const response = await $authHost.get(`/users/${userId}`);
        const userData = response.data;

        console.log('User Data:', userData); // Логируем данные пользователя для отладки

        setFormData({
          first_name: userData.users.first_name || '',
          last_name: userData.users.last_name || '',
          email: userData.users.email || '',
          login: userData.users.login || '',
          birthday: userData.users.birthday || '',
          phone_number: userData.users.phone_number || '',
          password: '' // Пароль оставляем пустым, так как обычно он не возвращается
        });
      } catch (error) {
        console.error('Ошибка получения данных пользователя:', error);
        setErrorMessage('Произошла ошибка при получении данных пользователя');
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await $authHost.put('/users/update', formData);
      setSuccessMessage('Профиль успешно обновлен!');
      setErrorMessage('');
    } catch (error) {
      console.error('Ошибка обновления профиля:', error);
      setErrorMessage(error.response?.data?.message || 'Произошла ошибка');
      setSuccessMessage('');
    }
  };

  return (
    <div className='registerblock'>
      <form className='register_container' onSubmit={handleSubmit}>
        <div className='register_min_container'>
          <div>
            <input
              className='rectangle'
              placeholder='Имя'
              type='text'
              name='first_name'
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              className='rectangle'
              placeholder='Фамилия'
              type='text'
              name='last_name'
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ display: 'flex' }}>
            <input
              style={{ marginRight: '20px' }}
              className='rectangle'
              placeholder='Email'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              className='rectangle'
              placeholder='Логин'
              type='text'
              name='login'
              value={formData.login}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              className='rectangle'
              placeholder='Дата рождения'
              type='date'
              name='birthday'
              value={formData.birthday}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              className='rectangle'
              placeholder='Пароль'
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className='btn' type='submit'>Обновить профиль</button>
          {successMessage && <p className='success'>{successMessage}</p>}
          {errorMessage && <p className='error'>{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
};

export default Profileblock;
