/* eslint-disable no-prototype-builtins */
import { Action, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { StateObservable } from 'redux-observable';
import { merge, Observable, ObservableInput, of, throwError, timer } from 'rxjs';
import { catchError, concatMap, debounce, filter, pluck, switchMap } from 'rxjs/operators';
import nullish from '../../utils/helpers/nullish';
import { isObject } from '../../utils/helpers/type-of';
import ApiClient from '../modules/xhr/api-client';
import { ActionError, ICallbackActionParams, serializeError } from './base-reducer';
import { IRootState } from './root-store';

export type IEpicDependencies = {
  client: ApiClient;
  buildSecurityUrl: (path: string) => string;
};

export interface IActionType {
  START: string;
  COMPLETED: string;
}

export interface IExtraParams<TPayload = any, TResult = any, TResponse = any> {
  debounce?: number;
  actionFilter?: (action: PayloadAction<TPayload>, store: StateObservable<IRootState>) => boolean;
  dataCustomizer?: (response: TResponse, store: StateObservable<IRootState>) => TResult;
  completeActions?: (
    data: TResult,
    store: StateObservable<IRootState>
  ) => ObservableInput<Action>[];
  errorActions?: (
    err: ActionError,
    store: StateObservable<IRootState>
  ) => ObservableInput<Action>[];
}

export const baseActionEpic =
  <TPayload extends ICallbackActionParams | any, TResult = any, TResponse = any>(
    type: IActionType,
    processFn: (
      payload: TPayload,
      dependencies: IEpicDependencies,
      store: StateObservable<IRootState>
    ) => Observable<TResponse>,
    {
      debounce: debounceMs,
      actionFilter,
      dataCustomizer,
      completeActions,
      errorActions,
    }: IExtraParams<TPayload, TResult, TResponse> = {}
  ) =>
  (
    action$: Observable<PayloadAction<TPayload>>,
    store: StateObservable<IRootState>,
    dependencies: IEpicDependencies
  ): Observable<AnyAction> => {
    return action$.pipe(
      filter(
        (action) =>
          type.START === action.type && (actionFilter ? actionFilter(action, store) : true)
      ),
      debounce(() => (nullish(debounceMs) ? of() : timer(debounceMs as number))),
      pluck('payload'),
      switchMap((payload) => {
        const { onSettled } = (
          isObject(payload) && (payload as any).hasOwnProperty('onSettled') ? payload : {}
        ) as ICallbackActionParams<TResult>;
        return processFn(payload, dependencies, store).pipe(
          concatMap((response) =>
            of({
              data: dataCustomizer ? dataCustomizer(response, store) : response,
              onSettled,
            })
          ),
          catchError((err) => {
            onSettled?.(null, serializeError(err));
            return throwError(err);
          })
        );
      }),
      concatMap(({ data, onSettled }) => {
        onSettled?.(data as TResult);
        return merge(
          of({ type: type.COMPLETED, payload: data }),
          ...(completeActions?.(data as TResult, store) || [])
        );
      }),
      catchError((err, source) => {
        return merge(
          of({ type: type.COMPLETED, payload: null, error: serializeError(err) }),
          ...(errorActions?.(err, store) || []),
          source
        );
      })
    );
  };
