import { MetadataStorage } from '../metadata-storage';
import { ActionType } from '../interfaces';

export function Observe(action: ActionType): MethodDecorator {
  return (target, propertyKey) => {
    MetadataStorage.observers.add({
      target: target.constructor,
      propertyKey,
      action,
    });
  };
}