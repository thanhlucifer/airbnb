import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import UserTemplate from '../template/UserTemplate/UserTemplate';
import {path} from '../common/path';
import RentalRoomList from '../page/RentalRoomList/RentalRoomList ';
import DefaultPage from '../page/DefaultPage/DefaultPage';
import RoomDetail from '../page/RoomDetail/RoomDetail';
import LoginPage from '../page/LoginPage/LoginPage';
import RegisterPage from '../page/RegisterPage/RegisterPage';
import Profile from '../page/ProfilePage/Profile';
const PageNotFound = React.lazy(() => import('../components/PageNotFound/PageNotFound'));

const useRoutesCustom = () => {
    const routes = useRoutes([
        {
            path: path.home,
            element: <UserTemplate />,
            children: [
                {
                    index: '/',
                    element: <DefaultPage/>,
                },
                {
                    path: path.listphong,
                    element: <RentalRoomList/> 
                },
                {
                    path: path.chitietphong,
                    element: <RoomDetail/>
                },
                {
                    path: path.signin,
                    element: <LoginPage />
                },
                {
                    path: path.signup,
                    element: <RegisterPage />
                },
                {
                    path: path.profile,
                    element: <Profile/>
                }
                
            ]
        },
    ]);
    return routes;
};

export default useRoutesCustom;
