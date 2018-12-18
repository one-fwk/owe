import { Injectable, OneContainer, Type, flatten, transformResult } from '@one/core';
import { browser } from '@owe/browser';
import { AppContext } from '@owe/core';
import { Subject, Observable } from 'rxjs';

import { ActionType, MessageResponse, MessagingPayload } from '../interfaces';
import { MessageBrokerException } from '../message-broker.exception';
import { MetadataStorage } from '../metadata-storage';

@Injectable()
export abstract class BaseBrokerService {
  protected readonly observers = new Set<[ActionType, Subject<any>, MessageResponse | undefined]>();
  protected abstract readonly brokerType: AppContext;
  private appContext!: AppContext;
  private messageId = 0;

  constructor(private readonly container: OneContainer) {}

  /**
   * Dispatch action to specified context only
   * @param payload
   */
  public dispatch(payload: object) {
    if (this.brokerType === this.appContext) {
      throw new MessageBrokerException('Cannot dispatch action to same context');
    }

    return this.dispatchTo(payload, this.brokerType);
  }

  public observe<T, R>(action: ActionType, response?: MessageResponse) {
    const subject = new Subject<T>();
    this.observers.add([action, subject, response]);
    return subject;
  }

  private getActionType(action: object) {
    const { type } = <ActionType>(<unknown>action.constructor);
    if (!type) {
      throw new MessageBrokerException('Missing action type');
    }

    return type;
  }

  private createMessage(message: any) {
    return {
      from: this.brokerType,
      ...message,
    };
  }

  public dispatchTo<T>(payload: object, to?: AppContext) {
    return new Observable<any>(observer => {
      const type = this.getActionType(payload);
      const id = this.messageId++;
      const message = this.createMessage({
        payload,
        type,
        to,
        id,
      });

      browser.runtime.sendMessage(message).then((responses: any[]) => {
        flatten(responses.filter(res => res)).forEach(
          res => res && observer.next(res),
        );

        observer.complete();
      });
    });
  }

  public init() {
    MetadataStorage.observers.forEach(({ action, target, propertyKey }) => {
      const instance = this.container.getProvider<any>(<Type<any>>target);
      this.observe(action!,(payload: any) => {
        return instance[propertyKey](payload);
      }).subscribe();
    });
  }

  private isInvalidMessage(message: MessagingPayload) {
    return (message.to && this.brokerType !== message.to) || message.from === this.brokerType;
  }

  public register(appContext: AppContext) {
    this.appContext = appContext;

    browser.runtime.onMessage.addListener(async (message: MessagingPayload) => {
      if (this.isInvalidMessage(message)) return;

      return Promise.all(
        [...this.observers.values()]
          .filter(([action]) => action.type === message.type)
          .map(([, source$, response]) => {
            source$.next(message.payload);

            if (response) {
              return transformResult(
                response(message.payload),
              );
            }
          }),
      );
    });
  }
}