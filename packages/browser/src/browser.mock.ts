export namespace browser {
  export namespace runtime {
    const messageListeners = new Set<Function>();

    export function flush() {
      messageListeners.clear();
    }

    export function sendMessage<T>(data: any): Promise<T[]> {
      return Promise.all(
        [...messageListeners.values()].map(listener => {
          return listener(data);
        }),
      );
    }

    export namespace onMessage {
      export const removeListener = (cb: Function) => messageListeners.delete(cb);
      export const addListener = (cb: Function) => messageListeners.add(cb);
      export const hasListener = (cb: Function) => messageListeners.has(cb);
    }
  }
}