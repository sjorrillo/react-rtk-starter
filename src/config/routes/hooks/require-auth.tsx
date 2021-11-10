import React from 'react';
import { Navigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { REDIRECT_QUERY } from '../../../constants/app-constants';
import { IHookElement } from './chain-hooks';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IOwnProps extends IHookElement {}

export const RequireAuth: React.FC<IOwnProps> = ({ children }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const params = useParams();

  // for testing purposes, we should check user in session
  if (params.type === 'sms' && searchParams.get('a') === '1') {
    return (
      <Navigate
        state={{
          location: location,
        }}
        to={{
          pathname: '/',
          search: `${REDIRECT_QUERY}${location.pathname}${location.search}`,
        }}
      />
    );
  }

  return children || null;
};
