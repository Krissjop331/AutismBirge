import { NavbarMobile } from "../../../components/navbarMobile/NavbarMobile";
import React, { useEffect, useState } from "react";
import "./TopicsItem.css";
import { Navbar } from "../../../components/navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import Image from "../../../img/logo.svg";
import Likes from "../../../img/like-svgrepo-com.svg";
import {
  createTopicComment,
  fetchTopicApi,
  fetchTopicComments,
} from "../../../http/forumAPI";
import dayjs from "dayjs";
import { useVisit } from "../../../hooks/useVisit";

export const TopicsItem = () => {
  const { id } = useParams();
  useVisit(`TopicsItem -${id}`);
  const [selectedFile, setSelectedFile] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [textareaHeight, setTextareaHeight] = useState("auto");

  const handleTextareaChange = (event) => {
    const temporaryTextarea = document.createElement("textarea"); // Создаем временный textarea
    temporaryTextarea.style.visibility = "hidden"; // Скрываем его от пользователя
    temporaryTextarea.style.position = "absolute"; // Устанавливаем абсолютное позиционирование для корректного расчета высоты
    temporaryTextarea.style.width = event.target.offsetWidth + "px"; // Устанавливаем ширину временного textarea равной ширине основного
    temporaryTextarea.style.font = window.getComputedStyle(event.target).font; // Копируем стили шрифта
    temporaryTextarea.value = event.target.value; // Копируем текст из основного textarea
    document.body.appendChild(temporaryTextarea); // Добавляем временный textarea в DOM
    const temporaryTextareaHeight = temporaryTextarea.scrollHeight; // Получаем высоту временного textarea
    setTextareaHeight(temporaryTextareaHeight + "px"); // Устанавливаем высоту основного textarea равной высоте временного
    temporaryTextarea.remove(); // Удаляем временный textarea из DOM
  };
  const [topic, setTopic] = useState();
  const [comments, setComments] = useState();
  const fetchComments = () => {
    fetchTopicComments(id)
      .then((data) => {
        console.log(data, "refetch");

        setComments(data.commentTopics);
      })
      .catch((e) => {
        setComments([]);
      });
  };
  useEffect(() => {
    fetchTopicApi(id).then((data) => setTopic(data));
    fetchComments();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Обработчик изменения содержимого поля ввода
  const handleContentChange = (event) => {
    setContent(event.target.value);
    handleTextareaChange(event);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("content", content); // Добавляем содержимое content в formData
    fetchComments();
    try {
      // Отправляем formData на сервер или выполняем другие действия
      console.log(formData); // Проверяем содержимое formData в консоли
      createTopicComment(id, formData);
      // После успешной отправки, обновляем состояние
      setSuccessMessage("Форма успешно отправлена");
      setContent(""); // Очищаем содержимое content
      setSelectedFile(null); // Очищаем выбранный файл
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
      setErrorMessage("Ошибка отправки формы. Пожалуйста, попробуйте еще раз.");
    } finally {
      setLoading(false);
    }
    console.log(content);
    console.log(selectedFile);
  };

  const cancelFileSelection = () => {
    setSelectedFile(null);
  };
  console.log(comments);

  const topics = topic?.topics;
  return (
    <div className="container_topics">
      <NavbarMobile className="learnNavbarMobile" />
      <div className="wrapper vertical-flex">
        <Navbar className="learnNavbar" />
        <Topic {...topics} />
        <div className="comments_container">
          {comments?.length == 0 && (
            <span style={{ marginTop: 10, fontSize: 28, color: "gray" }}>
              Нет комментариев
            </span>
          )}
          {comments &&
            comments.map(({ CommentTopic }) => (
              <Comment key={CommentTopic.id} {...CommentTopic} />
            ))}

          <div className="comments form">
            <div className="comments_text">
              <form method="POST" onSubmit={handleSubmit}>
                {/* Инпут для выбора файла */}
                <div data-file>
                  <label htmlFor="fileInput" className="icon">
                    <svg
                      width="800px"
                      height="800px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      title="Выберите файл"
                    >
                      <path
                        opacity="0.5"
                        d="M2 6.94975C2 6.06722 2 5.62595 2.06935 5.25839C2.37464 3.64031 3.64031 2.37464 5.25839 2.06935C5.62595 2 6.06722 2 6.94975 2C7.33642 2 7.52976 2 7.71557 2.01738C8.51665 2.09229 9.27652 2.40704 9.89594 2.92051C10.0396 3.03961 10.1763 3.17633 10.4497 3.44975L11 4C11.8158 4.81578 12.2237 5.22367 12.7121 5.49543C12.9804 5.64471 13.2651 5.7626 13.5604 5.84678C14.0979 6 14.6747 6 15.8284 6H16.2021C18.8345 6 20.1506 6 21.0062 6.76946C21.0849 6.84024 21.1598 6.91514 21.2305 6.99383C22 7.84935 22 9.16554 22 11.7979V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V6.94975Z"
                        fill="#1C274C"
                      />
                      <path
                        d="M20 6.23751C19.9992 5.94016 19.9949 5.76263 19.9746 5.60842C19.7974 4.26222 18.7381 3.2029 17.3919 3.02567C17.1969 3 16.9647 3 16.5003 3H9.98828C10.1042 3.10392 10.2347 3.23445 10.45 3.44975L11.0003 4C11.8161 4.81578 12.2239 5.22367 12.7124 5.49543C12.9807 5.64471 13.2653 5.7626 13.5606 5.84678C14.0982 6 14.675 6 15.8287 6H16.2024C17.9814 6 19.1593 6 20 6.23751Z"
                        fill="#1C274C"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.25 10C12.25 9.58579 12.5858 9.25 13 9.25H18C18.4142 9.25 18.75 9.58579 18.75 10C18.75 10.4142 18.4142 10.75 18 10.75H13C12.5858 10.75 12.25 10.4142 12.25 10Z"
                        fill="#1C274C"
                      />
                    </svg>
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  <p>Загрузить файл</p>
                </div>
                {/* Если файл выбран, отображаем его информацию */}
                <textarea
                  placeholder="Введите комментарий"
                  type="text"
                  name="content"
                  value={content}
                  required
                  onChange={handleContentChange}
                  style={{ height: textareaHeight }}
                />

                {selectedFile && (
                  <div className="containerFiles">
                    <svg
                      width="800px"
                      height="800px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 3L13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2V3ZM19 9H20C20 8.73478 19.8946 8.48043 19.7071 8.29289L19 9ZM13.109 8.45399L14 8V8L13.109 8.45399ZM13.546 8.89101L14 8L13.546 8.89101ZM10 13C10 12.4477 9.55228 12 9 12C8.44772 12 8 12.4477 8 13H10ZM8 16C8 16.5523 8.44772 17 9 17C9.55228 17 10 16.5523 10 16H8ZM8.5 9C7.94772 9 7.5 9.44772 7.5 10C7.5 10.5523 7.94772 11 8.5 11V9ZM9.5 11C10.0523 11 10.5 10.5523 10.5 10C10.5 9.44772 10.0523 9 9.5 9V11ZM8.5 6C7.94772 6 7.5 6.44772 7.5 7C7.5 7.55228 7.94772 8 8.5 8V6ZM9.5 8C10.0523 8 10.5 7.55228 10.5 7C10.5 6.44772 10.0523 6 9.5 6V8ZM17.908 20.782L17.454 19.891L17.454 19.891L17.908 20.782ZM18.782 19.908L19.673 20.362L18.782 19.908ZM5.21799 19.908L4.32698 20.362H4.32698L5.21799 19.908ZM6.09202 20.782L6.54601 19.891L6.54601 19.891L6.09202 20.782ZM6.09202 3.21799L5.63803 2.32698L5.63803 2.32698L6.09202 3.21799ZM5.21799 4.09202L4.32698 3.63803L4.32698 3.63803L5.21799 4.09202ZM12 3V7.4H14V3H12ZM14.6 10H19V8H14.6V10ZM12 7.4C12 7.66353 11.9992 7.92131 12.0169 8.13823C12.0356 8.36682 12.0797 8.63656 12.218 8.90798L14 8C14.0293 8.05751 14.0189 8.08028 14.0103 7.97537C14.0008 7.85878 14 7.69653 14 7.4H12ZM14.6 8C14.3035 8 14.1412 7.99922 14.0246 7.9897C13.9197 7.98113 13.9425 7.9707 14 8L13.092 9.78201C13.3634 9.92031 13.6332 9.96438 13.8618 9.98305C14.0787 10.0008 14.3365 10 14.6 10V8ZM12.218 8.90798C12.4097 9.2843 12.7157 9.59027 13.092 9.78201L14 8V8L12.218 8.90798ZM8 13V16H10V13H8ZM8.5 11H9.5V9H8.5V11ZM8.5 8H9.5V6H8.5V8ZM13 2H8.2V4H13V2ZM4 6.2V17.8H6V6.2H4ZM8.2 22H15.8V20H8.2V22ZM20 17.8V9H18V17.8H20ZM19.7071 8.29289L13.7071 2.29289L12.2929 3.70711L18.2929 9.70711L19.7071 8.29289ZM15.8 22C16.3436 22 16.8114 22.0008 17.195 21.9694C17.5904 21.9371 17.9836 21.8658 18.362 21.673L17.454 19.891C17.4045 19.9162 17.3038 19.9539 17.0322 19.9761C16.7488 19.9992 16.3766 20 15.8 20V22ZM18 17.8C18 18.3766 17.9992 18.7488 17.9761 19.0322C17.9539 19.3038 17.9162 19.4045 17.891 19.454L19.673 20.362C19.8658 19.9836 19.9371 19.5904 19.9694 19.195C20.0008 18.8114 20 18.3436 20 17.8H18ZM18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362L17.891 19.454C17.7951 19.6422 17.6422 19.7951 17.454 19.891L18.362 21.673ZM4 17.8C4 18.3436 3.99922 18.8114 4.03057 19.195C4.06287 19.5904 4.13419 19.9836 4.32698 20.362L6.10899 19.454C6.0838 19.4045 6.04612 19.3038 6.02393 19.0322C6.00078 18.7488 6 18.3766 6 17.8H4ZM8.2 20C7.62345 20 7.25117 19.9992 6.96784 19.9761C6.69617 19.9539 6.59545 19.9162 6.54601 19.891L5.63803 21.673C6.01641 21.8658 6.40963 21.9371 6.80497 21.9694C7.18864 22.0008 7.65645 22 8.2 22V20ZM4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673L6.54601 19.891C6.35785 19.7951 6.20487 19.6422 6.10899 19.454L4.32698 20.362ZM8.2 2C7.65645 2 7.18864 1.99922 6.80497 2.03057C6.40963 2.06287 6.01641 2.13419 5.63803 2.32698L6.54601 4.10899C6.59545 4.0838 6.69617 4.04612 6.96784 4.02393C7.25117 4.00078 7.62345 4 8.2 4V2ZM6 6.2C6 5.62345 6.00078 5.25117 6.02393 4.96784C6.04612 4.69617 6.0838 4.59545 6.10899 4.54601L4.32698 3.63803C4.13419 4.01641 4.06287 4.40963 4.03057 4.80497C3.99922 5.18864 4 5.65645 4 6.2H6ZM5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803L6.10899 4.54601C6.20487 4.35785 6.35785 4.20487 6.54601 4.10899L5.63803 2.32698Z"
                        fill="#000000"
                      />
                    </svg>
                    <p>{selectedFile.name}</p>
                    <button type="button" onClick={cancelFileSelection}>
                      ✖
                    </button>
                  </div>
                )}
                <button type="submit" disabled={!content}>
                  Отправить
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const Topic = ({ title, description, status, createdAt, User }) => {
  return (
    <div className="topics_container">
      <h1>Название темы : {title}</h1>
      <p className="desc" style={{ marginTop: 10 }}>
        {description}
      </p>
      <div className="info_topicss">
        <div data-status>
          <p>
            Статус: <span>{status == "open" ? "Открыто" : "Закрыто"}</span>
          </p>
        </div>
        <Link to={`users/${User?.id}`}>
          <div className="author">
            <img src={Image} alt="" />.
            <div className="author_text">
              <p>{User?.first_name}</p>
              <p className="small_text">
                {dayjs(createdAt).format("YYYY-MM-DD")}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
const Comment = ({ content, likes, dislikes, createdAt, User, file_patch }) => {
  return (
    <div className="comments">
      <div className="comments_info">
        <div className="author">
          <img className="avatar" src={Image} alt="" />
          <div className="author_text">
            <p>
              {User.first_name} {User.last_name}
            </p>
            <p className="small_text">19.08.2024</p>
          </div>
        </div>
        <div className="message">
          <p>Отправлено: </p>
          <p>{dayjs(Date.now()).diff(dayjs(createdAt), "minute")} минут</p>
        </div>
      </div>
      <div className="comments_text">
        <p>{content}</p>
        {file_patch && (
          <div>
            <span>Файлы:</span>
            <div className="containerFiles">
              <svg
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 3L13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2V3ZM19 9H20C20 8.73478 19.8946 8.48043 19.7071 8.29289L19 9ZM13.109 8.45399L14 8V8L13.109 8.45399ZM13.546 8.89101L14 8L13.546 8.89101ZM10 13C10 12.4477 9.55228 12 9 12C8.44772 12 8 12.4477 8 13H10ZM8 16C8 16.5523 8.44772 17 9 17C9.55228 17 10 16.5523 10 16H8ZM8.5 9C7.94772 9 7.5 9.44772 7.5 10C7.5 10.5523 7.94772 11 8.5 11V9ZM9.5 11C10.0523 11 10.5 10.5523 10.5 10C10.5 9.44772 10.0523 9 9.5 9V11ZM8.5 6C7.94772 6 7.5 6.44772 7.5 7C7.5 7.55228 7.94772 8 8.5 8V6ZM9.5 8C10.0523 8 10.5 7.55228 10.5 7C10.5 6.44772 10.0523 6 9.5 6V8ZM17.908 20.782L17.454 19.891L17.454 19.891L17.908 20.782ZM18.782 19.908L19.673 20.362L18.782 19.908ZM5.21799 19.908L4.32698 20.362H4.32698L5.21799 19.908ZM6.09202 20.782L6.54601 19.891L6.54601 19.891L6.09202 20.782ZM6.09202 3.21799L5.63803 2.32698L5.63803 2.32698L6.09202 3.21799ZM5.21799 4.09202L4.32698 3.63803L4.32698 3.63803L5.21799 4.09202ZM12 3V7.4H14V3H12ZM14.6 10H19V8H14.6V10ZM12 7.4C12 7.66353 11.9992 7.92131 12.0169 8.13823C12.0356 8.36682 12.0797 8.63656 12.218 8.90798L14 8C14.0293 8.05751 14.0189 8.08028 14.0103 7.97537C14.0008 7.85878 14 7.69653 14 7.4H12ZM14.6 8C14.3035 8 14.1412 7.99922 14.0246 7.9897C13.9197 7.98113 13.9425 7.9707 14 8L13.092 9.78201C13.3634 9.92031 13.6332 9.96438 13.8618 9.98305C14.0787 10.0008 14.3365 10 14.6 10V8ZM12.218 8.90798C12.4097 9.2843 12.7157 9.59027 13.092 9.78201L14 8V8L12.218 8.90798ZM8 13V16H10V13H8ZM8.5 11H9.5V9H8.5V11ZM8.5 8H9.5V6H8.5V8ZM13 2H8.2V4H13V2ZM4 6.2V17.8H6V6.2H4ZM8.2 22H15.8V20H8.2V22ZM20 17.8V9H18V17.8H20ZM19.7071 8.29289L13.7071 2.29289L12.2929 3.70711L18.2929 9.70711L19.7071 8.29289ZM15.8 22C16.3436 22 16.8114 22.0008 17.195 21.9694C17.5904 21.9371 17.9836 21.8658 18.362 21.673L17.454 19.891C17.4045 19.9162 17.3038 19.9539 17.0322 19.9761C16.7488 19.9992 16.3766 20 15.8 20V22ZM18 17.8C18 18.3766 17.9992 18.7488 17.9761 19.0322C17.9539 19.3038 17.9162 19.4045 17.891 19.454L19.673 20.362C19.8658 19.9836 19.9371 19.5904 19.9694 19.195C20.0008 18.8114 20 18.3436 20 17.8H18ZM18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362L17.891 19.454C17.7951 19.6422 17.6422 19.7951 17.454 19.891L18.362 21.673ZM4 17.8C4 18.3436 3.99922 18.8114 4.03057 19.195C4.06287 19.5904 4.13419 19.9836 4.32698 20.362L6.10899 19.454C6.0838 19.4045 6.04612 19.3038 6.02393 19.0322C6.00078 18.7488 6 18.3766 6 17.8H4ZM8.2 20C7.62345 20 7.25117 19.9992 6.96784 19.9761C6.69617 19.9539 6.59545 19.9162 6.54601 19.891L5.63803 21.673C6.01641 21.8658 6.40963 21.9371 6.80497 21.9694C7.18864 22.0008 7.65645 22 8.2 22V20ZM4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673L6.54601 19.891C6.35785 19.7951 6.20487 19.6422 6.10899 19.454L4.32698 20.362ZM8.2 2C7.65645 2 7.18864 1.99922 6.80497 2.03057C6.40963 2.06287 6.01641 2.13419 5.63803 2.32698L6.54601 4.10899C6.59545 4.0838 6.69617 4.04612 6.96784 4.02393C7.25117 4.00078 7.62345 4 8.2 4V2ZM6 6.2C6 5.62345 6.00078 5.25117 6.02393 4.96784C6.04612 4.69617 6.0838 4.59545 6.10899 4.54601L4.32698 3.63803C4.13419 4.01641 4.06287 4.40963 4.03057 4.80497C3.99922 5.18864 4 5.65645 4 6.2H6ZM5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803L6.10899 4.54601C6.20487 4.35785 6.35785 4.20487 6.54601 4.10899L5.63803 2.32698Z"
                  fill="#000000"
                />
              </svg>
              <a href={`http://94.247.128.204:5000/public/${file_patch}`} download>
                {file_patch.split("/").pop()}
              </a>
            </div>
          </div>
        )}
        {/* <div className="svg">
          {likes}
          <img className="likes" src={Likes} alt="" />
          {dislikes}
          <img src={Likes} alt="" className="dislikes likes" />
        </div> */}
      </div>
    </div>
  );
};
