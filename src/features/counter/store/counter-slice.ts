import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { completeState, createEpicReducer } from '../../../core/store/base-reducer';
export interface ICounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ICounterState = {
  value: 0,
  status: 'idle',
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    ping: (state) => {
      console.log('ping slice', state.value + 10);
      state.value += 10;
    },
    pong: createEpicReducer<ICounterState, string>((state, action) => {
      const newState = completeState(action.payload, action.error);
      console.log('pong slice', { action, newState });
      state.value -= 1;
    }),
  },
});

export const { actions, reducer } = counterSlice;
