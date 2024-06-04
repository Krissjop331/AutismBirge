import React, { useState, useEffect } from 'react';
import { $host } from '../../../../http';

export const NewsAndTags = ({ selectedNewsId, setTagIds, selectedTagIds }) => {
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await $host.get(`/tags`);
        setAllTags(response.data.tags);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    if (selectedNewsId) {
      const fetchNewsTags = async () => {
        try {
          const response = await $host.get(`/news/${selectedNewsId}/tags`);
          setTagIds(response.data.tags.map(tag => tag.tag_id));
        } catch (error) {
          console.error('Error fetching news tags:', error);
        }
      };

      fetchNewsTags();
    }
  }, [selectedNewsId, setTagIds]);

  const handleTagChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setTagIds(selectedOptions);
  };

  const isTagSelectedForNews = (tagId) => {
    return selectedTagIds.includes(tagId);
  };

  return (
    <div className='newsandtags'>
      <label>Теги</label>
      <select multiple value={selectedTagIds} onChange={handleTagChange}>
        {allTags.map(tag => (
          <option
            key={tag.id}
            value={tag.id}
            className={isTagSelectedForNews(tag.id) ? 'selected' : ''}
          >
            {tag.title}
          </option>

        ))}
      </select>
    </div>
  );
};