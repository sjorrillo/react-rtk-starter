import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    pong: (state) => {
      console.log('pong slice', state.value - 1);
      state.value -= 1;
    },
  },
});

export const { actions, reducer } = counterSlice;
