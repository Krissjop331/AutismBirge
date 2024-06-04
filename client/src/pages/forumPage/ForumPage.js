import React from "react";
import "./ForumPage.css";
import { useVisit } from "../../hooks/useVisit";

export const ForumPage = () => {
  useVisit("ForumPage");
  return <div>Страница Форума</div>;
};
