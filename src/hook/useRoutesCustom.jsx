import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import UserTemplate from '../template/UserTemplate/UserTemplate';
import {path} from '../common/path';
const PageNotFound = React.lazy(() => import('../components/PageNotFound/PageNotFound'));

const useRoutesCustom = () => {
    const routes = useRoutes([
        {
            path: path.home,
            element: <UserTemplate />,
            children: [
                
            ]
        },
    ]);
    return routes;
};

export default useRoutesCustom;
