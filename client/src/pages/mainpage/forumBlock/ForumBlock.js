import React, { useEffect } from "react";
import "./ForumBlock.css";
import { ForumItem } from "../forumItem/ForumItem";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { fetchForumData } from "../../../store/forumReducer";

export const ForumBlock = () => {
  const { forums } = useSelector((state) => state.forum);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchForumData());
  }, []);

  return (
    <div className="forumBlock">
      <div className="wrapper">
        <h2>Forum</h2>
        <div className="forumCards">
          {forums ? forums.map((item) => (
            <ForumItem key={item.id} item={item} status="img" />
          )) : <h3>Форумов нет</h3>}
        </div>
      </div>
    </div>
  );
};
