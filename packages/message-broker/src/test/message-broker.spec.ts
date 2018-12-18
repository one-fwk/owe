import { Test, TestingModule } from '@one/testing';
import { AppContext, ContextModule } from '@owe/core';
import { browser } from '@owe/browser';
import { Subject } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { MessageBrokerException } from '../message-broker.exception';
import {
  MessageBrokerModule,
  BackgroundBrokerService,
  ContentBrokerService,
  MessageBrokerService,
  PopupBrokerService,
} from '@owe/message-broker';

export function createBrokerTestingModule(context: AppContext) {
  return Test.createTestingModule({
    imports: [
      ContextModule.forRoot({ context }),
      MessageBrokerModule,
    ],
  }).compile();
}

class TestAction {
  static type = 'Whatever';

  constructor(readonly payload = 'lol') {}
}

describe('MessageBroker', () => {
  let backgroundTestingModule: TestingModule;
  let contentTestingModule: TestingModule;
  let popupTestingModule: TestingModule;

  let background: BackgroundBrokerService;
  let content: ContentBrokerService;
  let broker: MessageBrokerService;
  let popup: PopupBrokerService;

  let backgroundObserver: Subject<any>;
  let contentObserver: Subject<any>;
  let popupObserver: Subject<any>;

  let backgroundNextSpy: jest.SpyInstance;
  let contentNextSpy: jest.SpyInstance;
  let popupNextSpy: jest.SpyInstance;

  let payload: TestAction;

  beforeEach(async () => {
    backgroundTestingModule = await createBrokerTestingModule(AppContext.BACKGROUND);
    contentTestingModule = await createBrokerTestingModule(AppContext.CONTENT);
    popupTestingModule = await createBrokerTestingModule(AppContext.POPUP);

    background = backgroundTestingModule.get(BackgroundBrokerService);
    broker =  backgroundTestingModule.get(MessageBrokerService);
    content = contentTestingModule.get(ContentBrokerService);
    popup = popupTestingModule.get(PopupBrokerService);

    backgroundObserver = background.observe(TestAction);
    contentObserver = content.observe(TestAction);
    popupObserver = popup.observe(TestAction);

    backgroundNextSpy = jest.spyOn(backgroundObserver, 'next');
    contentNextSpy = jest.spyOn(contentObserver, 'next');
    popupNextSpy = jest.spyOn(popupObserver, 'next');

    payload = new TestAction();
  });

  afterEach(() => {
    backgroundNextSpy.mockRestore();
    contentNextSpy.mockRestore();
    popupNextSpy.mockRestore();
    (<any>browser.runtime).flush();
  });

  it('should throw exception when dispatching to same context', async () => {
    const error = new MessageBrokerException('Cannot dispatch action to same context');

    expect(() => background.dispatch(payload)).toThrowError(error);
  });

  it('should dispatch action to content and popup only', async () => {
    await broker.dispatch(payload).toPromise();

    expect(backgroundNextSpy).not.toHaveBeenCalled();
    expect(contentNextSpy).toHaveBeenCalledWith(payload);
    expect(popupNextSpy).toHaveBeenCalledWith(payload);
  });

  // Should the responses be an object/array where the key is the context?
  it('should return response from content and popup', async () => {
    const respondWith = ['Hello from content', 'Hello from popup'];

    content.observe(TestAction, () => respondWith[0]).subscribe();
    popup.observe(TestAction, () => respondWith[1]).subscribe();

    const responses = await broker.dispatch(payload).pipe(toArray()).toPromise();

    expect(responses).toHaveLength(2);
    expect(responses).toMatchObject(respondWith);
    expect(responses).toMatchSnapshot();
  });

  it('should dispatch action to specific context only', async () => {
    const dispatcher = background.dispatchTo(payload, AppContext.CONTENT);
    await dispatcher.toPromise();

    expect(contentNextSpy).toHaveBeenCalledWith(payload);
    expect(backgroundNextSpy).not.toHaveBeenCalled();
    expect(popupNextSpy).not.toHaveBeenCalled();
  });
});