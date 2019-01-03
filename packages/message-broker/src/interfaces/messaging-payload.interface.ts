import { AppContext } from '@owe/core';

export interface MessagingPayload<T = object> {
  to?: AppContext;
  from: AppContext;
  payload: T;
  name: string;
  id: number;
}