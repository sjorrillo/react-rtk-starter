import React from 'react';

export interface IChainHookProps {
  hooks: React.ReactElement[];
  element: React.ReactElement;
}

export interface IHookElement {
  children?: React.ReactElement
}

export const chainHooks = (hooks: React.ReactElement[], element: React.ReactElement) => {
  const hookElement = hooks[0];
  const remainingElements = hooks.slice(1);

  return React.cloneElement(
    hookElement,
    {},
    remainingElements.length ? chainHooks(remainingElements, element) : element
  );
};

