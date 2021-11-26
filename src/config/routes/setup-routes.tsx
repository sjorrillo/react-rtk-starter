import React from 'react';
import { RouteObject } from 'react-router-dom';
import { PageContainer } from '../../core/layout/page-container';
import { ChainHookElements, withSuspense } from './route-loader';
import { RequireAuth } from './hooks/require-auth';
import { AnotherCheck } from './hooks/another-check';
import { Paths } from '../../constants/route-paths';

const Counter = React.lazy(() => import('../../features/counter/Counter'));
const SignInForm = React.lazy(() => import('../../core/auth/sign-in/sign-in-form'));
const Campaigns = React.lazy(() => import('../../features/campaign/campaigns'));
const Details = React.lazy(() => import('../../features/campaign/details'));
const Manage = React.lazy(() => import('../../features/campaign/manage'));

export const routes: RouteObject[] = [
  {
    path: Paths.HOME,
    element: <PageContainer />,
    children: [
      {
        element: withSuspense(Counter),
        index: true,
      },
      {
        path: Paths.SIGN_IN,
        element: withSuspense(SignInForm),
      },
      {
        path: Paths.CAMPAIGNS.HOME,
        element: withSuspense(Campaigns),
        children: [
          {
            path: Paths.CAMPAIGNS.DETAILS,
            element: (
              <ChainHookElements
                element={withSuspense(Details)}
                hooks={[<RequireAuth key="auth" />, <AnotherCheck key="another-check" />]}
              />
            ),
          },
          {
            path: Paths.CAMPAIGNS.MANAGE,
            element: withSuspense(Manage),
          },
        ],
      },
    ],
  },
];
