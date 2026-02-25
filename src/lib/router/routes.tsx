import React from 'react';
import type { PathRouteProps } from 'react-router-dom';

import History from '../pages/history';
import Profile from '../pages/profile';
import Schedule from '../pages/schedule';
import Dropoff from '../pages/schedule/dropoff';
import Pickup from '../pages/schedule/pickup';

const Home = React.lazy(() => import('../pages/home'));

export const routes: Array<PathRouteProps> = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/schedule',
    element: <Schedule />,
  },
  {
    path: '/history',
    element: <History />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/schedule/pickup',
    element: <Pickup />,
  },
  {
    path: '/schedule/dropoff',
    element: <Dropoff />,
  },
];

export const privateRoutes: Array<PathRouteProps> = [
  // {
  //   path: '/daily-claim',
  //   element: <DailyClaim />,
  // },
];
