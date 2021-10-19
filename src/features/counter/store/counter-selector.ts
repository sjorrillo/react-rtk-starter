import { IRootState } from '../../../app/store';

export const selectCount = (state: IRootState) => state.counter.value;
