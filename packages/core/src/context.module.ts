import { DynamicModule, Global, Module } from '@one/core';

import { BrowserModuleOptions } from './interfaces';
import { APP_CONTEXT } from './app-context.token';

@Global()
@Module()
export class ContextModule {
  static forRoot(options: BrowserModuleOptions): DynamicModule {
    return {
      module: ContextModule,
      exports: [APP_CONTEXT],
      providers: [
        {
          provide: APP_CONTEXT,
          useValue: options.context,
        },
      ],
    };
  }
}