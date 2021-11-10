import React from 'react';

interface IOwnProps {
  className?: string;
}

export const Details: React.FC<IOwnProps> = ({ className }) => {
  return (
    <div className={className}>
      Details
    </div>
  );
};

export default Details;
