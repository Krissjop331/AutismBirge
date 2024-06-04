import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { $authHost } from '../../../../http';

export const DeleteNews = () => {
    const { id } = useParams();
    const history = useNavigate();

    const handleDelete = async () => {
        try {
            await $authHost.delete(`/news/${id}`);
            history('/news'); // Перенаправляем пользователя на страницу со списком новостей после успешного удаления
        } catch (error) {
            console.error('Ошибка при удалении новости:', error);
        }
    };

    return (
        <div>
            <h1>Удалить новость</h1>
            <button onClick={handleDelete}>Удалить</button>
        </div>
    );
};
