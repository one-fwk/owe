import { ActionType } from './action-type.interface';
import { Observable } from 'rxjs/index';

export interface ObserveOptions {
  action?: ActionType;
  respondWith?: <T>(source$: Observable<T>) => Observable<any>;
}