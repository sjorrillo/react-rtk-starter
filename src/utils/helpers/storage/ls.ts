import tryParse from '../try-parse';

const { localStorage } = window;

export const save = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
  }
};

export const get = (key: string, defVal: any) => {
  try {
    const value = localStorage.getItem(key);
    return tryParse(value as string, defVal);
  } catch (err) {
    return defVal;
  }
};

export const clear = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
  }
};

export const clearAll = () => {
  try {
    localStorage.clear();
  } catch (err) {
  }
};
