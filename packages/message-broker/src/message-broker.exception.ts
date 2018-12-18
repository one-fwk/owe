export class MessageBrokerException extends Error {
  constructor(msg: string) {
    super(`MessageBroker: ${msg}`);
  }
}