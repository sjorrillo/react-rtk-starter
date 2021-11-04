import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../../core/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<Dispatch<AnyAction>>();
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
