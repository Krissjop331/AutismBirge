import 'react-datepicker/dist/react-datepicker.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { $host } from '../../http';
import { NavbarMobile } from '../../components/navbarMobile/NavbarMobile';
import { Navbar } from '../../components/navbar/Navbar';
import { Filtr } from './Filtr/filtr';
import DatePicker from 'react-datepicker';
import './NewsPages.css';
import { Importendnews } from './importendnews/importendnews';

export const NewsPages = () => {
  const [news, setNews] = useState([]);
  const [newsTags, setNewsTags] = useState([]);
  const [error, setError] = useState(null);
  const [filteredNews, setFilteredNews] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
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
        setFilteredNews(newsData.news); // Изначально отображаем все новости
      } catch (error) {
        setError('Ошибка при загрузке новостей');
      }
    };

    fetchNews();
  }, []);

  const getTagsForNews = (newsId) => {
    return newsTags.filter(tag => tag.news_id === newsId);
  };

  const handleFilter = (selectedTags, selectedDate) => {
    let filtered = news;
    if (selectedTags.length > 0) {
      filtered = filtered.filter(item =>
        getTagsForNews(item.id).some(tag => selectedTags.includes(tag.tag_id))
      );
    }
    if (selectedDate) {
      filtered = filtered.filter(item =>
        new Date(item.createdAt).toLocaleDateString() === selectedDate.toLocaleDateString()
      );
    }
    setFilteredNews(filtered);
  };

  return (
    <div className='news_containers'>
      <NavbarMobile className='learnNavbarMobile' />
      <div className="wrapper">
        <Navbar className='learnNavbar' />
        <h1 style={{marginBottom:'30px'}}>Новости</h1>
        <div style={{display:'flex', gap:'20px', justifyContent:'space-between'}}>
        <div style={{width:'100%'}}>
        
        <div className="news">
          {error && <p>{error}</p>}
          <ul>
            {filteredNews.map(item => (
              <li key={item.id} className="news-block">
                <div className='titles'>
                  <h3>{item.title}</h3>
                  <p className="date">📅 {new Date(item.createdAt).toLocaleDateString()}</p>
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
                <div className='buttons'>
                  <button onClick={() => navigate(`/news/${item.id}`)}><p>Подробнее</p></button>
                </div>  
              </li>
            ))}
          </ul>
        </div>
       </div>

        <div> <Filtr newsTags={newsTags} onFilter={handleFilter} />
        <Importendnews />
        </div>
      </div>
      </div>
    </div>
  );
};
