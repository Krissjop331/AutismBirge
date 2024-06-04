import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../../../components/navbar/Navbar";
import { NavbarMobile } from "../../../components/navbarMobile/NavbarMobile";
import { fetchForumTopics, getForum } from "../../../http/forumAPI";
import authorImage from "../../../img/black_logo_mobile.svg";
import "./ForumItem.css";
import dayjs from "dayjs";
import { useVisit } from "../../../hooks/useVisit";

export const ForumItem = () => {
  const imagePath = `${process.env.PUBLIC_URL}/static/media/black_logo_mobile.svg`;
  const { id } = useParams();
  useVisit(`ForumItemPage-${id}`);
  const [topics, setTopics] = useState();
  const [forum, setForum] = useState();
  useEffect(() => {
    getForum(id).then((data) => setForum(data.forums));
  }, []);

  useEffect(() => {
    fetchForumTopics(id).then((data) => setTopics(data));
  }, []);
  console.log(forum?.Topics);

  return (
    <div className="forum">
      <NavbarMobile className="learnNavbarMobile" />
      <div className="wrapper vertical-flex">
        {" "}
        <Navbar className="learnNavbar" />
        <h1>Название форума : {forum?.title} </h1>
        <p className="desc" style={{ marginTop: 10 }}>
          {forum?.description}
        </p>
        {/* <FilterBlock />    */}
        <hr />
        <div className="topics_container">
          {forum?.Topics.length == 0 && (
            <span style={{ marginTop: 10, fontSize: 28, color: "gray" }}>
              Нет тем.
            </span>
          )}
          {forum &&
            forum?.Topics.map((topic) => (
              <Topic {...topic} comments={topics?.comments?.length} />
            ))}
        </div>
      </div>
    </div>
  );
};
const Topic = ({
  authorId,
  createdAt,
  description,
  dislikes,
  id,
  likes,
  looked,
  slug,
  status,
  title,
  User,
  comments,
}) => {
  return (
    <div className="topics">
      <div className="author">
        <img src={"/img/black_logo_mobile.svg"} alt="" />
        <div className="info_author">
          <Link to={`/topics/${id}`}>
            <p className="title_text">{title}</p>
          </Link>
          <div className="flex-gor">
            <p className="small_text">
              <Link to={`/user/${authorId}`}>
                {User.first_name} {User.last_name}
              </Link>
            </p>
          </div>
          <p>
            Статус - <span>{status == "open" ? "Открыто" : "Закрыто"}</span>
          </p>
        </div>
      </div>
      <div className="info_topics">
        <div>
          <p>
            Комментарии: <span>{comments}</span>
          </p>
          <p>
            Просмотры: <span>{looked}</span>
          </p>
        </div>
        <div>
          <p>{dayjs(Date.now()).diff(dayjs(createdAt), "minute")} минут</p>
          <Link to="/user/:id" className="small_text">
            Uxy
          </Link>
        </div>
        <img src={authorImage} alt="" />
      </div>
      <div className="info"></div>
    </div>
  );
};
