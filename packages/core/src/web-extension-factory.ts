import { Module, OneFactory, Type } from '@one/core';

import { WebExtensionFactoryOptions } from './interfaces';
import { ContextModule } from './context.module';

export class WebExtensionFactory extends OneFactory {
  constructor(module: Type<any>, options: WebExtensionFactoryOptions) {
    super(module);

    @Module({
      imports: [
        ContextModule.forRoot(<any>options),
        module,
      ],
    })
    class AppModule {}

    (<any>this).module = AppModule;
  }
}