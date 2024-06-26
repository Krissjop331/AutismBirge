import React from 'react'
import './Header.css'
import { Navbar } from '../navbar/Navbar'
import { NavbarMobile } from '../navbarMobile/NavbarMobile'
import { Link } from 'react-router-dom'


export const Header = () => {

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substr(0, maxLength);
  };

  const truncateAndAddReadMore = (text, maxLength) => {
      const hasTruncated = text.length > maxLength;
      const truncatedText = hasTruncated ? text.substring(0, maxLength) : text;
      const lastSpaceIndex = truncatedText.lastIndexOf(' ');
      const truncatedTextWithReadMore = truncatedText.substring(0, lastSpaceIndex);
      const readMoreLink = hasTruncated &&  <Link to="/news/1"><br /><button className="buttonM">Подробнее</button></Link>;

      // Разделение текста на строки с использованием '<br />'
      const splitText = truncatedTextWithReadMore.split('\n').map((line, index, array) => (
          <React.Fragment key={index}>
              {line}
              {index !== array.length - 1 && <br />} {/* Добавить <br /> после каждой строки, кроме последней */}
          </React.Fragment>
      ));

      return (
          <>
              {splitText}
              {readMoreLink}
          </>
      );
  };

  let maxLength;
    if (window.innerWidth <= 800) {
        maxLength = 400; // Для размера экрана менее или равного 800px
    } else if (window.innerWidth <= 750) {
        maxLength = 200; // Для размера экрана менее или равного 700px
    } else {
        maxLength = 500; // Для всех остальных размеров экрана
    }
  
  return (
    <header className='header' id='header'>
        <Navbar />
        <NavbarMobile />
        {/* <h1>Мероприятие интеграции детей с расстройствами аутистического спектра</h1>
        <p>{truncateAndAddReadMore(`
                                    Все больше и больше людей заинтересованы в нашем проекте! Наша команда была приглашена на обсуждение вопросов создания инклюзивного общества в высших учебных заведениях, организатором которого является Казахский национальный педагогический университет имени Абая. Присоединяйтесь к увлекательному круглому столу о теме «Инклюзия и социальная адаптация студентов»! 🌟\n
                                    📅 Дата: 25 апреля 2024 г.\n
                                    🕒 Время: 09:30-16:30\n
                                    📍 Место: Казахский национальный педагогический университет имени Абая, г. Алматы, проспект Достык 13, конференц-зал 202\n
                                    💻 Формат: офлайн/онлайн\n
                                    🔍 В ходе мероприятия будут обсуждаться вопросы интеграции детей с расстройствами аутистического спектра в образовательную среду. Присоединяйтесь к выступлениям руководителя проекта Ляззат Кошербаевой, Айжан Самамбаевой и Лауры Кожагельдиевой из SDU, которые поделятся основными результатами своего проекта.\n
                                    Присоединяйтесь к обсуждению важных тем над созданием более инклюзивной образовательной среды! Регистрация по ссылке в профиле.
        `, maxLength)}</p> */}
    </header>
  )
}
