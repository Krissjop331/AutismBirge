import React, { useState, useEffect } from 'react';
import { $authHost } from '../../../http';
import './visit.css';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

export const Visit = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await $authHost.get('/history');
        setHistory(response.data.history);
        setLoading(false);
      } catch (error) {
        setError('Ошибка получения истории');
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return format(date, 'HH:mm dd.MM.yyyy');
  };

  return (
    <div className="history">
      <h1>История посещений</h1>
      <div className='adminforumItem head'>
        <p className='forumId'>ID</p>
        <p className='forumTitle'>Имя пользователя</p>
        <p className='forumTitle'>Тип</p>
        <p className='forumTitle'>Дата</p>
      </div>

      <ul>
        {history.map(item => (
          <div key={item.User.id} className='adminforumItem'>
            <p className='forumId'>{item.id}</p>
            <p className='forumTitle'>{item.User.first_name + ' ' + item.User.last_name}</p>
            <p className='forumTitle'>{item.type}</p>
            <p className='forumTitle'>{formatDate(item.createdAt)}</p>
          </div>
        ))}
      </ul>
    </div>
  );
};
