import React from 'react';
import { generatePath, Link, Outlet, useParams } from 'react-router-dom';
import { Paths } from '../../constants/route-paths';

interface IOwnProps {
  className?: string;
}

const Campaigns: React.FC<IOwnProps> = ({ className }) => {
  const { type } = useParams();

  return (
    <div className={className}>
      Campaigns - {type}

      <ul>
        <li>
          <Link to={generatePath(Paths.CAMPAIGNS.DETAILS, { type })}>Details</Link>
        </li>
        <li>
          <Link to={generatePath(Paths.CAMPAIGNS.MANAGE, { type })}>Manage</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default Campaigns;
