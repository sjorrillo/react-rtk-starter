import { Action, AnyAction, PayloadAction } from '@reduxjs/toolkit';
import { StateObservable } from 'redux-observable';
import { Observable, ObservableInput, of } from 'rxjs';
import { concatMap, filter, pluck, switchMap } from 'rxjs/operators';
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
}


// const delayTime = 1000

export const baseActionEpic = <TPayload = any, TResult = any>(type: IActionType, mapper: (
  payload: TPayload,
  dependencies: IEpicDependencies,
  store: StateObservable<IRootState>,
) => ObservableInput<TResult>, {
  actionFilter,
  onComplete,
}: IExtraParams<TPayload, TResult> = {}) => (action$: Observable<PayloadAction<TPayload>>, store: StateObservable<IRootState>,
  dependencies: IEpicDependencies): Observable<AnyAction>  => {

    return action$.pipe(
      filter((action) => type.START === action.type && (actionFilter ? actionFilter(action, store) : true)),
      pluck('payload'),
      switchMap((payload) => mapper(payload, dependencies, store)),
      concatMap((result) => onComplete ? onComplete(result) :  of({ type: type.COMPLETED, payload: result }))
    )
  };