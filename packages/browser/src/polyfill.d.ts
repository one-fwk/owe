import { Browser } from 'webextension-polyfill-ts';

declare module './polyfill' {
  export function polyfill(env: unknown): Browser;
}