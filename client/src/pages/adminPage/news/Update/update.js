import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { $authHost, $host } from '../../../../http';
import './Update.css';
import 'react-datepicker/dist/react-datepicker.css';
import { NewsAndTags } from '../newsand/newsandtags';
import { DeleteNews } from '../delete/Deletenews';

export const UpdateNews = () => {
  const { id } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [resourcesTitle, setResourcesTitle] = useState('');
  const [resourcesUrl, setResourcesUrl] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [selectedNewsId, setSelectedNewsId] = useState(id);

  const [news, setNews] = useState([]);
  const [newsTags, setNewsTags] = useState([]);
  const [newsResources, setNewsResources] = useState([]);
  const [editingResourceId, setEditingResourceId] = useState(null);
  const [editedResourceTitle, setEditedResourceTitle] = useState('');
  const [editedResourceUrl, setEditedResourceUrl] = useState('');
  const [editedResourceFile, setEditedResourceFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await $host.get('/news');
        setNews(response.data.news);
        setNewsTags(response.data.newsTags);
      } catch (error) {
        setError('Ошибка при загрузке новостей');
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const fetchNewsDetails = async () => {
      if (!selectedNewsId) return;

      try {
        const response = await $authHost.get(`/news/${selectedNewsId}`);
        const { title, description } = response.data.news;
        const newsResources = response.data.newsResources.map(res => res.NewsResource);

        setTitle(title);
        setDescription(description);
        setSelectedTagIds([]);
        setNewsResources(newsResources);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNewsDetails();
  }, [selectedNewsId]);

  const getTagsForNews = (newsId) => {
    return newsTags.filter(tag => tag.news_id === newsId);
  };

  const handleNewsClick = (id) => {
    setSelectedNewsId(id);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('tag_id', selectedTagIds.join(','));
      formData.append('resources_title', resourcesTitle);
      if (file) {
        formData.append('file', file);
        formData.append('resources_type', 'file');
      } else {
        formData.append('resources_url', resourcesUrl);
        formData.append('resources_type', 'url');
      }
      // Добавляем resources_id, если он доступен
      formData.append('resources_id', editingResourceId);
  
      console.log("Data sent to server:", Object.fromEntries(formData)); // Вывод данных на консоль
  
      const response = await $authHost.put(`/news/update/${selectedNewsId}`, formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Произошла ошибка при обновлении новости');
      console.error('Произошла ошибка при обновлении новости:', error);
    }
  };
  
  
  const handleDeleteResource = async (resourceId) => {
    try {
      await $authHost.delete('/news/delete/resources', {
        data: {
          newsId: selectedNewsId,
          resources_id: resourceId
        }
      });
      setNewsResources(newsResources.filter(resource => resource.id !== resourceId));
    } catch (error) {
      console.error('Ошибка при удалении ресурса:', error);
    }
  };

  const handleEditResource = (resourceId, title, url) => {
    setEditingResourceId(resourceId);
    setEditedResourceTitle(title);
    setEditedResourceUrl(url);
  };


  const handleCancelEdit = () => {
    setEditingResourceId(null);
    setEditedResourceTitle('');
    setEditedResourceUrl('');
  };

  const handleSaveEdit = async () => {
    try {
      const formData = new FormData();
      formData.append('resources_id', editingResourceId);
      formData.append('resources_title', editedResourceTitle);
      formData.append('resources_id', editingResourceId);


      if (editedResourceFile) {
        formData.append('file', editedResourceFile);
        formData.append('resources_type', 'file');
      } else {
        formData.append('resources_url', editedResourceUrl);
        formData.append('resources_type', 'url');
      }

      await $authHost.put(`/news/resources/update/${editingResourceId}`, formData);

      const updatedResources = newsResources.map(resource =>
        resource.id === editingResourceId
          ? {
            ...resource,
            title: editedResourceTitle,
            url: editedResourceFile ? editedResourceFile.name : editedResourceUrl,
            type: editedResourceFile ? 'file' : 'url'
          }
          : resource
      );
      setNewsResources(updatedResources);
      handleCancelEdit();
    } catch (error) {
      console.error('Ошибка при обновлении ресурса:', error);
    }
  };


  return (
    <div className='update-news'>

      {news.map(item => (
        <li key={item.id} className={`news-block ${selectedNewsId === item.id ? 'selected' : ''}`} onClick={() => handleNewsClick(item.id)}>
          <div className='titles'>
            <h3>{item.title}</h3>
          </div>
          <div className="tags">
            {getTagsForNews(item.id).map(tag => (
              tag.Tag ? (
                <Link key={tag.tag_id} to={`/tags/${tag.tag_id}`}>#{tag.Tag.title}</Link>
              ) : (
                <span key={tag.tag_id}>#Нет тега</span>
              )
            ))}
          </div>
          <p>{item.description}</p>
        </li>
      ))}


      <h1>Обновить новость</h1>
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
        <NewsAndTags selectedNewsId={selectedNewsId} setTagIds={setSelectedTagIds} selectedTagIds={selectedTagIds} />


        <div className='form-group'>
          <label>Выберите ресурс</label>
          <select value={editingResourceId} onChange={(e) => setEditingResourceId(e.target.value)}>
            <option value="">Выберите ресурс</option>
            {newsResources.map(resource => (
              <option key={resource.id} value={resource.id}>{resource.title} ({resource.type})</option>
            ))}
          </select>
        </div>




        <div className='form-group'>
          <label>Заголовок ресурса</label>
          <input
            type='text'
            value={resourcesTitle}
            onChange={(e) => setResourcesTitle(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label>URL ресурса</label>
          <input
            type='text'
            value={resourcesUrl}
            onChange={(e) => setResourcesUrl(e.target.value)}
            disabled={file !== null}
          />
        </div>
        <div className='form-group'>
          <label>Файл ресурса</label>
          <input
            type='file'
            onChange={(e) => setFile(e.target.files[0])}
            disabled={resourcesUrl !== ''}
          />
        </div>
        <div className="resources-table">
          <h2>Ресурсы новости</h2>
          <table>
            <thead>
              <tr>
                <th>Заголовок</th>
                <th>Тип</th>
                <th>Ресурс</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {newsResources.map(resource => (
                resource && resource.id ? (
                  <tr key={resource.id}>
                    <td>{resource.title}</td>
                    <td>{resource.type === 'file' ? 'Файл' : 'Ссылка'}</td>
                    <td>{resource.type === 'url' ? resource.url : resource.file}</td>
                    <td>
                      <button type='button' onClick={() => handleDeleteResource(resource.id)}>Удалить</button>
                    </td>
                  </tr>
                ) : null
              ))}
            </tbody>
          </table>
        </div>

        <button type='submit'>Обновить новость</button>
        <DeleteNews />
      </form>
    </div>
  );
};

export default UpdateNews;
