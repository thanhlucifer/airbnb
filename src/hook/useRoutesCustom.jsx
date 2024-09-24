import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import UserTemplate from '../template/UserTemplate/UserTemplate';
import {path} from '../common/path';
import RentalRoomList from '../page/RentalRoomList/RentalRoomList ';
import DefaultPage from '../page/DefaultPage/DefaultPage';
import RoomDetail from '../page/RoomDetail/RoomDetail';
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
                }
                
            ]
        },
    ]);
    return routes;
};

export default useRoutesCustom;
