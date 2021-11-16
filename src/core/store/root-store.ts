import { combineEpics } from 'redux-observable';
import { extractFunctionsFromNamespace } from '../../utils/helpers/obj-utils';
import { counterEpics, counterReducer, pokemonApi } from '../../features/counter/store';
import type { ICounterState } from '../../features/counter/store/counter-slice';
import { AnyAction, ReducersMapObject } from '@reduxjs/toolkit';
import { catchError } from 'rxjs/operators';
import { IEpicDependencies } from './base-epic';

export interface IRootState {
  counter: ICounterState;
  [reducer: string]: any;
}

const epics = extractFunctionsFromNamespace(counterEpics);

export const rootEpic = (action$, store, dependencies: IEpicDependencies) =>
  combineEpics(...epics)(action$, store, dependencies).pipe(
    catchError((err, source) => {
      setTimeout(() => {
        console.log('An unknown error was thrown');
        throw err;
      }, 0);
      return source;
    }) as any
  );

export const rootReducer: ReducersMapObject<IRootState, AnyAction> = {
  counter: counterReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
};

export const queryMiddleares = [pokemonApi.middleware];
