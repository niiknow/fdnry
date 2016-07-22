(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("fdn", [], factory);
	else if(typeof exports === 'object')
		exports["fdn"] = factory();
	else
		root["fdn"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _feedinary = __webpack_require__(1);
	
	var _feedinary2 = _interopRequireDefault(_feedinary);
	
	var _util = __webpack_require__(2);
	
	var _util2 = _interopRequireDefault(_util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var util = new _util2.default();
	var fdn = new _feedinary2.default();
	
	util.each(util.dom("script[src*='/fdn.']"), function (e, i) {
	  util.each(['', 'data-'], function (v, k) {
	    util.each(['client', 'theme', 'name', 'url'], function (v2, k2) {
	      var attr = e.getAttribute(v + k2);
	
	      if (attr) {
	        fdn.opts[k2] = attr;
	      }
	    });
	  });
	});
	
	util.domready(function () {
	  fdn.init();
	});
	exports.default = fdn;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(2);
	
	var _util2 = _interopRequireDefault(_util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	__webpack_require__(139);
	__webpack_require__(140);
	var myContent = __webpack_require__(144);
	var util = new _util2.default();
	
	var Feedinary = function () {
	  function Feedinary() {
	    _classCallCheck(this, Feedinary);
	
	    this.win = window;
	    this.config = {
	      channel: 'homepage',
	      url: 'http://localhost:3000/api/',
	      header: '<div class="fdn-content">',
	      emptyText: '<div class="fdn-content"><div class="fdn-desc"></div></div>'
	    };
	  }
	
	  _createClass(Feedinary, [{
	    key: 'init',
	    value: function init(client, theme, channel, url) {
	      this.config.qs = util.parseQueryString((location || {}).search || '');
	      this.config.client = client || this.config.client;
	      this.config.theme = theme || this.config.theme;
	      this.config.channel = channel || this.config.channel;
	      this.config.url = url || this.config.url;
	      this.config.css = '';
	      var that = this;
	
	      util.dom('[id^="fdn-"]').addClass('fdn-container');
	      if (this.config.qs.fdnmode === 'edit') {
	        var myDom = util.dom('.fdn-container:empty');
	
	        myDom.html(this.config.emptyText);
	        util.dom('.fdn-desc').addClass('fdn-edit');
	        myDom.on('click', function (evt) {
	          // open edit modal
	          that.win.gmodal.show({ content: myContent, hideOn: 'click,esc,tap' });
	        });
	      } else if (this.config.qs.fdnmode === 'preview') {
	        util.dom('.fdn-desc').addClass('fdn-preview');
	      }
	    }
	  }, {
	    key: 'getContent',
	    value: function getContent(opts) {
	      opts.url = opts.url || this.opts.url;
	      opts.data.client = this.opts.client;
	      opts.data.type = 'content';
	      opts.data.channel = this.opts.channel;
	
	      if (this.config.theme) {
	        opts.data.theme = opts.data.theme || this.config.theme;
	      }
	
	      var ut = new _util2.default();
	
	      return ut.request(opts);
	    }
	  }, {
	    key: 'renderContent',
	    value: function renderContent(name, content) {
	      var that = this;
	      var cancel = false;
	      var myName = name.toLowerCase();
	
	      // find the destination element, quit if not found
	      var el = util.dom('[id=\'fdn-' + myName + '\']');
	
	      if (el.length < 0) {
	        return;
	      }
	
	      if (this.onBeforeRender) {
	        cancel = this.onBeforeRender(myName, content);
	      }
	
	      if (!cancel) {
	        // get the content
	        content = content || (this.cache || {})[myName];
	
	        // build the header
	        var html = '' + that.config.header;
	        var pi = (content.pi || '').split(',');
	
	        // build impression pixel tracking
	        util.each(pi, function (v, k) {
	          if (v.length > 5) {
	            html += '<img class="fdn-pi" width="1" height="1" border="0" src="' + v + '" />';
	          }
	        });
	
	        html += '<div class="fdn-desc">' + content.desc + '</div>' + that.config.footer + '</div>';
	
	        if (html.indexOf('[[') > 0) {
	          html = html.replace('[[client]]', that.config.client);
	          html = html.replace('[[channel]]', that.config.channel);
	          html = html.replace('[[nc]]', new Date().getTime());
	          html = html.replace('[[name]]', myName);
	        }
	
	        el.html('').html(html || '');
	      }
	
	      // trigger on after render
	      if (this.onAfterRender) {
	        this.onAfterRender(myName, content);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render(name) {
	      var that = this;
	
	      if (!that.cache) {
	        that.getContent({
	          data: { channel: that.config.channel }
	        }).then(function (data) {
	          if (typeof data === 'undefined') {
	            // do nothing
	            that.cache = {};
	          } else if (typeof data === 'string' && data.indexOf('{') > 0) {
	            that.cache = JSON.parse(data);
	          } else {
	            that.cache = data;
	          }
	          if (name) {
	            that.renderContent(name);
	          } else {
	            // loop through and render content
	            for (var k in that.cache) {
	              that.renderContent(k);
	            }
	          }
	        });
	      } else {
	        if (name) {
	          that.renderContent(name);
	        } else {
	          // loop through and render content
	          for (var k in that.cache) {
	            that.renderContent(k);
	          }
	        }
	      }
	    }
	  }]);
	
	  return Feedinary;
	}();
	
	exports.default = Feedinary;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; // import gmodal from 'bower/gmodal/gmodal.js';
	
	
	var _es6Promise = __webpack_require__(3);
	
	var _es6Promise2 = _interopRequireDefault(_es6Promise);
	
	var _keys = __webpack_require__(8);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _extend = __webpack_require__(27);
	
	var _extend2 = _interopRequireDefault(_extend);
	
	var _each = __webpack_require__(46);
	
	var _each2 = _interopRequireDefault(_each);
	
	var _map = __webpack_require__(131);
	
	var _map2 = _interopRequireDefault(_map);
	
	var _throttle = __webpack_require__(134);
	
	var _throttle2 = _interopRequireDefault(_throttle);
	
	var _dom = __webpack_require__(137);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _ready = __webpack_require__(138);
	
	var _ready2 = _interopRequireDefault(_ready);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// allow for IE compatible object property delete
	var del = function del(obj, key) {
	  obj[key] = null;
	  try {
	    delete obj[key];
	  } catch (e) {
	    var _ret = function () {
	      var items = {};
	
	      (0, _each2.default)(obj, function (v, k) {
	        if (k !== key) {
	          items[k] = v;
	        }
	      });
	
	      return {
	        v: items
	      };
	    }();
	
	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }
	  return obj;
	};
	
	var Util = function () {
	  function Util() {
	    _classCallCheck(this, Util);
	
	    this.each = this.forEach = _each2.default;
	    this.map = this.collect = _map2.default;
	    this.keys = _keys2.default;
	    this.del = del;
	    this.extend = _extend2.default;
	    this.throttle = _throttle2.default;
	    this.dom = _dom2.default;
	    this.domready = _ready2.default;
	    this.doc = document || {};
	  }
	
	  _createClass(Util, [{
	    key: 'parseQueryString',
	    value: function parseQueryString(qstr) {
	      qstr = (qstr || '').replace('?', '').replace('#', '');
	      var d = decodeURIComponent;
	      var query = {};
	      var a = qstr.split('&');
	
	      for (var i = 0; i < a.length; i++) {
	        var b = a[i].split('=');
	
	        query[d(b[0])] = d(b[1] || '');
	      }
	      return query;
	    }
	
	    /**
	     * make xhr request with a promise
	     * @param  {object} opts the options
	     * @return {promise}     a promise
	     */
	
	  }, {
	    key: 'xhrp',
	    value: function xhrp(opts) {
	      var that = this;
	
	      return new _es6Promise2.default(function (resolve, reject) {
	        return that.xhr(opts, resolve, reject);
	      });
	    }
	
	    /**
	     * make an xhr request
	     * @param  {object}   options  url string or options object
	     * @param  {Function} callback
	     * @param  {Function} errback  error callback
	     */
	
	  }, {
	    key: 'xhr',
	    value: function xhr(options, callback, errback) {
	      var url = options;
	
	      if (typeof url === 'string') {
	        options = options || {};
	        options.url = url;
	      }
	
	      // Create the XHR request itself
	      var req = window.XMLHttpRequest ? new XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');
	
	      if (options.withCredentials) {
	        req.withCredentials = true;
	
	        if (typeof XDomainRequest !== 'undefined') {
	          // XDomainRequest for IE.
	          req = new XDomainRequest();
	        }
	      }
	
	      // if there are no options, it failed
	      if (!options || options.length === 0) {
	        errback({ xhr: req, error: new Error('xhr expects an url or an options object, none given.') });
	      }
	
	      // normalize method
	      options.method = options.method || 'GET';
	
	      // open url
	      req.open(options.method, options.url, req.withCredentials);
	
	      // set request header
	      this.each(options.headers || {}, function (value, key) {
	        req.setRequestHeader(key, value);
	      });
	
	      req.onreadystatechange = function () {
	        if (req.readyState === 4 && req.status >= 200 && req.status < 400) {
	          // Callbacks for successful requests
	          callback({
	            xhr: req,
	            text: req.responseText,
	            url: req.responseURL
	          });
	        } else if (req.readyState === 4) {
	          // Callbacks for failed requests
	          errback({
	            xhr: req
	          });
	        }
	      };
	
	      req.onerror = function (err) {
	        errback({ xhr: req, error: err });
	      };
	
	      req.send(options.data || void 0);
	      return req;
	    }
	  }]);
	
	  return Util;
	}();
	
	exports.default = Util;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;var require;/* WEBPACK VAR INJECTION */(function(process, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.2.2+35df15ea
	 */
	
	(function() {
	    "use strict";
	    function lib$es6$promise$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }
	
	    function lib$es6$promise$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }
	
	    function lib$es6$promise$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }
	
	    var lib$es6$promise$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$es6$promise$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$es6$promise$utils$$_isArray = Array.isArray;
	    }
	
	    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	    var lib$es6$promise$asap$$len = 0;
	    var lib$es6$promise$asap$$vertxNext;
	    var lib$es6$promise$asap$$customSchedulerFn;
	
	    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	      lib$es6$promise$asap$$len += 2;
	      if (lib$es6$promise$asap$$len === 2) {
	        // If len is 2, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        if (lib$es6$promise$asap$$customSchedulerFn) {
	          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	        } else {
	          lib$es6$promise$asap$$scheduleFlush();
	        }
	      }
	    }
	
	    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	    }
	
	    function lib$es6$promise$asap$$setAsap(asapFn) {
	      lib$es6$promise$asap$$asap = asapFn;
	    }
	
	    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$es6$promise$asap$$isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
	
	    // test for web worker but not in IE10
	    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';
	
	    // node
	    function lib$es6$promise$asap$$useNextTick() {
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // see https://github.com/cujojs/when/issues/410 for details
	      return function() {
	        process.nextTick(lib$es6$promise$asap$$flush);
	      };
	    }
	
	    // vertx
	    function lib$es6$promise$asap$$useVertxTimer() {
	      return function() {
	        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	      };
	    }
	
	    function lib$es6$promise$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });
	
	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }
	
	    // web worker
	    function lib$es6$promise$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$es6$promise$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }
	
	    function lib$es6$promise$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$es6$promise$asap$$flush, 1);
	      };
	    }
	
	    var lib$es6$promise$asap$$queue = new Array(1000);
	    function lib$es6$promise$asap$$flush() {
	      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
	        var callback = lib$es6$promise$asap$$queue[i];
	        var arg = lib$es6$promise$asap$$queue[i+1];
	
	        callback(arg);
	
	        lib$es6$promise$asap$$queue[i] = undefined;
	        lib$es6$promise$asap$$queue[i+1] = undefined;
	      }
	
	      lib$es6$promise$asap$$len = 0;
	    }
	
	    function lib$es6$promise$asap$$attemptVertx() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(6);
	        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$es6$promise$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$es6$promise$asap$$useSetTimeout();
	      }
	    }
	
	    var lib$es6$promise$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$es6$promise$asap$$isNode) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	    } else if (lib$es6$promise$asap$$isWorker) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	    } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
	    } else {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	    }
	    function lib$es6$promise$then$$then(onFulfillment, onRejection) {
	      var parent = this;
	
	      var child = new this.constructor(lib$es6$promise$$internal$$noop);
	
	      if (child[lib$es6$promise$$internal$$PROMISE_ID] === undefined) {
	        lib$es6$promise$$internal$$makePromise(child);
	      }
	
	      var state = parent._state;
	
	      if (state) {
	        var callback = arguments[state - 1];
	        lib$es6$promise$asap$$asap(function(){
	          lib$es6$promise$$internal$$invokeCallback(state, child, callback, parent._result);
	        });
	      } else {
	        lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	      }
	
	      return child;
	    }
	    var lib$es6$promise$then$$default = lib$es6$promise$then$$then;
	    function lib$es6$promise$promise$resolve$$resolve(object) {
	      /*jshint validthis:true */
	      var Constructor = this;
	
	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }
	
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
	    var lib$es6$promise$$internal$$PROMISE_ID = Math.random().toString(36).substring(16);
	
	    function lib$es6$promise$$internal$$noop() {}
	
	    var lib$es6$promise$$internal$$PENDING   = void 0;
	    var lib$es6$promise$$internal$$FULFILLED = 1;
	    var lib$es6$promise$$internal$$REJECTED  = 2;
	
	    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();
	
	    function lib$es6$promise$$internal$$selfFulfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }
	
	    function lib$es6$promise$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }
	
	    function lib$es6$promise$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	        return lib$es6$promise$$internal$$GET_THEN_ERROR;
	      }
	    }
	
	    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }
	
	    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	       lib$es6$promise$asap$$asap(function(promise) {
	        var sealed = false;
	        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$es6$promise$$internal$$resolve(promise, value);
	          } else {
	            lib$es6$promise$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;
	
	          lib$es6$promise$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));
	
	        if (!sealed && error) {
	          sealed = true;
	          lib$es6$promise$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }
	
	    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      }
	    }
	
	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable, then) {
	      if (maybeThenable.constructor === promise.constructor &&
	          then === lib$es6$promise$then$$default &&
	          constructor.resolve === lib$es6$promise$promise$resolve$$default) {
	        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$es6$promise$utils$$isFunction(then)) {
	          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }
	
	    function lib$es6$promise$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
	      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, value, lib$es6$promise$$internal$$getThen(value));
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      }
	    }
	
	    function lib$es6$promise$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }
	
	      lib$es6$promise$$internal$$publish(promise);
	    }
	
	    function lib$es6$promise$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	
	      promise._result = value;
	      promise._state = lib$es6$promise$$internal$$FULFILLED;
	
	      if (promise._subscribers.length !== 0) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	      }
	    }
	
	    function lib$es6$promise$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	      promise._state = lib$es6$promise$$internal$$REJECTED;
	      promise._result = reason;
	
	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
	    }
	
	    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;
	
	      parent._onerror = null;
	
	      subscribers[length] = child;
	      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;
	
	      if (length === 0 && parent._state) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	      }
	    }
	
	    function lib$es6$promise$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;
	
	      if (subscribers.length === 0) { return; }
	
	      var child, callback, detail = promise._result;
	
	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];
	
	        if (child) {
	          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }
	
	      promise._subscribers.length = 0;
	    }
	
	    function lib$es6$promise$$internal$$ErrorObject() {
	      this.error = null;
	    }
	
	    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();
	
	    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	      }
	    }
	
	    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	          value, error, succeeded, failed;
	
	      if (hasCallback) {
	        value = lib$es6$promise$$internal$$tryCatch(callback, detail);
	
	        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }
	
	        if (promise === value) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	          return;
	        }
	
	      } else {
	        value = detail;
	        succeeded = true;
	      }
	
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	    }
	
	    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$es6$promise$$internal$$reject(promise, e);
	      }
	    }
	
	    var lib$es6$promise$$internal$$id = 0;
	    function lib$es6$promise$$internal$$nextId() {
	      return lib$es6$promise$$internal$$id++;
	    }
	
	    function lib$es6$promise$$internal$$makePromise(promise) {
	      promise[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$id++;
	      promise._state = undefined;
	      promise._result = undefined;
	      promise._subscribers = [];
	    }
	
	    function lib$es6$promise$promise$all$$all(entries) {
	      return new lib$es6$promise$enumerator$$default(this, entries).promise;
	    }
	    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	    function lib$es6$promise$promise$race$$race(entries) {
	      /*jshint validthis:true */
	      var Constructor = this;
	
	      if (!lib$es6$promise$utils$$isArray(entries)) {
	        return new Constructor(function(resolve, reject) {
	          reject(new TypeError('You must pass an array to race.'));
	        });
	      } else {
	        return new Constructor(function(resolve, reject) {
	          var length = entries.length;
	          for (var i = 0; i < length; i++) {
	            Constructor.resolve(entries[i]).then(resolve, reject);
	          }
	        });
	      }
	    }
	    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	    function lib$es6$promise$promise$reject$$reject(reason) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;
	
	
	    function lib$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }
	
	    function lib$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }
	
	    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
	    /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise's eventual value or the reason
	      why the promise cannot be fulfilled.
	
	      Terminology
	      -----------
	
	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.
	
	      A promise can be in one of three states: pending, fulfilled, or rejected.
	
	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.
	
	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.
	
	
	      Basic Usage:
	      ------------
	
	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);
	
	        // on failure
	        reject(reason);
	      });
	
	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```
	
	      Advanced Usage:
	      ---------------
	
	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.
	
	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();
	
	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();
	
	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }
	
	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```
	
	      Unlike callbacks, promises are great composable primitives.
	
	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON
	
	        return values;
	      });
	      ```
	
	      @class Promise
	      @param {function} resolver
	      Useful for tooling.
	      @constructor
	    */
	    function lib$es6$promise$promise$$Promise(resolver) {
	      this[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$nextId();
	      this._result = this._state = undefined;
	      this._subscribers = [];
	
	      if (lib$es6$promise$$internal$$noop !== resolver) {
	        typeof resolver !== 'function' && lib$es6$promise$promise$$needsResolver();
	        this instanceof lib$es6$promise$promise$$Promise ? lib$es6$promise$$internal$$initializePromise(this, resolver) : lib$es6$promise$promise$$needsNew();
	      }
	    }
	
	    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
	    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;
	
	    lib$es6$promise$promise$$Promise.prototype = {
	      constructor: lib$es6$promise$promise$$Promise,
	
	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.
	
	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```
	
	      Chaining
	      --------
	
	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.
	
	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });
	
	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	
	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```
	
	      Assimilation
	      ------------
	
	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.
	
	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```
	
	      If the assimliated promise rejects, then the downstream promise will also reject.
	
	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```
	
	      Simple Example
	      --------------
	
	      Synchronous Example
	
	      ```javascript
	      var result;
	
	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	
	      Errback Example
	
	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```
	
	      Promise Example;
	
	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```
	
	      Advanced Example
	      --------------
	
	      Synchronous Example
	
	      ```javascript
	      var author, books;
	
	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	
	      Errback Example
	
	      ```js
	
	      function foundBooks(books) {
	
	      }
	
	      function failure(reason) {
	
	      }
	
	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```
	
	      Promise Example;
	
	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```
	
	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: lib$es6$promise$then$$default,
	
	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.
	
	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }
	
	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }
	
	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```
	
	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };
	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      this._instanceConstructor = Constructor;
	      this.promise = new Constructor(lib$es6$promise$$internal$$noop);
	
	      if (!this.promise[lib$es6$promise$$internal$$PROMISE_ID]) {
	        lib$es6$promise$$internal$$makePromise(this.promise);
	      }
	
	      if (lib$es6$promise$utils$$isArray(input)) {
	        this._input     = input;
	        this.length     = input.length;
	        this._remaining = input.length;
	
	        this._result = new Array(this.length);
	
	        if (this.length === 0) {
	          lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	        } else {
	          this.length = this.length || 0;
	          this._enumerate();
	          if (this._remaining === 0) {
	            lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	          }
	        }
	      } else {
	        lib$es6$promise$$internal$$reject(this.promise, lib$es6$promise$enumerator$$validationError());
	      }
	    }
	
	    function lib$es6$promise$enumerator$$validationError() {
	      return new Error('Array Methods must be provided an Array');
	    }
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var length  = this.length;
	      var input   = this._input;
	
	      for (var i = 0; this._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        this._eachEntry(input[i], i);
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var c = this._instanceConstructor;
	      var resolve = c.resolve;
	
	      if (resolve === lib$es6$promise$promise$resolve$$default) {
	        var then = lib$es6$promise$$internal$$getThen(entry);
	
	        if (then === lib$es6$promise$then$$default &&
	            entry._state !== lib$es6$promise$$internal$$PENDING) {
	          this._settledAt(entry._state, i, entry._result);
	        } else if (typeof then !== 'function') {
	          this._remaining--;
	          this._result[i] = entry;
	        } else if (c === lib$es6$promise$promise$$default) {
	          var promise = new c(lib$es6$promise$$internal$$noop);
	          lib$es6$promise$$internal$$handleMaybeThenable(promise, entry, then);
	          this._willSettleAt(promise, i);
	        } else {
	          this._willSettleAt(new c(function(resolve) { resolve(entry); }), i);
	        }
	      } else {
	        this._willSettleAt(resolve(entry), i);
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var promise = this.promise;
	
	      if (promise._state === lib$es6$promise$$internal$$PENDING) {
	        this._remaining--;
	
	        if (state === lib$es6$promise$$internal$$REJECTED) {
	          lib$es6$promise$$internal$$reject(promise, value);
	        } else {
	          this._result[i] = value;
	        }
	      }
	
	      if (this._remaining === 0) {
	        lib$es6$promise$$internal$$fulfill(promise, this._result);
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;
	
	      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$es6$promise$polyfill$$polyfill() {
	      var local;
	
	      if (typeof global !== 'undefined') {
	          local = global;
	      } else if (typeof self !== 'undefined') {
	          local = self;
	      } else {
	          try {
	              local = Function('return this')();
	          } catch (e) {
	              throw new Error('polyfill failed because global object is unavailable in this environment');
	          }
	      }
	
	      var P = local.Promise;
	
	      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	        return;
	      }
	
	      local.Promise = lib$es6$promise$promise$$default;
	    }
	    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;
	
	    var lib$es6$promise$umd$$ES6Promise = {
	      'Promise': lib$es6$promise$promise$$default,
	      'polyfill': lib$es6$promise$polyfill$$default
	    };
	
	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(7)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }
	
	    lib$es6$promise$polyfill$$default();
	}).call(this);
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), (function() { return this; }()), __webpack_require__(5)(module)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(9),
	    baseKeys = __webpack_require__(11),
	    indexKeys = __webpack_require__(12),
	    isArrayLike = __webpack_require__(16),
	    isIndex = __webpack_require__(25),
	    isPrototype = __webpack_require__(26);
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  var isProto = isPrototype(object);
	  if (!(isProto || isArrayLike(object))) {
	    return baseKeys(object);
	  }
	  var indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;
	
	  for (var key in object) {
	    if (baseHas(object, key) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = keys;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(10);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return object != null &&
	    (hasOwnProperty.call(object, key) ||
	      (typeof object == 'object' && key in object && getPrototype(object) === null));
	}
	
	module.exports = baseHas;


/***/ },
/* 10 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf;
	
	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	function getPrototype(value) {
	  return nativeGetPrototype(Object(value));
	}
	
	module.exports = getPrototype;


/***/ },
/* 11 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = Object.keys;
	
	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}
	
	module.exports = baseKeys;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(13),
	    isArguments = __webpack_require__(14),
	    isArray = __webpack_require__(23),
	    isLength = __webpack_require__(21),
	    isString = __webpack_require__(24);
	
	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if (isLength(length) &&
	      (isArray(object) || isString(object) || isArguments(object))) {
	    return baseTimes(length, String);
	  }
	  return null;
	}
	
	module.exports = indexKeys;


/***/ },
/* 13 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);
	
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}
	
	module.exports = baseTimes;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(15);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}
	
	module.exports = isArguments;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(16),
	    isObjectLike = __webpack_require__(22);
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}
	
	module.exports = isArrayLikeObject;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(17),
	    isFunction = __webpack_require__(19),
	    isLength = __webpack_require__(21);
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}
	
	module.exports = isArrayLike;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(18);
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a
	 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
	 * Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	module.exports = getLength;


/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	module.exports = baseProperty;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(20);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	module.exports = isFunction;


/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ },
/* 21 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length,
	 *  else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	module.exports = isLength;


/***/ },
/* 22 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ },
/* 23 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	module.exports = isArray;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(23),
	    isObjectLike = __webpack_require__(22);
	
	/** `Object#toString` result references. */
	var stringTag = '[object String]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}
	
	module.exports = isString;


/***/ },
/* 25 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}
	
	module.exports = isIndex;


/***/ },
/* 26 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
	
	  return value === proto;
	}
	
	module.exports = isPrototype;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(28);


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(29),
	    copyObject = __webpack_require__(31),
	    createAssigner = __webpack_require__(32),
	    isArrayLike = __webpack_require__(16),
	    isPrototype = __webpack_require__(26),
	    keysIn = __webpack_require__(40);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
	var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');
	
	/**
	 * This method is like `_.assign` except that it iterates over own and
	 * inherited source properties.
	 *
	 * **Note:** This method mutates `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @alias extend
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.assign
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * function Bar() {
	 *   this.d = 4;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 * Bar.prototype.e = 5;
	 *
	 * _.assignIn({ 'a': 1 }, new Foo, new Bar);
	 * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5 }
	 */
	var assignIn = createAssigner(function(object, source) {
	  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
	    copyObject(source, keysIn(source), object);
	    return;
	  }
	  for (var key in source) {
	    assignValue(object, key, source[key]);
	  }
	});
	
	module.exports = assignIn;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(30);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}
	
	module.exports = assignValue;


/***/ },
/* 30 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}
	
	module.exports = eq;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(29);
	
	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  object || (object = {});
	
	  var index = -1,
	      length = props.length;
	
	  while (++index < length) {
	    var key = props[index];
	
	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : source[key];
	
	    assignValue(object, key, newValue);
	  }
	  return object;
	}
	
	module.exports = copyObject;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var isIterateeCall = __webpack_require__(33),
	    rest = __webpack_require__(34);
	
	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return rest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;
	
	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;
	
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}
	
	module.exports = createAssigner;


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(30),
	    isArrayLike = __webpack_require__(16),
	    isIndex = __webpack_require__(25),
	    isObject = __webpack_require__(20);
	
	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}
	
	module.exports = isIterateeCall;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(35),
	    toInteger = __webpack_require__(36);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as
	 * an array.
	 *
	 * **Note:** This method is based on the
	 * [rest parameter](https://mdn.io/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.rest(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function rest(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);
	
	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, array);
	      case 1: return func.call(this, args[0], array);
	      case 2: return func.call(this, args[0], args[1], array);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}
	
	module.exports = rest;


/***/ },
/* 35 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  var length = args.length;
	  switch (length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}
	
	module.exports = apply;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var toFinite = __webpack_require__(37);
	
	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3.2);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3.2');
	 * // => 3
	 */
	function toInteger(value) {
	  var result = toFinite(value),
	      remainder = result % 1;
	
	  return result === result ? (remainder ? result - remainder : result) : 0;
	}
	
	module.exports = toInteger;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(38);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;
	
	/**
	 * Converts `value` to a finite number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.12.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted number.
	 * @example
	 *
	 * _.toFinite(3.2);
	 * // => 3.2
	 *
	 * _.toFinite(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toFinite(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toFinite('3.2');
	 * // => 3.2
	 */
	function toFinite(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  return value === value ? value : 0;
	}
	
	module.exports = toFinite;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(19),
	    isObject = __webpack_require__(20),
	    isSymbol = __webpack_require__(39);
	
	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;
	
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	
	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;
	
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}
	
	module.exports = toNumber;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(22);
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}
	
	module.exports = isSymbol;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var baseKeysIn = __webpack_require__(41),
	    indexKeys = __webpack_require__(12),
	    isIndex = __webpack_require__(25),
	    isPrototype = __webpack_require__(26);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  var index = -1,
	      isProto = isPrototype(object),
	      props = baseKeysIn(object),
	      propsLength = props.length,
	      indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;
	
	  while (++index < propsLength) {
	    var key = props[index];
	    if (!(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = keysIn;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var Reflect = __webpack_require__(42),
	    iteratorToArray = __webpack_require__(45);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Built-in value references. */
	var enumerate = Reflect ? Reflect.enumerate : undefined,
	    propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * The base implementation of `_.keysIn` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn(object) {
	  object = object == null ? object : Object(object);
	
	  var result = [];
	  for (var key in object) {
	    result.push(key);
	  }
	  return result;
	}
	
	// Fallback for IE < 9 with es6-shim.
	if (enumerate && !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf')) {
	  baseKeysIn = function(object) {
	    return iteratorToArray(enumerate(object));
	  };
	}
	
	module.exports = baseKeysIn;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(43);
	
	/** Built-in value references. */
	var Reflect = root.Reflect;
	
	module.exports = Reflect;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var checkGlobal = __webpack_require__(44);
	
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(typeof global == 'object' && global);
	
	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(typeof self == 'object' && self);
	
	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(typeof this == 'object' && this);
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || thisGlobal || Function('return this')();
	
	module.exports = root;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 44 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return (value && value.Object === Object) ? value : null;
	}
	
	module.exports = checkGlobal;


/***/ },
/* 45 */
/***/ function(module, exports) {

	/**
	 * Converts `iterator` to an array.
	 *
	 * @private
	 * @param {Object} iterator The iterator to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function iteratorToArray(iterator) {
	  var data,
	      result = [];
	
	  while (!(data = iterator.next()).done) {
	    result.push(data.value);
	  }
	  return result;
	}
	
	module.exports = iteratorToArray;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(47);


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(48),
	    baseEach = __webpack_require__(49),
	    baseIteratee = __webpack_require__(54),
	    isArray = __webpack_require__(23);
	
	/**
	 * Iterates over elements of `collection` and invokes `iteratee` for each element.
	 * The iteratee is invoked with three arguments: (value, index|key, collection).
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length"
	 * property are iterated like arrays. To avoid this behavior use `_.forIn`
	 * or `_.forOwn` for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @alias each
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 * @see _.forEachRight
	 * @example
	 *
	 * _([1, 2]).forEach(function(value) {
	 *   console.log(value);
	 * });
	 * // => Logs `1` then `2`.
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
	 */
	function forEach(collection, iteratee) {
	  var func = isArray(collection) ? arrayEach : baseEach;
	  return func(collection, baseIteratee(iteratee, 3));
	}
	
	module.exports = forEach;


/***/ },
/* 48 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0;
	
	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}
	
	module.exports = arrayEach;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(50),
	    createBaseEach = __webpack_require__(53);
	
	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);
	
	module.exports = baseEach;


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(51),
	    keys = __webpack_require__(8);
	
	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}
	
	module.exports = baseForOwn;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(52);
	
	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();
	
	module.exports = baseFor;


/***/ },
/* 52 */
/***/ function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;
	
	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}
	
	module.exports = createBaseFor;


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(16);
	
	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);
	
	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}
	
	module.exports = createBaseEach;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(55),
	    baseMatchesProperty = __webpack_require__(115),
	    identity = __webpack_require__(128),
	    isArray = __webpack_require__(23),
	    property = __webpack_require__(129);
	
	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	  if (typeof value == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (typeof value == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}
	
	module.exports = baseIteratee;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(56),
	    getMatchData = __webpack_require__(112),
	    matchesStrictComparable = __webpack_require__(114);
	
	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}
	
	module.exports = baseMatches;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(57),
	    baseIsEqual = __webpack_require__(93);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;
	
	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];
	
	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack;
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}
	
	module.exports = baseIsMatch;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(58),
	    stackClear = __webpack_require__(65),
	    stackDelete = __webpack_require__(66),
	    stackGet = __webpack_require__(67),
	    stackHas = __webpack_require__(68),
	    stackSet = __webpack_require__(69);
	
	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  this.__data__ = new ListCache(entries);
	}
	
	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;
	
	module.exports = Stack;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(59),
	    listCacheDelete = __webpack_require__(60),
	    listCacheGet = __webpack_require__(62),
	    listCacheHas = __webpack_require__(63),
	    listCacheSet = __webpack_require__(64);
	
	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;
	
	module.exports = ListCache;


/***/ },
/* 59 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	}
	
	module.exports = listCacheClear;


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(61);
	
	/** Used for built-in method references. */
	var arrayProto = Array.prototype;
	
	/** Built-in value references. */
	var splice = arrayProto.splice;
	
	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  return true;
	}
	
	module.exports = listCacheDelete;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(30);
	
	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}
	
	module.exports = assocIndexOf;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(61);
	
	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  return index < 0 ? undefined : data[index][1];
	}
	
	module.exports = listCacheGet;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(61);
	
	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}
	
	module.exports = listCacheHas;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(61);
	
	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);
	
	  if (index < 0) {
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}
	
	module.exports = listCacheSet;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(58);
	
	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	}
	
	module.exports = stackClear;


/***/ },
/* 66 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  return this.__data__['delete'](key);
	}
	
	module.exports = stackDelete;


/***/ },
/* 67 */
/***/ function(module, exports) {

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}
	
	module.exports = stackGet;


/***/ },
/* 68 */
/***/ function(module, exports) {

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}
	
	module.exports = stackHas;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(58),
	    MapCache = __webpack_require__(70);
	
	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;
	
	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var cache = this.__data__;
	  if (cache instanceof ListCache && cache.__data__.length == LARGE_ARRAY_SIZE) {
	    cache = this.__data__ = new MapCache(cache.__data__);
	  }
	  cache.set(key, value);
	  return this;
	}
	
	module.exports = stackSet;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(71),
	    mapCacheDelete = __webpack_require__(87),
	    mapCacheGet = __webpack_require__(90),
	    mapCacheHas = __webpack_require__(91),
	    mapCacheSet = __webpack_require__(92);
	
	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;
	
	module.exports = MapCache;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(72),
	    ListCache = __webpack_require__(58),
	    Map = __webpack_require__(86);
	
	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}
	
	module.exports = mapCacheClear;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(73),
	    hashDelete = __webpack_require__(82),
	    hashGet = __webpack_require__(83),
	    hashHas = __webpack_require__(84),
	    hashSet = __webpack_require__(85);
	
	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;
	
	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}
	
	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;
	
	module.exports = Hash;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(74);
	
	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	}
	
	module.exports = hashClear;


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(75);
	
	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');
	
	module.exports = nativeCreate;


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(76),
	    getValue = __webpack_require__(81);
	
	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}
	
	module.exports = getNative;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(19),
	    isHostObject = __webpack_require__(77),
	    isMasked = __webpack_require__(78),
	    isObject = __webpack_require__(20),
	    toSource = __webpack_require__(80);
	
	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
	
	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);
	
	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}
	
	module.exports = baseIsNative;


/***/ },
/* 77 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}
	
	module.exports = isHostObject;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(79);
	
	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());
	
	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}
	
	module.exports = isMasked;


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(43);
	
	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];
	
	module.exports = coreJsData;


/***/ },
/* 80 */
/***/ function(module, exports) {

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;
	
	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}
	
	module.exports = toSource;


/***/ },
/* 81 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}
	
	module.exports = getValue;


/***/ },
/* 82 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  return this.has(key) && delete this.__data__[key];
	}
	
	module.exports = hashDelete;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(74);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}
	
	module.exports = hashGet;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(74);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}
	
	module.exports = hashHas;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(74);
	
	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}
	
	module.exports = hashSet;


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(75),
	    root = __webpack_require__(43);
	
	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');
	
	module.exports = Map;


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(88);
	
	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  return getMapData(this, key)['delete'](key);
	}
	
	module.exports = mapCacheDelete;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(89);
	
	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}
	
	module.exports = getMapData;


/***/ },
/* 89 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}
	
	module.exports = isKeyable;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(88);
	
	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}
	
	module.exports = mapCacheGet;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(88);
	
	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}
	
	module.exports = mapCacheHas;


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(88);
	
	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  getMapData(this, key).set(key, value);
	  return this;
	}
	
	module.exports = mapCacheSet;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(94),
	    isObject = __webpack_require__(20),
	    isObjectLike = __webpack_require__(22);
	
	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}
	
	module.exports = baseIsEqual;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(57),
	    equalArrays = __webpack_require__(95),
	    equalByTag = __webpack_require__(100),
	    equalObjects = __webpack_require__(105),
	    getTag = __webpack_require__(106),
	    isArray = __webpack_require__(23),
	    isHostObject = __webpack_require__(77),
	    isTypedArray = __webpack_require__(111);
	
	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;
	
	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag && !isHostObject(object),
	      othIsObj = othTag == objectTag && !isHostObject(other),
	      isSameTag = objTag == othTag;
	
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
	      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	  }
	  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
	
	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;
	
	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}
	
	module.exports = baseIsEqualDeep;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(96),
	    arraySome = __webpack_require__(99);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;
	
	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;
	
	  stack.set(array, other);
	
	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];
	
	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!seen.has(othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	              return seen.add(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, customizer, bitmask, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  return result;
	}
	
	module.exports = equalArrays;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(70),
	    setCacheAdd = __webpack_require__(97),
	    setCacheHas = __webpack_require__(98);
	
	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;
	
	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}
	
	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;
	
	module.exports = SetCache;


/***/ },
/* 97 */
/***/ function(module, exports) {

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';
	
	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}
	
	module.exports = setCacheAdd;


/***/ },
/* 98 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}
	
	module.exports = setCacheHas;


/***/ },
/* 99 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array ? array.length : 0;
	
	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}
	
	module.exports = arraySome;


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(101),
	    Uint8Array = __webpack_require__(102),
	    equalArrays = __webpack_require__(95),
	    mapToArray = __webpack_require__(103),
	    setToArray = __webpack_require__(104);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;
	
	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;
	
	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and
	      // booleans to `1` or `0` treating invalid dates coerced to `NaN` as
	      // not equal.
	      return +object == +other;
	
	    case errorTag:
	      return object.name == other.name && object.message == other.message;
	
	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return (object != +object) ? other != +other : object == +other;
	
	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');
	
	    case mapTag:
	      var convert = mapToArray;
	
	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);
	
	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= UNORDERED_COMPARE_FLAG;
	      stack.set(object, other);
	
	      // Recursively compare objects (susceptible to call stack limits).
	      return equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
	
	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}
	
	module.exports = equalByTag;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(43);
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	module.exports = Symbol;


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(43);
	
	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;
	
	module.exports = Uint8Array;


/***/ },
/* 103 */
/***/ function(module, exports) {

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);
	
	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}
	
	module.exports = mapToArray;


/***/ },
/* 104 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);
	
	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}
	
	module.exports = setToArray;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(9),
	    keys = __webpack_require__(8);
	
	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;
	
	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : baseHas(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	
	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];
	
	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;
	
	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  return result;
	}
	
	module.exports = equalObjects;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(107),
	    Map = __webpack_require__(86),
	    Promise = __webpack_require__(108),
	    Set = __webpack_require__(109),
	    WeakMap = __webpack_require__(110),
	    toSource = __webpack_require__(80);
	
	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';
	
	var dataViewTag = '[object DataView]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);
	
	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function getTag(value) {
	  return objectToString.call(value);
	}
	
	// Fallback for data views, maps, sets, and weak maps in IE 11,
	// for data views in Edge, and promises in Node.js.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;
	
	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}
	
	module.exports = getTag;


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(75),
	    root = __webpack_require__(43);
	
	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');
	
	module.exports = DataView;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(75),
	    root = __webpack_require__(43);
	
	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');
	
	module.exports = Promise;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(75),
	    root = __webpack_require__(43);
	
	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');
	
	module.exports = Set;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(75),
	    root = __webpack_require__(43);
	
	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');
	
	module.exports = WeakMap;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(21),
	    isObjectLike = __webpack_require__(22);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';
	
	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';
	
	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}
	
	module.exports = isTypedArray;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(113),
	    keys = __webpack_require__(8);
	
	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = keys(object),
	      length = result.length;
	
	  while (length--) {
	    var key = result[length],
	        value = object[key];
	
	    result[length] = [key, value, isStrictComparable(value)];
	  }
	  return result;
	}
	
	module.exports = getMatchData;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(20);
	
	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}
	
	module.exports = isStrictComparable;


/***/ },
/* 114 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `matchesProperty` for source values suitable
	 * for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function matchesStrictComparable(key, srcValue) {
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue &&
	      (srcValue !== undefined || (key in Object(object)));
	  };
	}
	
	module.exports = matchesStrictComparable;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(93),
	    get = __webpack_require__(116),
	    hasIn = __webpack_require__(125),
	    isKey = __webpack_require__(123),
	    isStrictComparable = __webpack_require__(113),
	    matchesStrictComparable = __webpack_require__(114),
	    toKey = __webpack_require__(124);
	
	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;
	
	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  if (isKey(path) && isStrictComparable(srcValue)) {
	    return matchesStrictComparable(toKey(path), srcValue);
	  }
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
	  };
	}
	
	module.exports = baseMatchesProperty;


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(117);
	
	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is used in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}
	
	module.exports = get;


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(118),
	    isKey = __webpack_require__(123),
	    toKey = __webpack_require__(124);
	
	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path] : castPath(path);
	
	  var index = 0,
	      length = path.length;
	
	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}
	
	module.exports = baseGet;


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(23),
	    stringToPath = __webpack_require__(119);
	
	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}
	
	module.exports = castPath;


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(120),
	    toString = __webpack_require__(121);
	
	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(\.|\[\])(?:\4|$))/g;
	
	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;
	
	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoize(function(string) {
	  var result = [];
	  toString(string).replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});
	
	module.exports = stringToPath;


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(70);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;
	
	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result);
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}
	
	// Assign cache to `_.memoize`.
	memoize.Cache = MapCache;
	
	module.exports = memoize;


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(122);
	
	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}
	
	module.exports = toString;


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(101),
	    isSymbol = __webpack_require__(39);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	
	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;
	
	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}
	
	module.exports = baseToString;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(23),
	    isSymbol = __webpack_require__(39);
	
	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;
	
	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}
	
	module.exports = isKey;


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(39);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;
	
	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}
	
	module.exports = toKey;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(126),
	    hasPath = __webpack_require__(127);
	
	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && hasPath(object, path, baseHasIn);
	}
	
	module.exports = hasIn;


/***/ },
/* 126 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return object != null && key in Object(object);
	}
	
	module.exports = baseHasIn;


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(118),
	    isArguments = __webpack_require__(14),
	    isArray = __webpack_require__(23),
	    isIndex = __webpack_require__(25),
	    isKey = __webpack_require__(123),
	    isLength = __webpack_require__(21),
	    isString = __webpack_require__(24),
	    toKey = __webpack_require__(124);
	
	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  path = isKey(path, object) ? [path] : castPath(path);
	
	  var result,
	      index = -1,
	      length = path.length;
	
	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result) {
	    return result;
	  }
	  var length = object ? object.length : 0;
	  return !!length && isLength(length) && isIndex(key, length) &&
	    (isArray(object) || isString(object) || isArguments(object));
	}
	
	module.exports = hasPath;


/***/ },
/* 128 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}
	
	module.exports = identity;


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(18),
	    basePropertyDeep = __webpack_require__(130),
	    isKey = __webpack_require__(123),
	    toKey = __webpack_require__(124);
	
	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}
	
	module.exports = property;


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(117);
	
	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}
	
	module.exports = basePropertyDeep;


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(132),
	    baseIteratee = __webpack_require__(54),
	    baseMap = __webpack_require__(133),
	    isArray = __webpack_require__(23);
	
	/**
	 * Creates an array of values by running each element in `collection` thru
	 * `iteratee`. The iteratee is invoked with three arguments:
	 * (value, index|key, collection).
	 *
	 * Many lodash methods are guarded to work as iteratees for methods like
	 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
	 *
	 * The guarded methods are:
	 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
	 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
	 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
	 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Array|Function|Object|string} [iteratee=_.identity]
	 *  The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 * @example
	 *
	 * function square(n) {
	 *   return n * n;
	 * }
	 *
	 * _.map([4, 8], square);
	 * // => [16, 64]
	 *
	 * _.map({ 'a': 4, 'b': 8 }, square);
	 * // => [16, 64] (iteration order is not guaranteed)
	 *
	 * var users = [
	 *   { 'user': 'barney' },
	 *   { 'user': 'fred' }
	 * ];
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.map(users, 'user');
	 * // => ['barney', 'fred']
	 */
	function map(collection, iteratee) {
	  var func = isArray(collection) ? arrayMap : baseMap;
	  return func(collection, baseIteratee(iteratee, 3));
	}
	
	module.exports = map;


/***/ },
/* 132 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0,
	      result = Array(length);
	
	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}
	
	module.exports = arrayMap;


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(49),
	    isArrayLike = __webpack_require__(16);
	
	/**
	 * The base implementation of `_.map` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function baseMap(collection, iteratee) {
	  var index = -1,
	      result = isArrayLike(collection) ? Array(collection.length) : [];
	
	  baseEach(collection, function(value, key, collection) {
	    result[++index] = iteratee(value, key, collection);
	  });
	  return result;
	}
	
	module.exports = baseMap;


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var debounce = __webpack_require__(135),
	    isObject = __webpack_require__(20);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/**
	 * Creates a throttled function that only invokes `func` at most once per
	 * every `wait` milliseconds. The throttled function comes with a `cancel`
	 * method to cancel delayed `func` invocations and a `flush` method to
	 * immediately invoke them. Provide an options object to indicate whether
	 * `func` should be invoked on the leading and/or trailing edge of the `wait`
	 * timeout. The `func` is invoked with the last arguments provided to the
	 * throttled function. Subsequent calls to the throttled function return the
	 * result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the throttled function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.throttle` and `_.debounce`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to throttle.
	 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=true]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new throttled function.
	 * @example
	 *
	 * // Avoid excessively updating the position while scrolling.
	 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	 *
	 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
	 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
	 * jQuery(element).on('click', throttled);
	 *
	 * // Cancel the trailing throttled invocation.
	 * jQuery(window).on('popstate', throttled.cancel);
	 */
	function throttle(func, wait, options) {
	  var leading = true,
	      trailing = true;
	
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  if (isObject(options)) {
	    leading = 'leading' in options ? !!options.leading : leading;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	  return debounce(func, wait, {
	    'leading': leading,
	    'maxWait': wait,
	    'trailing': trailing
	  });
	}
	
	module.exports = throttle;


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(20),
	    now = __webpack_require__(136),
	    toNumber = __webpack_require__(38);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;
	
	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide an options object to indicate whether `func` should be invoked on
	 * the leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent calls
	 * to the debounced function return the result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
	 * on the trailing edge of the timeout only if the debounced function is
	 * invoked more than once during the `wait` timeout.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;
	
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	
	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;
	
	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }
	
	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }
	
	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;
	
	    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	  }
	
	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;
	
	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }
	
	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }
	
	  function trailingEdge(time) {
	    timerId = undefined;
	
	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }
	
	  function cancel() {
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }
	
	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }
	
	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);
	
	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;
	
	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}
	
	module.exports = debounce;


/***/ },
/* 136 */
/***/ function(module, exports) {

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	function now() {
	  return Date.now();
	}
	
	module.exports = now;


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	;(function(){
	
	/**
	 * Require the given path.
	 *
	 * @param {String} path
	 * @return {Object} exports
	 * @api public
	 */
	
	function require(path, parent, orig) {
	  var resolved = require.resolve(path);
	
	  // lookup failed
	  if (null == resolved) {
	    orig = orig || path;
	    parent = parent || 'root';
	    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
	    err.path = orig;
	    err.parent = parent;
	    err.require = true;
	    throw err;
	  }
	
	  var module = require.modules[resolved];
	
	  // perform real require()
	  // by invoking the module's
	  // registered function
	  if (!module._resolving && !module.exports) {
	    var mod = {};
	    mod.exports = {};
	    mod.client = mod.component = true;
	    module._resolving = true;
	    module.call(this, mod.exports, require.relative(resolved), mod);
	    delete module._resolving;
	    module.exports = mod.exports;
	  }
	
	  return module.exports;
	}
	
	/**
	 * Registered modules.
	 */
	
	require.modules = {};
	
	/**
	 * Registered aliases.
	 */
	
	require.aliases = {};
	
	/**
	 * Resolve `path`.
	 *
	 * Lookup:
	 *
	 *   - PATH/index.js
	 *   - PATH.js
	 *   - PATH
	 *
	 * @param {String} path
	 * @return {String} path or null
	 * @api private
	 */
	
	require.resolve = function(path) {
	  if (path.charAt(0) === '/') path = path.slice(1);
	
	  var paths = [
	    path,
	    path + '.js',
	    path + '.json',
	    path + '/index.js',
	    path + '/index.json'
	  ];
	
	  for (var i = 0; i < paths.length; i++) {
	    var path = paths[i];
	    if (require.modules.hasOwnProperty(path)) return path;
	    if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
	  }
	};
	
	/**
	 * Normalize `path` relative to the current path.
	 *
	 * @param {String} curr
	 * @param {String} path
	 * @return {String}
	 * @api private
	 */
	
	require.normalize = function(curr, path) {
	  var segs = [];
	
	  if ('.' != path.charAt(0)) return path;
	
	  curr = curr.split('/');
	  path = path.split('/');
	
	  for (var i = 0; i < path.length; ++i) {
	    if ('..' == path[i]) {
	      curr.pop();
	    } else if ('.' != path[i] && '' != path[i]) {
	      segs.push(path[i]);
	    }
	  }
	
	  return curr.concat(segs).join('/');
	};
	
	/**
	 * Register module at `path` with callback `definition`.
	 *
	 * @param {String} path
	 * @param {Function} definition
	 * @api private
	 */
	
	require.register = function(path, definition) {
	  require.modules[path] = definition;
	};
	
	/**
	 * Alias a module definition.
	 *
	 * @param {String} from
	 * @param {String} to
	 * @api private
	 */
	
	require.alias = function(from, to) {
	  if (!require.modules.hasOwnProperty(from)) {
	    throw new Error('Failed to alias "' + from + '", it does not exist');
	  }
	  require.aliases[to] = from;
	};
	
	/**
	 * Return a require function relative to the `parent` path.
	 *
	 * @param {String} parent
	 * @return {Function}
	 * @api private
	 */
	
	require.relative = function(parent) {
	  var p = require.normalize(parent, '..');
	
	  /**
	   * lastIndexOf helper.
	   */
	
	  function lastIndexOf(arr, obj) {
	    var i = arr.length;
	    while (i--) {
	      if (arr[i] === obj) return i;
	    }
	    return -1;
	  }
	
	  /**
	   * The relative require() itself.
	   */
	
	  function localRequire(path) {
	    var resolved = localRequire.resolve(path);
	    return require(resolved, parent, path);
	  }
	
	  /**
	   * Resolve relative to the parent.
	   */
	
	  localRequire.resolve = function(path) {
	    var c = path.charAt(0);
	    if ('/' == c) return path.slice(1);
	    if ('.' == c) return require.normalize(p, path);
	
	    // resolve deps by returning
	    // the dep in the nearest "deps"
	    // directory
	    var segs = parent.split('/');
	    var i = lastIndexOf(segs, 'deps') + 1;
	    if (!i) i = 0;
	    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
	    return path;
	  };
	
	  /**
	   * Check if module is defined at `path`.
	   */
	
	  localRequire.exists = function(path) {
	    return require.modules.hasOwnProperty(localRequire.resolve(path));
	  };
	
	  return localRequire;
	};
	require.register("component-event/index.js", function(exports, require, module){
	var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
	    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
	    prefix = bind !== 'addEventListener' ? 'on' : '';
	
	/**
	 * Bind `el` event `type` to `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */
	
	exports.bind = function(el, type, fn, capture){
	  el[bind](prefix + type, fn, capture || false);
	
	  return fn;
	};
	
	/**
	 * Unbind `el` event `type`'s callback `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */
	
	exports.unbind = function(el, type, fn, capture){
	  el[unbind](prefix + type, fn, capture || false);
	
	  return fn;
	};
	});
	require.register("component-delegate/index.js", function(exports, require, module){
	
	/**
	 * Module dependencies.
	 */
	
	var matches = require('matches-selector')
	  , event = require('event');
	
	/**
	 * Delegate event `type` to `selector`
	 * and invoke `fn(e)`. A callback function
	 * is returned which may be passed to `.unbind()`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {Function}
	 * @api public
	 */
	
	exports.bind = function(el, selector, type, fn, capture){
	  return event.bind(el, type, function(e){
	    if (matches(e.target, selector)) fn(e);
	  }, capture);
	  return callback;
	};
	
	/**
	 * Unbind event `type`'s callback `fn`.
	 *
	 * @param {Element} el
	 * @param {String} type
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @api public
	 */
	
	exports.unbind = function(el, type, fn, capture){
	  event.unbind(el, type, fn, capture);
	};
	
	});
	require.register("component-domify/index.js", function(exports, require, module){
	
	/**
	 * Expose `parse`.
	 */
	
	module.exports = parse;
	
	/**
	 * Wrap map from jquery.
	 */
	
	var map = {
	  option: [1, '<select multiple="multiple">', '</select>'],
	  optgroup: [1, '<select multiple="multiple">', '</select>'],
	  legend: [1, '<fieldset>', '</fieldset>'],
	  thead: [1, '<table>', '</table>'],
	  tbody: [1, '<table>', '</table>'],
	  tfoot: [1, '<table>', '</table>'],
	  colgroup: [1, '<table>', '</table>'],
	  caption: [1, '<table>', '</table>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
	  th: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
	  _default: [0, '', '']
	};
	
	/**
	 * Parse `html` and return the children.
	 *
	 * @param {String} html
	 * @return {Array}
	 * @api private
	 */
	
	function parse(html) {
	  if ('string' != typeof html) throw new TypeError('String expected');
	
	  // tag name
	  var m = /<([\w:]+)/.exec(html);
	  if (!m) throw new Error('No elements were generated.');
	  var tag = m[1];
	
	  // body support
	  if (tag == 'body') {
	    var el = document.createElement('html');
	    el.innerHTML = html;
	    return el.removeChild(el.lastChild);
	  }
	
	  // wrap map
	  var wrap = map[tag] || map._default;
	  var depth = wrap[0];
	  var prefix = wrap[1];
	  var suffix = wrap[2];
	  var el = document.createElement('div');
	  el.innerHTML = prefix + html + suffix;
	  while (depth--) el = el.lastChild;
	
	  var els = el.children;
	  if (1 == els.length) {
	    return el.removeChild(els[0]);
	  }
	
	  var fragment = document.createDocumentFragment();
	  while (els.length) {
	    fragment.appendChild(el.removeChild(els[0]));
	  }
	
	  return fragment;
	}
	
	});
	require.register("component-indexof/index.js", function(exports, require, module){
	module.exports = function(arr, obj){
	  if (arr.indexOf) return arr.indexOf(obj);
	  for (var i = 0; i < arr.length; ++i) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	};
	});
	require.register("component-classes/index.js", function(exports, require, module){
	
	/**
	 * Module dependencies.
	 */
	
	var index = require('indexof');
	
	/**
	 * Whitespace regexp.
	 */
	
	var re = /\s+/;
	
	/**
	 * toString reference.
	 */
	
	var toString = Object.prototype.toString;
	
	/**
	 * Wrap `el` in a `ClassList`.
	 *
	 * @param {Element} el
	 * @return {ClassList}
	 * @api public
	 */
	
	module.exports = function(el){
	  return new ClassList(el);
	};
	
	/**
	 * Initialize a new ClassList for `el`.
	 *
	 * @param {Element} el
	 * @api private
	 */
	
	function ClassList(el) {
	  this.el = el;
	  this.list = el.classList;
	}
	
	/**
	 * Add class `name` if not already present.
	 *
	 * @param {String} name
	 * @return {ClassList}
	 * @api public
	 */
	
	ClassList.prototype.add = function(name){
	  // classList
	  if (this.list) {
	    this.list.add(name);
	    return this;
	  }
	
	  // fallback
	  var arr = this.array();
	  var i = index(arr, name);
	  if (!~i) arr.push(name);
	  this.el.className = arr.join(' ');
	  return this;
	};
	
	/**
	 * Remove class `name` when present, or
	 * pass a regular expression to remove
	 * any which match.
	 *
	 * @param {String|RegExp} name
	 * @return {ClassList}
	 * @api public
	 */
	
	ClassList.prototype.remove = function(name){
	  if ('[object RegExp]' == toString.call(name)) {
	    return this.removeMatching(name);
	  }
	
	  // classList
	  if (this.list) {
	    this.list.remove(name);
	    return this;
	  }
	
	  // fallback
	  var arr = this.array();
	  var i = index(arr, name);
	  if (~i) arr.splice(i, 1);
	  this.el.className = arr.join(' ');
	  return this;
	};
	
	/**
	 * Remove all classes matching `re`.
	 *
	 * @param {RegExp} re
	 * @return {ClassList}
	 * @api private
	 */
	
	ClassList.prototype.removeMatching = function(re){
	  var arr = this.array();
	  for (var i = 0; i < arr.length; i++) {
	    if (re.test(arr[i])) {
	      this.remove(arr[i]);
	    }
	  }
	  return this;
	};
	
	/**
	 * Toggle class `name`.
	 *
	 * @param {String} name
	 * @return {ClassList}
	 * @api public
	 */
	
	ClassList.prototype.toggle = function(name){
	  // classList
	  if (this.list) {
	    this.list.toggle(name);
	    return this;
	  }
	
	  // fallback
	  if (this.has(name)) {
	    this.remove(name);
	  } else {
	    this.add(name);
	  }
	  return this;
	};
	
	/**
	 * Return an array of classes.
	 *
	 * @return {Array}
	 * @api public
	 */
	
	ClassList.prototype.array = function(){
	  var str = this.el.className.replace(/^\s+|\s+$/g, '');
	  var arr = str.split(re);
	  if ('' === arr[0]) arr.shift();
	  return arr;
	};
	
	/**
	 * Check if class `name` is present.
	 *
	 * @param {String} name
	 * @return {ClassList}
	 * @api public
	 */
	
	ClassList.prototype.has =
	ClassList.prototype.contains = function(name){
	  return this.list
	    ? this.list.contains(name)
	    : !! ~index(this.array(), name);
	};
	
	});
	require.register("visionmedia-debug/index.js", function(exports, require, module){
	if ('undefined' == typeof window) {
	  module.exports = require('./lib/debug');
	} else {
	  module.exports = require('./debug');
	}
	
	});
	require.register("visionmedia-debug/debug.js", function(exports, require, module){
	
	/**
	 * Expose `debug()` as the module.
	 */
	
	module.exports = debug;
	
	/**
	 * Create a debugger with the given `name`.
	 *
	 * @param {String} name
	 * @return {Type}
	 * @api public
	 */
	
	function debug(name) {
	  if (!debug.enabled(name)) return function(){};
	
	  return function(fmt){
	    fmt = coerce(fmt);
	
	    var curr = new Date;
	    var ms = curr - (debug[name] || curr);
	    debug[name] = curr;
	
	    fmt = name
	      + ' '
	      + fmt
	      + ' +' + debug.humanize(ms);
	
	    // This hackery is required for IE8
	    // where `console.log` doesn't have 'apply'
	    window.console
	      && console.log
	      && Function.prototype.apply.call(console.log, console, arguments);
	  }
	}
	
	/**
	 * The currently active debug mode names.
	 */
	
	debug.names = [];
	debug.skips = [];
	
	/**
	 * Enables a debug mode by name. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} name
	 * @api public
	 */
	
	debug.enable = function(name) {
	  try {
	    localStorage.debug = name;
	  } catch(e){}
	
	  var split = (name || '').split(/[\s,]+/)
	    , len = split.length;
	
	  for (var i = 0; i < len; i++) {
	    name = split[i].replace('*', '.*?');
	    if (name[0] === '-') {
	      debug.skips.push(new RegExp('^' + name.substr(1) + '$'));
	    }
	    else {
	      debug.names.push(new RegExp('^' + name + '$'));
	    }
	  }
	};
	
	/**
	 * Disable debug output.
	 *
	 * @api public
	 */
	
	debug.disable = function(){
	  debug.enable('');
	};
	
	/**
	 * Humanize the given `ms`.
	 *
	 * @param {Number} m
	 * @return {String}
	 * @api private
	 */
	
	debug.humanize = function(ms) {
	  var sec = 1000
	    , min = 60 * 1000
	    , hour = 60 * min;
	
	  if (ms >= hour) return (ms / hour).toFixed(1) + 'h';
	  if (ms >= min) return (ms / min).toFixed(1) + 'm';
	  if (ms >= sec) return (ms / sec | 0) + 's';
	  return ms + 'ms';
	};
	
	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	debug.enabled = function(name) {
	  for (var i = 0, len = debug.skips.length; i < len; i++) {
	    if (debug.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (var i = 0, len = debug.names.length; i < len; i++) {
	    if (debug.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	};
	
	/**
	 * Coerce `val`.
	 */
	
	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}
	
	// persist
	
	try {
	  if (window.localStorage) debug.enable(localStorage.debug);
	} catch(e){}
	
	});
	require.register("ianstormtaylor-to-no-case/index.js", function(exports, require, module){
	
	/**
	 * Expose `toNoCase`.
	 */
	
	module.exports = toNoCase;
	
	
	/**
	 * Test whether a string is camel-case.
	 */
	
	var hasSpace = /\s/;
	var hasCamel = /[a-z][A-Z]/;
	var hasSeparator = /[\W_]/;
	
	
	/**
	 * Remove any starting case from a `string`, like camel or snake, but keep
	 * spaces and punctuation that may be important otherwise.
	 *
	 * @param {String} string
	 * @return {String}
	 */
	
	function toNoCase (string) {
	  if (hasSpace.test(string)) return string.toLowerCase();
	
	  if (hasSeparator.test(string)) string = unseparate(string);
	  if (hasCamel.test(string)) string = uncamelize(string);
	  return string.toLowerCase();
	}
	
	
	/**
	 * Separator splitter.
	 */
	
	var separatorSplitter = /[\W_]+(.|$)/g;
	
	
	/**
	 * Un-separate a `string`.
	 *
	 * @param {String} string
	 * @return {String}
	 */
	
	function unseparate (string) {
	  return string.replace(separatorSplitter, function (m, next) {
	    return next ? ' ' + next : '';
	  });
	}
	
	
	/**
	 * Camelcase splitter.
	 */
	
	var camelSplitter = /(.)([A-Z]+)/g;
	
	
	/**
	 * Un-camelcase a `string`.
	 *
	 * @param {String} string
	 * @return {String}
	 */
	
	function uncamelize (string) {
	  return string.replace(camelSplitter, function (m, previous, uppers) {
	    return previous + ' ' + uppers.toLowerCase().split('').join(' ');
	  });
	}
	});
	require.register("ianstormtaylor-to-space-case/index.js", function(exports, require, module){
	
	var clean = require('to-no-case');
	
	
	/**
	 * Expose `toSpaceCase`.
	 */
	
	module.exports = toSpaceCase;
	
	
	/**
	 * Convert a `string` to space case.
	 *
	 * @param {String} string
	 * @return {String}
	 */
	
	
	function toSpaceCase (string) {
	  return clean(string).replace(/[\W_]+(.|$)/g, function (matches, match) {
	    return match ? ' ' + match : '';
	  });
	}
	});
	require.register("ianstormtaylor-to-camel-case/index.js", function(exports, require, module){
	
	var toSpace = require('to-space-case');
	
	
	/**
	 * Expose `toCamelCase`.
	 */
	
	module.exports = toCamelCase;
	
	
	/**
	 * Convert a `string` to camel case.
	 *
	 * @param {String} string
	 * @return {String}
	 */
	
	
	function toCamelCase (string) {
	  return toSpace(string).replace(/\s(\w)/g, function (matches, letter) {
	    return letter.toUpperCase();
	  });
	}
	});
	require.register("component-within-document/index.js", function(exports, require, module){
	
	/**
	 * Check if `el` is within the document.
	 *
	 * @param {Element} el
	 * @return {Boolean}
	 * @api private
	 */
	
	module.exports = function(el) {
	  var node = el;
	  while (node = node.parentNode) {
	    if (node == document) return true;
	  }
	  return false;
	};
	});
	require.register("component-css/index.js", function(exports, require, module){
	/**
	 * Module Dependencies
	 */
	
	var debug = require('debug')('css');
	var set = require('./lib/style');
	var get = require('./lib/css');
	
	/**
	 * Expose `css`
	 */
	
	module.exports = css;
	
	/**
	 * Get and set css values
	 *
	 * @param {Element} el
	 * @param {String|Object} prop
	 * @param {Mixed} val
	 * @return {Element} el
	 * @api public
	 */
	
	function css(el, prop, val) {
	  if (!el) return;
	
	  if (undefined !== val) {
	    var obj = {};
	    obj[prop] = val;
	    debug('setting styles %j', obj);
	    return setStyles(el, obj);
	  }
	
	  if ('object' == typeof prop) {
	    debug('setting styles %j', prop);
	    return setStyles(el, prop);
	  }
	
	  debug('getting %s', prop);
	  return get(el, prop);
	}
	
	/**
	 * Set the styles on an element
	 *
	 * @param {Element} el
	 * @param {Object} props
	 * @return {Element} el
	 */
	
	function setStyles(el, props) {
	  for (var prop in props) {
	    set(el, prop, props[prop]);
	  }
	
	  return el;
	}
	
	});
	require.register("component-css/lib/css.js", function(exports, require, module){
	/**
	 * Module Dependencies
	 */
	
	var debug = require('debug')('css:css');
	var camelcase = require('to-camel-case');
	var computed = require('./computed');
	var property = require('./prop');
	
	/**
	 * Expose `css`
	 */
	
	module.exports = css;
	
	/**
	 * CSS Normal Transforms
	 */
	
	var cssNormalTransform = {
	  letterSpacing: 0,
	  fontWeight: 400
	};
	
	/**
	 * Get a CSS value
	 *
	 * @param {Element} el
	 * @param {String} prop
	 * @param {Mixed} extra
	 * @param {Array} styles
	 * @return {String}
	 */
	
	function css(el, prop, extra, styles) {
	  var hooks = require('./hooks');
	  var orig = camelcase(prop);
	  var style = el.style;
	  var val;
	
	  prop = property(prop, style);
	  var hook = hooks[prop] || hooks[orig];
	
	  // If a hook was provided get the computed value from there
	  if (hook && hook.get) {
	    debug('get hook provided. use that');
	    val = hook.get(el, true, extra);
	  }
	
	  // Otherwise, if a way to get the computed value exists, use that
	  if (undefined == val) {
	    debug('fetch the computed value of %s', prop);
	    val = computed(el, prop);
	  }
	
	  if ('normal' == val && cssNormalTransform[prop]) {
	    val = cssNormalTransform[prop];
	    debug('normal => %s', val);
	  }
	
	  // Return, converting to number if forced or a qualifier was provided and val looks numeric
	  if ('' == extra || extra) {
	    debug('converting value: %s into a number');
	    var num = parseFloat(val);
	    return true === extra || isNumeric(num) ? num || 0 : val;
	  }
	
	  return val;
	}
	
	/**
	 * Is Numeric
	 *
	 * @param {Mixed} obj
	 * @return {Boolean}
	 */
	
	function isNumeric(obj) {
	  return !isNan(parseFloat(obj)) && isFinite(obj);
	}
	
	});
	require.register("component-css/lib/prop.js", function(exports, require, module){
	/**
	 * Module dependencies
	 */
	
	var debug = require('debug')('css:prop');
	var camelcase = require('to-camel-case');
	var vendor = require('./vendor');
	
	/**
	 * Export `prop`
	 */
	
	module.exports = prop;
	
	/**
	 * Normalize Properties
	 */
	
	var cssProps = {
	  'float': 'cssFloat'
	};
	
	/**
	 * Get the vendor prefixed property
	 *
	 * @param {String} prop
	 * @param {String} style
	 * @return {String} prop
	 * @api private
	 */
	
	function prop(prop, style) {
	  prop = cssProps[prop] || (cssProps[prop] = vendor(prop, style));
	  debug('transform property: %s => %s');
	  return prop;
	}
	
	});
	require.register("component-css/lib/swap.js", function(exports, require, module){
	/**
	 * Export `swap`
	 */
	
	module.exports = swap;
	
	/**
	 * Initialize `swap`
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Function} fn
	 * @param {Array} args
	 * @return {Mixed}
	 */
	
	function swap(el, options, fn, args) {
	  // Remember the old values, and insert the new ones
	  for (var key in options) {
	    old[key] = el.style[key];
	    el.style[key] = options[key];
	  }
	
	  ret = fn.apply(el, args || []);
	
	  // Revert the old values
	  for (key in options) {
	    el.style[key] = old[key];
	  }
	
	  return ret;
	}
	
	});
	require.register("component-css/lib/style.js", function(exports, require, module){
	/**
	 * Module Dependencies
	 */
	
	var debug = require('debug')('css:style');
	var camelcase = require('to-camel-case');
	var support = require('./support');
	var property = require('./prop');
	var hooks = require('./hooks');
	
	/**
	 * Expose `style`
	 */
	
	module.exports = style;
	
	/**
	 * Possibly-unitless properties
	 *
	 * Don't automatically add 'px' to these properties
	 */
	
	var cssNumber = {
	  "columnCount": true,
	  "fillOpacity": true,
	  "fontWeight": true,
	  "lineHeight": true,
	  "opacity": true,
	  "order": true,
	  "orphans": true,
	  "widows": true,
	  "zIndex": true,
	  "zoom": true
	};
	
	/**
	 * Set a css value
	 *
	 * @param {Element} el
	 * @param {String} prop
	 * @param {Mixed} val
	 * @param {Mixed} extra
	 */
	
	function style(el, prop, val, extra) {
	  // Don't set styles on text and comment nodes
	  if (!el || el.nodeType === 3 || el.nodeType === 8 || !el.style ) return;
	
	  var orig = camelcase(prop);
	  var style = el.style;
	  var type = typeof val;
	
	  if (!val) return get(el, prop, orig, extra);
	
	  prop = property(prop, style);
	
	  var hook = hooks[prop] || hooks[orig];
	
	  // If a number was passed in, add 'px' to the (except for certain CSS properties)
	  if ('number' == type && !cssNumber[orig]) {
	    debug('adding "px" to end of number');
	    val += 'px';
	  }
	
	  // Fixes jQuery #8908, it can be done more correctly by specifying setters in cssHooks,
	  // but it would mean to define eight (for every problematic property) identical functions
	  if (!support.clearCloneStyle && '' === val && 0 === prop.indexOf('background')) {
	    debug('set property (%s) value to "inherit"', prop);
	    style[prop] = 'inherit';
	  }
	
	  // If a hook was provided, use that value, otherwise just set the specified value
	  if (!hook || !hook.set || undefined !== (val = hook.set(el, val, extra))) {
	    // Support: Chrome, Safari
	    // Setting style to blank string required to delete "style: x !important;"
	    debug('set hook defined. setting property (%s) to %s', prop, val);
	    style[prop] = '';
	    style[prop] = val;
	  }
	
	}
	
	/**
	 * Get the style
	 *
	 * @param {Element} el
	 * @param {String} prop
	 * @param {String} orig
	 * @param {Mixed} extra
	 * @return {String}
	 */
	
	function get(el, prop, orig, extra) {
	  var style = el.style;
	  var hook = hooks[prop] || hooks[orig];
	  var ret;
	
	  if (hook && hook.get && undefined !== (ret = hook.get(el, false, extra))) {
	    debug('get hook defined, returning: %s', ret);
	    return ret;
	  }
	
	  ret = style[prop];
	  debug('getting %s', ret);
	  return ret;
	}
	
	});
	require.register("component-css/lib/hooks.js", function(exports, require, module){
	/**
	 * Module Dependencies
	 */
	
	var css = require('./css');
	var cssShow = { position: 'absolute', visibility: 'hidden', display: 'block' };
	var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
	var rnumnonpx = new RegExp( '^(' + pnum + ')(?!px)[a-z%]+$', 'i');
	var rnumsplit = new RegExp( '^(' + pnum + ')(.*)$', 'i');
	var rdisplayswap = /^(none|table(?!-c[ea]).+)/;
	var styles = require('./styles');
	var support = require('./support');
	var swap = require('./swap');
	var computed = require('./computed');
	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];
	
	/**
	 * Height & Width
	 */
	
	['width', 'height'].forEach(function(name) {
	  exports[name] = {};
	
	  exports[name].get = function(el, compute, extra) {
	    if (!compute) return;
	    // certain elements can have dimension info if we invisibly show them
	    // however, it must have a current display style that would benefit from this
	    return 0 == el.offsetWidth && rdisplayswap.test(css(el, 'display'))
	      ? swap(el, cssShow, function() { return getWidthOrHeight(el, name, extra); })
	      : getWidthOrHeight(el, name, extra);
	  }
	
	  exports[name].set = function(el, val, extra) {
	    var styles = extra && styles(el);
	    return setPositiveNumber(el, val, extra
	      ? augmentWidthOrHeight(el, name, extra, 'border-box' == css(el, 'boxSizing', false, styles), styles)
	      : 0
	    );
	  };
	
	});
	
	/**
	 * Opacity
	 */
	
	exports.opacity = {};
	exports.opacity.get = function(el, compute) {
	  if (!compute) return;
	  var ret = computed(el, 'opacity');
	  return '' == ret ? '1' : ret;
	}
	
	/**
	 * Utility: Set Positive Number
	 *
	 * @param {Element} el
	 * @param {Mixed} val
	 * @param {Number} subtract
	 * @return {Number}
	 */
	
	function setPositiveNumber(el, val, subtract) {
	  var matches = rnumsplit.exec(val);
	  return matches ?
	    // Guard against undefined 'subtract', e.g., when used as in cssHooks
	    Math.max(0, matches[1]) + (matches[2] || 'px') :
	    val;
	}
	
	/**
	 * Utility: Get the width or height
	 *
	 * @param {Element} el
	 * @param {String} prop
	 * @param {Mixed} extra
	 * @return {String}
	 */
	
	function getWidthOrHeight(el, prop, extra) {
	  // Start with offset property, which is equivalent to the border-box value
	  var valueIsBorderBox = true;
	  var val = prop === 'width' ? el.offsetWidth : el.offsetHeight;
	  var styles = computed(el);
	  var isBorderBox = support.boxSizing && css(el, 'boxSizing') === 'border-box';
	
	  // some non-html elements return undefined for offsetWidth, so check for null/undefined
	  // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	  // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	  if (val <= 0 || val == null) {
	    // Fall back to computed then uncomputed css if necessary
	    val = computed(el, prop, styles);
	
	    if (val < 0 || val == null) {
	      val = el.style[prop];
	    }
	
	    // Computed unit is not pixels. Stop here and return.
	    if (rnumnonpx.test(val)) {
	      return val;
	    }
	
	    // we need the check for style in case a browser which returns unreliable values
	    // for getComputedStyle silently falls back to the reliable el.style
	    valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === el.style[prop]);
	
	    // Normalize ', auto, and prepare for extra
	    val = parseFloat(val) || 0;
	  }
	
	  // use the active box-sizing model to add/subtract irrelevant styles
	  extra = extra || (isBorderBox ? 'border' : 'content');
	  val += augmentWidthOrHeight(el, prop, extra, valueIsBorderBox, styles);
	  return val + 'px';
	}
	
	/**
	 * Utility: Augment the width or the height
	 *
	 * @param {Element} el
	 * @param {String} prop
	 * @param {Mixed} extra
	 * @param {Boolean} isBorderBox
	 * @param {Array} styles
	 */
	
	function augmentWidthOrHeight(el, prop, extra, isBorderBox, styles) {
	  // If we already have the right measurement, avoid augmentation,
	  // Otherwise initialize for horizontal or vertical properties
	  var i = extra === (isBorderBox ? 'border' : 'content') ? 4 : 'width' == prop ? 1 : 0;
	  var val = 0;
	
	  for (; i < 4; i += 2) {
	    // both box models exclude margin, so add it if we want it
	    if (extra === 'margin') {
	      val += css(el, extra + cssExpand[i], true, styles);
	    }
	
	    if (isBorderBox) {
	      // border-box includes padding, so remove it if we want content
	      if (extra === 'content') {
	        val -= css(el, 'padding' + cssExpand[i], true, styles);
	      }
	
	      // at this point, extra isn't border nor margin, so remove border
	      if (extra !== 'margin') {
	        val -= css(el, 'border' + cssExpand[i] + 'Width', true, styles);
	      }
	    } else {
	      // at this point, extra isn't content, so add padding
	      val += css(el, 'padding' + cssExpand[i], true, styles);
	
	      // at this point, extra isn't content nor padding, so add border
	      if (extra !== 'padding') {
	        val += css(el, 'border' + cssExpand[i] + 'Width', true, styles);
	      }
	    }
	  }
	
	  return val;
	}
	
	});
	require.register("component-css/lib/styles.js", function(exports, require, module){
	/**
	 * Expose `styles`
	 */
	
	module.exports = styles;
	
	/**
	 * Get all the styles
	 *
	 * @param {Element} el
	 * @return {Array}
	 */
	
	function styles(el) {
	  return el.ownerDocument.defaultView.getComputedStyle(el, null);
	}
	
	});
	require.register("component-css/lib/vendor.js", function(exports, require, module){
	/**
	 * Module Dependencies
	 */
	
	var prefixes = ['Webkit', 'O', 'Moz', 'ms'];
	
	/**
	 * Expose `vendor`
	 */
	
	module.exports = vendor;
	
	/**
	 * Get the vendor prefix for a given property
	 *
	 * @param {String} prop
	 * @param {Object} style
	 * @return {String}
	 */
	
	function vendor(prop, style) {
	  // shortcut for names that are not vendor prefixed
	  if (style[prop]) return prop;
	
	  // check for vendor prefixed names
	  var capName = prop[0].toUpperCase() + prop.slice(1);
	  var original = prop;
	  var i = prefixes.length;
	
	  while (i--) {
	    prop = prefixes[i] + capName;
	    if (prop in style) return prop;
	  }
	
	  return original;
	}
	
	});
	require.register("component-css/lib/support.js", function(exports, require, module){
	/**
	 * Support values
	 */
	
	var reliableMarginRight;
	var boxSizingReliableVal;
	var pixelPositionVal;
	var clearCloneStyle;
	
	/**
	 * Container setup
	 */
	
	var docElem = document.documentElement;
	var container = document.createElement('div');
	var div = document.createElement('div');
	
	/**
	 * Clear clone style
	 */
	
	div.style.backgroundClip = 'content-box';
	div.cloneNode(true).style.backgroundClip = '';
	exports.clearCloneStyle = div.style.backgroundClip === 'content-box';
	
	container.style.cssText = 'border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px';
	container.appendChild(div);
	
	/**
	 * Pixel position
	 *
	 * Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	 * getComputedStyle returns percent when specified for top/left/bottom/right
	 * rather than make the css module depend on the offset module, we just check for it here
	 */
	
	exports.pixelPosition = function() {
	  if (undefined == pixelPositionVal) computePixelPositionAndBoxSizingReliable();
	  return pixelPositionVal;
	}
	
	/**
	 * Reliable box sizing
	 */
	
	exports.boxSizingReliable = function() {
	  if (undefined == boxSizingReliableVal) computePixelPositionAndBoxSizingReliable();
	  return boxSizingReliableVal;
	}
	
	/**
	 * Reliable margin right
	 *
	 * Support: Android 2.3
	 * Check if div with explicit width and no margin-right incorrectly
	 * gets computed margin-right based on width of container. (#3333)
	 * WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
	 * This support function is only executed once so no memoizing is needed.
	 *
	 * @return {Boolean}
	 */
	
	exports.reliableMarginRight = function() {
	  var ret;
	  var marginDiv = div.appendChild(document.createElement("div" ));
	
	  marginDiv.style.cssText = div.style.cssText = divReset;
	  marginDiv.style.marginRight = marginDiv.style.width = "0";
	  div.style.width = "1px";
	  docElem.appendChild(container);
	
	  ret = !parseFloat(window.getComputedStyle(marginDiv, null).marginRight);
	
	  docElem.removeChild(container);
	
	  // Clean up the div for other support tests.
	  div.innerHTML = "";
	
	  return ret;
	}
	
	/**
	 * Executing both pixelPosition & boxSizingReliable tests require only one layout
	 * so they're executed at the same time to save the second computation.
	 */
	
	function computePixelPositionAndBoxSizingReliable() {
	  // Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
	  div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
	    "box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;" +
	    "position:absolute;top:1%";
	  docElem.appendChild(container);
	
	  var divStyle = window.getComputedStyle(div, null);
	  pixelPositionVal = divStyle.top !== "1%";
	  boxSizingReliableVal = divStyle.width === "4px";
	
	  docElem.removeChild(container);
	}
	
	
	
	});
	require.register("component-css/lib/computed.js", function(exports, require, module){
	/**
	 * Module Dependencies
	 */
	
	var debug = require('debug')('css:computed');
	var withinDocument = require('within-document');
	var styles = require('./styles');
	
	/**
	 * Expose `computed`
	 */
	
	module.exports = computed;
	
	/**
	 * Get the computed style
	 *
	 * @param {Element} el
	 * @param {String} prop
	 * @param {Array} precomputed (optional)
	 * @return {Array}
	 * @api private
	 */
	
	function computed(el, prop, precomputed) {
	  computed = precomputed || styles(el);
	  if (!computed) return;
	
	  var ret = computed.getPropertyValue(prop) || computed[prop];
	
	  if ('' === ret && !withinDocument(el)) {
	    debug('element not within document, try finding from style attribute');
	    var style = require('./style');
	    ret = style(el, prop);
	  }
	
	  debug('computed value of %s: %s', prop, ret);
	
	  // Support: IE
	  // IE returns zIndex value as an integer.
	  return undefined === ret ? ret : ret + '';
	}
	
	});
	require.register("component-type/index.js", function(exports, require, module){
	/**
	 * toString ref.
	 */
	
	var toString = Object.prototype.toString;
	
	/**
	 * Return the type of `val`.
	 *
	 * @param {Mixed} val
	 * @return {String}
	 * @api public
	 */
	
	module.exports = function(val){
	  switch (toString.call(val)) {
	    case '[object Date]': return 'date';
	    case '[object RegExp]': return 'regexp';
	    case '[object Arguments]': return 'arguments';
	    case '[object Array]': return 'array';
	  }
	
	  if (val === null) return 'null';
	  if (val === undefined) return 'undefined';
	  if (val && val.nodeType === 1) return 'element';
	
	  return typeof val.valueOf();
	};
	
	});
	require.register("component-value/index.js", function(exports, require, module){
	
	/**
	 * Module dependencies.
	 */
	
	var typeOf = require('type');
	
	/**
	 * Set or get `el`'s' value.
	 *
	 * @param {Element} el
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api public
	 */
	
	module.exports = function(el, val){
	  if (2 == arguments.length) return set(el, val);
	  return get(el);
	};
	
	/**
	 * Get `el`'s value.
	 */
	
	function get(el) {
	  switch (type(el)) {
	    case 'checkbox':
	    case 'radio':
	      if (el.checked) {
	        var attr = el.getAttribute('value');
	        return null == attr ? true : attr;
	      } else {
	        return false;
	      }
	    case 'radiogroup':
	      for (var i = 0, radio; radio = el[i]; i++) {
	        if (radio.checked) return radio.value;
	      }
	      break;
	    case 'select':
	      for (var i = 0, option; option = el.options[i]; i++) {
	        if (option.selected) return option.value;
	      }
	      break;
	    default:
	      return el.value;
	  }
	}
	
	/**
	 * Set `el`'s value.
	 */
	
	function set(el, val) {
	  switch (type(el)) {
	    case 'checkbox':
	    case 'radio':
	      if (val) {
	        el.checked = true;
	      } else {
	        el.checked = false;
	      }
	      break;
	    case 'radiogroup':
	      for (var i = 0, radio; radio = el[i]; i++) {
	        radio.checked = radio.value === val;
	      }
	      break;
	    case 'select':
	      for (var i = 0, option; option = el.options[i]; i++) {
	        option.selected = option.value === val;
	      }
	      break;
	    default:
	      el.value = val;
	  }
	}
	
	/**
	 * Element type.
	 */
	
	function type(el) {
	  var group = 'array' == typeOf(el) || 'object' == typeOf(el);
	  if (group) el = el[0];
	  var name = el.nodeName.toLowerCase();
	  var type = el.getAttribute('type');
	
	  if (group && type && 'radio' == type.toLowerCase()) return 'radiogroup';
	  if ('input' == name && type && 'checkbox' == type.toLowerCase()) return 'checkbox';
	  if ('input' == name && type && 'radio' == type.toLowerCase()) return 'radio';
	  if ('select' == name) return 'select';
	  return name;
	}
	
	});
	require.register("component-query/index.js", function(exports, require, module){
	function one(selector, el) {
	  return el.querySelector(selector);
	}
	
	exports = module.exports = function(selector, el){
	  el = el || document;
	  return one(selector, el);
	};
	
	exports.all = function(selector, el){
	  el = el || document;
	  return el.querySelectorAll(selector);
	};
	
	exports.engine = function(obj){
	  if (!obj.one) throw new Error('.one callback required');
	  if (!obj.all) throw new Error('.all callback required');
	  one = obj.one;
	  exports.all = obj.all;
	  return exports;
	};
	
	});
	require.register("component-matches-selector/index.js", function(exports, require, module){
	/**
	 * Module dependencies.
	 */
	
	var query = require('query');
	
	/**
	 * Element prototype.
	 */
	
	var proto = Element.prototype;
	
	/**
	 * Vendor function.
	 */
	
	var vendor = proto.matches
	  || proto.webkitMatchesSelector
	  || proto.mozMatchesSelector
	  || proto.msMatchesSelector
	  || proto.oMatchesSelector;
	
	/**
	 * Expose `match()`.
	 */
	
	module.exports = match;
	
	/**
	 * Match `el` to `selector`.
	 *
	 * @param {Element} el
	 * @param {String} selector
	 * @return {Boolean}
	 * @api public
	 */
	
	function match(el, selector) {
	  if (vendor) return vendor.call(el, selector);
	  var nodes = query.all(selector, el.parentNode);
	  for (var i = 0; i < nodes.length; ++i) {
	    if (nodes[i] == el) return true;
	  }
	  return false;
	}
	
	});
	require.register("yields-traverse/index.js", function(exports, require, module){
	
	/**
	 * dependencies
	 */
	
	var matches = require('matches-selector');
	
	/**
	 * Traverse with the given `el`, `selector` and `len`.
	 *
	 * @param {String} type
	 * @param {Element} el
	 * @param {String} selector
	 * @param {Number} len
	 * @return {Array}
	 * @api public
	 */
	
	module.exports = function(type, el, selector, len){
	  var el = el[type]
	    , n = len || 1
	    , ret = [];
	
	  if (!el) return ret;
	
	  do {
	    if (n == ret.length) break;
	    if (1 != el.nodeType) continue;
	    if (matches(el, selector)) ret.push(el);
	    if (!selector) ret.push(el);
	  } while (el = el[type]);
	
	  return ret;
	}
	
	});
	require.register("component-trim/index.js", function(exports, require, module){
	
	exports = module.exports = trim;
	
	function trim(str){
	  if (str.trim) return str.trim();
	  return str.replace(/^\s*|\s*$/g, '');
	}
	
	exports.left = function(str){
	  if (str.trimLeft) return str.trimLeft();
	  return str.replace(/^\s*/, '');
	};
	
	exports.right = function(str){
	  if (str.trimRight) return str.trimRight();
	  return str.replace(/\s*$/, '');
	};
	
	});
	require.register("yields-isArray/index.js", function(exports, require, module){
	
	/**
	 * isArray
	 */
	
	var isArray = Array.isArray;
	
	/**
	 * toString
	 */
	
	var str = Object.prototype.toString;
	
	/**
	 * Wether or not the given `val`
	 * is an array.
	 *
	 * example:
	 *
	 *        isArray([]);
	 *        // > true
	 *        isArray(arguments);
	 *        // > false
	 *        isArray('');
	 *        // > false
	 *
	 * @param {mixed} val
	 * @return {bool}
	 */
	
	module.exports = isArray || function (val) {
	  return !! val && '[object Array]' == str.call(val);
	};
	
	});
	require.register("component-props/index.js", function(exports, require, module){
	/**
	 * Global Names
	 */
	
	var globals = /\b(Array|Date|Object|Math|JSON)\b/g;
	
	/**
	 * Return immediate identifiers parsed from `str`.
	 *
	 * @param {String} str
	 * @param {String|Function} map function or prefix
	 * @return {Array}
	 * @api public
	 */
	
	module.exports = function(str, fn){
	  var p = unique(props(str));
	  if (fn && 'string' == typeof fn) fn = prefixed(fn);
	  if (fn) return map(str, p, fn);
	  return p;
	};
	
	/**
	 * Return immediate identifiers in `str`.
	 *
	 * @param {String} str
	 * @return {Array}
	 * @api private
	 */
	
	function props(str) {
	  return str
	    .replace(/\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\//g, '')
	    .replace(globals, '')
	    .match(/[a-zA-Z_]\w*/g)
	    || [];
	}
	
	/**
	 * Return `str` with `props` mapped with `fn`.
	 *
	 * @param {String} str
	 * @param {Array} props
	 * @param {Function} fn
	 * @return {String}
	 * @api private
	 */
	
	function map(str, props, fn) {
	  var re = /\.\w+|\w+ *\(|"[^"]*"|'[^']*'|\/([^/]+)\/|[a-zA-Z_]\w*/g;
	  return str.replace(re, function(_){
	    if ('(' == _[_.length - 1]) return fn(_);
	    if (!~props.indexOf(_)) return _;
	    return fn(_);
	  });
	}
	
	/**
	 * Return unique array.
	 *
	 * @param {Array} arr
	 * @return {Array}
	 * @api private
	 */
	
	function unique(arr) {
	  var ret = [];
	
	  for (var i = 0; i < arr.length; i++) {
	    if (~ret.indexOf(arr[i])) continue;
	    ret.push(arr[i]);
	  }
	
	  return ret;
	}
	
	/**
	 * Map with prefix `str`.
	 */
	
	function prefixed(str) {
	  return function(_){
	    return str + _;
	  };
	}
	
	});
	require.register("component-to-function/index.js", function(exports, require, module){
	/**
	 * Module Dependencies
	 */
	
	try {
	  var expr = require('props');
	} catch(e) {
	  var expr = require('props-component');
	}
	
	/**
	 * Expose `toFunction()`.
	 */
	
	module.exports = toFunction;
	
	/**
	 * Convert `obj` to a `Function`.
	 *
	 * @param {Mixed} obj
	 * @return {Function}
	 * @api private
	 */
	
	function toFunction(obj) {
	  switch ({}.toString.call(obj)) {
	    case '[object Object]':
	      return objectToFunction(obj);
	    case '[object Function]':
	      return obj;
	    case '[object String]':
	      return stringToFunction(obj);
	    case '[object RegExp]':
	      return regexpToFunction(obj);
	    default:
	      return defaultToFunction(obj);
	  }
	}
	
	/**
	 * Default to strict equality.
	 *
	 * @param {Mixed} val
	 * @return {Function}
	 * @api private
	 */
	
	function defaultToFunction(val) {
	  return function(obj){
	    return val === obj;
	  }
	}
	
	/**
	 * Convert `re` to a function.
	 *
	 * @param {RegExp} re
	 * @return {Function}
	 * @api private
	 */
	
	function regexpToFunction(re) {
	  return function(obj){
	    return re.test(obj);
	  }
	}
	
	/**
	 * Convert property `str` to a function.
	 *
	 * @param {String} str
	 * @return {Function}
	 * @api private
	 */
	
	function stringToFunction(str) {
	  // immediate such as "> 20"
	  if (/^ *\W+/.test(str)) return new Function('_', 'return _ ' + str);
	
	  // properties such as "name.first" or "age > 18" or "age > 18 && age < 36"
	  return new Function('_', 'return ' + get(str));
	}
	
	/**
	 * Convert `object` to a function.
	 *
	 * @param {Object} object
	 * @return {Function}
	 * @api private
	 */
	
	function objectToFunction(obj) {
	  var match = {}
	  for (var key in obj) {
	    match[key] = typeof obj[key] === 'string'
	      ? defaultToFunction(obj[key])
	      : toFunction(obj[key])
	  }
	  return function(val){
	    if (typeof val !== 'object') return false;
	    for (var key in match) {
	      if (!(key in val)) return false;
	      if (!match[key](val[key])) return false;
	    }
	    return true;
	  }
	}
	
	/**
	 * Built the getter function. Supports getter style functions
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */
	
	function get(str) {
	  var props = expr(str);
	  if (!props.length) return '_.' + str;
	
	  var val;
	  for(var i = 0, prop; prop = props[i]; i++) {
	    val = '_.' + prop;
	    val = "('function' == typeof " + val + " ? " + val + "() : " + val + ")";
	    str = str.replace(new RegExp(prop, 'g'), val);
	  }
	
	  return str;
	}
	
	});
	require.register("dom/index.js", function(exports, require, module){
	/**
	 * Module dependencies.
	 */
	
	var isArray = require('isArray');
	var domify = require('domify');
	var events = require('event');
	var query = require('query');
	var trim = require('trim');
	var slice = [].slice;
	
	/**
	 * Attributes supported.
	 */
	
	var attrs = [
	  'id',
	  'src',
	  'rel',
	  'cols',
	  'rows',
	  'type',
	  'name',
	  'href',
	  'title',
	  'style',
	  'width',
	  'height',
	  'action',
	  'method',
	  'tabindex',
	  'placeholder'
	];
	
	/*
	 * A simple way to check for HTML strings or ID strings
	 */
	
	var quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/;
	
	/**
	 * Expose `dom()`.
	 */
	
	module.exports = dom;
	
	/**
	 * Return a dom `List` for the given
	 * `html`, selector, or element.
	 *
	 * @param {String|Element|List} selector
	 * @param {String|ELement|context} context
	 * @return {List}
	 * @api public
	 */
	
	function dom(selector, context) {
	  // array
	  if (isArray(selector)) {
	    return new List(selector);
	  }
	
	  // List
	  if (selector instanceof List) {
	    return selector;
	  }
	
	  // node
	  if (selector.nodeName) {
	    return new List([selector]);
	  }
	
	  if ('string' != typeof selector) {
	    throw new TypeError('invalid selector');
	  }
	
	  // html
	  var htmlselector = trim.left(selector);
	  if (isHTML(htmlselector)) {
	    return new List([domify(htmlselector)], htmlselector);
	  }
	
	  // selector
	  var ctx = context
	    ? (context instanceof List ? context[0] : context)
	    : document;
	
	  return new List(query.all(selector, ctx), selector);
	}
	
	/**
	 * Static: Expose `List`
	 */
	
	dom.List = List;
	
	/**
	 * Static: Expose supported attrs.
	 */
	
	dom.attrs = attrs;
	
	/**
	 * Static: Mixin a function
	 *
	 * @param {Object|String} name
	 * @param {Object|Function} obj
	 * @return {List} self
	 */
	
	dom.use = function(name, fn) {
	  var keys = [];
	  var tmp;
	
	  if (2 == arguments.length) {
	    keys.push(name);
	    tmp = {};
	    tmp[name] = fn;
	    fn = tmp;
	  } else if (name.name) {
	    // use function name
	    fn = name;
	    name = name.name;
	    keys.push(name);
	    tmp = {};
	    tmp[name] = fn;
	    fn = tmp;
	  } else {
	    keys = Object.keys(name);
	    fn = name;
	  }
	
	  for(var i = 0, len = keys.length; i < len; i++) {
	    List.prototype[keys[i]] = fn[keys[i]];
	  }
	
	  return this;
	}
	
	/**
	 * Initialize a new `List` with the
	 * given array-ish of `els` and `selector`
	 * string.
	 *
	 * @param {Mixed} els
	 * @param {String} selector
	 * @api private
	 */
	
	function List(els, selector) {
	  els = els || [];
	  var len = this.length = els.length;
	  for(var i = 0; i < len; i++) this[i] = els[i];
	  this.selector = selector;
	}
	
	/**
	 * Remake the list
	 *
	 * @param {String|ELement|context} context
	 * @return {List}
	 * @api private
	 */
	
	List.prototype.dom = dom;
	
	/**
	 * Make `List` an array-like object
	 */
	
	List.prototype.length = 0;
	List.prototype.splice = Array.prototype.splice;
	
	/**
	 * Array-like object to array
	 *
	 * @return {Array}
	 */
	
	List.prototype.toArray = function() {
	  return slice.call(this);
	}
	
	/**
	 * Attribute accessors.
	 */
	
	attrs.forEach(function(name){
	  List.prototype[name] = function(val){
	    if (0 == arguments.length) return this.attr(name);
	    return this.attr(name, val);
	  };
	});
	
	/**
	 * Mixin the API
	 */
	
	dom.use(require('./lib/attributes'));
	dom.use(require('./lib/classes'));
	dom.use(require('./lib/events'));
	dom.use(require('./lib/manipulate'));
	dom.use(require('./lib/traverse'));
	
	/**
	 * Check if the string is HTML
	 *
	 * @param {String} str
	 * @return {Boolean}
	 * @api private
	 */
	
	function isHTML(str) {
	  // Faster than running regex, if str starts with `<` and ends with `>`, assume it's HTML
	  if (str.charAt(0) === '<' && str.charAt(str.length - 1) === '>' && str.length >= 3) return true;
	
	  // Run the regex
	  var match = quickExpr.exec(str);
	  return !!(match && match[1]);
	}
	
	});
	require.register("dom/lib/traverse.js", function(exports, require, module){
	/**
	 * Module Dependencies
	 */
	
	var proto = Array.prototype;
	var traverse = require('traverse');
	var toFunction = require('to-function');
	var matches = require('matches-selector');
	
	/**
	 * Find children matching the given `selector`.
	 *
	 * @param {String} selector
	 * @return {List}
	 * @api public
	 */
	
	exports.find = function(selector){
	  return this.dom(selector, this);
	};
	
	/**
	 * Check if the any element in the selection
	 * matches `selector`.
	 *
	 * @param {String} selector
	 * @return {Boolean}
	 * @api public
	 */
	
	exports.is = function(selector){
	  for(var i = 0, el; el = this[i]; i++) {
	    if (matches(el, selector)) return true;
	  }
	
	  return false;
	};
	
	/**
	 * Get parent(s) with optional `selector` and `limit`
	 *
	 * @param {String} selector
	 * @param {Number} limit
	 * @return {List}
	 * @api public
	 */
	
	exports.parent = function(selector, limit){
	  return this.dom(traverse('parentNode',
	    this[0],
	    selector,
	    limit
	    || 1));
	};
	
	/**
	 * Get next element(s) with optional `selector` and `limit`.
	 *
	 * @param {String} selector
	 * @param {Number} limit
	 * @retrun {List}
	 * @api public
	 */
	
	exports.next = function(selector, limit){
	  return this.dom(traverse('nextSibling',
	    this[0],
	    selector,
	    limit
	    || 1));
	};
	
	/**
	 * Get previous element(s) with optional `selector` and `limit`.
	 *
	 * @param {String} selector
	 * @param {Number} limit
	 * @return {List}
	 * @api public
	 */
	
	exports.prev =
	exports.previous = function(selector, limit){
	  return this.dom(traverse('previousSibling',
	    this[0],
	    selector,
	    limit
	    || 1));
	};
	
	/**
	 * Iterate over each element creating a new list with
	 * one item and invoking `fn(list, i)`.
	 *
	 * @param {Function} fn
	 * @return {List} self
	 * @api public
	 */
	
	exports.each = function(fn){
	  var dom = this.dom;
	
	  for (var i = 0, list, len = this.length; i < len; i++) {
	    list = dom(this[i]);
	    fn.call(list, list, i);
	  }
	
	  return this;
	};
	
	/**
	 * Iterate over each element and invoke `fn(el, i)`
	 *
	 * @param {Function} fn
	 * @return {List} self
	 * @api public
	 */
	
	exports.forEach = function(fn) {
	  for (var i = 0, len = this.length; i < len; i++) {
	    fn.call(this[i], this[i], i);
	  }
	
	  return this;
	};
	
	/**
	 * Map each return value from `fn(val, i)`.
	 *
	 * Passing a callback function:
	 *
	 *    inputs.map(function(input){
	 *      return input.type
	 *    })
	 *
	 * Passing a property string:
	 *
	 *    inputs.map('type')
	 *
	 * @param {Function} fn
	 * @return {List} self
	 * @api public
	 */
	
	exports.map = function(fn){
	  fn = toFunction(fn);
	  var dom = this.dom;
	  var out = [];
	
	  for (var i = 0, len = this.length; i < len; i++) {
	    out.push(fn.call(dom(this[i]), this[i], i));
	  }
	
	  return this.dom(out);
	};
	
	/**
	 * Select all values that return a truthy value of `fn(val, i)`.
	 *
	 *    inputs.select(function(input){
	 *      return input.type == 'password'
	 *    })
	 *
	 *  With a property:
	 *
	 *    inputs.select('type == password')
	 *
	 * @param {Function|String} fn
	 * @return {List} self
	 * @api public
	 */
	
	exports.filter =
	exports.select = function(fn){
	  fn = toFunction(fn);
	  var dom = this.dom;
	  var out = [];
	  var val;
	
	  for (var i = 0, len = this.length; i < len; i++) {
	    val = fn.call(dom(this[i]), this[i], i);
	    if (val) out.push(this[i]);
	  }
	
	  return this.dom(out);
	};
	
	/**
	 * Reject all values that return a truthy value of `fn(val, i)`.
	 *
	 * Rejecting using a callback:
	 *
	 *    input.reject(function(user){
	 *      return input.length < 20
	 *    })
	 *
	 * Rejecting with a property:
	 *
	 *    items.reject('password')
	 *
	 * Rejecting values via `==`:
	 *
	 *    data.reject(null)
	 *    input.reject(file)
	 *
	 * @param {Function|String|Mixed} fn
	 * @return {List}
	 * @api public
	 */
	
	exports.reject = function(fn){
	  var out = [];
	  var len = this.length;
	  var val, i;
	
	  if ('string' == typeof fn) fn = toFunction(fn);
	
	  if (fn) {
	    for (i = 0; i < len; i++) {
	      val = fn.call(dom(this[i]), this[i], i);
	      if (!val) out.push(this[i]);
	    }
	  } else {
	    for (i = 0; i < len; i++) {
	      if (this[i] != fn) out.push(this[i]);
	    }
	  }
	
	  return this.dom(out);
	};
	
	/**
	 * Return a `List` containing the element at `i`.
	 *
	 * @param {Number} i
	 * @return {List}
	 * @api public
	 */
	
	exports.at = function(i){
	  return this.dom(this[i]);
	};
	
	/**
	 * Return a `List` containing the first element.
	 *
	 * @param {Number} i
	 * @return {List}
	 * @api public
	 */
	
	exports.first = function(){
	  return this.dom(this[0]);
	};
	
	/**
	 * Return a `List` containing the last element.
	 *
	 * @param {Number} i
	 * @return {List}
	 * @api public
	 */
	
	exports.last = function(){
	  return this.dom(this[this.length - 1]);
	};
	
	/**
	 * Mixin the array functions
	 */
	
	[
	  'push',
	  'pop',
	  'shift',
	  'splice',
	  'unshift',
	  'reverse',
	  'sort',
	  'toString',
	  'concat',
	  'join',
	  'slice'
	].forEach(function(method) {
	  exports[method] = function() {
	    return proto[method].apply(this.toArray(), arguments);
	  };
	});
	
	
	});
	require.register("dom/lib/manipulate.js", function(exports, require, module){
	/**
	 * Module Dependencies
	 */
	
	var value = require('value');
	var css = require('css');
	
	/**
	 * Return element text.
	 *
	 * @param {String} str
	 * @return {String|List}
	 * @api public
	 */
	
	exports.text = function(str) {
	  if (1 == arguments.length) {
	    return this.forEach(function(el) {
	      var node = document.createTextNode(str);
	      el.textContent = '';
	      el.appendChild(node);
	    });
	  }
	
	  var out = '';
	  this.forEach(function(el) {
	    out += getText(el);
	  });
	
	  return out;
	};
	
	/**
	 * Get text helper from Sizzle.
	 *
	 * Source: https://github.com/jquery/sizzle/blob/master/src/sizzle.js#L914-L947
	 *
	 * @param {Element|Array} el
	 * @return {String}
	 */
	
	function getText(el) {
	  var ret = '';
	  var type = el.nodeType;
	  var node;
	
	  switch(type) {
	    case 1:
	    case 9:
	    case 11:
	      if ('string' == typeof el.textContent) return el.textContent;
	      for (el = el.firstChild; el; el = el.nextSibling) ret += text(el);
	      break;
	    case 3:
	    case 4:
	      return el.nodeValue;
	    default:
	      while (node = el[i++]) {
	        ret += getText(node);
	      }
	  }
	
	  return ret;
	}
	
	/**
	 * Return element html.
	 *
	 * @return {String} html
	 * @api public
	 */
	
	exports.html = function(html) {
	  if (1 == arguments.length) {
	    return this.forEach(function(el) {
	      el.innerHTML = html;
	    });
	  }
	
	  // TODO: real impl
	  return this[0] && this[0].innerHTML;
	};
	
	/**
	 * Get and set the css value
	 *
	 * @param {String|Object} prop
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api public
	 */
	
	exports.css = function(prop, val) {
	  // getter
	  if (!val && 'object' != typeof prop) {
	    return css(this[0], prop);
	  }
	  // setter
	  this.forEach(function(el) {
	    css(el, prop, val);
	  });
	
	  return this;
	};
	
	/**
	 * Prepend `val`.
	 *
	 * From jQuery: if there is more than one target element
	 * cloned copies of the inserted element will be created
	 * for each target after the first.
	 *
	 * @param {String|Element|List} val
	 * @return {List} self
	 * @api public
	 */
	
	exports.prepend = function(val) {
	  var dom = this.dom;
	
	  this.forEach(function(target, i) {
	    dom(val).forEach(function(selector) {
	      selector = i ? selector.cloneNode(true) : selector;
	      if (target.children.length) {
	        target.insertBefore(selector, target.firstChild);
	      } else {
	        target.appendChild(selector);
	      }
	    });
	  });
	
	  return this;
	};
	
	/**
	 * Append `val`.
	 *
	 * From jQuery: if there is more than one target element
	 * cloned copies of the inserted element will be created
	 * for each target after the first.
	 *
	 * @param {String|Element|List} val
	 * @return {List} self
	 * @api public
	 */
	
	exports.append = function(val) {
	  var dom = this.dom;
	
	  this.forEach(function(target, i) {
	    dom(val).forEach(function(el) {
	      el = i ? el.cloneNode(true) : el;
	      target.appendChild(el);
	    });
	  });
	
	  return this;
	};
	
	/**
	 * Insert self's `els` after `val`
	 *
	 * From jQuery: if there is more than one target element,
	 * cloned copies of the inserted element will be created
	 * for each target after the first, and that new set
	 * (the original element plus clones) is returned.
	 *
	 * @param {String|Element|List} val
	 * @return {List} self
	 * @api public
	 */
	
	exports.insertAfter = function(val) {
	  var dom = this.dom;
	
	  this.forEach(function(el) {
	    dom(val).forEach(function(target, i) {
	      if (!target.parentNode) return;
	      el = i ? el.cloneNode(true) : el;
	      target.parentNode.insertBefore(el, target.nextSibling);
	    });
	  });
	
	  return this;
	};
	
	/**
	 * Append self's `el` to `val`
	 *
	 * @param {String|Element|List} val
	 * @return {List} self
	 * @api public
	 */
	
	exports.appendTo = function(val) {
	  this.dom(val).append(this);
	  return this;
	};
	
	/**
	 * Replace elements in the DOM.
	 *
	 * @param {String|Element|List} val
	 * @return {List} self
	 * @api public
	 */
	
	exports.replace = function(val) {
	  var self = this;
	  var list = this.dom(val);
	
	  list.forEach(function(el, i) {
	    var old = self[i];
	    var parent = old.parentNode;
	    if (!parent) return;
	    el = i ? el.cloneNode(true) : el;
	    parent.replaceChild(el, old);
	  });
	
	  return this;
	};
	
	/**
	 * Empty the dom list
	 *
	 * @return self
	 * @api public
	 */
	
	exports.empty = function() {
	  return this.forEach(function(el) {
	    el.textContent = '';
	  });
	};
	
	/**
	 * Remove all elements in the dom list
	 *
	 * @return {List} self
	 * @api public
	 */
	
	exports.remove = function() {
	  return this.forEach(function(el) {
	    var parent = el.parentNode;
	    if (parent) parent.removeChild(el);
	  });
	};
	
	/**
	 * Return a cloned dom list with all elements cloned.
	 *
	 * @return {List}
	 * @api public
	 */
	
	exports.clone = function() {
	  var out = this.map(function(el) {
	    return el.cloneNode(true);
	  });
	
	  return this.dom(out);
	};
	
	});
	require.register("dom/lib/classes.js", function(exports, require, module){
	/**
	 * Module Dependencies
	 */
	
	var classes = require('classes');
	
	/**
	 * Add the given class `name`.
	 *
	 * @param {String} name
	 * @return {List} self
	 * @api public
	 */
	
	exports.addClass = function(name){
	  return this.forEach(function(el) {
	    el._classes = el._classes || classes(el);
	    el._classes.add(name);
	  });
	};
	
	/**
	 * Remove the given class `name`.
	 *
	 * @param {String|RegExp} name
	 * @return {List} self
	 * @api public
	 */
	
	exports.removeClass = function(name){
	  return this.forEach(function(el) {
	    el._classes = el._classes || classes(el);
	    el._classes.remove(name);
	  });
	};
	
	/**
	 * Toggle the given class `name`,
	 * optionally a `bool` may be given
	 * to indicate that the class should
	 * be added when truthy.
	 *
	 * @param {String} name
	 * @param {Boolean} bool
	 * @return {List} self
	 * @api public
	 */
	
	exports.toggleClass = function(name, bool){
	  var fn = 'toggle';
	
	  // toggle with boolean
	  if (2 == arguments.length) {
	    fn = bool ? 'add' : 'remove';
	  }
	
	  return this.forEach(function(el) {
	    el._classes = el._classes || classes(el);
	    el._classes[fn](name);
	  })
	};
	
	/**
	 * Check if the given class `name` is present.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */
	
	exports.hasClass = function(name){
	  var el;
	
	  for(var i = 0, len = this.length; i < len; i++) {
	    el = this[i];
	    el._classes = el._classes || classes(el);
	    if (el._classes.has(name)) return true;
	  }
	
	  return false;
	};
	
	});
	require.register("dom/lib/attributes.js", function(exports, require, module){
	/**
	 * Module Dependencies
	 */
	
	var value = require('value');
	
	/**
	 * Set attribute `name` to `val`, or get attr `name`.
	 *
	 * @param {String} name
	 * @param {String} [val]
	 * @return {String|List} self
	 * @api public
	 */
	
	exports.attr = function(name, val){
	  // get
	  if (1 == arguments.length) {
	    return this[0] && this[0].getAttribute(name);
	  }
	
	  // remove
	  if (null == val) {
	    return this.removeAttr(name);
	  }
	
	  // set
	  return this.forEach(function(el){
	    el.setAttribute(name, val);
	  });
	};
	
	/**
	 * Remove attribute `name`.
	 *
	 * @param {String} name
	 * @return {List} self
	 * @api public
	 */
	
	exports.removeAttr = function(name){
	  return this.forEach(function(el){
	    el.removeAttribute(name);
	  });
	};
	
	/**
	 * Set property `name` to `val`, or get property `name`.
	 *
	 * @param {String} name
	 * @param {String} [val]
	 * @return {Object|List} self
	 * @api public
	 */
	
	exports.prop = function(name, val){
	  if (1 == arguments.length) {
	    return this[0] && this[0][name];
	  }
	
	  return this.forEach(function(el){
	    el[name] = val;
	  });
	};
	
	/**
	 * Get the first element's value or set selected
	 * element values to `val`.
	 *
	 * @param {Mixed} [val]
	 * @return {Mixed}
	 * @api public
	 */
	
	exports.val =
	exports.value = function(val){
	  if (0 == arguments.length) {
	    return this[0]
	      ? value(this[0])
	      : undefined;
	  }
	
	  return this.forEach(function(el){
	    value(el, val);
	  });
	};
	
	});
	require.register("dom/lib/events.js", function(exports, require, module){
	/**
	 * Module Dependencies
	 */
	
	var events = require('event');
	var delegate = require('delegate');
	
	/**
	 * Bind to `event` and invoke `fn(e)`. When
	 * a `selector` is given then events are delegated.
	 *
	 * @param {String} event
	 * @param {String} [selector]
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {List}
	 * @api public
	 */
	
	exports.on = function(event, selector, fn, capture){
	  if ('string' == typeof selector) {
	    return this.forEach(function (el) {
	      fn._delegate = delegate.bind(el, selector, event, fn, capture);
	    });
	  }
	
	  capture = fn;
	  fn = selector;
	
	  return this.forEach(function (el) {
	    events.bind(el, event, fn, capture);
	  });
	};
	
	/**
	 * Unbind to `event` and invoke `fn(e)`. When
	 * a `selector` is given then delegated event
	 * handlers are unbound.
	 *
	 * @param {String} event
	 * @param {String} [selector]
	 * @param {Function} fn
	 * @param {Boolean} capture
	 * @return {List}
	 * @api public
	 */
	
	exports.off = function(event, selector, fn, capture){
	  if ('string' == typeof selector) {
	    return this.forEach(function (el) {
	      // TODO: add selector support back
	      delegate.unbind(el, event, fn._delegate, capture);
	    });
	  }
	
	  capture = fn;
	  fn = selector;
	
	  return this.forEach(function (el) {
	    events.unbind(el, event, fn, capture);
	  });
	};
	
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	require.alias("component-event/index.js", "dom/deps/event/index.js");
	require.alias("component-event/index.js", "event/index.js");
	
	require.alias("component-delegate/index.js", "dom/deps/delegate/index.js");
	require.alias("component-delegate/index.js", "delegate/index.js");
	require.alias("component-matches-selector/index.js", "component-delegate/deps/matches-selector/index.js");
	require.alias("component-query/index.js", "component-matches-selector/deps/query/index.js");
	
	require.alias("component-event/index.js", "component-delegate/deps/event/index.js");
	
	require.alias("component-domify/index.js", "dom/deps/domify/index.js");
	require.alias("component-domify/index.js", "domify/index.js");
	
	require.alias("component-classes/index.js", "dom/deps/classes/index.js");
	require.alias("component-classes/index.js", "classes/index.js");
	require.alias("component-indexof/index.js", "component-classes/deps/indexof/index.js");
	
	require.alias("component-css/index.js", "dom/deps/css/index.js");
	require.alias("component-css/lib/css.js", "dom/deps/css/lib/css.js");
	require.alias("component-css/lib/prop.js", "dom/deps/css/lib/prop.js");
	require.alias("component-css/lib/swap.js", "dom/deps/css/lib/swap.js");
	require.alias("component-css/lib/style.js", "dom/deps/css/lib/style.js");
	require.alias("component-css/lib/hooks.js", "dom/deps/css/lib/hooks.js");
	require.alias("component-css/lib/styles.js", "dom/deps/css/lib/styles.js");
	require.alias("component-css/lib/vendor.js", "dom/deps/css/lib/vendor.js");
	require.alias("component-css/lib/support.js", "dom/deps/css/lib/support.js");
	require.alias("component-css/lib/computed.js", "dom/deps/css/lib/computed.js");
	require.alias("component-css/index.js", "dom/deps/css/index.js");
	require.alias("component-css/index.js", "css/index.js");
	require.alias("visionmedia-debug/index.js", "component-css/deps/debug/index.js");
	require.alias("visionmedia-debug/debug.js", "component-css/deps/debug/debug.js");
	
	require.alias("ianstormtaylor-to-camel-case/index.js", "component-css/deps/to-camel-case/index.js");
	require.alias("ianstormtaylor-to-space-case/index.js", "ianstormtaylor-to-camel-case/deps/to-space-case/index.js");
	require.alias("ianstormtaylor-to-no-case/index.js", "ianstormtaylor-to-space-case/deps/to-no-case/index.js");
	
	require.alias("component-within-document/index.js", "component-css/deps/within-document/index.js");
	
	require.alias("component-css/index.js", "component-css/index.js");
	require.alias("component-value/index.js", "dom/deps/value/index.js");
	require.alias("component-value/index.js", "dom/deps/value/index.js");
	require.alias("component-value/index.js", "value/index.js");
	require.alias("component-type/index.js", "component-value/deps/type/index.js");
	
	require.alias("component-value/index.js", "component-value/index.js");
	require.alias("component-query/index.js", "dom/deps/query/index.js");
	require.alias("component-query/index.js", "query/index.js");
	
	require.alias("component-matches-selector/index.js", "dom/deps/matches-selector/index.js");
	require.alias("component-matches-selector/index.js", "matches-selector/index.js");
	require.alias("component-query/index.js", "component-matches-selector/deps/query/index.js");
	
	require.alias("yields-traverse/index.js", "dom/deps/traverse/index.js");
	require.alias("yields-traverse/index.js", "dom/deps/traverse/index.js");
	require.alias("yields-traverse/index.js", "traverse/index.js");
	require.alias("component-matches-selector/index.js", "yields-traverse/deps/matches-selector/index.js");
	require.alias("component-query/index.js", "component-matches-selector/deps/query/index.js");
	
	require.alias("yields-traverse/index.js", "yields-traverse/index.js");
	require.alias("component-trim/index.js", "dom/deps/trim/index.js");
	require.alias("component-trim/index.js", "trim/index.js");
	
	require.alias("yields-isArray/index.js", "dom/deps/isArray/index.js");
	require.alias("yields-isArray/index.js", "isArray/index.js");
	
	require.alias("component-to-function/index.js", "dom/deps/to-function/index.js");
	require.alias("component-to-function/index.js", "to-function/index.js");
	require.alias("component-props/index.js", "component-to-function/deps/props/index.js");
	require.alias("component-props/index.js", "component-to-function/deps/props/index.js");
	require.alias("component-props/index.js", "component-props/index.js");if (true) {
	  module.exports = require("dom");
	} else if (typeof define == "function" && define.amd) {
	  define(function(){ return require("dom"); });
	} else {
	  this["dom"] = require("dom");
	}})();

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	  * domready (c) Dustin Diaz 2012 - License MIT
	  */
	!function (name, definition) {
	  if (true) module.exports = definition()
	  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
	  else this[name] = definition()
	}('domready', function (ready) {
	
	  var fns = [], fn, f = false
	    , doc = document
	    , testEl = doc.documentElement
	    , hack = testEl.doScroll
	    , domContentLoaded = 'DOMContentLoaded'
	    , addEventListener = 'addEventListener'
	    , onreadystatechange = 'onreadystatechange'
	    , readyState = 'readyState'
	    , loadedRgx = hack ? /^loaded|^c/ : /^loaded|c/
	    , loaded = loadedRgx.test(doc[readyState])
	
	  function flush(f) {
	    loaded = 1
	    while (f = fns.shift()) f()
	  }
	
	  doc[addEventListener] && doc[addEventListener](domContentLoaded, fn = function () {
	    doc.removeEventListener(domContentLoaded, fn, f)
	    flush()
	  }, f)
	
	
	  hack && doc.attachEvent(onreadystatechange, fn = function () {
	    if (/^c/.test(doc[readyState])) {
	      doc.detachEvent(onreadystatechange, fn)
	      flush()
	    }
	  })
	
	  return (ready = hack ?
	    function (fn) {
	      self != top ?
	        loaded ? fn() : fns.push(fn) :
	        function () {
	          try {
	            testEl.doScroll('left')
	          } catch (e) {
	            return setTimeout(function() { ready(fn) }, 50)
	          }
	          fn()
	        }()
	    } :
	    function (fn) {
	      loaded ? fn() : fns.push(fn)
	    })
	})


/***/ },
/* 139 */
/***/ function(module, exports) {

	(function outer(modules, cache, entries){
	
	  /**
	   * Global
	   */
	
	  var global = (function(){ return this; })();
	
	  /**
	   * Require `name`.
	   *
	   * @param {String} name
	   * @param {Boolean} jumped
	   * @api public
	   */
	
	  function require(name, jumped){
	    if (cache[name]) return cache[name].exports;
	    if (modules[name]) return call(name, require);
	    throw new Error('cannot find module "' + name + '"');
	  }
	
	  /**
	   * Call module `id` and cache it.
	   *
	   * @param {Number} id
	   * @param {Function} require
	   * @return {Function}
	   * @api private
	   */
	
	  function call(id, require){
	    var m = cache[id] = { exports: {} };
	    var mod = modules[id];
	    var name = mod[2];
	    var fn = mod[0];
	
	    fn.call(m.exports, function(req){
	      var dep = modules[id][1][req];
	      return require(dep ? dep : req);
	    }, m, m.exports, outer, modules, cache, entries);
	
	    // expose as `name`.
	    if (name) cache[name] = cache[id];
	
	    return cache[id].exports;
	  }
	
	  /**
	   * Require all entries exposing them on global if needed.
	   */
	
	  for (var id in entries) {
	    if (entries[id]) {
	      global[entries[id]] = require(id);
	    } else {
	      require(id);
	    }
	  }
	
	  /**
	   * Duo flag.
	   */
	
	  require.duo = true;
	
	  /**
	   * Expose cache.
	   */
	
	  require.cache = cache;
	
	  /**
	   * Expose modules
	   */
	
	  require.modules = modules;
	
	  /**
	   * Return newest require.
	   */
	
	   return require;
	})({
	1: [function(require, module, exports) {
	(function() {
	  var Emitter, checkEvent, createModal, createiFrame, domify, gmodal, hideModalInternal, modal, modals, showModalInternal, trim, win;
	
	  Emitter = require('emitter');
	
	  domify = require('domify');
	
	  trim = require('trim');
	
	  win = window.self || window;
	
	  gmodal = win.gmodal;
	
	  modals = [];
	
	  checkEvent = function(self, name, evt, el) {
	    var myEvt, scls, tg;
	    evt = evt || win.event;
	    tg = evt.target || evt.srcElement;
	    if (tg.nodeType === 3) {
	      tg = tg.parentNode;
	    }
	    if (self.hasCls(tg.parentNode, "" + self.closeCls)) {
	      tg = tg.parentNode;
	    }
	    scls = "gmodal-container gmodal-wrap";
	    if (name === 'click') {
	      if (self.hasCls(tg, scls) || tg === el) {
	        self.emit('click', tg, evt);
	      }
	    } else if (name === 'keypress') {
	      if (self.hasCls(tg, scls) || tg === el || tg === self.doc || tg === self.doc.body) {
	        if ((evt.which || evt.keyCode) === 27) {
	          self.emit('esc', tg, evt);
	        }
	      }
	    } else if (name === 'tap') {
	      if (self.hasCls(tg, scls) || tg === el) {
	        self.emit('tap', tg, evt);
	      }
	    }
	    if (self.hasCls(tg, "" + self.closeCls)) {
	      myEvt = {
	        cancel: false
	      };
	      self.emit('close', myEvt, tg, evt);
	      if (!myEvt.cancel) {
	        hideModalInternal(self);
	      }
	    }
	    return true;
	  };
	
	  createModal = function(self) {
	    var el, myKeypress, oldkp;
	    el = self.doc.getElementById("gmodal");
	    if (!el) {
	      self.injectStyle('gmodalcss', self.css);
	      el = self.doc.createElement('div');
	      el.id = 'gmodal';
	      el.onclick = function(evt) {
	        return checkEvent(self, 'click', evt, el);
	      };
	      myKeypress = function(evt) {
	        return checkEvent(self, 'keypress', evt, el);
	      };
	      el.onkeypress = myKeypress;
	      if (typeof self.doc.onkeypress === 'function') {
	        oldkp = self.doc.onkeypress;
	        self.doc.onkeypress = function(evt) {
	          oldkp(evt);
	          return myKeypress(evt);
	        };
	      } else {
	        self.doc.onkeypress = myKeypress;
	      }
	      el.ontap = function(evt) {
	        return checkEvent(self, 'tap', evt, el);
	      };
	      el.appendChild(domify(self.tpl));
	      self.doc.getElementsByTagName('body')[0].appendChild(el);
	    }
	    return el;
	  };
	
	  createiFrame = function(parentEl, content) {
	    var doc, iframe;
	    iframe = win.document.createElement('iframe');
	    iframe.className = 'gmodal-iframe';
	    iframe.frameBorder = '0';
	    iframe.marginWidth = '0';
	    iframe.marginHeight = '0';
	    iframe.setAttribute('border', '0');
	    iframe.setAttribute('allowtransparency', 'true');
	    iframe.width = '100%';
	    iframe.height = '100%';
	    parentEl.appendChild(iframe);
	    if (iframe.contentWindow) {
	      iframe.contentWindow.contents = content;
	      iframe.src = 'javascript:window["contents"]';
	      return iframe;
	    }
	    doc = iframe.contentDocument || iframe.document;
	    doc.open();
	    doc.write(content);
	    doc.close();
	    return iframe;
	  };
	
	  showModalInternal = function(self, opts) {
	    var body, eCls, i, len, ref, v;
	    self.isVisible = true;
	    if ((opts != null)) {
	      self.opts = opts;
	      if ((self.opts.content != null)) {
	        while (self.el.firstChild) {
	          self.el.removeChild(self.el.firstChild);
	        }
	        if (typeof self.opts.content === 'string') {
	          if (self.opts.content.indexOf('<!DOCTYPE') > -1 || self.opts.iframe) {
	            createiFrame(self.el, self.opts.content);
	          } else {
	            self.el.appendChild(domify(self.opts.content));
	          }
	        } else {
	          self.el.appendChild(self.opts.content);
	        }
	        self.opts.content = null;
	      }
	    }
	    self.closeCls = self.opts.closeCls || self.closeCls;
	    if (!self.opts.disableScrollTop) {
	      win.scrollTo(0, 0);
	    }
	    self.elWrapper.style.display = self.elWrapper.style.visibility = "";
	    self.elWrapper.className = trim((self.baseCls + " ") + (self.opts.cls || ''));
	    body = self.doc.getElementsByTagName('html')[0];
	    eCls = body.className;
	    body.className = trim(eCls + " html-gmodal");
	    setTimeout(function() {
	      self.emit('show-timeout', self);
	      self.el.className = trim((" " + self.el.className + " ").replace(' in ', '') + ' in');
	    }, self.opts.timeout || 50);
	    if (self.opts.hideOn) {
	      self.opts._autoHideHandler = function() {
	        return hideModalInternal(self);
	      };
	      ref = self.opts.hideOn.split(',');
	      for (i = 0, len = ref.length; i < len; i++) {
	        v = ref[i];
	        if (v === 'esc' || v === 'click' || v === 'tap') {
	          self.on(v, self.opts._autoHideHandler);
	        }
	      }
	    }
	    self.emit('show', self);
	    return self;
	  };
	
	  hideModalInternal = function(self) {
	    self.elWrapper.className = "" + self.baseCls;
	    self.el.className = 'gmodal-wrap gmodal-content';
	    setTimeout(function() {
	      var eCls;
	      eCls = self.doc.getElementsByTagName('html')[0].className;
	      self.doc.getElementsByTagName('html')[0].className = trim(eCls.replace(/html\-gmodal/gi, ''));
	      self.isVisible = false;
	      self.emit('hide', self);
	      if (typeof self.opts.hideCallback === 'function') {
	        self.opts.hideCallback(self);
	      }
	      if (self.opts._autoHideHandler) {
	        self.off('esc', self.opts._autoHideHandler);
	        self.off('click', self.opts._autoHideHandler);
	        self.off('tap', self.opts._autoHideHandler);
	      }
	      if (modals.length !== 0) {
	        return self.show();
	      }
	    }, self.opts.timeout || 50);
	    return self;
	  };
	
	
	  /**
	   * modal
	   */
	
	  modal = (function() {
	    function modal() {}
	
	    modal.prototype.doc = win.document;
	
	    modal.prototype.ishim = null;
	
	    modal.prototype.elWrapper = null;
	
	    modal.prototype.el = null;
	
	    modal.prototype.opts = {};
	
	    modal.prototype.baseCls = 'gmodal';
	
	    modal.prototype.closeCls = 'gmodal-close';
	
	    modal.prototype.tpl = '<div class="gmodal-container"><div class="gmodal-wrap gmodal-left"></div><div class="gmodal-wrap gmodal-content" id="gmodalContent"></div><div class="gmodal-wrap gmodal-right"></div></div>';
	
	    modal.prototype.css = '.gmodal{display:none;overflow:hidden;outline:0;-webkit-overflow-scrolling:touch;position:fixed;top:0;left:0;width:100%;height:200%;z-index:9999990}.gmodal .frameshim{position:absolute;display:block;visibility:hidden;width:100%;height:100%;margin:0;top:0;left:0;border:none;z-index:-999}.html-gmodal body .gmodal{display:block}.html-gmodal,.html-modal body{overflow:hidden;margin:0;padding:0;height:100%;width:100%}.gmodal-container{display:table;position:relative;width:100%;height:50%}.gmodal-wrap{display:table-cell;position:relative;vertical-align:middle}.gmodal-left,.gmodal-right{width:50%}';
	
	
	    /**
	     * show or open modal
	     * @param  {[Object}  opts   options
	     * @param  {Function} hideCb callback function on hide
	     * @return {Object}
	     */
	
	    modal.prototype.show = function(opts, hideCb) {
	      var ref, self;
	      self = this;
	      if (!((ref = self.doc) != null ? ref.body : void 0)) {
	        return false;
	      }
	      self.elWrapper = createModal(self);
	      if (!self.el) {
	        self.el = self.doc.getElementById("gmodalContent");
	      }
	      if (opts) {
	        opts.hideCallback = hideCb;
	        modals.push(opts);
	      }
	      if (!!self.isVisible) {
	        return false;
	      }
	      if (modals.length > 0) {
	        opts = modals.shift();
	      }
	      if (!opts) {
	        return false;
	      }
	      showModalInternal(self, opts);
	      return self;
	    };
	
	
	    /**
	     * hide or close modal
	     * @return {Object}
	     */
	
	    modal.prototype.hide = function() {
	      var self;
	      self = this;
	      if (!self.elWrapper) {
	        return self;
	      }
	      if (!!self.opts) {
	        hideModalInternal(self);
	      }
	      return self;
	    };
	
	
	    /**
	     * Helper method to inject your own css
	     * @param  {string} id  css id
	     * @param  {string} css the css text
	     * @return {Object}
	     */
	
	    modal.prototype.injectStyle = function(id, css) {
	      var el, elx, self;
	      self = this;
	      el = self.doc.getElementById(id);
	      if (!el) {
	        el = self.doc.createElement('style');
	        el.id = id;
	        el.type = 'text/css';
	        if (el.styleSheet) {
	          el.styleSheet.cssText = css;
	        } else {
	          el.appendChild(self.doc.createTextNode(css));
	        }
	        elx = self.doc.getElementsByTagName('link')[0];
	        elx = elx || (self.doc.head || self.doc.getElementsByTagName('head')[0]).lastChild;
	        elx.parentNode.insertBefore(el, elx);
	      }
	      return self;
	    };
	
	
	    /**
	     * helper method to determine if an element has class
	     * @param  {HTMLElement}  el
	     * @param  {string}       cls class names
	     * @return {Boolean}
	     */
	
	    modal.prototype.hasCls = function(el, cls) {
	      var i, k, len, ref, v;
	      ref = cls.split(' ');
	      for (k = i = 0, len = ref.length; i < len; k = ++i) {
	        v = ref[k];
	        if ((' ' + el.className + ' ').indexOf(' ' + v + ' ') >= 0) {
	          return true;
	        }
	      }
	      return false;
	    };
	
	
	    /**
	     * append an iframe shim for older IE
	     * WARNING: this is only for stupid older IE bug
	     * do not use with modern browser or site with ssl
	     * @return {Object}
	     */
	
	    modal.prototype.iShimmy = function() {
	      var self;
	      self = this;
	      if ((self.elWrapper != null) && !self.shim) {
	        self.ishim = self.doc.createElement('iframe');
	        self.ishim.className = 'gmodal-iframeshim';
	        self.ishim.frameBorder = '0';
	        self.ishim.marginWidth = '0';
	        self.ishim.marginHeight = '0';
	        self.ishim.scrolling = 'no';
	        self.ishim.setAttribute('border', '0');
	        self.ishim.height = '100%';
	        self.ishim.width = '100%';
	        self.elWrapper.appendChild(self.ishim);
	      }
	      return self;
	    };
	
	    return modal;
	
	  })();
	
	  if (!gmodal) {
	    Emitter(modal.prototype);
	    gmodal = new modal();
	    win.gmodal = gmodal;
	  }
	
	  module.exports = gmodal;
	
	}).call(this);
	
	}, {"emitter":2,"domify":3,"trim":4}],
	2: [function(require, module, exports) {
	
	/**
	 * Expose `Emitter`.
	 */
	
	if (typeof module !== 'undefined') {
	  module.exports = Emitter;
	}
	
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */
	
	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};
	
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */
	
	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}
	
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};
	
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }
	
	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	
	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }
	
	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;
	
	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }
	
	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};
	
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */
	
	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];
	
	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */
	
	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};
	
	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */
	
	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};
	
	}, {}],
	3: [function(require, module, exports) {
	
	/**
	 * Expose `parse`.
	 */
	
	module.exports = parse;
	
	/**
	 * Tests for browser support.
	 */
	
	var innerHTMLBug = false;
	var bugTestDiv;
	if (typeof document !== 'undefined') {
	  bugTestDiv = document.createElement('div');
	  // Setup
	  bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
	  // Make sure that link elements get serialized correctly by innerHTML
	  // This requires a wrapper element in IE
	  innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
	  bugTestDiv = undefined;
	}
	
	/**
	 * Wrap map from jquery.
	 */
	
	var map = {
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
	  // for script/link/style tags to work in IE6-8, you have to wrap
	  // in a div with a non-whitespace character in front, ha!
	  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
	};
	
	map.td =
	map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
	
	map.option =
	map.optgroup = [1, '<select multiple="multiple">', '</select>'];
	
	map.thead =
	map.tbody =
	map.colgroup =
	map.caption =
	map.tfoot = [1, '<table>', '</table>'];
	
	map.polyline =
	map.ellipse =
	map.polygon =
	map.circle =
	map.text =
	map.line =
	map.path =
	map.rect =
	map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];
	
	/**
	 * Parse `html` and return a DOM Node instance, which could be a TextNode,
	 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
	 * instance, depending on the contents of the `html` string.
	 *
	 * @param {String} html - HTML string to "domify"
	 * @param {Document} doc - The `document` instance to create the Node for
	 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
	 * @api private
	 */
	
	function parse(html, doc) {
	  if ('string' != typeof html) throw new TypeError('String expected');
	
	  // default to the global `document` object
	  if (!doc) doc = document;
	
	  // tag name
	  var m = /<([\w:]+)/.exec(html);
	  if (!m) return doc.createTextNode(html);
	
	  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace
	
	  var tag = m[1];
	
	  // body support
	  if (tag == 'body') {
	    var el = doc.createElement('html');
	    el.innerHTML = html;
	    return el.removeChild(el.lastChild);
	  }
	
	  // wrap map
	  var wrap = map[tag] || map._default;
	  var depth = wrap[0];
	  var prefix = wrap[1];
	  var suffix = wrap[2];
	  var el = doc.createElement('div');
	  el.innerHTML = prefix + html + suffix;
	  while (depth--) el = el.lastChild;
	
	  // one element
	  if (el.firstChild == el.lastChild) {
	    return el.removeChild(el.firstChild);
	  }
	
	  // several elements
	  var fragment = doc.createDocumentFragment();
	  while (el.firstChild) {
	    fragment.appendChild(el.removeChild(el.firstChild));
	  }
	
	  return fragment;
	}
	
	}, {}],
	4: [function(require, module, exports) {
	
	exports = module.exports = trim;
	
	function trim(str){
	  if (str.trim) return str.trim();
	  return str.replace(/^\s*|\s*$/g, '');
	}
	
	exports.left = function(str){
	  if (str.trimLeft) return str.trimLeft();
	  return str.replace(/^\s*/, '');
	};
	
	exports.right = function(str){
	  if (str.trimRight) return str.trimRight();
	  return str.replace(/\s*$/, '');
	};
	
	}, {}]}, {}, {"1":""})


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(141);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(143)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./fdn.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./fdn.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(142)();
	// imports
	
	
	// module
	exports.push([module.id, ".fdn-content {\n  position: relative;\n}\n\n.fdn-edit:empty:not(focus):before {\n  content: \"--[empty]--\";\n  color: #ccc;\n}\n\n.fdn-edit:hover {\n  cursor: pointer;\n  border: 2px dashed #ccc;\n}\n\n.fdn-edit:hover:after {\n  content: \"tap/click to edit...\";\n  padding: 4px 8px;\n  color: #000;\n  position: absolute;\n  left: 0;\n  top: -30px;\n  z-index: 20;\n  white-space: nowrap;\n  -moz-border-radius: 5px;\n  -webkit-border-radius: 5px;\n  border-radius: 5px;\n  -moz-box-shadow: 0px 0px 4px #222;\n  -webkit-box-shadow: 0px 0px 4px #222;\n  box-shadow: 0px 0px 4px #222;\n  background-image: -moz-linear-gradient(top, #eeeeee, #cccccc);\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #eeeeee), color-stop(1, #cccccc));\n  background-image: -webkit-linear-gradient(top, #eeeeee, #cccccc);\n  background-image: -moz-linear-gradient(top, #eeeeee, #cccccc);\n  background-image: -ms-linear-gradient(top, #eeeeee, #cccccc);\n  background-image: -o-linear-gradient(top, #eeeeee, #cccccc);\n}\n\n.gmodal {\n  /* cross-browser IE8 and up compatible data URI RGBA(0,0,0,0.7) */\n  background: url(\"data:image/gif;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNg2AQAALUAs0e+XlcAAAAASUVORK5CYII=\");\n}\n\n.gmodal-iframe {\n  background: #fff;\n  width: 500px;\n  height: 500px;\n  padding: 10px;\n}\n\n", ""]);
	
	// exports


/***/ },
/* 142 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 144 */
/***/ function(module, exports) {

	module.exports = "<!DOCTYPE html>\n<html>\n\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"robots\" content=\"noindex\">\n  <link rel=\"stylesheet\" href=\"https://netdna.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css\">\n  <link rel=\"stylesheet\" href=\"https://netdna.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css\">\n  <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Roboto:400,300\">\n  <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/textAngular/1.5.2/textAngular.min.css\">\n  <style>\n.text-red {\n  color:#E52A3A;\n}\n\n.text-gray {\n  color:#5f5f5f;\n}\n\n.text-center {\n  text-align: center;\n}\n\n/* Editor styling */\n\n.ta-toolbar {\n  background-color: #F0F0F0;\n  padding: 10px 10px 5px;\n  margin-left: 0px; /* Override bootstrap */\n  border: 1px solid #EEE;\n}\n\n.ta-toolbar .btn-group {\n  margin-bottom: 5px;\n}\n\n.ta-editor, .white-box {\n  padding: 10px;\n  background-color: #FFF;\n  border: 1px solid #EEE;\n}\n\ntextarea.ta-bind {\n  width: 100%;\n}\n  </style>\n  <script src='https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js'></script>\n  <script src='https://cdnjs.cloudflare.com/ajax/libs/textAngular/1.5.2/textAngular-rangy.min.js'></script>\n  <script src='https://cdnjs.cloudflare.com/ajax/libs/textAngular/1.5.2/textAngular-sanitize.min.js'></script>\n  <script src='https://cdnjs.cloudflare.com/ajax/libs/textAngular/1.5.2/textAngular.min.js'></script>\n</head>\n\n<body>\n  <div ng-app=\"FdnEdit\" ng-controller=\"FdnEditController\">\n    <div class=\"col-md-8\">\n    <h2>{{content.name}}</h2>\n    <div text-angular ng-model=\"content.data.desc\" name=\"fdn-editor\" ta-text-editor-class=\"border-around\" ta-html-editor-class=\"border-around\" ta-unsafe-sanitizer=\"false\"></div>\n    </div>\n  </div>\n  <!--REPLACEME-->\n  <script>\n    var pwin = window.parent;\n    try {\n        var testwin = window.top.fdn;\n        pwin = window.top;\n    } catch (e) {};\n    try {\n      var fdn = window.fdn = document.fdn = pwin.fdn || {};\n      fdn.edit = {\n        name: 'test',\n        data: {\n          title: '',\n          desc: '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li style=\"color: blue;\">Super Easy <b>Theming</b> Options</li><li>Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li>Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Code at GitHub:</b> <a href=\"https://github.com/fraywing/textAngular\">Here</a> </p>'\n        }\n      };\n    } catch (e) {\n      console.log(e);\n    };\n\n    (function() {\n      angular\n        .module(\"FdnEdit\", ['textAngular'])\n        .controller(\"FdnEditController\", ['$scope', '$window', FdnEditController]);\n\n      function FdnEditController($scope, $window) {\n        $scope.content = $window.fdn.edit;\n      };\n    })();\n  </script>\n</body>\n\n</html>\n\n";

/***/ }
/******/ ])
});
;
//# sourceMappingURL=fdn.js.map