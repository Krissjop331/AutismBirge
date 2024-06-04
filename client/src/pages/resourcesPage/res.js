import React, { useState, useEffect } from 'react';
import { $host } from '../../http';
import './ResourcesPage.css';
import { NavbarMobile } from '../../components/navbarMobile/NavbarMobile';
import { Navbar } from '../../components/navbar/Navbar';
import iconPdf from '../../img/icon_pdf.png';

export const Res = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(null);
  const [fileUrl, setFileUrl] = useState('/src/files/1.pdf');

  // Функция для скачивания файла
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

  // Получить иконку файла в зависимости от расширения
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

  useEffect(() => {
    const fetchModulesAndResources = async () => {
      try {
        const modulesResponse = await $host.get('/module');
        const resourcesResponse = await $host.get('/resources');

        const modulesData = modulesResponse.data.module;
        const resourcesData = resourcesResponse.data.resources;

        // Обновляем модули, добавляя к каждому модулю ресурсы с соответствующим module_id
        const updatedModules = modulesData.map((module) => ({
          ...module,
          resources: resourcesData.filter((resource) => resource.ResourcesModule.id === module.id),
        }));

        setModules(updatedModules);
        setLoading(false);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
        setLoading(false);
      }
    };

    fetchModulesAndResources();
  }, []);

  return (
    <div className='resources'>
      <NavbarMobile className='learnNavbarMobile' />
      <div className="wrapper">
        <Navbar className='learnNavbar' />
        <h1>Ресурсы</h1>
        <p className="zag-text">Данный раздел предназначен для ознакомления с различной информацией, а также для получения различных ресурсов</p>

        {loading ? (
          <p>Загрузка модулей...</p>
        ) : (
          modules.map((module, index) => (
            <div key={module.id}>
              <div className={`accordion-item ${isOpen === index ? 'open' : ''}`}>
                <div className="accordion-header" onClick={() => setIsOpen(isOpen === index ? null : index)}>
                  <div className={`arrow ${isOpen === index ? 'open' : 'closed'}`}>
                    <svg className='svg' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 22.5l13.7 3.9c.4.1.9 0 1.1-.4s.2-.8 0-1.2l-14-19c-.2-.3-.5-.4-.8-.4s-.6.2-.8.4l-14 19c-.1.3-.2.5-.2.7s.1.4.2.6c.2.4.7.5 1.1.4zm0-14.3l11.5 15.5L16 20.5 4.5 23.7z" />
                    </svg>
                  </div>
                  <h2 className='title'>{module.module}</h2>
                </div>
                <div className="accordion-content">
                  {module.resources.length > 0 ? (
                    <>

                      {module.resources.some(resource => resource.file_patch) && (
                        <div className='content-wrap'>
                          <h3>Файлы</h3>
                          <ul>
                            {module.resources.map(resource => resource.file_patch && (
                              <li key={resource.id}>
                                <div className="file-info containers">
                                  <img src={getFileIcon()} alt="file-icon" className="file-icon" />
                                  {resource.title}
                                  <div className="file-containers">
                                    <button onClick={() => handleDownload(resource.file_patch)}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                                        <path d="M13 14.293l3.146-3.147a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 01.708-.708L12 14.293V3.5a.5.5 0 111 0v10.793zm7 1.207a.5.5 0 111 0v3a2.5 2.5 0 01-2.5 2.5h-12A2.5 2.5 0 014 18.5v-3a.5.5 0 111 0v3A1.5 1.5 0 006.5 20h12a1.5 1.5 0 001.5-1.5v-3z" />
                                      </svg>
                                    </button>

                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {module.resources.some(resource => resource.description) && (
                        <div className='content-wrap'>
                          <h3>Тексты и ресурсы</h3>
                          <ul>{module.resources.map(resource => resource.url && (
                            <li key={resource.id}>
                              <div className="file-info container">
                                {module.resources.map(resource => resource.description && (
                                  <li key={resource.id}>
                                    <div className="file-info container">
                                      <h4>title:{resource.title}</h4>
                                      <p>description: {resource.description}</p>
                                      {resource.url_description ? (
                                        <p>url_description: {resource.url_description}</p>
                                      ) : (
                                        <p>url_description пустой!</p>
                                      )}
                                      <a href={resource.url}>Ссылка:{resource.url}</a>
                                    </div>
                                  </li>
                                ))}

                              </div>
                            </li>
                          ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <p>Этот модуль пустой</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};