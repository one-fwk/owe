import { Injectable } from '@one/core';
import { AppContext } from '@owe/core';

import { BaseBrokerService } from './base-broker.service';

// Handles message-broker in the background
// Or if you want to dispatch an action to the background only
// Background broker handles all communication
@Injectable()
export class BackgroundBrokerService extends BaseBrokerService {
  protected readonly brokerType = AppContext.BACKGROUND;
}