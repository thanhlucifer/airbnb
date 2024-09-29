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
import AdminTemplate from '../template/AdminTemplate/AdminTemplate';
import { Skeleton } from 'antd';

const PageNotFound = React.lazy(() => import('../components/PageNotFound/PageNotFound'));
const ManagerRoom = React.lazy(() => import('../page/AdminPage/ManagerRoom/ManagerRoom'));
const ManagerLocation = React.lazy(() => import('../page/AdminPage/ManagerLocation/ManagerLocation'));
const ManagerUser = React.lazy(() => import('../page/AdminPage/ManagerUser/ManagerUser'));

const useRoutesCustom = () => {
    const routes = useRoutes([
        {
            path: path.home,
            element: <UserTemplate />,
            children: [
                {
                    index: '/',
                    element: <Suspense fallback={<Skeleton />}><DefaultPage /></Suspense>,
                },
                {
                    path: path.listphong,
                    element: <Suspense fallback={<Skeleton />}><RentalRoomList /></Suspense>
                },
                {
                    path: path.chitietphong,
                    element: <Suspense fallback={<Skeleton />}><RoomDetail /></Suspense>
                },
                {
                    path: path.signin,
                    element: <Suspense fallback={<Skeleton />}><LoginPage /></Suspense>
                },
                {
                    path: path.signup,
                    element: <Suspense fallback={<Skeleton />}><RegisterPage /></Suspense>
                },
                {
                    path: path.profile,
                    element: <Suspense fallback={<Skeleton />}><Profile /></Suspense>
                },
                {
                    path: '*',
                    element: <Suspense fallback={<Skeleton />}><PageNotFound /></Suspense>
                }
                
            ]
        },
        {
            path: path.admin,
            element: <AdminTemplate/>,
            children: [
                {
                    index: '/',
                    element: <Suspense fallback={<Skeleton />}><ManagerUser /></Suspense>
                },
                {
                    path: 'manager-room',
                    element: <Suspense fallback={<Skeleton />}><ManagerRoom /></Suspense>
                },
                {
                    path: 'manager-location',
                    element: <Suspense fallback={<Skeleton />}><ManagerLocation /></Suspense>
                }
            ]
        }
    ]);
    return routes;
};

export default useRoutesCustom;
