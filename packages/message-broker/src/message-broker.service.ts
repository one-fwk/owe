import { Inject, Injectable, Injector, OnAppInit, OnModuleInit, Type } from '@one/core';
import { APP_CONTEXT, AppContext } from '@owe/core';
import { Observable } from 'rxjs';

import { PopupBrokerService, BackgroundBrokerService, ContentBrokerService } from './services';
import { BaseBrokerService } from './services/base-broker.service';
import { MessageBrokerException } from './message-broker.exception';
import { MessageResponse } from './interfaces';

@Injectable()
export class MessageBrokerService implements OnModuleInit, OnAppInit {
  private broker!: BaseBrokerService;

  constructor(
    @Inject(APP_CONTEXT)
    private readonly appContext: AppContext,
    private readonly injector: Injector,
  ) {}

  private getBrokerProvider(context: AppContext): Type<any> {
    switch (context) {
      case AppContext.BACKGROUND:
        return BackgroundBrokerService;

      case AppContext.CONTENT:
        return ContentBrokerService;

      case AppContext.POPUP:
        return PopupBrokerService;
    }
  }

  private isRegistered(): boolean {
    if (!this.broker) {
      throw new MessageBrokerException('Not registered yet');
    }

    return true;
  }

  /**
   * Dispatch action to all contexts
   * @param payload
   */
  public dispatch<T>(payload: object): Observable<T> {
    this.isRegistered();
    return this.broker.dispatchTo<T>(payload);
  }

  public observe<T, R>(action: Type<any>, respondWith?: MessageResponse<R>) {
    this.isRegistered();
    return this.broker.observe<T>(action, respondWith);
  }

  /**
   * Register the broker that should be used
   */
  onModuleInit() {
    const broker = this.getBrokerProvider(this.appContext);
    this.broker = this.injector.get<BaseBrokerService>(broker);
    this.broker.register(this.appContext);
  }

  onAppInit() {
    this.broker.init();
  }
}