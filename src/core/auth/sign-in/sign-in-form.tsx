import React from 'react';

interface IOwnProps {
  className?: string;
}

export const SignInForm: React.FC<IOwnProps> = ({ className }) => {
  return (
    <div className={className}>
      SignInForm
    </div>
  );
};
