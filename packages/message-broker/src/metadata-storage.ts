import { BaseMetadataStorage } from '@one/core';

import { ActionType, ObserveMetadata } from './interfaces';

export class MetadataStorage extends BaseMetadataStorage {
  public static observers = new Set<ObserveMetadata>();

  public static findByAction(action: ActionType) {
    return [...this.observers.values()].filter(metadata =>
      metadata.action!.type === action.type,
    );
  }
}