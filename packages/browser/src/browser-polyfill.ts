import { Browser } from 'webextension-polyfill-ts';
import detectBrowser from 'browser-detect';

import { SupportedBrowsers } from './supported-browsers.enum';
import { browser as browserMock } from './browser.mock';
import { polyfill } from './polyfill';

export function isNode() {
  return (
    (typeof process === 'object') &&
    (typeof process.release === 'object') &&
    process.release.name === 'node'
  );
}

export function getBrowserName(): string {
  return isNode() ? SupportedBrowsers.NODE : detectBrowser().name as any;
}

export function getBrowserPolyfill(
  browserName: string = getBrowserName(),
): Browser {
  return (() => {
    switch (browserName) {
      case SupportedBrowsers.OPERA:
      case SupportedBrowsers.CHROME:
        return polyfill((window as any)['chrome']);

      case SupportedBrowsers.EDGE:
        return polyfill((window as any)['browser']);

      case SupportedBrowsers.FIREFOX:
        return (window as any)['browser'];

      case SupportedBrowsers.NODE:
        // External module that doesn't get included in the bundle
        return browserMock;

      default:
        throw new Error(
          `Browser ${browserName} is currently not supported!
          Must be one of: ${Object.values(SupportedBrowsers).join(', ')}`
        );
    }
  })() as Browser;
}

export const browser = getBrowserPolyfill();