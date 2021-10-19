import { AnyObject } from '../base-types';
import nullish from './nullish';
import { isFunction } from './type-of';

export const extractFunctionsFromNamespace = (...namespaces: any[]) =>
  namespaces.reduce(
    (acc, namespace) =>
      Object.keys(namespace).reduce((acc, key) => {
        const action = namespace[key];
        return [...acc, ...(isFunction(action) ? [action] : [])];
      }, acc),
    []
  );

export const removeNullishProps = (obj: AnyObject): AnyObject =>
  Object.keys(obj || {}).reduce((acc: any, key: string) => {
    if (nullish(obj[key]) || obj[key] === '') return acc;

    return {
      ...(nullish(acc) ? {} : acc),
      [key]: obj[key],
    };
  }, null);
