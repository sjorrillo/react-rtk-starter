import React from 'react';
import { IHookElement } from './chain-hooks';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IOwnProps extends IHookElement {}

export const AnotherCheck: React.FC<IOwnProps> = ({ children })=> {
  return children || null;
};