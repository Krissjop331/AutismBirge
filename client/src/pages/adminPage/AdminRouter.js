import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Forum } from './Forum/Forum';
import { Learn } from './Learn/Learn';
import { Users } from './users/Users';
import { EditForum } from './Forum/EditForum';
import UserBlank from './users/UserBlank';
import { RegisterPage } from './registerPage/RegisterPage';
import { Applications } from './applications/Applications';
import { Createresources } from './createresources/createresources';
import { Visit } from './visit/visit';
import { CreateNews } from './news/createnews';
import { Newsand } from './news/newsand/Newsand';
import TagsListPage from './news/tags/tagslist';
import { UpdateNews } from './news/Update/update';
import withAuth from '../../http/WithAuth';
import { CreateForum } from './Forum/CreateForum';

// Применяем HOC к каждому маршруту
const ForumWithAuth = withAuth(Forum, ['admin']);
const LearnWithAuth = withAuth(Learn, ['admin']);
const UsersWithAuth = withAuth(Users, ['admin']);
const EditForumWithAuth = withAuth(EditForum, ['admin']);
const UserBlankWithAuth = withAuth(UserBlank, ['admin']);
const RegisterPageWithAuth = withAuth(RegisterPage, ['admin']);
const ApplicationsWithAuth = withAuth(Applications, ['admin']);
const CreateresourcesWithAuth = withAuth(Createresources, ['admin']);
const VisitWithAuth = withAuth(Visit, ['admin']);
const CreateNewsWithAuth = withAuth(CreateNews, ['admin']);
const NewsandWithAuth = withAuth(Newsand, ['admin']);
const TagsListPageWithAuth = withAuth(TagsListPage, ['admin']);
const UpdateNewsWithAuth = withAuth(UpdateNews, ['admin']);
const CreateForumWithAuth = withAuth(CreateForum, ['admin']);

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={ <Navigate to="/admin/forum" /> } />
      
      <Route path="/forum" element={ <ForumWithAuth /> } />
      <Route path="/forum/create" element={ <CreateForumWithAuth /> } />
      <Route path="/forum/edit" element={ <EditForumWithAuth /> } />
      
      <Route path="/users" element={ <UsersWithAuth /> } />
      <Route path="/users/edit" element={ <UserBlankWithAuth /> } />
      <Route path="/users/create" element={ <UserBlankWithAuth /> } />

      <Route path="/learn" element={ <LearnWithAuth /> } />
      <Route path="/forum/blank" element={ <LearnWithAuth /> } />

      <Route path="/register" element={ <RegisterPageWithAuth /> } />

      <Route path="/createresources" element={ <CreateresourcesWithAuth /> } />
      
      <Route path="/applications" element={ <ApplicationsWithAuth /> } />
      <Route path="/news" element={ <CreateNewsWithAuth /> } />

      <Route path="/visit" element={ <VisitWithAuth /> } />
      
      <Route path="/createtags" element={ <TagsListPageWithAuth /> } />
      <Route path="/updatenews" element={ <UpdateNewsWithAuth /> } />
    </Routes>
  );
};
