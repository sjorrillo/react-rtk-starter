import { CaseReducer, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { AjaxError } from 'rxjs/ajax';
import { isString } from '../../utils/helpers/type-of';

export enum RequestStatus {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export interface IRequestStatusFlags {
  readonly status: RequestStatus;
  readonly isIdle: boolean;
  readonly isLoading: boolean;
  readonly isSuccess: boolean;
  readonly isError: boolean;
}

export type ActionError = string | Error | AjaxError | any;

export interface IErrorState extends Omit<SerializedError, 'code'> {
  code?: number;
  codeText?: string;
}

export interface ICallbackActionParams<TResult = any> {
  onSettled: (data: TResult | null, error?: IErrorState) => void;
}

export interface IBaseStoreState<TData = any> extends IRequestStatusFlags {
  data: TData | null;
  error?: IErrorState | null;
}

const getRequestStatusFlags = (status: RequestStatus): IRequestStatusFlags => ({
  status,
  isIdle: status === RequestStatus.Idle,
  isLoading: status === RequestStatus.Loading,
  isSuccess: status === RequestStatus.Success,
  isError: status === RequestStatus.Error,
});

export const serializeError = (error: ActionError): IErrorState => {
  if (error instanceof AjaxError) {
    return {
      name: error.name,
      message: error.message,
      code: error.status,
      stack: error.stack,
    };
  }

  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return {
    message: isString(error) ? (error as string) : error?.toString(),
  };
};

const setState = <TState extends IBaseStoreState<TData>, TData = any>(
  state: TState,
  status: RequestStatus
): IBaseStoreState<TData> => ({
  ...state,
  ...getRequestStatusFlags(status),
});

export const resetState = <TState extends IBaseStoreState<TData>, TData = any>(
  state: TState
): IBaseStoreState<TData> => setState(state, RequestStatus.Idle);

export const startState = <TState extends IBaseStoreState<TData>, TData = any>(
  state: TState
): IBaseStoreState<TData> => setState(state, RequestStatus.Loading);

export const completeState = <TData = any>(
  data: TData,
  error?: IErrorState
): IBaseStoreState<TData> => {
  if (error) {
    return {
      data: null,
      error,
      ...getRequestStatusFlags(RequestStatus.Error),
    };
  }

  return {
    error: null,
    data: data,
    ...getRequestStatusFlags(RequestStatus.Success),
  };
};

export const createEpicReducer = <IState, TData, TMeta = never>(
  reducer: CaseReducer<IState, PayloadAction<TData, string, TMeta, IErrorState>>
) => ({
  reducer: (state, action: PayloadAction<TData, string, TMeta, IErrorState>) =>
    reducer(state, action),
  // From Epics the prepare method is no called. So this is a workaround to type the action result
  // the epic will pass meta or error if they are needed
  prepare: () => ({} as PayloadAction<TData, string, TMeta, IErrorState>),
});
