import { Action, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { StateObservable } from 'redux-observable';
import { Observable, ObservableInput, of, timer } from 'rxjs';
import { concatMap, debounce, filter, pluck, switchMap } from 'rxjs/operators';
import nullish from '../../utils/helpers/nullish';
import { IRootState } from './root-store';

export type IEpicDependencies = {
  client: any;
  buildSecurityUrl: (path: string) => string;
};

export interface IActionType {
  START: string;
  COMPLETED: string;
}

export interface IExtraParams<TPayload, TResult> {
  onComplete?: (result: TResult) => ObservableInput<Action>;
  onError?: (err: any) => Action;
  errorActions?: (err: any, store: StateObservable<IRootState>) => ObservableInput<Action>[];
  actionFilter?: (action: PayloadAction<TPayload>, store: StateObservable<IRootState>) => boolean;
  debounce?: number;
}

export const baseActionEpic = <TPayload = any, TResult = any>(type: IActionType, mapperFn: (
  payload: TPayload,
  dependencies: IEpicDependencies,
  store: StateObservable<IRootState>,
) => ObservableInput<TResult>, {
  debounce: debounceMs,
  actionFilter,
  onComplete,
}: IExtraParams<TPayload, TResult> = {}) => (action$: Observable<PayloadAction<TPayload>>, store: StateObservable<IRootState>,
  dependencies: IEpicDependencies): Observable<AnyAction> => {

    return action$.pipe(
      filter((action) => type.START === action.type && (actionFilter ? actionFilter(action, store) : true)),
      debounce(() => nullish(debounceMs) ? of() : timer(debounceMs as number)),
      pluck('payload'),
      switchMap((payload) => mapperFn(payload, dependencies, store)),
      concatMap((result) => onComplete ? onComplete(result) : of({ type: type.COMPLETED, payload: result }))
    )
  };