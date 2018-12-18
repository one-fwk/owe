import { Browser } from 'webextension-polyfill-ts';
import getBrowser from 'browser-detect';

import { SupportedBrowsers } from './supported-browsers.enum';
import { polyfill } from './polyfill';

export function isNode() {
  return (
    (typeof process === 'object') &&
    (typeof process.release === 'object') &&
    process.release.name === 'node'
  );
}

export function getBrowserPolyfill(browserName?: SupportedBrowsers): Browser {
  const fromBrowser = isNode ? SupportedBrowsers.NODE : getBrowser().name;

  return (() => {
    switch (browserName || SupportedBrowsers.NODE) {
      case SupportedBrowsers.OPERA:
      case SupportedBrowsers.CHROME:
        return polyfill(window['chrome']);

      case SupportedBrowsers.EDGE:
        return polyfill(window['browser']);

      case SupportedBrowsers.FIREFOX:
        return window['browser'];

      case SupportedBrowsers.NODE:
        // External module that doesn't get included in the bundle
        return require('./browser.mock').browser;

      default:
        throw new Error(
          `Browser ${fromBrowser} is currently not supported!
          Must be one of: ${Object.values(SupportedBrowsers).join(', ')}`
        );
    }
  })() as Browser;
}

export const browser = getBrowserPolyfill();