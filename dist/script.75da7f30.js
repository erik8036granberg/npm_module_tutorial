// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/current-device/es/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
}; // Save the previous value of the device variable.


var previousDevice = window.device;
var device = {};
var changeOrientationList = []; // Add device as a global object.

window.device = device; // The <html> element.

var documentElement = window.document.documentElement; // The client user agent string.
// Lowercase, so we can use the more efficient indexOf(), instead of Regex

var userAgent = window.navigator.userAgent.toLowerCase(); // Detectable television devices.

var television = ['googletv', 'viera', 'smarttv', 'internet.tv', 'netcast', 'nettv', 'appletv', 'boxee', 'kylo', 'roku', 'dlnadoc', 'pov_tv', 'hbbtv', 'ce-html']; // Main functions
// --------------

device.macos = function () {
  return find('mac');
};

device.ios = function () {
  return device.iphone() || device.ipod() || device.ipad();
};

device.iphone = function () {
  return !device.windows() && find('iphone');
};

device.ipod = function () {
  return find('ipod');
};

device.ipad = function () {
  return find('ipad');
};

device.android = function () {
  return !device.windows() && find('android');
};

device.androidPhone = function () {
  return device.android() && find('mobile');
};

device.androidTablet = function () {
  return device.android() && !find('mobile');
};

device.blackberry = function () {
  return find('blackberry') || find('bb10') || find('rim');
};

device.blackberryPhone = function () {
  return device.blackberry() && !find('tablet');
};

device.blackberryTablet = function () {
  return device.blackberry() && find('tablet');
};

device.windows = function () {
  return find('windows');
};

device.windowsPhone = function () {
  return device.windows() && find('phone');
};

device.windowsTablet = function () {
  return device.windows() && find('touch') && !device.windowsPhone();
};

device.fxos = function () {
  return (find('(mobile') || find('(tablet')) && find(' rv:');
};

device.fxosPhone = function () {
  return device.fxos() && find('mobile');
};

device.fxosTablet = function () {
  return device.fxos() && find('tablet');
};

device.meego = function () {
  return find('meego');
};

device.cordova = function () {
  return window.cordova && location.protocol === 'file:';
};

device.nodeWebkit = function () {
  return _typeof(window.process) === 'object';
};

device.mobile = function () {
  return device.androidPhone() || device.iphone() || device.ipod() || device.windowsPhone() || device.blackberryPhone() || device.fxosPhone() || device.meego();
};

device.tablet = function () {
  return device.ipad() || device.androidTablet() || device.blackberryTablet() || device.windowsTablet() || device.fxosTablet();
};

device.desktop = function () {
  return !device.tablet() && !device.mobile();
};

device.television = function () {
  var i = 0;

  while (i < television.length) {
    if (find(television[i])) {
      return true;
    }

    i++;
  }

  return false;
};

device.portrait = function () {
  if (screen.orientation && Object.prototype.hasOwnProperty.call(window, 'onorientationchange')) {
    return screen.orientation.type.includes('portrait');
  }

  return window.innerHeight / window.innerWidth > 1;
};

device.landscape = function () {
  if (screen.orientation && Object.prototype.hasOwnProperty.call(window, 'onorientationchange')) {
    return screen.orientation.type.includes('landscape');
  }

  return window.innerHeight / window.innerWidth < 1;
}; // Public Utility Functions
// ------------------------
// Run device.js in noConflict mode,
// returning the device variable to its previous owner.


device.noConflict = function () {
  window.device = previousDevice;
  return this;
}; // Private Utility Functions
// -------------------------
// Simple UA string search


function find(needle) {
  return userAgent.indexOf(needle) !== -1;
} // Check if documentElement already has a given class.


function hasClass(className) {
  return documentElement.className.match(new RegExp(className, 'i'));
} // Add one or more CSS classes to the <html> element.


function addClass(className) {
  var currentClassNames = null;

  if (!hasClass(className)) {
    currentClassNames = documentElement.className.replace(/^\s+|\s+$/g, '');
    documentElement.className = currentClassNames + ' ' + className;
  }
} // Remove single CSS class from the <html> element.


function removeClass(className) {
  if (hasClass(className)) {
    documentElement.className = documentElement.className.replace(' ' + className, '');
  }
} // HTML Element Handling
// ---------------------
// Insert the appropriate CSS class based on the _user_agent.


if (device.ios()) {
  if (device.ipad()) {
    addClass('ios ipad tablet');
  } else if (device.iphone()) {
    addClass('ios iphone mobile');
  } else if (device.ipod()) {
    addClass('ios ipod mobile');
  }
} else if (device.macos()) {
  addClass('macos desktop');
} else if (device.android()) {
  if (device.androidTablet()) {
    addClass('android tablet');
  } else {
    addClass('android mobile');
  }
} else if (device.blackberry()) {
  if (device.blackberryTablet()) {
    addClass('blackberry tablet');
  } else {
    addClass('blackberry mobile');
  }
} else if (device.windows()) {
  if (device.windowsTablet()) {
    addClass('windows tablet');
  } else if (device.windowsPhone()) {
    addClass('windows mobile');
  } else {
    addClass('windows desktop');
  }
} else if (device.fxos()) {
  if (device.fxosTablet()) {
    addClass('fxos tablet');
  } else {
    addClass('fxos mobile');
  }
} else if (device.meego()) {
  addClass('meego mobile');
} else if (device.nodeWebkit()) {
  addClass('node-webkit');
} else if (device.television()) {
  addClass('television');
} else if (device.desktop()) {
  addClass('desktop');
}

if (device.cordova()) {
  addClass('cordova');
} // Orientation Handling
// --------------------
// Handle device orientation changes.


function handleOrientation() {
  if (device.landscape()) {
    removeClass('portrait');
    addClass('landscape');
    walkOnChangeOrientationList('landscape');
  } else {
    removeClass('landscape');
    addClass('portrait');
    walkOnChangeOrientationList('portrait');
  }

  setOrientationCache();
}

function walkOnChangeOrientationList(newOrientation) {
  for (var index in changeOrientationList) {
    changeOrientationList[index](newOrientation);
  }
}

device.onChangeOrientation = function (cb) {
  if (typeof cb == 'function') {
    changeOrientationList.push(cb);
  }
}; // Detect whether device supports orientationchange event,
// otherwise fall back to the resize event.


var orientationEvent = 'resize';

if (Object.prototype.hasOwnProperty.call(window, 'onorientationchange')) {
  orientationEvent = 'orientationchange';
} // Listen for changes in orientation.


if (window.addEventListener) {
  window.addEventListener(orientationEvent, handleOrientation, false);
} else if (window.attachEvent) {
  window.attachEvent(orientationEvent, handleOrientation);
} else {
  window[orientationEvent] = handleOrientation;
}

handleOrientation(); // Public functions to get the current value of type, os, or orientation
// ---------------------------------------------------------------------

function findMatch(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (device[arr[i]]()) {
      return arr[i];
    }
  }

  return 'unknown';
}

device.type = findMatch(['mobile', 'tablet', 'desktop']);
device.os = findMatch(['ios', 'iphone', 'ipad', 'ipod', 'android', 'blackberry', 'windows', 'fxos', 'meego', 'television']);

function setOrientationCache() {
  device.orientation = findMatch(['portrait', 'landscape']);
}

setOrientationCache();
var _default = device;
exports.default = _default;
},{}],"script.js":[function(require,module,exports) {
"use strict";

var _currentDevice = _interopRequireDefault(require("current-device"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('device.mobile() === %s', _currentDevice.default.mobile());
var os = document.querySelector("#os");
var orientation = document.querySelector("#orientation");
var type = document.querySelector("#type");

if (_currentDevice.default.windows()) {
  os.textContent = "Windows";
}

if (_currentDevice.default.ios()) {
  os.textContent = "iOS";
}

if (_currentDevice.default.android()) {
  os.textContent = "Android";
}

if (_currentDevice.default.mobile()) {
  type.textContent = "Mobile";
}

;

if (_currentDevice.default.tablet()) {
  type.textContent = "Tablet";
}

;

if (_currentDevice.default.desktop()) {
  type.textContent = "Desktop";
}

;

if (_currentDevice.default.portrait()) {
  orientation.textContent = "Portrait";
}

;

if (_currentDevice.default.landscape()) {
  orientation.textContent = "Landscape";
}

; // if (device.ipad()) {};
// if (device.ipod()) {};
// if (device.iphone()) {};
// if (device.android()) {};
// if (device.androidTablet()) {};
// if (device.blackberryTablet()) {};
// if (device.fxos()) {};
// if (device.fxosPhone()) {};
// if (device.fxosTablet()) {};
// if (device.meego()) {};
// if (device.television()) {};

_currentDevice.default.onChangeOrientation(function (newOrientation) {
  console.log("New orientation is ".concat(newOrientation));
});
},{"current-device":"node_modules/current-device/es/index.js"}],"C:/Users/erik-/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55104" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/erik-/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map