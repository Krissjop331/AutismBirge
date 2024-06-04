import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { $host } from '../../../http';

export const Importendnews = () => {
  const [news, setNews] = useState([]);
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

        const importantNews = newsData.newsTags.filter(item => {
          // Проверяем, есть ли тег "Важное" в новости
          return item.Tag.title === "Важное";
        });

        const importantNewsData = importantNews.map(tag => {
          return tag.News; // Возвращаем объект News для каждого элемента importantNews
        });
        setNews(importantNewsData)
        console.log(importantNewsData); // Выводим массив объектов News
      } catch (error) {
        setError('Ошибка при загрузке новостей: ' + error.message);
      }
    };

    fetchNews();
  }, []);


  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div>
      <div style={{ maxWidth: '211px', marginTop: '31px' }}>
        <ul>
          {news.map(item => (
            <li key={item.id} className="news-block">
              <div className='titles'>
                <h3 style={{ fontSize: '12px' }}>{item.title}</h3>
              </div>
              <p style={{ fontSize: '10px' }}>
                {truncateText(item.description, 200)}
                <span style={{ color: '#3763A6' }} onClick={() => navigate(`/news/${item.id}`)}>Далее</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

};
