import { IRootState } from '../../../core/store';

export const selectCount = (state: IRootState) => state.counter.value;
