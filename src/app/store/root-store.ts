import { combineEpics } from 'redux-observable';
import { extractFunctionsFromNamespace } from '../../utils/helpers/obj-utils';
import { counterEpics, counterReducer, pokemonApi } from '../../features/counter/store';
import type { ICounterState } from '../../features/counter/store/counter-slice';
import { AnyAction, ReducersMapObject } from '@reduxjs/toolkit';

export interface IRootState {
  counter: ICounterState;
  [reducer: string]: any;
}

const epics = extractFunctionsFromNamespace(
  counterEpics
);

export const rootEpic = (action$: any, store: any, dependencies : any) =>
  combineEpics(...epics)(action$, store, dependencies)
  // .pipe(
  //   catchError((err, source) => {
  //     setTimeout(() => {
  //       // snackbar.show('Se produjo un error inesperado.');
  //       console.log('Se produjo un error inesperado.');
  //       throw err;
  //     }, 0);
  //     return source as any;
  //   }) as any
  // );

export const rootReducer: ReducersMapObject<IRootState, AnyAction> = {
  counter: counterReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
}

export const queryMiddleares = [pokemonApi.middleware];