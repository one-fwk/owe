import { Injectable } from '@one/core';
import { AppContext } from '@owe/core';

import { BaseBrokerService } from './base-broker.service';

// Handles message-broker in the popup
// Or if you want to dispatch an action to popup only
@Injectable()
export class PopupBrokerService extends BaseBrokerService {
  protected readonly brokerType = AppContext.POPUP;
}