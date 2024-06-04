// Newsand.js
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { $host } from '../../../../http';

import { NewsAndTags } from './newsandtags'
import { NewsAndResources } from './newsandresources'

export const Newsand = () => {
  const [news, setNews] = useState([]);
  const [newsTags, setNewsTags] = useState([]);
  const [selectedNewsId, setSelectedNewsId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getNews = async () => {
    try {
      const response = await $host.get(`/news`);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении новостей', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsData = await getNews();
        setNews(newsData.news);
        setNewsTags(newsData.newsTags);
      } catch (error) {
        setError('Ошибка при загрузке новостей');
      }
    };

    fetchNews();
  }, []);

  const getTagsForNews = (newsId) => {
    return newsTags.filter(tag => tag.news_id === newsId);
  };

  const handleNewsClick = (id) => {
    setSelectedNewsId(id);
  };

  return (
    <div className='Newsand'>
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
      {selectedNewsId && (
        <div>
          <NewsAndResources newsId={selectedNewsId} />
          <NewsAndTags newsId={selectedNewsId} />
        </div>
      )}
    </div>
  );
};
