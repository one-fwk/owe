import { Module } from '@one/core';

import { MessageBrokerService } from './message-broker.service';
import {
  BackgroundBrokerService,
  ContentBrokerService,
  PopupBrokerService,
} from './services';

const brokerProviders = [
  MessageBrokerService,
  BackgroundBrokerService,
  ContentBrokerService,
  PopupBrokerService,
];

@Module({
  exports: brokerProviders,
  providers: brokerProviders,
})
export class MessageBrokerModule {}