import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Import $authHost relative to the src directory
import { $authHost } from '../../../http/'; // Adjust the path as necessary
import { jwtDecode } from 'jwt-decode';

export const Aboutprofile = () => {
  const [image, setImage] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  // Define formData state variable
  const [formData, setFormData] = useState({
    // Initialize with default form data
    first_name: '',
    last_name: '',
    email: '',
    login: '',
    birthday: '',
    phone_number: '',
    password: '',
    avatar_url: ''
  });


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('Token is missing');
        return null; // or some other handling, since returning null here can lead to other issues
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
        const response = await $authHost.get(`/users/${userId}`);
        const userData = response.data;
        setFormData({
          first_name: userData.users.first_name || '',
          last_name: userData.users.last_name || '',
          email: userData.users.email || '',
          login: userData.users.login || '',
          birthday: userData.users.birthday || '',
          phone_number: userData.users.phone_number || '',
          password: '',
          avatar_url: userData.users.avatar_url || '../stories/files/resources/users/no-image-svgrepo-com.svg',
        });

        if (userData.users.avatar_url) {
          setAvatarUrl(userData.users.avatar_url);
          setImage(userData.users.avatar_url.replace('../client/public', '')); // Устанавливаем изображение профиля пользователя
        }
        console.log(userData.users.avatar_url)
      } catch (error) {
        console.error('Ошибка получения данных пользователя:', error);
        setErrorMessage('Произошла ошибка при получении данных пользователя');
      }
    };

    fetchUserData();
  }, []);

  console.log(image)

  // Обработчик выбора файла изображения
  const handleImageChange = async (e) => {
    const file = e.target.files[0]; // Получаем первый выбранный файл
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await $authHost.put(`/users/update/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const { avatarUrl } = response.data;
        setAvatarUrl(avatarUrl); // Обновляем путь к изображению
        setImage(URL.createObjectURL(file)); // Устанавливаем выбранное изображение
      } catch (error) {
        console.error('Ошибка при загрузке изображения клиента:', error);
        setErrorMessage('Произошла ошибка при загрузке изображения клиента');
      }
    }
  };

  // Отправка данных формы на сервер
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Отправляем запрос на обновление профиля пользователя с данными и путем к изображению
      await $authHost.put('/users/update', { ...formData, avatarUrl });
      setSuccessMessage('Профиль успешно обновлен!');
      setErrorMessage('');
    } catch (error) {
      console.error('Ошибка обновления профиля:', error);
      setErrorMessage(error.response?.data?.message || 'Произошла ошибка');
      setSuccessMessage('');
    }
  };

  // Обработчик изменения данных формы
  const handleChange = (e) => {
    const { file, value } = e.target;
    setFormData({
      ...formData,
      [file]: value
    });
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <div className='aboutprofile'>
      <h1>Профиль</h1>
      <div className='img'>
        {/* Отображение изображения профиля */}
        {image ? (
          <img className="imgPr" src={image} alt="Profile" />
        ) : (
          <img style={{ opacity: '50%'}} className="imgPr" src={'../stories/files/resources/users/no-image-svgrepo-com.svg'} alt="Profile" />
        )}
        {/* Кнопка изменить изображение */}
        {/* <input type="file" name="file" accept="image/*" onChange={handleImageChange} /> */}
        <div>
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="file-input"
          />
          <label htmlFor="file-input" className="custom-file-upload">
            Выберите изображение
          </label>
        </div>
      </div>
      {successMessage && <p className='success'>{successMessage}</p>}
      {errorMessage && <p className='error'>{errorMessage}</p>}
    </div>
  );
};