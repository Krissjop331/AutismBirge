import { Route, Routes, useLocation, Navigate } from "react-router-dom"
import { ADMIN_ROUTE, FORUM_ITEM, FORUM_ROUTE, HOME_ROUTE, LEARN_ROUTE, LOGIN_ROUTE, NEWS_ROUTE, PROFILE_ROUTE, RESOURCES_ROUTE, TOPICS_ROUTE } from "../consts"
import { ForumPage } from "../pages/forumPage/ForumPage"
import { LearnPage } from "../pages/learnPage/LearnPage"
import { LoginPage } from "../pages/loginPage/LoginPage"
import { MainPage } from "../pages/mainpage/MainPage"
import { Header } from "./header/Header"
import { Footer } from "./footer/Footer"
import { AdminPage } from "../pages/adminPage/AdminPage"
import { useSelector } from "react-redux"
import { ForumItem } from "../pages/forumPage//forumItem/ForumItem"
import { TopicsItem } from "../pages/forumPage/topicsItem/TopicsItem"
import {  NewsPages } from "../pages/newsPage/NewsPage"
import {  NewsItemPages } from "../pages/newsPage/NewsItemPage/NewsItemPage"
import { Res } from "../pages/resourcesPage/res"
import { Profile } from "../pages/adminPage/Profile/Profile"
import TagsList from "../pages/adminPage/news/tags/tagslist"
import TagsListPage from "../pages/adminPage/news/tags/tagslist"




const ProtectedRoute = ({ element, isAdmin, ...rest }) => {
    return isAdmin && element;
  };

export const AppRouter = () => {

    const {isAdmin} = useSelector(state => state.main)

    const location = useLocation();

    const headerRoutes = [ LOGIN_ROUTE, LEARN_ROUTE, ADMIN_ROUTE, RESOURCES_ROUTE, `${FORUM_ITEM}/:id`, `${TOPICS_ROUTE}/:id`, `${NEWS_ROUTE}`, `${NEWS_ROUTE}/:id`,]

    // Проверяем, нужно ли показывать заголовок и нижний колонтитул
    const shouldShowHeader = () => {
        // Проверяем, нужно ли показывать заголовок
        console.log(location.pathname)
        if(location.pathname !== 'item/:id' && location.pathname !== '/') {
            return false
        } 
        return (
            !headerRoutes.includes(location.pathname)   // Если текущий путь не содержится в массиве headerRoutes
            // !location.pathname.startsWith('/admin') // И текущий путь не начинается с '/admin'
        );
    };

    const shouldShowFooter = () => {
        return location.pathname !== LOGIN_ROUTE ;   // Если текущий маршрут не совпадает с LOGIN_ROUTE, то показываем заголовок и нижний колонтитул
    };

    return (
        <div >
            
            <div className="appContainer">
                {shouldShowHeader() && <Header />}
                <Routes>
                    <Route path={HOME_ROUTE} element={ <MainPage /> } exact/>
                    <Route path={LOGIN_ROUTE} element={ <LoginPage /> } exact/>
                    <Route path={LEARN_ROUTE} element={ <LearnPage /> } exact/>
                    <Route path={`${FORUM_ROUTE}`} element={ <ForumPage /> } exact/>
                    <Route path={FORUM_ITEM + '/:id'} element={<ForumItem />} exact />
                    {/* <Route path={RESOURCES_ROUTE} element={ <ResourcesPage/> } exact></Route> */}
                    <Route path={RESOURCES_ROUTE} element={ <Res/> } exact></Route>
             
                    <Route path={NEWS_ROUTE} element={<NewsPages />} exact />
                    <Route path={NEWS_ROUTE + '/:id'} element={<NewsItemPages />} exact />
                    <Route path="/tags" element={<TagsListPage />} exact />
                    
                   

                    <Route path={PROFILE_ROUTE} element={<Profile />} exact />
                    <Route path={TOPICS_ROUTE + '/:id'} element={<TopicsItem />} exact />
                    <Route path='/admin/*' element={ <AdminPage /> } />
                    {/* <Route path={ADMIN_ROUTE} element={ <AdminPage /> } /> */}
                    {/* <ProtectedRoute
                        path={ADMIN_ROUTE}
                        element={<AdminPage />}
                        isAdmin={isAdmin}
                    /> */}
                </Routes>
                {shouldShowFooter() && <Footer />}
            </div>
        </div>
    )
  }
  