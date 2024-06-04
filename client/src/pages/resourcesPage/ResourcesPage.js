import React, { useState } from 'react';
import './ResourcesPage.css';
import { Navbar } from '../../components/navbar/Navbar';
import { NavbarMobile } from '../../components/navbarMobile/NavbarMobile';
import files from '../../files/1.pdf'
import iconPdf from '../../img/icon_pdf.png'

export const ResourcesPage = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [fileUrl, setFileUrl] = useState('/src/files/1.pdf');

  // Функция для скачивания файла
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = files;
    link.setAttribute('download', encodeURIComponent('filename')); // Используем encodeURIComponent для кодирования имени файла
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

  return (
    <div className="resources">
      <NavbarMobile className='learnNavbarMobile' />
      <div className="wrapper">
        <Navbar className='learnNavbar'/>
        <h1>Ресурсы</h1>
        <p className="zag-text">Здесь собраны различные материалы и ресурсы</p>

        {/* Аккордеон */}
        <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
          <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
            <div className={`arrow ${isOpen ? 'open' : 'closed'}`}>
              <svg className='svg' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 22.5l13.7 3.9c.4.1.9 0 1.1-.4s.2-.8 0-1.2l-14-19c-.2-.3-.5-.4-.8-.4s-.6.2-.8.4l-14 19c-.1.3-.2.5-.2.7s.1.4.2.6c.2.4.7.5 1.1.4zm0-14.3l11.5 15.5L16 20.5 4.5 23.7z" /></svg>
            </div>
            <div className="title">Для родителей</div>
          </div>
          <div className="accordion-content">
                <div className="content-wrap">
                    <h3>Файлы</h3>
                    <div className="file-info container hov">
                        <img src={getFileIcon()} alt="file-icon" className="file-icon" />
                        <div className="file-title">Название файла</div>
                        <div className="file-container">
                            <button onClick={handleDownload}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M13 14.293l3.146-3.147a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 01.708-.708L12 14.293V3.5a.5.5 0 111 0v10.793zm7 1.207a.5.5 0 111 0v3a2.5 2.5 0 01-2.5 2.5h-12A2.5 2.5 0 014 18.5v-3a.5.5 0 111 0v3A1.5 1.5 0 006.5 20h12a1.5 1.5 0 001.5-1.5v-3z"/></svg></button>
                        </div>
                    </div>
                    <div className="file-info container">
                        <img src={getFileIcon()} alt="file-icon" className="file-icon" />
                        <div className="file-title">Название файла</div>
                        <div className="file-container">
                            <button onClick={handleDownload}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M13 14.293l3.146-3.147a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 01.708-.708L12 14.293V3.5a.5.5 0 111 0v10.793zm7 1.207a.5.5 0 111 0v3a2.5 2.5 0 01-2.5 2.5h-12A2.5 2.5 0 014 18.5v-3a.5.5 0 111 0v3A1.5 1.5 0 006.5 20h12a1.5 1.5 0 001.5-1.5v-3z"/></svg></button>
                        </div>
                    </div>
                    <div className="file-info container">
                        <img src={getFileIcon()} alt="file-icon" className="file-icon" />
                        <div className="file-title">Название файла</div>
                        <div className="file-container">
                            <button onClick={handleDownload}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M13 14.293l3.146-3.147a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 01.708-.708L12 14.293V3.5a.5.5 0 111 0v10.793zm7 1.207a.5.5 0 111 0v3a2.5 2.5 0 01-2.5 2.5h-12A2.5 2.5 0 014 18.5v-3a.5.5 0 111 0v3A1.5 1.5 0 006.5 20h12a1.5 1.5 0 001.5-1.5v-3z"/></svg></button>
                        </div>
                    </div>
                    <div className="file-info container">
                        <img src={getFileIcon()} alt="file-icon" className="file-icon" />
                        <div className="file-title">Название файла</div>
                        <div className="file-container">
                            <button onClick={handleDownload}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M13 14.293l3.146-3.147a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 01.708-.708L12 14.293V3.5a.5.5 0 111 0v10.793zm7 1.207a.5.5 0 111 0v3a2.5 2.5 0 01-2.5 2.5h-12A2.5 2.5 0 014 18.5v-3a.5.5 0 111 0v3A1.5 1.5 0 006.5 20h12a1.5 1.5 0 001.5-1.5v-3z"/></svg></button>
                        </div>
                    </div>
                </div>
                <div className="content-wrap">
                    <h3>Ссылки</h3>
                    <div className="file-info container" onClick={handleDownload}>
                        <a href="#">Название ссылки</a>
                    </div>
                    <div className="file-info container" onClick={handleDownload}>
                        <a href="#">Название ссылки</a>
                    </div>
                    <div className="file-info container" onClick={handleDownload}>
                        <a href="#">Название ссылки</a>
                    </div>

                    <div className="file-info container" onClick={handleDownload}>
                        <a href="#">Название ссылки</a>
                    </div><div className="file-info container" onClick={handleDownload}>
                        <a href="#">Название ссылки</a>
                    </div>
                </div>
          </div>
        </div>
        <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
          <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
            <div className={`arrow ${isOpen ? 'open' : 'closed'}`}>
              <svg className='svg' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 22.5l13.7 3.9c.4.1.9 0 1.1-.4s.2-.8 0-1.2l-14-19c-.2-.3-.5-.4-.8-.4s-.6.2-.8.4l-14 19c-.1.3-.2.5-.2.7s.1.4.2.6c.2.4.7.5 1.1.4zm0-14.3l11.5 15.5L16 20.5 4.5 23.7z" /></svg>
            </div>
            <div className="title">Для детей</div>
          </div>
          <div className="accordion-content">
                <div className="content-wrap">
                    <h3>Файлы</h3>
                    <div className="file-info container hov">
                        <img src={getFileIcon()} alt="file-icon" className="file-icon" />
                        <div className="file-title">Название файла</div>
                        <div className="file-container">
                            <button onClick={handleDownload}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M13 14.293l3.146-3.147a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 01.708-.708L12 14.293V3.5a.5.5 0 111 0v10.793zm7 1.207a.5.5 0 111 0v3a2.5 2.5 0 01-2.5 2.5h-12A2.5 2.5 0 014 18.5v-3a.5.5 0 111 0v3A1.5 1.5 0 006.5 20h12a1.5 1.5 0 001.5-1.5v-3z"/></svg></button>
                        </div>
                    </div>
                    <div className="file-info container">
                        <img src={getFileIcon()} alt="file-icon" className="file-icon" />
                        <div className="file-title">Название файла</div>
                        <div className="file-container">
                            <button onClick={handleDownload}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M13 14.293l3.146-3.147a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 01.708-.708L12 14.293V3.5a.5.5 0 111 0v10.793zm7 1.207a.5.5 0 111 0v3a2.5 2.5 0 01-2.5 2.5h-12A2.5 2.5 0 014 18.5v-3a.5.5 0 111 0v3A1.5 1.5 0 006.5 20h12a1.5 1.5 0 001.5-1.5v-3z"/></svg></button>
                        </div>
                    </div>
                    <div className="file-info container">
                        <img src={getFileIcon()} alt="file-icon" className="file-icon" />
                        <div className="file-title">Название файла</div>
                        <div className="file-container">
                            <button onClick={handleDownload}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M13 14.293l3.146-3.147a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 01.708-.708L12 14.293V3.5a.5.5 0 111 0v10.793zm7 1.207a.5.5 0 111 0v3a2.5 2.5 0 01-2.5 2.5h-12A2.5 2.5 0 014 18.5v-3a.5.5 0 111 0v3A1.5 1.5 0 006.5 20h12a1.5 1.5 0 001.5-1.5v-3z"/></svg></button>
                        </div>
                    </div>
                    <div className="file-info container">
                        <img src={getFileIcon()} alt="file-icon" className="file-icon" />
                        <div className="file-title">Название файла</div>
                        <div className="file-container">
                            <button onClick={handleDownload}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M13 14.293l3.146-3.147a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 01.708-.708L12 14.293V3.5a.5.5 0 111 0v10.793zm7 1.207a.5.5 0 111 0v3a2.5 2.5 0 01-2.5 2.5h-12A2.5 2.5 0 014 18.5v-3a.5.5 0 111 0v3A1.5 1.5 0 006.5 20h12a1.5 1.5 0 001.5-1.5v-3z"/></svg></button>
                        </div>
                    </div>
                </div>
                <div className="content-wrap">
                    <h3>Ссылки</h3>
                    <div className="file-info container" onClick={handleDownload}>
                        <a href="#">Название ссылки</a>
                    </div>
                    <div className="file-info container" onClick={handleDownload}>
                        <a href="#">Название ссылки</a>
                    </div>
                    <div className="file-info container" onClick={handleDownload}>
                        <a href="#">Название ссылки</a>
                    </div>

                    <div className="file-info container" onClick={handleDownload}>
                        <a href="#">Название ссылки</a>
                    </div><div className="file-info container" onClick={handleDownload}>
                        <a href="#">Название ссылки</a>
                    </div>
                </div>
          </div>
        </div>
        <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
          <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
            <div className={`arrow ${isOpen ? 'open' : 'closed'}`}>
              <svg className='svg' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 22.5l13.7 3.9c.4.1.9 0 1.1-.4s.2-.8 0-1.2l-14-19c-.2-.3-.5-.4-.8-.4s-.6.2-.8.4l-14 19c-.1.3-.2.5-.2.7s.1.4.2.6c.2.4.7.5 1.1.4zm0-14.3l11.5 15.5L16 20.5 4.5 23.7z" /></svg>
            </div>
            <div className="title">Для мед. специалистов</div>
          </div>
          <div className="accordion-content">
                <div className="content-wrap">
                    <h3>Файлы</h3>
                    <div className="file-info container hov">
                        <img src={getFileIcon()} alt="file-icon" className="file-icon" />
                        <div className="file-title">Название файла</div>
                        <div className="file-container">
                            <button onClick={handleDownload}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M13 14.293l3.146-3.147a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 01.708-.708L12 14.293V3.5a.5.5 0 111 0v10.793zm7 1.207a.5.5 0 111 0v3a2.5 2.5 0 01-2.5 2.5h-12A2.5 2.5 0 014 18.5v-3a.5.5 0 111 0v3A1.5 1.5 0 006.5 20h12a1.5 1.5 0 001.5-1.5v-3z"/></svg></button>
                        </div>
                    </div>
                    <div className="file-info container">
                        <img src={getFileIcon()} alt="file-icon" className="file-icon" />
                        <div className="file-title">Название файла</div>
                        <div className="file-container">
                            <button onClick={handleDownload}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M13 14.293l3.146-3.147a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 01.708-.708L12 14.293V3.5a.5.5 0 111 0v10.793zm7 1.207a.5.5 0 111 0v3a2.5 2.5 0 01-2.5 2.5h-12A2.5 2.5 0 014 18.5v-3a.5.5 0 111 0v3A1.5 1.5 0 006.5 20h12a1.5 1.5 0 001.5-1.5v-3z"/></svg></button>
                        </div>
                    </div>
                    <div className="file-info container">
                        <img src={getFileIcon()} alt="file-icon" className="file-icon" />
                        <div className="file-title">Название файла</div>
                        <div className="file-container">
                            <button onClick={handleDownload}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M13 14.293l3.146-3.147a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 01.708-.708L12 14.293V3.5a.5.5 0 111 0v10.793zm7 1.207a.5.5 0 111 0v3a2.5 2.5 0 01-2.5 2.5h-12A2.5 2.5 0 014 18.5v-3a.5.5 0 111 0v3A1.5 1.5 0 006.5 20h12a1.5 1.5 0 001.5-1.5v-3z"/></svg></button>
                        </div>
                    </div>
                    <div className="file-info container">
                        <img src={getFileIcon()} alt="file-icon" className="file-icon" />
                        <div className="file-title">Название файла</div>
                        <div className="file-container">
                            <button onClick={handleDownload}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M13 14.293l3.146-3.147a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 01.708-.708L12 14.293V3.5a.5.5 0 111 0v10.793zm7 1.207a.5.5 0 111 0v3a2.5 2.5 0 01-2.5 2.5h-12A2.5 2.5 0 014 18.5v-3a.5.5 0 111 0v3A1.5 1.5 0 006.5 20h12a1.5 1.5 0 001.5-1.5v-3z"/></svg></button>
                        </div>
                    </div>
                </div>
                <div className="content-wrap">
                    <h3>Ссылки</h3>
                    <div className="file-info container" onClick={handleDownload}>
                        <a href="#">Название ссылки</a>
                    </div>
                    <div className="file-info container" onClick={handleDownload}>
                        <a href="#">Название ссылки</a>
                    </div>
                    <div className="file-info container" onClick={handleDownload}>
                        <a href="#">Название ссылки</a>
                    </div>

                    <div className="file-info container" onClick={handleDownload}>
                        <a href="#">Название ссылки</a>
                    </div><div className="file-info container" onClick={handleDownload}>
                        <a href="#">Название ссылки</a>
                    </div>
                </div>
          </div>
        </div>
        <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
          <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
            <div className={`arrow ${isOpen ? 'open' : 'closed'}`}>
              <svg className='svg' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 22.5l13.7 3.9c.4.1.9 0 1.1-.4s.2-.8 0-1.2l-14-19c-.2-.3-.5-.4-.8-.4s-.6.2-.8.4l-14 19c-.1.3-.2.5-.2.7s.1.4.2.6c.2.4.7.5 1.1.4zm0-14.3l11.5 15.5L16 20.5 4.5 23.7z" /></svg>
            </div>
            <div className="title">Для пользователей</div>
          </div>
          <div className="accordion-content">
                <div className="content-wrap">
                    <h3>Файлы</h3>
                    <div className="file-info container hov">
                        <img src={getFileIcon()} alt="file-icon" className="file-icon" />
                        <div className="file-title">Название файла</div>
                        <div className="file-container">
                            <button onClick={handleDownload}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M13 14.293l3.146-3.147a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 01.708-.708L12 14.293V3.5a.5.5 0 111 0v10.793zm7 1.207a.5.5 0 111 0v3a2.5 2.5 0 01-2.5 2.5h-12A2.5 2.5 0 014 18.5v-3a.5.5 0 111 0v3A1.5 1.5 0 006.5 20h12a1.5 1.5 0 001.5-1.5v-3z"/></svg></button>
                        </div>
                    </div>
                    <div className="file-info container">
                        <img src={getFileIcon()} alt="file-icon" className="file-icon" />
                        <div className="file-title">Название файла</div>
                        <div className="file-container">
                            <button onClick={handleDownload}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M13 14.293l3.146-3.147a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 01.708-.708L12 14.293V3.5a.5.5 0 111 0v10.793zm7 1.207a.5.5 0 111 0v3a2.5 2.5 0 01-2.5 2.5h-12A2.5 2.5 0 014 18.5v-3a.5.5 0 111 0v3A1.5 1.5 0 006.5 20h12a1.5 1.5 0 001.5-1.5v-3z"/></svg></button>
                        </div>
                    </div>
                    <div className="file-info container">
                        <img src={getFileIcon()} alt="file-icon" className="file-icon" />
                        <div className="file-title">Название файла</div>
                        <div className="file-container">
                            <button onClick={handleDownload}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M13 14.293l3.146-3.147a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 01.708-.708L12 14.293V3.5a.5.5 0 111 0v10.793zm7 1.207a.5.5 0 111 0v3a2.5 2.5 0 01-2.5 2.5h-12A2.5 2.5 0 014 18.5v-3a.5.5 0 111 0v3A1.5 1.5 0 006.5 20h12a1.5 1.5 0 001.5-1.5v-3z"/></svg></button>
                        </div>
                    </div>
                    <div className="file-info container">
                        <img src={getFileIcon()} alt="file-icon" className="file-icon" />
                        <div className="file-title">Название файла</div>
                        <div className="file-container">
                            <button onClick={handleDownload}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M13 14.293l3.146-3.147a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 01.708-.708L12 14.293V3.5a.5.5 0 111 0v10.793zm7 1.207a.5.5 0 111 0v3a2.5 2.5 0 01-2.5 2.5h-12A2.5 2.5 0 014 18.5v-3a.5.5 0 111 0v3A1.5 1.5 0 006.5 20h12a1.5 1.5 0 001.5-1.5v-3z"/></svg></button>
                        </div>
                    </div>
                </div>
                <div className="content-wrap">
                    <h3>Ссылки</h3>
                    <div className="file-info container" onClick={handleDownload}>
                        <a href="#">Название ссылки</a>
                    </div>
                    <div className="file-info container" onClick={handleDownload}>
                        <a href="#">Название ссылки</a>
                    </div>
                    <div className="file-info container" onClick={handleDownload}>
                        <a href="#">Название ссылки</a>
                    </div>

                    <div className="file-info container" onClick={handleDownload}>
                        <a href="#">Название ссылки</a>
                    </div><div className="file-info container" onClick={handleDownload}>
                        <a href="#">Название ссылки</a>
                    </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}