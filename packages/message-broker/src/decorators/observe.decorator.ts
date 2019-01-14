import { Type } from '@one/core';

export function Observe(action: Type<any>): MethodDecorator {
  return (target, propertyKey) => {
    /*MetadataStorage.observers.add({
      target: target.constructor,
      propertyKey,
      action,
    });*/
  };
}