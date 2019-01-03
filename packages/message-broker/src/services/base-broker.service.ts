import { Injectable, OneContainer, Type, flatten, isUndef, transformResult } from '@one/core';
import { Omit } from '@one/core/lib/interfaces';
import { browser } from '@owe/browser';
import { AppContext } from '@owe/core';
import { Subject, Observable } from 'rxjs';

import { MessageResponse, MessagingPayload } from '../interfaces';
import { MessageBrokerException } from '../message-broker.exception';
import { MetadataStorage } from '../metadata-storage';

@Injectable()
export abstract class BaseBrokerService {
  protected readonly observers = new Set<[Type<any>, Subject<any>, MessageResponse<any> | undefined]>();
  protected abstract readonly brokerType: AppContext;
  private appContext!: AppContext;
  private messageId = 0;

  constructor(private readonly container: OneContainer) {}

  /**
   * Dispatch action to specified context only
   * @param payload
   */
  public dispatch(payload: object): Observable<any> {
    if (this.brokerType === this.appContext) {
      throw new MessageBrokerException('Cannot dispatch action to same context');
    }

    return this.dispatchTo(payload, this.brokerType);
  }

  public observe<T>(action: Type<any>, response?: MessageResponse<any>): Subject<T> {
    const subject = new Subject<T>();
    this.observers.add([action, subject, response]);
    return subject;
  }

  private getActionName(action: object): string {
    const { name } = action.constructor;
    if (!name) {
      throw new MessageBrokerException('Missing action name');
    }

    return name;
  }

  private createMessage(message: Omit<MessagingPayload, 'from'>): MessagingPayload {
    return {
      from: this.brokerType,
      ...message,
    };
  }

  public dispatchTo<T>(payload: object, to?: AppContext): Observable<T> {
    return new Observable(observer => {
      const name = this.getActionName(payload);
      const id = this.messageId++;
      const message = this.createMessage({
        payload,
        name,
        to,
        id,
      });

      browser.runtime.sendMessage(message).then((responses: any[]) => {
        flatten(responses.filter(res => !isUndef(res)))
          .filter(res => !isUndef(res))
          .forEach(res => observer.next(res as any));

        observer.complete();
      });
    });
  }

  public init() {
    MetadataStorage.observers.forEach(({ action, target, propertyKey }) => {
      const instance = this.container.getProvider<any>(<Type<unknown>>target);
      this.observe(action!,(payload: unknown) => {
        return instance[propertyKey](payload);
      }).subscribe();
    });
  }

  private isInvalidMessage(message: MessagingPayload): boolean {
    return (message.to && this.brokerType !== message.to) || message.from === this.brokerType;
  }

  public register(appContext: AppContext): void {
    this.appContext = appContext;

    browser.runtime.onMessage.addListener((message: MessagingPayload) => {
      if (this.isInvalidMessage(message)) return;

      /*const res = await from(this.observers).pipe(
        filter(([action]) => action.type === message.type),
        mergeMap(([, source$, response]): any => {
          source$.next(message.payload);

          return isFunc(response)
            ? of(response(message.payload))
            : of();
        }),
        tap(n => console.log(n))
        // toArray(),
        // Make sure the stream completes
      ).toPromise();

      // console.log(res);

      return res;*/

      return Promise.all(
        [...this.observers.values()]
          .filter(([action]) => action.name === message.name)
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