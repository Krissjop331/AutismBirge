import React, { useState, useEffect } from 'react';
import './createresources.css';
import { $authHost, $host } from '../../../http';

export const Createresources = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [typeId, setTypeId] = useState('');
  const [moduleId, setModule] = useState('');
  const [file, setFile] = useState(null);
  const [fileInfo, setFileInfo] = useState(''); // Текстовое поле для информации о файле
  const [message, setMessage] = useState('');
  const [types, setTypes] = useState([]);
  const [modules, setModules] = useState([]);
  const [urlDescription, setUrlDescription] = useState('');

  useEffect(() => {
    // Fetch types
    $host.get('/type')
      .then(response => {
        setTypes(response.data.type);
      })
      .catch(error => {
        console.error('Error fetching types:', error);
      });

    // Fetch modules
    $host.get('/module')
      .then(response => {
        setModules(response.data.module);
      })
      .catch(error => {
        console.error('Error fetching modules:', error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('url', url);
    formData.append('type_id', typeId);
    formData.append('module_id', moduleId);
    formData.append('file', file);
   

    try {
      const response = await $authHost.post('/resources/create', formData, );
      setMessage('Resource created successfully');
    } catch (error) {
      setMessage('Failed to create resource');
      console.error('There was an error creating the resource:', error);
    }
  };

  return (
    <div className='createresources'>
      <h1>Создание ресурса</h1>
      {message && <p>{message}</p>}
      <form className='form-group' onSubmit={handleSubmit}>
        <label>Заголовок</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          
        />
        <label>Описание</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>URL</label>
        <input
          type='text'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <label>Тип</label>
        <select
          className='select'
          value={typeId}
          onChange={(e) => setTypeId(e.target.value)}
          
        >
          <option value=''>Select type</option>
          {types.map(type => (
            <option key={type.id} value={type.id}>{type.type}</option>
          ))}
        </select>
        <label>Модуль</label>
        <select
          className='select'
          value={moduleId}
          onChange={(e) => setModule(e.target.value)}
          
        >
          <option value=''>Выберите модуль</option>
          {modules.map(module => (
            <option key={module.id} value={module.id}>{module.module}</option>
          ))}
        </select>
        <label>Файл</label>
        <input
          type='file'
          onChange={(e) => setFile(e.target.files[0])}
          
        />
        <label>Описание ссылки</label>
        {/* <input
          type='text'
          value={fileInfo}
          onChange={(e) => setUrlDescription(e.target.value)}
          required
        /> */}
       <button  className='btn' type='submit'>Создать ресурс</button>
      </form>
    </div>
  );
}