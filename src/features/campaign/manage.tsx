import React from 'react';

interface IOwnProps {
  className?: string;
}

export const Manage: React.FC<IOwnProps> = ({ className }) => {
  return (
    <div className={className}>
      Manage
    </div>
  );
};

export default Manage;
