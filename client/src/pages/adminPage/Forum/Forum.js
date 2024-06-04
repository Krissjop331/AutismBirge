import React, { useEffect } from "react";
import "./Forum.css";
import { AdminForumItem } from "./ForumItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchForumData } from "../../../store/forumReducer";
import withAuth from "../../../http/WithAuth"; // Импортируйте withAuth из вашего пути

export const Forum = () => {
  const { forums } = useSelector((state) => state.forum);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchForumData());
  }, []);
  const itemCaption = {
    id: "id",
    title: "Title",
    description: "Description",
    addTopic: "Add topic",
  };

  return (
    <div className="adminForum">
      <h2>Все форумы</h2>

      <div className="forumHead">
        <AdminForumItem className={"head"} item={itemCaption} />
        {forums.map((item) => (
          <AdminForumItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// Оборачиваем компонент Forum в withAuth
export default withAuth(Forum, ['admin']);
