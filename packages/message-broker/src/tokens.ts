import { InjectionToken } from '@one/core';

import { BaseBrokerService } from './services/base-broker.service';

export const BROKER_SERVICE = new InjectionToken<BaseBrokerService>('BROKER_SERVICE');