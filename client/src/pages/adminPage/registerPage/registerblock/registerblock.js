import React, { useState } from 'react';
import { $authHost } from '../../../../http';
import './registerblock.css';

const Registerblock = ({ onRegister }) => {
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
      const response = await $authHost.post('/signup', formData);
      setSuccessMessage('Регистрация прошла успешно!');
      setErrorMessage('');
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        login: '',
        birthday: '',
        phone_number: '',
        password: ''
      });
      onRegister(); // Trigger the parent component to handle registration completion
    } catch (error) {
      console.error('Error registering user:', error);
      setErrorMessage(error.response?.data?.message || 'An error occurred');
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
              placeholder='День рождение'
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
          <button className='btn' type='submit'>Регистрация</button>
          {successMessage && <p className='success'>{successMessage}</p>}
          {errorMessage && <p className='error'>{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
};

export default Registerblock;
