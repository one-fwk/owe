import { BaseMetadataStorage, Type } from '@one/core';
import { from, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ObserveMetadata } from './interfaces';

export class MetadataStorage extends BaseMetadataStorage {
  public static observers = new Set<ObserveMetadata>();

  public static findByAction(action: Type<any>): Observable<ObserveMetadata> {
    return from(this.observers).pipe(
      filter(metadata => metadata.action === action),
    );
  }
}