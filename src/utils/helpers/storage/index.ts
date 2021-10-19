import * as ls from './ls';

let storagePrefix: string;

export const getCombinedKey = (key: string) => `${storagePrefix || 'ls'}_${key}`;

export const setStoragePrefix = (prefix) => (storagePrefix = prefix);

export const setInStorage = (key: string, value: any) => ls.save(getCombinedKey(key), value);

export const getFromStorage = (key: string, defVal?: any) => ls.get(getCombinedKey(key), defVal);

export const removeFromStorage = (key: string) => ls.clear(getCombinedKey(key));

export const clearStorage = () => ls.clearAll();
