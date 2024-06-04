import React, { useState } from 'react';
import { $authHost } from '../../../../http';

export const NewsAndResources = ({ newsId, setResourcesTitle, setResourcesUrl, resourcesTitle, resourcesUrl }) => {
  const [message, setMessage] = useState('');
  const [resourceType, setResourceType] = useState('link');
  const [file, setFile] = useState(null);

  const createResourceNews = async () => {
    try {
      let formData = null;
      if (resourceType === 'link') {
        formData = { title: resourcesTitle, url: resourcesUrl };
      } else if (resourceType === 'file') {
        formData = new FormData();
        formData.append('title', resourcesTitle);
        formData.append('file', file);
      }
      console.log(formData)
      const response = await $authHost.post(`/news/create/${newsId}/resources`, formData);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error creating resource news:', error.response?.data);
      setMessage('Failed to create resource news');
    }
  };

  return (
    <div className='newsandresources'>
      <h3>Добавить ресурс</h3>
      <input type="text" placeholder="Title" value={resourcesTitle} onChange={e => setResourcesTitle(e.target.value)} />
      {resourceType === 'link' && (
        <input type="text" placeholder="URL" value={resourcesUrl} onChange={e => setResourcesUrl(e.target.value)} />
      )}
      {resourceType === 'file' && (
        <input type="file" onChange={e => setFile(e.target.files[0])} />
      )}
      <label>Тип</label>
      <select
        className='select'
        value={resourceType}
        onChange={(e) => setResourceType(e.target.value)}
      >
        <option value='link'>Ссылка</option>
        <option value='file'>Файл</option>
      </select>
      <button onClick={createResourceNews}>Добавить ресурс</button>
      {message && <p>{message}</p>}
    </div>
  );
};