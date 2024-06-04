import React, { useEffect, useState } from 'react';
import './tags.css';
import CreateTagPage from './createtags';
import UpdateTagPage from './updatetags';

import { $authHost, $host } from '../../../../http';

const TagsListPage = () => {
  const [tags, setTags] = useState([]);
  const [selectedTagId, setSelectedTagId] = useState(null); // Состояние для отслеживания выбранного тега
  const [isEditOpen, setIsEditOpen] = useState(false); // Состояние для открытия формы редактирования


  const handleDelete = (id) => {
    $authHost.delete(`/tags/delete/${id}`)
      .then(response => {
        console.log('Тег успешно удален:', response.data.tag);
        // Обновляем список тегов после удаления
        setTags(tags.filter(tag => tag.id !== id));
      })
      .catch(error => console.error('Ошибка при удалении тега:', error));
  };

  const handleEdit = (id) => {
    setSelectedTagId(id);
    
      
  };

  const handleredak = (id) => {
    setSelectedTagId(id);
    setIsEditOpen(true);
    
  };

  useEffect(() => {
    $host.get('/tags')
      .then(response => setTags(response.data.tags))
      .catch(error => console.error('Ошибка при получении списка тегов:', error));
  }, []);

  return (
    <div className='tagslist'>
      <CreateTagPage />

      <ul className='tags'>
        { tags.map(tag => (
          <li key={tag.id} onClick={() => handleEdit(tag.id)}>
            <span>{tag.title}</span>
            {selectedTagId === tag.id && (
              <div>
                <button onClick={() => handleredak(tag.id)}>Редактировать</button>
                <button onClick={() => handleDelete(tag.id)}>Удалить</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      
      {selectedTagId && (
        <>
          {isEditOpen && <UpdateTagPage tagId={selectedTagId} />}
        </>
      )}
    </div>
  );
};

export default TagsListPage;
