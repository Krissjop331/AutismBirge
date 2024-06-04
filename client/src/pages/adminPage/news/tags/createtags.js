import React, { useState } from 'react';
import { $authHost } from '../../../../http';

const CreateTagPage = () => {
  const [title, setTitle] = useState('');

  const handleInputChange = event => {
    setTitle(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    $authHost.post('/tags/create', { title })
      .then(response => {
        console.log('Тег успешно создан:', response.data.tag);
        // Дополнительная логика после успешного создания тега
        window.location.reload();
      })
      .catch(error => console.error('Ошибка при создании тега:', error));
  };

  return (
    <div className='createtags'>
      <h1>Создать тег</h1>
      <form className='input' onSubmit={handleSubmit}>
        <label>
          Тег:
          <input type="text" value={title} onChange={handleInputChange} />
        </label>
        <button type="submit">Создать</button>
      </form>
    </div>
  );
};

export default CreateTagPage;
