import React, { useState } from 'react';

import { $authHost } from '../../../http';

import './createnews.css'


export const CreateNews = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      title,
      description
    };

    try {
      const response = await $authHost.post('/news/create', requestData);
      setMessage('Новость успешно создана');
      // Перенаправляем пользователя на страницу с новостями после создания
      window.location.reload();
    } catch (error) {
      setMessage('Не удалось создать новость');
      console.error('Произошла ошибка при создании новости:', error);
    }
  };

  return (
    <div className='create-news'>
      

     
     
      <h1>Создать новость</h1>
      {message && <p>{message}</p>}
      <form className='form-group' onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Заголовок</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className='form-group'>
          <label>Описание</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type='submit'>Создать новость</button>
       

      
      </form>
    </div>
  );
};
