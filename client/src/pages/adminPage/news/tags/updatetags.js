import React, { useState } from 'react';
import { $authHost } from '../../../../http';

const UpdateTagPage = ({ tagId }) => {
  const [newTitle, setNewTitle] = useState('');
  

  const handleNewTitleChange = event => {
    setNewTitle(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    $authHost.put(`/tags/update/${tagId}`, { title: newTitle })
      .then(response => {
        console.log('Тег успешно обновлен:', response.data.tag);
        window.location.reload();
        // Дополнительная логика после успешного обновления тега
      })
      .catch(error => console.error('Ошибка при обновлении тега:', error));
  };

  return (
    <div>
      

      <h2>Обновить тег</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Новый заголовок:
          <input type="text" value={newTitle} onChange={handleNewTitleChange} />
        </label>
        <button type="submit">Обновить</button>
      </form>
    </div>
  );
};

export default UpdateTagPage;
