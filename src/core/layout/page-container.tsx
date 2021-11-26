import React from 'react';
import { generatePath, Link, Outlet } from 'react-router-dom';
import { Paths } from '../../constants/route-paths';

interface IOwnProps {
  className?: string;
}

export const PageContainer: React.FC<IOwnProps> = ({ className }) => {
  return (
    <div className={className}>
      <p>This is the Page Conainer</p>
      <ul>
        <li>
          <Link to={Paths.HOME}>Home</Link>
        </li>
        <li>
          <Link to={Paths.SIGN_IN}>Sign in</Link>
        </li>
        <li>
          <Link to={generatePath(Paths.CAMPAIGNS.HOME, { type: 'email ' })}>Email Campaign</Link>
        </li>
        <li>
          <Link to={generatePath(Paths.CAMPAIGNS.HOME, { type: 'sms ' })}>Sms Campaign</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};
