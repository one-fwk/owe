import { Injectable } from '@one/core';
import { AppContext } from '@owe/core';

import { BaseBrokerService } from './base-broker.service';

// Handles message-broker in the content scripts
// Or if you want to dispatch an action to content scripts only
@Injectable()
export class ContentBrokerService extends BaseBrokerService {
  protected readonly brokerType = AppContext.CONTENT;
}