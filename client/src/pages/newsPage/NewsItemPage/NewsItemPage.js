import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { $host } from '../../../http';
import './NewsItemPage.css';
import { NavbarMobile } from '../../../components/navbarMobile/NavbarMobile';
import { Navbar } from '../../../components/navbar/Navbar';
import { Link } from 'react-router-dom';
import iconPdf from '../../../img/icon_pdf.png';

export const NewsItemPages = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [tags, setTags] = useState([]);
  const [resources, setResources] = useState([]);
  const [error, setError] = useState(null);
  const [fileUrl, setFileUrl] = useState('/src/files/Программа круглого стола 2504.pdf');

  const handleDownload = (filePatch) => {
    const relativePath = filePatch.substring(filePatch.indexOf('/stories')); // Получаем относительный путь от корня папки public
    const link = document.createElement('a');
    link.href = process.env.PUBLIC_URL + relativePath; // Используем относительный путь
    link.setAttribute('download', relativePath.substring(relativePath.lastIndexOf('/') + 1)); // Используем имя файла из относительного пути
    document.body.appendChild(link);
    link.click();
  };

  const getFileExtension = () => {
    return fileUrl.split('.').pop().toLowerCase();
  };

  const getNewsDetail = async (id) => {
    try {
      const response = await $host.get(`/news/${id}`);
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении подробной информации о новости', error);
      throw error;
    }
  };



  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const data = await getNewsDetail(id);
        setNews(data.news);
        setTags([data.newsTags]);
        console.log([data]);
        setResources(data.newsResources);
      } catch (error) {
        setError('Ошибка при загрузке подробной информации о новости');
      }
    };

    fetchNewsDetail();
  }, [id]);

  const getFileIcon = () => {
    const extension = getFileExtension();
    switch (extension) {
      case 'pdf':
        return iconPdf;
      case 'html':
        return '/path/to/html-icon.png';
      default:
        return null;
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!news) {
    return <div>Загрузка...</div>;
  }

  const fileResources = resources.filter(resource => resource.NewsResource.type === "file");
  const urlResources = resources.filter(resource => resource.NewsResource.type === "url");


  return (
    <div className='resources'>
      <NavbarMobile className='learnNavbarMobile' />
      <div className="wrapper">
        <Navbar className='learnNavbar' />
        <div className="news_item">
          <h1>{news.title}</h1>
          <div className="small_info">
            <p className="date">📅 {new Date(news.createdAt).toLocaleDateString()}</p>
            <div className="tags">
              {tags.map(tag => (
                tag.map(t => (
                  t && t.Tag && t.Tag.title && (
                    <Link key={t.tag_id} to={`/tags/${t.Tag.id}`}>#{t.Tag.title}</Link>
                  )
                ))
              ))}
            </div>
          </div>
          <p>{news.description}</p>

          <h3>Файлы</h3>
          <div className="files">
            {fileResources.map(resource => (
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }} key={resource.id}>
                <img src={getFileIcon()} alt="file-icon" className="file-icon" />
                <div className="file-title">
                  <p>{resource.NewsResource.title}</p>
                </div>
                <div className="file-container">
                  <button onClick={() => handleDownload(resource.NewsResource.url)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                      <path d="M13 14.293l3.146-3.147a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 01.708-.708L12 14.293V3.5a.5.5 0 111 0v10.793zm7 1.207a.5.5 0 111 0v3a2.5 2.5 0 01-2.5 2.5h-12A2.5 2.5 0 014 18.5v-3a.5.5 0 111 0v3A1.5 1.5 0 006.5 20h12a1.5 1.5 0 001.5-1.5v-3z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <h3>Ссылки</h3>
          <div className="files">
            {urlResources.map(resource => (
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }} key={resource.id}>
                <img src={getFileIcon()} alt="file-icon" className="file-icon" />
                <div className="file-title">
                  <p>{resource.NewsResource.title}</p>
                </div>
                <div className="file-container">
                  <a href={resource.NewsResource.url} target="_blank" rel="noopener noreferrer">
                    Открыть ссылку
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};