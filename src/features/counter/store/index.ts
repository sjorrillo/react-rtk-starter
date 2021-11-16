import { pokemonApi as api } from './counter-query';
import { actions, reducer } from './counter-slice';
export type { ICounterState } from './counter-slice';
export { selectCount } from './counter-selector';
export * as counterEpics from './counter-epic';

export const counterReducer = reducer;
export const pokemonApi = api;
export const { ping, pong, decrement, increment, incrementByAmount } = actions;
export const { useGetPokemonByNameQuery } = api;
