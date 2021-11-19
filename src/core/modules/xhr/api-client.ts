import omit from 'lodash/omit';
import { stringifyUrl } from 'query-string';
import { Observable, of, Subscriber, throwError } from 'rxjs';
import { ajax, AjaxError, AjaxRequest, AjaxResponse } from 'rxjs/ajax';
import { catchError, mergeMap } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

import config from '../../../config';
import { isUrl } from '../../../utils/regex';
import { removeNullishProps } from '../../../utils/helpers/obj-utils';
import { isObject } from '../../../utils/helpers/type-of';
import { AnyObject, KeyValuePair } from '../../../utils/base-types';
import { EventType, mediator } from '../mediator';

interface IClientParms {
  data?: any;
  params?: AnyObject;
  headers?: AnyObject;
  errorHandled?: boolean;
  responseType?: string;
  progressSubscriber?: Subscriber<any>;
  isPutHttpVerb?: boolean;
}

export const buildApiUrl = (apiName: string) => (path: string) => {
  if (isUrl(path)) return path;

  const endpoint = path[0] === '/' ? path.substring(1) : path;
  const url = new URL(endpoint, config.api[apiName]);
  return url.href;
};

export default class ApiClient {
  private headers?: KeyValuePair;

  get!: (url: string, { params, headers }?: IClientParms) => Observable<AjaxResponse | any>;
  post!: (url: string, { data, params, headers }?: IClientParms) => Observable<AjaxResponse | any>;
  put!: (url: string, { data, params, headers }?: IClientParms) => Observable<AjaxResponse | any>;
  patch!: (url: string, { data, params, headers }?: IClientParms) => Observable<AjaxResponse | any>;
  delete!: (
    url: string,
    { data, params, headers }?: IClientParms
  ) => Observable<AjaxResponse | any>;

  upload!: (
    url: string,
    { data, params, headers, progressSubscriber, isPutHttpVerb }?: IClientParms
  ) => Observable<AjaxResponse | any>;

  constructor() {
    ['get', 'post', 'put', 'patch', 'delete', 'upload'].forEach((method) => {
      this[method] = (
        url: string,
        {
          data,
          params,
          headers,
          errorHandled,
          responseType,
          progressSubscriber,
          isPutHttpVerb,
        }: IClientParms = {}
      ) => {
        const isUpload = method === 'upload';
        const internalHeaders =
          isUpload && this.headers ? omit(this.headers, ['Content-Type']) : this.headers;

        const httpVerb =
          isUpload && !isPutHttpVerb ? 'POST' : isPutHttpVerb ? 'PUT' : method.toLocaleUpperCase();
        const ajaxOptions: AjaxRequest = {
          url: this.formatUrl(url, params),
          method: httpVerb,
          body: data,
          headers: {
            'X-Requested-With': uuid(),
            ...(internalHeaders || {}),
            ...(headers || {}),
          },
        };
        if (responseType) ajaxOptions.responseType = responseType;
        if (progressSubscriber) ajaxOptions.progressSubscriber = progressSubscriber;

        return ajax(ajaxOptions).pipe(
          mergeMap((ajaxResponse: AjaxResponse) => {
            const { response, status } = ajaxResponse;
            if ((status >= 200 && status < 300) || status === 304) {
              return of(response);
            }

            return throwError(ajaxResponse);
          }),
          catchError((error: AjaxError) => {
            const { status } = error || {};

            const unauthorized = status === 401;
            const forbidden = status === 403;

            if (!errorHandled || unauthorized || forbidden) {
              mediator.emit(EventType.ServiceError, {
                response: error.response,
                error,
                unauthorized,
                forbidden,
              });
            }
            return throwError(error);
          })
        );
      };
    });

    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  static create() {
    return new ApiClient();
  }

  private formatUrl = (url: string, params: any) => {
    return params && isObject(params)
      ? stringifyUrl({ url, query: removeNullishProps(params) })
      : url;
  };

  clearHeaders = () => {
    this.headers = undefined;
  };

  setHeaders = (headers: KeyValuePair) => {
    this.headers = {
      ...(this.headers || {}),
      ...headers,
    };
  };

  removeHeader = (key: string) => {
    if (!this.headers || !key) return;

    delete this.headers[key];
  };
}
