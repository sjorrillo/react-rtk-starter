import type { KeyValuePair } from '../base-types';
// code for `typeOf` borrowed from `jQuery.type`
// to avoid including jquery only to have this
const class2type: KeyValuePair<string> = {};

const types = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object'];

const toStr = Object.prototype.toString;

types.forEach((name) => {
  class2type[`[object ${name}]`] = name.toLowerCase();
});

export default function typeOf(obj: null) {
  if (typeof obj === 'undefined') {
    return 'undefined';
  }
  return obj === null ? String(obj) : class2type[toStr.call(obj)] || 'object';
}

export const isBoolean = (arg: any): boolean => typeOf(arg) === 'boolean';
export const isNumber = (arg: any): boolean => typeOf(arg) === 'number';
export const isString = (arg: any): boolean => typeOf(arg) === 'string';
export const isFunction = (arg: any): boolean => typeOf(arg) === 'function';
export const isArray = (arg: any): boolean => typeOf(arg) === 'array';
export const isDate = (arg: any): boolean => typeOf(arg) === 'date';
export const isRegExp = (arg: any): boolean => typeOf(arg) === 'regexp';
export const isObject = (arg: any): boolean => typeOf(arg) === 'object';

export const isNum = (arg: any): boolean => isNumber(arg) && !Number.isNaN(arg);
