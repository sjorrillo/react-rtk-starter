export enum EventType {
  Signin = 'user:signin',
  Signout = 'user:signout',
  ServiceError = 'service:error',
  RefreshToken = 'token:refresh',
}

export interface IMediatorEvent {
  type: EventType;
  payload?: any;
}
