import { Type } from '@one/core';
import { MetadataStorage } from '../metadata-storage';

export function Observe(action: Type<any>): MethodDecorator {
  return (target, propertyKey) => {
    MetadataStorage.observers.add({
      target: target.constructor,
      propertyKey,
      action,
    });
  };
}