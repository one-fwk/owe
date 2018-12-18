export interface WebExtensionFactoryOptions {
  context: 'background' | 'popup' | 'content';
  name?: string;
}