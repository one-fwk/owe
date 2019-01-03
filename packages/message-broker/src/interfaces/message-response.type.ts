import { Observable } from 'rxjs';

export type MessageResponse<R> = (data: any) => Observable<R> | Promise<R> | R;