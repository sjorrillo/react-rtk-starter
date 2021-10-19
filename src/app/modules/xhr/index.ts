import { EnhancedStore } from '@reduxjs/toolkit';
import { IRootState } from '../../store';
import { EventType, mediator } from '../mediator';
import apiClient, { buildApiUrl as _buildApiUrl } from './api-client';

export const buildApiUrl = _buildApiUrl;

export type ApiClient = apiClient;

export const client = apiClient.create();

export const initApiClient = (_store: EnhancedStore<IRootState>) => {
  mediator.on(EventType.Signin, {
    next: ({ token }) => {
      if (!token) return;

      client.setHeaders({
        Authorization: `Bearer ${token}`,
      });
    },
  });
  mediator.on(EventType.Signout, {
    next: () => {
      client.removeHeader('Authorization');
    },
  });
  mediator.on(EventType.RefreshToken, {
    next: ({ token }) => {
      if (!token) return;

      client.setHeaders({
        Authorization: `Bearer ${token}`,
      });
    },
  });
};
