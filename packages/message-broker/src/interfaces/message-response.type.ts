import { Observable } from 'rxjs';

export type MessageResponse = (data: any) => Observable<any> | Promise<any> | any;