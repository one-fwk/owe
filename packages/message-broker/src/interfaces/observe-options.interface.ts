import { Type } from '@one/core';
import { Observable } from 'rxjs/index';

export interface ObserveOptions {
  action?: Type<any>;
  respondWith?: <T>(source$: Observable<T>) => Observable<unknown>;
}