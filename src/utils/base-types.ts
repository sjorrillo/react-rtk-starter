declare global {
    interface Window {
        __reduxStore: any;
    }
}

export type KeyValuePair<T = string> = { [key: string]: T };

export type AnyObject = { [key: string]: any };

export interface IOption<T = string> {
    value: T;
    label: string;
    disabled?: boolean;
    [key: string]: any;
}

export type OrderDirection = 'asc' | 'desc';