import { Action, AnyAction, configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { createEpicMiddleware } from 'redux-observable';
import config from '../../config';
import ApiClient, { buildApiUrl } from '../modules/xhr/api-client';
import { IEpicDependencies } from './base-epic';
import { IRootState, queryMiddleares, rootEpic, rootReducer } from './root-store';

let _store: EnhancedStore<IRootState>;

export const getStore = (client?: ApiClient) => {
  if (_store) return _store;

  const epictMiddleware = createEpicMiddleware<
    Action<AnyAction>,
    Action<AnyAction>,
    IRootState,
    IEpicDependencies
  >({
    dependencies: {
      client: client as ApiClient,
      buildSecurityUrl: buildApiUrl('security'),
    },
  });
  const middlewares = [epictMiddleware];
  if (config.isDevelopment) {
    const createLogger = require('redux-logger').createLogger;
    const logger = createLogger({
      collapsed: true,
      // Added diff and state transform to add more debug functionality and stop redux-logger from hanging
      // diff: true, // show diff in console
      // stateTransformer: (state) => state.mutate, // select slice of state object to speed up debug
    });
    middlewares.push(logger);
  }

  _store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middlewares, queryMiddleares as any), // If you are not using rtk query you can disable thunk { thunk: false }
  });

  epictMiddleware.run(rootEpic as any);
  return _store;
};

export const setupRootStore = (client: ApiClient) => {
  const store = getStore(client);

  if (config.isDevelopment) {
    // just publish it globally to easily
    // inspect the current state of the store
    window.__reduxStore = store;
  }

  // optional, but required for refetchOnFocus/refetchOnReconnect behaviors
  // see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
  setupListeners(store.dispatch);

  return store;
};
