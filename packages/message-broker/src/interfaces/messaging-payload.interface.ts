import { AppContext } from '@owe/core';

export interface MessagingPayload<T = any> {
  to?: AppContext;
  from: AppContext;
  payload: T;
  type: string;
  id: number;
}