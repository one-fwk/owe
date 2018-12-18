var _typeof =
  typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
    ? function(obj) {
      return typeof obj;
    }
    : function(obj) {
      return obj &&
      typeof Symbol === "function" &&
      obj.constructor === Symbol &&
      obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);
  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);
    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;
    if (getter === undefined) {
      return undefined;
    }
    return getter.call(receiver);
  }
};

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
      typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    var instance = Reflect.construct(cls, Array.from(arguments));
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

// Wrapping the bulk of this polyfill in a one-time-use function is a minor
// optimization for Firefox. Since Spidermonkey does not fully parse the
// contents of a function until the first time it's called, and since it will
// never actually need to be called, this allows the polyfill to be included
// in Firefox nearly for free.
exports.polyfill = (namespace) => {
  // NOTE: apiMetadata is associated to the content of the api-metadata.json file
  // at build time by replacing the following "include" with the content of the
  // JSON file.
  var apiMetadata = {
    alarms: {
      clear: {
        minArgs: 0,
        maxArgs: 1
      },
      clearAll: {
        minArgs: 0,
        maxArgs: 0
      },
      get: {
        minArgs: 0,
        maxArgs: 1
      },
      getAll: {
        minArgs: 0,
        maxArgs: 0
      }
    },
    bookmarks: {
      create: {
        minArgs: 1,
        maxArgs: 1
      },
      export: {
        minArgs: 0,
        maxArgs: 0
      },
      get: {
        minArgs: 1,
        maxArgs: 1
      },
      getChildren: {
        minArgs: 1,
        maxArgs: 1
      },
      getRecent: {
        minArgs: 1,
        maxArgs: 1
      },
      getTree: {
        minArgs: 0,
        maxArgs: 0
      },
      getSubTree: {
        minArgs: 1,
        maxArgs: 1
      },
      import: {
        minArgs: 0,
        maxArgs: 0
      },
      move: {
        minArgs: 2,
        maxArgs: 2
      },
      remove: {
        minArgs: 1,
        maxArgs: 1
      },
      removeTree: {
        minArgs: 1,
        maxArgs: 1
      },
      search: {
        minArgs: 1,
        maxArgs: 1
      },
      update: {
        minArgs: 2,
        maxArgs: 2
      }
    },
    browserAction: {
      getBadgeBackgroundColor: {
        minArgs: 1,
        maxArgs: 1
      },
      getBadgeText: {
        minArgs: 1,
        maxArgs: 1
      },
      getPopup: {
        minArgs: 1,
        maxArgs: 1
      },
      getTitle: {
        minArgs: 1,
        maxArgs: 1
      },
      setIcon: {
        minArgs: 1,
        maxArgs: 1
      }
    },
    commands: {
      getAll: {
        minArgs: 0,
        maxArgs: 0
      }
    },
    contextMenus: {
      update: {
        minArgs: 2,
        maxArgs: 2
      },
      remove: {
        minArgs: 1,
        maxArgs: 1
      },
      removeAll: {
        minArgs: 0,
        maxArgs: 0
      }
    },
    cookies: {
      get: {
        minArgs: 1,
        maxArgs: 1
      },
      getAll: {
        minArgs: 1,
        maxArgs: 1
      },
      getAllCookieStores: {
        minArgs: 0,
        maxArgs: 0
      },
      remove: {
        minArgs: 1,
        maxArgs: 1
      },
      set: {
        minArgs: 1,
        maxArgs: 1
      }
    },
    devtools: {
      inspectedWindow: {
        eval: {
          minArgs: 1,
          maxArgs: 2
        }
      },
      panels: {
        create: {
          minArgs: 3,
          maxArgs: 3,
          singleCallbackArg: true
        }
      }
    },
    downloads: {
      download: {
        minArgs: 1,
        maxArgs: 1
      },
      cancel: {
        minArgs: 1,
        maxArgs: 1
      },
      erase: {
        minArgs: 1,
        maxArgs: 1
      },
      getFileIcon: {
        minArgs: 1,
        maxArgs: 2
      },
      open: {
        minArgs: 1,
        maxArgs: 1
      },
      pause: {
        minArgs: 1,
        maxArgs: 1
      },
      removeFile: {
        minArgs: 1,
        maxArgs: 1
      },
      resume: {
        minArgs: 1,
        maxArgs: 1
      },
      search: {
        minArgs: 1,
        maxArgs: 1
      },
      show: {
        minArgs: 1,
        maxArgs: 1
      }
    },
    extension: {
      isAllowedFileSchemeAccess: {
        minArgs: 0,
        maxArgs: 0
      },
      isAllowedIncognitoAccess: {
        minArgs: 0,
        maxArgs: 0
      }
    },
    history: {
      addUrl: {
        minArgs: 1,
        maxArgs: 1
      },
      getVisits: {
        minArgs: 1,
        maxArgs: 1
      },
      deleteAll: {
        minArgs: 0,
        maxArgs: 0
      },
      deleteRange: {
        minArgs: 1,
        maxArgs: 1
      },
      deleteUrl: {
        minArgs: 1,
        maxArgs: 1
      },
      search: {
        minArgs: 1,
        maxArgs: 1
      }
    },
    i18n: {
      detectLanguage: {
        minArgs: 1,
        maxArgs: 1
      },
      getAcceptLanguages: {
        minArgs: 0,
        maxArgs: 0
      }
    },
    identity: {
      launchWebAuthFlow: {
        minArgs: 1,
        maxArgs: 1
      }
    },
    idle: {
      queryState: {
        minArgs: 1,
        maxArgs: 1
      }
    },
    management: {
      get: {
        minArgs: 1,
        maxArgs: 1
      },
      getAll: {
        minArgs: 0,
        maxArgs: 0
      },
      getSelf: {
        minArgs: 0,
        maxArgs: 0
      },
      uninstallSelf: {
        minArgs: 0,
        maxArgs: 1
      }
    },
    notifications: {
      clear: {
        minArgs: 1,
        maxArgs: 1
      },
      create: {
        minArgs: 1,
        maxArgs: 2
      },
      getAll: {
        minArgs: 0,
        maxArgs: 0
      },
      getPermissionLevel: {
        minArgs: 0,
        maxArgs: 0
      },
      update: {
        minArgs: 2,
        maxArgs: 2
      }
    },
    pageAction: {
      getPopup: {
        minArgs: 1,
        maxArgs: 1
      },
      setPopup: {
        minArgs: 1,
        maxArgs: 1,
        fallbackToNoCallback: true
      },
      getTitle: {
        minArgs: 1,
        maxArgs: 1
      },
      setTitle: {
        minArgs: 1,
        maxArgs: 1,
        fallbackToNoCallback: true
      },
      hide: {
        minArgs: 1,
        maxArgs: 1,
        fallbackToNoCallback: true
      },
      setIcon: {
        minArgs: 1,
        maxArgs: 1
      },
      getIcon: {
        minArgs: 1,
        maxArgs: 1
      },
      show: {
        minArgs: 1,
        maxArgs: 1,
        fallbackToNoCallback: true
      }
    },
    runtime: {
      getBackgroundPage: {
        minArgs: 0,
        maxArgs: 0
      },
      getBrowserInfo: {
        minArgs: 0,
        maxArgs: 0
      },
      getPlatformInfo: {
        minArgs: 0,
        maxArgs: 0
      },
      openOptionsPage: {
        minArgs: 0,
        maxArgs: 0
      },
      requestUpdateCheck: {
        minArgs: 0,
        maxArgs: 0
      },
      sendMessage: {
        minArgs: 1,
        maxArgs: 3
      },
      sendNativeMessage: {
        minArgs: 2,
        maxArgs: 2
      },
      setUninstallURL: {
        minArgs: 1,
        maxArgs: 1
      }
    },
    storage: {
      local: {
        clear: {
          minArgs: 0,
          maxArgs: 0
        },
        get: {
          minArgs: 0,
          maxArgs: 1
        },
        getBytesInUse: {
          minArgs: 0,
          maxArgs: 1
        },
        remove: {
          minArgs: 1,
          maxArgs: 1
        },
        set: {
          minArgs: 1,
          maxArgs: 1
        }
      },
      managed: {
        get: {
          minArgs: 0,
          maxArgs: 1
        },
        getBytesInUse: {
          minArgs: 0,
          maxArgs: 1
        }
      },
      sync: {
        clear: {
          minArgs: 0,
          maxArgs: 0
        },
        get: {
          minArgs: 0,
          maxArgs: 1
        },
        getBytesInUse: {
          minArgs: 0,
          maxArgs: 1
        },
        remove: {
          minArgs: 1,
          maxArgs: 1
        },
        set: {
          minArgs: 1,
          maxArgs: 1
        }
      }
    },
    tabs: {
      create: {
        minArgs: 1,
        maxArgs: 1
      },
      captureVisibleTab: {
        minArgs: 0,
        maxArgs: 2
      },
      detectLanguage: {
        minArgs: 0,
        maxArgs: 1
      },
      duplicate: {
        minArgs: 1,
        maxArgs: 1
      },
      executeScript: {
        minArgs: 1,
        maxArgs: 2
      },
      get: {
        minArgs: 1,
        maxArgs: 1
      },
      getCurrent: {
        minArgs: 0,
        maxArgs: 0
      },
      getZoom: {
        minArgs: 0,
        maxArgs: 1
      },
      getZoomSettings: {
        minArgs: 0,
        maxArgs: 1
      },
      highlight: {
        minArgs: 1,
        maxArgs: 1
      },
      insertCSS: {
        minArgs: 1,
        maxArgs: 2
      },
      move: {
        minArgs: 2,
        maxArgs: 2
      },
      reload: {
        minArgs: 0,
        maxArgs: 2
      },
      remove: {
        minArgs: 1,
        maxArgs: 1
      },
      query: {
        minArgs: 1,
        maxArgs: 1
      },
      removeCSS: {
        minArgs: 1,
        maxArgs: 2
      },
      sendMessage: {
        minArgs: 2,
        maxArgs: 3
      },
      setZoom: {
        minArgs: 1,
        maxArgs: 2
      },
      setZoomSettings: {
        minArgs: 1,
        maxArgs: 2
      },
      update: {
        minArgs: 1,
        maxArgs: 2
      }
    },
    webNavigation: {
      getAllFrames: {
        minArgs: 1,
        maxArgs: 1
      },
      getFrame: {
        minArgs: 1,
        maxArgs: 1
      }
    },
    webRequest: {
      handlerBehaviorChanged: {
        minArgs: 0,
        maxArgs: 0
      }
    },
    windows: {
      create: {
        minArgs: 0,
        maxArgs: 1
      },
      get: {
        minArgs: 1,
        maxArgs: 2
      },
      getAll: {
        minArgs: 0,
        maxArgs: 1
      },
      getCurrent: {
        minArgs: 0,
        maxArgs: 1
      },
      getLastFocused: {
        minArgs: 0,
        maxArgs: 1
      },
      remove: {
        minArgs: 1,
        maxArgs: 1
      },
      update: {
        minArgs: 2,
        maxArgs: 2
      }
    }
  };

  if (Object.keys(apiMetadata).length === 0) {
    throw new Error(
      "api-metadata.json has not been included in browser-polyfill"
    );
  }

  var DefaultWeakMap = (function(_extendableBuiltin2) {
    _inherits(DefaultWeakMap, _extendableBuiltin2);

    function DefaultWeakMap(createItem) {
      var items =
        arguments.length > 1 && arguments[1] !== undefined
          ? arguments[1]
          : undefined;

      _classCallCheck(this, DefaultWeakMap);

      var _this = _possibleConstructorReturn(
        this,
        (DefaultWeakMap.__proto__ || Object.getPrototypeOf(DefaultWeakMap))
          .call(this, items)
      );

      _this.createItem = createItem;
      return _this;
    }

    _createClass(DefaultWeakMap, [
      {
        key: "get",
        value: function get(key) {
          if (!this.has(key)) {
            this.set(key, this.createItem(key));
          }

          return _get(
            DefaultWeakMap.prototype.__proto__ ||
            Object.getPrototypeOf(DefaultWeakMap.prototype),
            "get",
            this
          ).call(this, key);
        }
      }
    ]);

    return DefaultWeakMap;
  })(_extendableBuiltin(WeakMap));


  var isThenable = function isThenable(value) {
    return (
      value &&
      (typeof value === "undefined" ? "undefined" : _typeof(value)) ===
      "object" &&
      typeof value.then === "function"
    );
  };

  var makeCallback = function makeCallback(promise, metadata) {
    return function() {
      for (
        var _len = arguments.length, callbackArgs = Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        callbackArgs[_key] = arguments[_key];
      }

      if (namespace.runtime.lastError) {
        promise.reject(namespace.runtime.lastError);
      } else if (metadata.singleCallbackArg || callbackArgs.length === 1) {
        promise.resolve(callbackArgs[0]);
      } else {
        promise.resolve(callbackArgs);
      }
    };
  };

  var wrapAsyncFunction = function wrapAsyncFunction(name, metadata) {
    var pluralizeArguments = function pluralizeArguments(numArgs) {
      return numArgs === 1 ? "argument" : "arguments";
    };

    return function asyncFunctionWrapper(target) {
      for (
        var _len2 = arguments.length,
          args = Array(_len2 > 1 ? _len2 - 1 : 0),
          _key2 = 1;
        _key2 < _len2;
        _key2++
      ) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (args.length < metadata.minArgs) {
        throw new Error(
          "Expected at least " +
          metadata.minArgs +
          " " +
          pluralizeArguments(metadata.minArgs) +
          " for " +
          name +
          "(), got " +
          args.length
        );
      }

      if (args.length > metadata.maxArgs) {
        throw new Error(
          "Expected at most " +
          metadata.maxArgs +
          " " +
          pluralizeArguments(metadata.maxArgs) +
          " for " +
          name +
          "(), got " +
          args.length
        );
      }

      return new Promise(function(resolve, reject) {
        if (metadata.fallbackToNoCallback) {
          // This API method has currently no callback on Chrome, but it return a promise on Firefox,
          // and so the polyfill will try to call it with a callback first, and it will fallback
          // to not passing the callback if the first call fails.
          try {
            target[name].apply(
              target,
              args.concat([
                makeCallback({ resolve: resolve, reject: reject }, metadata)
              ])
            );
          } catch (cbError) {
            console.warn(
              name +
              " API method doesn't seem to support the callback parameter, " +
              "falling back to call it without a callback: ",
              cbError
            );

            target[name].apply(target, args);

            // Update the API method metadata, so that the next API calls will not try to
            // use the unsupported callback anymore.
            metadata.fallbackToNoCallback = false;
            metadata.noCallback = true;

            resolve();
          }
        } else if (metadata.noCallback) {
          target[name].apply(target, args);
          resolve();
        } else {
          target[name].apply(
            target,
            args.concat([
              makeCallback({ resolve: resolve, reject: reject }, metadata)
            ])
          );
        }
      });
    };
  };
  var wrapMethod = function wrapMethod(target, method, wrapper) {
    return new Proxy(method, {
      apply: function apply(targetMethod, thisObj, args) {
        return wrapper.call.apply(
          wrapper,
          [thisObj, target].concat(_toConsumableArray(args))
        );
      }
    });
  };

  var hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);

  var wrapObject = function wrapObject(target) {
    var wrappers =
      arguments.length > 1 && arguments[1] !== undefined
        ? arguments[1]
        : {};
    var metadata =
      arguments.length > 2 && arguments[2] !== undefined
        ? arguments[2]
        : {};

    var cache = Object.create(null);
    var handlers = {
      has: function has(proxyTarget, prop) {
        return prop in target || prop in cache;
      },
      get: function get(proxyTarget, prop, receiver) {
        if (prop in cache) {
          return cache[prop];
        }

        if (!(prop in target)) {
          return undefined;
        }

        var value = target[prop];

        if (typeof value === "function") {
          // This is a method on the underlying object. Check if we need to do
          // any wrapping.

          if (typeof wrappers[prop] === "function") {
            // We have a special-case wrapper for this method.
            value = wrapMethod(target, target[prop], wrappers[prop]);
          } else if (hasOwnProperty(metadata, prop)) {
            // This is an async method that we have metadata for. Create a
            // Promise wrapper for it.
            var wrapper = wrapAsyncFunction(prop, metadata[prop]);
            value = wrapMethod(target, target[prop], wrapper);
          } else {
            // This is a method that we don't know or care about. Return the
            // original method, bound to the underlying object.
            value = value.bind(target);
          }
        } else if (
          (typeof value === "undefined" ? "undefined" : _typeof(value)) ===
          "object" &&
          value !== null &&
          (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))
        ) {
          // This is an object that we need to do some wrapping for the children
          // of. Create a sub-object wrapper for it with the appropriate child
          // metadata.
          value = wrapObject(value, wrappers[prop], metadata[prop]);
        } else {
          // We don't need to do any wrapping for this property,
          // so just forward all access to the underlying object.
          Object.defineProperty(cache, prop, {
            configurable: true,
            enumerable: true,
            get: function get() {
              return target[prop];
            },
            set: function set(value) {
              target[prop] = value;
            }
          });

          return value;
        }

        cache[prop] = value;
        return value;
      },
      set: function set(proxyTarget, prop, value, receiver) {
        if (prop in cache) {
          cache[prop] = value;
        } else {
          target[prop] = value;
        }
        return true;
      },
      defineProperty: function defineProperty(proxyTarget, prop, desc) {
        return Reflect.defineProperty(cache, prop, desc);
      },
      deleteProperty: function deleteProperty(proxyTarget, prop) {
        return Reflect.deleteProperty(cache, prop);
      }
    };
    var proxyTarget = Object.create(target);
    return new Proxy(proxyTarget, handlers);
  };
  var wrapEvent = function wrapEvent(wrapperMap) {
    return {
      addListener: function addListener(target, listener) {
        for (
          var _len3 = arguments.length,
            args = Array(_len3 > 2 ? _len3 - 2 : 0),
            _key3 = 2;
          _key3 < _len3;
          _key3++
        ) {
          args[_key3 - 2] = arguments[_key3];
        }

        target.addListener.apply(
          target,
          [wrapperMap.get(listener)].concat(args)
        );
      },
      hasListener: function hasListener(target, listener) {
        return target.hasListener(wrapperMap.get(listener));
      },
      removeListener: function removeListener(target, listener) {
        target.removeListener(wrapperMap.get(listener));
      }
    };
  };

  var onMessageWrappers = new DefaultWeakMap(function(listener) {
    if (typeof listener !== "function") {
      return listener;
    }
    return function onMessage(message, sender, sendResponse) {
      var didCallSendResponse = false;

      var wrappedSendResponse = void 0;
      var sendResponsePromise = new Promise(function(resolve) {
        wrappedSendResponse = function wrappedSendResponse(response) {
          didCallSendResponse = true;
          resolve(response);
        };
      });

      var result = listener(message, sender, wrappedSendResponse);

      var isResultThenable = result !== true && isThenable(result);
      if (result !== true && !isResultThenable && !didCallSendResponse) {
        return false;
      }
      if (isResultThenable) {
        result.then(sendResponse, function(error) {
          console.error(error);
          sendResponse(undefined);
        });
      } else {
        sendResponsePromise.then(sendResponse, function(error) {
          console.error(error);
          sendResponse(undefined);
        });
      }

      // Let Chrome know that the listener is replying.
      return true;
    };
  });

  var staticWrappers = {
    runtime: {
      onMessage: wrapEvent(onMessageWrappers)
    }
  };

  return wrapObject(namespace, staticWrappers, apiMetadata);
};