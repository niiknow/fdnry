/*!
 *  fdn v0.0.3
 *  Feedinary client-side code
 *  Build Wed Jan 04 2017 12:46:19 GMT-0600 (CST)
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define("fdn", ["jQuery"], factory);
	else if(typeof exports === 'object')
		exports["fdn"] = factory(require("jQuery"));
	else
		root["fdn"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__) {
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
	  fdn.config['src'] = util.getAttribute(e, 'src');
	  util.each(['', 'data-'], function (v, k) {
	    util.each(['client', 'theme', 'name', 'url'], function (v2, k2) {
	      var attr = util.getAttribute(e, v + k2);
	      if (attr) {
	        fdn.config[k2] = attr;
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
	
	var _feedinaryEdit = __webpack_require__(11);
	
	var _feedinaryEdit2 = _interopRequireDefault(_feedinaryEdit);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	__webpack_require__(14);
	__webpack_require__(18);
	var util = new _util2.default();
	/**
	 * main app
	 */
	
	var Feedinary = function () {
	  function Feedinary() {
	    _classCallCheck(this, Feedinary);
	
	    this.win = window;
	    this.config = {
	      channel: 'homepage',
	      url: 'http://localhost:3000/api/',
	      header: '',
	      emptyText: '<div class="fdn-desc"></div>'
	    };
	  }
	
	  /**
	   * initialize this object
	   * @param  {string} client  the client id or name
	   * @param  {string} theme   default channel
	   * @param  {string} channel name for content channel
	   * @param  {string} url     Feedinary api url
	   * @return {object}         fdn
	   */
	
	
	  _createClass(Feedinary, [{
	    key: 'init',
	    value: function init(client, theme, channel, url) {
	      this.config.client = client || this.config.client;
	      this.config.theme = theme || this.config.theme;
	      this.config.channel = channel || this.config.channel;
	      this.config.url = url || this.config.url;
	      this.util = util;
	      this.config.review = false;
	      util.dom('[id^="fdn_"]').addClass('fdn-container');
	      if (util.search.fdnmode === 'edit') {
	        this.config.review = true;
	        this.editor = new _feedinaryEdit2.default(this);
	      } else if (util.search.fdnmode === 'preview') {
	        this.config.review = true;
	        util.dom('.fdn-desc').addClass('fdn-preview');
	      }
	      return this;
	    }
	
	    /**
	     * make xhr request for data
	     * {
	     *   data: 'object: the data object',
	     *   url: 'string: default(null) - the url to get the data'
	     * }
	     *
	     * alternatively, use util.request for any custom request
	     * @param  {object} opts the option
	     * @return {object}      the xhr promise
	     */
	
	  }, {
	    key: 'fetchContent',
	    value: function fetchContent(opts) {
	      opts.url = opts.url || this.opts.url;
	      opts.data = opts.data || {};
	      opts.data.client = this.opts.client;
	      opts.data.type = 'content';
	      opts.data.channel = this.opts.channel;
	      opts.data.review = this.config.review;
	      opts.method = opts.method || 'GET';
	      if (this.config.theme) {
	        opts.data.theme = opts.data.theme || this.config.theme;
	      }
	      return util.request(opts);
	    }
	
	    /**
	     * get the compiled content of an item
	     * @param  {string} name the id or name
	     * @return {object}      item and it's html
	     */
	
	  }, {
	    key: 'getContent',
	    value: function getContent(name) {
	      var that = this,
	          item = void 0,
	          rst = {};
	      name = util.slugify(name).replace('fdn_', '');
	      // get the content
	      item = (this.cache || {})[name];
	      if (!item) {
	        return rst;
	      }
	      // build the header
	      var html = '' + that.config.header;
	      var pi = item.pi || '';
	      pi = pi.indexOf(']') > 0 ? JSON.parse(pi) : [pi];
	      // build impression pixel tracking
	      util.each(pi, function (v, k) {
	        if (v.length > 5) {
	          html += '<img class="fdn-pi" width="1" height="1" border="0" src="' + v + '" />';
	        }
	      });
	      if (item.desc.indexOf('</script>') > 0 || (item.meta || {}).iframe) {
	        // auto iframe
	        html += '<div class="fdn-desc"></div>' + that.config.footer;
	        rst.iframe = true;
	      } else {
	        html += '<div class="fdn-desc">' + item.desc + '</div>' + that.config.footer;
	      }
	      // string macro handling - possibly use lodash template?
	      if (html.indexOf('<%=') > -1) {
	        var obj = {
	          client: this.config.client,
	          channel: this.config.channel,
	          nc: new Date().getTime(),
	          name: name,
	          item: item
	        };
	        var compiled = util.template(html);
	        html = compiled(obj);
	      }
	      rst.html = html;
	      rst.item = item;
	      return rst;
	    }
	
	    /**
	     * render or refresh specific item
	     * @param  {string} name the id or name
	     * @return {object}      render stat
	     */
	
	  }, {
	    key: 'renderItem',
	    value: function renderItem(name) {
	      var cancel = false;
	      var rst = {
	        rendered: 0,
	        canceled: 0
	      };
	      name = util.slugify(name).replace('fdn_', '');
	      // find the destination element, quit if not found
	      var el = util.dom('[id=\'fdn_' + name + '\']');
	      if (el.length < 0) return rst;
	      if (this.onBeforeRender) cancel = this.onBeforeRender(name);
	      if (!cancel) {
	        // get the item
	        var item = this.getContent(name);
	        el.html('').html(item.html || '');
	        if (item.iframe) {
	          var descEl = el.find('.fdn-desc');
	          util.loadiFrame(descEl, util.createiFrame(null, 'fdn-iframe'), item.desc);
	        }
	        rst.rendered++;
	        // trigger on after render
	        if (this.onAfterRender) this.onAfterRender(name, item);
	      } else {
	        rst.canceled++;
	      }
	      return rst;
	    }
	
	    /**
	     * render/refresh all
	     * @return {object} fdn
	     */
	
	  }, {
	    key: 'renderAll',
	    value: function renderAll() {
	      var that = this;
	      util.each(this.cache, function (v, k) {
	        that.renderItem(k);
	      });
	      return that;
	    }
	
	    /**
	     * process all cache data url
	     * @return {promise} when all data are completed
	     */
	
	  }, {
	    key: 'processCache',
	    value: function processCache() {
	      var that = this;
	      var promisses = [];
	      that.cacheData = {};
	      util.each(that.cache, function (v, k) {
	        var dataurl = v.dataurl + '';
	        if (dataurl.length > 20) {
	          var p = util.request({
	            url: dataurl
	          });
	          p.then(function (rsp) {
	            var text = rsp.text;
	            that.cacheData[k] = text.indexOf('}') > 0 || text.indexOf(']') > 0 ? JSON.parse(text) : text;
	          });
	          promisses.push(p);
	        }
	      });
	      return Promise.all(promisses);
	    }
	
	    /**
	     * render specific content by name
	     * @param  {string} name content name resolve by id=fdn_name
	     * @return {object}      fdn
	     */
	
	  }, {
	    key: 'render',
	    value: function render(name) {
	      var that = this;
	      name = util.slugify(name).replace('fdn_', '');
	      if (!that.cache) {
	        that.fetchContent({
	          data: {
	            channel: that.config.channel
	          }
	        }).then(function (rsp) {
	          that.cache = JSON.parse(rsp.text);
	          that.processCache().then(function () {
	            if (name) {
	              that.rednerItem(name);
	            } else {
	              that.renderAll();
	            }
	          });
	        }, function () {
	          that.cache = {};
	        });
	      } else {
	        if (name) {
	          that.rednerItem(name);
	        } else {
	          that.renderAll();
	        }
	      }
	      return that;
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
	
	
	var _ready = __webpack_require__(3);
	
	var _ready2 = _interopRequireDefault(_ready);
	
	var _jquery = __webpack_require__(4);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _jqueryToolbar = __webpack_require__(20);
	
	var _jqueryToolbar2 = _interopRequireDefault(_jqueryToolbar);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	__webpack_require__(5).polyfill();
	// allow for IE compatible object property delete
	var del = function del(obj, key) {
	  obj[key] = null;
	  try {
	    delete obj[key];
	  } catch (e) {
	    var _ret = function () {
	      var items = {};
	      _jquery2.default.each(obj, function (v, k) {
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
	/**
	 * common util method
	 * may want to separate this in the future
	 */
	
	var Util = function () {
	  function Util() {
	    _classCallCheck(this, Util);
	
	    this.win = window;
	    this.each = this.forEach = _jquery2.default.each;
	    this.del = del;
	    this.dom = _jquery2.default;
	    this.domready = _ready2.default;
	    this.toolbar = _jqueryToolbar2.default;
	    this.doc = document || {};
	    this.iframeContent = __webpack_require__(10);
	    this.trim = _jquery2.default.trim;
	    this.search = this.parseQueryString((location || {}).search || '');
	    // this.extend = extend;
	    // this.throttle = throttle;
	  }
	
	  /**
	   * determine if user is authenticated
	   * @return {Boolean} false if not authenticated
	   */
	
	
	  _createClass(Util, [{
	    key: 'isAuthenticated',
	    value: function isAuthenticated() {
	      var token = this.win.localStorage.getItem('fdntoken') + '';
	      // validate the token
	      var tparts = token.split('.');
	      if (tparts.length < 2) return false;
	      var objString = this.win.btoa(tparts[1]);
	      var obj = JSON.parse(objString);
	      var exp = parseFloat(obj.exp) * 1000;
	      var today = new Date().getTime();
	      // valid token has not expired
	      return today > exp;
	    }
	
	    /**
	     * helper method to get attribute on specific dom object
	     * @param  {object} dom  element
	     * @param  {string} attr attribute name
	     * @return {string}      attribute value
	     */
	
	  }, {
	    key: 'getAttribute',
	    value: function getAttribute(dom, attr) {
	      var el = dom[0] || dom;
	      return el.getAttribute ? el.getAttribute(attr) : el[attr];
	    }
	
	    /**
	     * cross browser attach event
	     * @param {object} obj     source object
	     * @param {string} evtName event name
	     * @param {object}         self
	     */
	
	  }, {
	    key: 'addEvent',
	    value: function addEvent(obj, evtName, func) {
	      if (obj.addEventListener) {
	        obj.addEventListener(evtName, func, false);
	      } else if (obj.attachEvent) {
	        obj.attachEvent(evtName, func);
	      } else if (this.getAttribute('on' + evtName)) {
	        obj['on' + evtName] = func;
	      } else {
	        obj[evtName] = func;
	      }
	      return this;
	    }
	
	    /**
	     * cross browser detach event
	     * @param {object} obj     source object
	     * @param {string} evtName event name
	     * @param {object}         self
	     */
	
	  }, {
	    key: 'removeEvent',
	    value: function removeEvent(obj, evtName, func) {
	      if (obj.removeEventListener) {
	        obj.removeEventListener(evtName, func, false);
	      } else if (obj.detachEvent) {
	        obj.detachEvent(evtName, func);
	      } else if (this.getAttribute('on' + evtName)) {
	        obj['on' + evtName] = null;
	      } else {
	        obj[evtName] = null;
	      }
	      return this;
	    }
	
	    /**
	     * cross browser get of xhr
	     * @return {object} the xhr
	     */
	
	  }, {
	    key: 'getAjaxObject',
	    value: function getAjaxObject() {
	      return 'XMLHttpRequest' in window ? new XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');
	    }
	
	    /**
	     * helper method to parse querystring
	     * @param  {string} qstr the querystring
	     * @return {object}      result
	     */
	
	  }, {
	    key: 'parseQueryString',
	    value: function parseQueryString(qstr) {
	      qstr = (qstr || '').replace('?', '').replace('#', '');
	      var d = decodeURIComponent,
	          query = {},
	          a = qstr.split('&');
	      for (var i = 0; i < a.length; i++) {
	        var b = a[i].split('=');
	        query[d(b[0])] = d(b[1] || '');
	      }
	      return query;
	    }
	
	    /**
	     * reverse object to query string
	     * @param  {object} obj the object
	     * @return {string}     the query string
	     */
	
	  }, {
	    key: 'toQueryString',
	    value: function toQueryString(obj) {
	      var str = '';
	      this.each(obj, function (v, k) {
	        str += '&' + k + '=' + encodeURIComponent(v);
	      });
	      return str.replace('&', '');
	    }
	
	    /**
	     * create an iframe
	     * @return {object} the iframe
	     */
	
	  }, {
	    key: 'createiFrame',
	    value: function createiFrame(id, className) {
	      var iframe = this.doc.createElement('iframe');
	      if (id) iframe.id = id;
	      if (className) iframe.className = className;
	      iframe.frameBorder = '0';
	      iframe.marginWidth = '0';
	      iframe.marginHeight = '0';
	      iframe.setAttribute('border', '0');
	      iframe.setAttribute('allowtransparency', 'true');
	      iframe.width = '100%';
	      iframe.height = '100%';
	      return iframe;
	    }
	
	    /**
	     * load iframe content
	     * @param  {object} parentEl the parent element
	     * @param  {object} iframe   the iframe or use createiFrame
	     * @param  {string} content  the iframe content
	     * @return {object}          the iframe
	     */
	
	  }, {
	    key: 'loadiFrame',
	    value: function loadiFrame(parentEl, iframe, content) {
	      var iframeContent = content;
	      parentEl.appendChild(iframe);
	      if (iframeContent.indexOf('<!DOCTYPE') < 0) {
	        iframeContent = this.iframeContent.replace('<!--REPLACEME-->', content);
	      }
	      if (iframe.contentWindow) {
	        iframe.contentWindow.contents = iframeContent;
	        iframe.src = 'javascript:window["contents"]';
	        return iframe;
	      }
	      var doc = iframe.contentDocument || iframe.document;
	      doc.open();
	      doc.write(iframeContent);
	      doc.close();
	      return iframe;
	    }
	  }, {
	    key: 'request',
	    value: function request(opts) {
	      var that = this;
	      opts.headers = opts.headers || {};
	      if (['HEAD', 'GET', 'DELETE'].indexOf(opts.method) > -1) {
	        // convert data to query string
	        if (opts.data) {
	          opts.url += (opts.url.indexOf('?') > 0 ? '?' : '&') + that.toQueryString(opts.data);
	          this.del(opts, 'data');
	        }
	      } else if (typeof opts.data !== 'string') {
	        // handle non-string content body
	        if ((opts.headers['Content-Type'] + '').indexOf('json') > 0) {
	          opts.data = JSON.stringify(opts);
	        } else {
	          // must be form encoded
	          opts.data = that.toQueryString(opts);
	        }
	      }
	      return that.xhrp(opts);
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
	      return new Promise(function (resolve, reject) {
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
	      var req = this.getAjaxObject();
	      if (options.withCredentials) {
	        req.withCredentials = true;
	        if (typeof XDomainRequest !== 'undefined') {
	          // XDomainRequest for IE.
	          req = new XDomainRequest();
	        }
	      }
	      // if there are no options, it failed
	      if (!options || options.length === 0) {
	        errback({
	          xhr: req,
	          error: new Error('xhr expects an url or an options object, none given.')
	        });
	      }
	      // normalize method
	      options.method = options.method || 'GET';
	      // open url
	      req.open(options.method, options.url, req.withCredentials);
	      // set request header
	      this.each(options.headers || {}, function (value, key) {
	        req.setRequestHeader(key, value);
	      });
	      this.addEvent(req, 'readystatechange', function () {
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
	        // ignore everything else?
	      });
	      this.addEvent(req, 'error', function (err) {
	        errback({
	          xhr: req,
	          error: err
	        });
	      });
	      // send unless prevent by options
	      // such as user want to handle file upload
	      if (!options.nosend) {
	        req.send(options.data || void 0);
	      }
	      return req;
	    }
	
	    /**
	     * slugify a string
	     * @param  {string} str the string to slug
	     * @return {string}     slug result
	     */
	
	  }, {
	    key: 'slugify',
	    value: function slugify(str) {
	      str = str || '';
	      if (str === '') return str;
	      str = str.toLowerCase().replace(/[^0-9a-z\-\_]+/gi, '-').replace(/[\-]+/gi, '-');
	      return str;
	    }
	  }]);
	
	  return Util;
	}();
	
	exports.default = Util;
	module.exports = exports['default'];

/***/ },
/* 3 */
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
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
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
	        var vertx = __webpack_require__(8);
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
	    if ("function" === 'function' && __webpack_require__(9)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }
	
	    lib$es6$promise$polyfill$$default();
	}).call(this);
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6), (function() { return this; }()), __webpack_require__(7)(module)))

/***/ },
/* 6 */
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
/* 7 */
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
/* 8 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"robots\" content=\"noindex\">\n  <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js\"></script>\n  <script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery-migrate/1.4.1/jquery-migrate.min.js\"></script>\n</head>\n\n<body>\n  <script>\n    var pwin = window.parent;\n    try {\n        var testwin = window.top.fdn;\n        pwin = window.top;\n    } catch (e) {};\n    try {\n      var fdn = window.fdn = document.fdn = pwin.fdn || {};\n\n    } catch (e) {};\n  </script>\n  <!--REPLACEME-->\n</body>\n\n</html>\n\n";

/***/ },
/* 11 */
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
	
	__webpack_require__(12);
	var myContent = __webpack_require__(13);
	var util = new _util2.default();
	/**
	 * Class handling feedinary edit.
	 * Separating edit logic now allow for lazy loading later.
	 */
	
	var FeedinaryEdit = function () {
	  function FeedinaryEdit(fdn) {
	    _classCallCheck(this, FeedinaryEdit);
	
	    // load edit on demand
	    // let src = fdn.config.src.replace('/fdn.', '/fdn-edit.');
	    var that = this;
	    this.fdn = fdn;
	    /* if (!util.isAuthenticated()) {
	      return;
	    }*/
	    var myDom = util.dom('.fdn-container:empty');
	    myDom.html(fdn.config.emptyText);
	    util.dom('.fdn-desc').addClass('fdn-edit');
	    util.dom('.fdn-desc').toolbar({
	      content: '#toolbar-options',
	      position: 'left',
	      adjustment: 35
	    });
	
	    util.dom('[id^="fdn_"] > .fdn-desc').on('dblclick', function (evt) {
	      evt = evt || util.win.event;
	      var tg = evt.target || evt.srcElement;
	      if (tg.nodeType === 3) {
	        tg = tg.parentNode;
	      }
	      var el = util.dom(tg);
	      while (!el.hasClass('fdn-container')) {
	        el = util.dom(el[0].parentNode);
	      }
	      // figure out what item this is
	      var itemId = (el[0].id || '').replace('fdn_', '');
	      // open edit modal
	      if (itemId) {
	        that.editItem(itemId);
	      }
	    });
	  }
	
	  /**
	   * show editor
	   * @param  {string} name the item name
	   * @return {object}      self
	   */
	
	
	  _createClass(FeedinaryEdit, [{
	    key: 'editItem',
	    value: function editItem(name) {
	      name = util.slugify(name).replace('fdn_', '');
	      // get the content
	      var item = (this.fdn.cache || {})[name] || {};
	      if (!item.desc) {
	        var el = util.dom('[id=\'fdn_' + name + '\']');
	        var descEl = util.dom('[id=\'fdn_' + name + '\'] .fdn-desc');
	        item.desc = descEl.html() || el.html();
	      }
	      this.fdn.edit = {
	        name: name,
	        item: item
	      };
	      // open edit modal
	      util.win.gmodal.show({
	        content: myContent,
	        hideOn: 'click,esc,tap'
	      });
	      return this;
	    }
	  }]);
	
	  return FeedinaryEdit;
	}();
	
	exports.default = FeedinaryEdit;
	module.exports = exports['default'];

/***/ },
/* 12 */
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
/* 13 */
/***/ function(module, exports) {

	module.exports = "<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"robots\" content=\"noindex\">\n  <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\">\n  <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\">\n  <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=Roboto:400,300\">\n  <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/textAngular/1.5.16/textAngular.min.css\">\n  <style>\n.text-red {\n  color:#E52A3A;\n}\n\n.text-gray {\n  color:#5f5f5f;\n}\n\n.text-center {\n  text-align: center;\n}\n\n/* Editor styling */\n\n.ta-toolbar {\n  background-color: #F0F0F0;\n  padding: 10px 10px 5px;\n  margin-left: 0px; /* Override bootstrap */\n  border: 1px solid #EEE;\n}\n\n.ta-toolbar .btn-group {\n  margin-bottom: 5px;\n}\n\n.ta-editor, .white-box {\n  padding: 10px;\n  background-color: #FFF;\n  border: 1px solid #EEE;\n}\n\ntextarea.ta-bind {\n  width: 100%;\n}\n  </style>\n  <script src='https://ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular.min.js'></script>\n  <script src='https://cdnjs.cloudflare.com/ajax/libs/textAngular/1.5.16/textAngular-rangy.min.js'></script>\n  <script src='https://cdnjs.cloudflare.com/ajax/libs/textAngular/1.5.16/textAngular-sanitize.min.js'></script>\n  <script src='https://cdnjs.cloudflare.com/ajax/libs/textAngular/1.5.16/textAngular.min.js'></script>\n</head>\n\n<body>\n  <div ng-app=\"FdnEdit\" ng-controller=\"FdnEditController\">\n    <div class=\"col-md-8\">\n      <h2>{{edit.name}}</h2>\n      <div text-angular ng-model=\"edit.item.desc\" name=\"fdn-editor\" ta-text-editor-class=\"border-around\" ta-html-editor-class=\"border-around\" ta-unsafe-sanitizer=\"false\"></div>\n    </div>\n  </div>\n  <!--REPLACEME-->\n  <script>\n    var pwin = window.parent;\n    try {\n        var testwin = window.top.fdn;\n        pwin = window.top;\n    } catch (e) {};\n    try {\n      var fdn = window.fdn = document.fdn = pwin.fdn || {};\n      console.log(fdn);\n    } catch (e) {\n      console.log(e);\n    };\n\n    (function() {\n      angular\n        .module(\"FdnEdit\", ['textAngular'])\n        .controller(\"FdnEditController\", ['$scope', '$window', FdnEditController]);\n\n      function FdnEditController($scope, $window) {\n        console.log($window.fdn.edit);\n        $scope.edit = $window.fdn.edit;\n      };\n    })();\n  </script>\n</body>\n\n</html>\n\n";

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(15);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(17)(content, {});
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports
	
	
	// module
	exports.push([module.id, ".fdn-container {\n    position: relative;\n}\n\n.fdn-desc {\n    width: 100%;\n    height: 100%;\n}\n\n.fdn-edit:empty:not(focus):before {\n    content: \"--[empty]--\";\n    color: #ccc;\n}\n\n.fdn-edit:hover {\n    cursor: pointer;\n    border: 2px dashed #ccc;\n    min-height: 50px;\n}\n\ndiv.fdn-edit:hover:before {\n    content: \"div\";\n    background: yellow;\n    display: block;\n    white-space: nowrap;\n    width: 50px;\n    text-align: center;\n}\n\n.gmodal {\n    /* cross-browser IE8 and up compatible data URI RGBA(0,0,0,0.7) */\n    background: url(\"data:image/gif;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNg2AQAALUAs0e+XlcAAAAASUVORK5CYII=\");\n}\n\n.gmodal-iframe {\n    background: #fff;\n    width: 500px;\n    height: 500px;\n    padding: 10px;\n}", ""]);
	
	// exports


/***/ },
/* 16 */
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
/* 17 */
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(19);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(17)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./jquery.toolbar.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./jquery.toolbar.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(16)();
	// imports
	
	
	// module
	exports.push([module.id, ".btn-toolbar {\n  background: #364347;\n  width: 20px;\n  height: 20px;\n  text-align: center;\n  padding: 10px;\n  border-radius: 6px;\n  display: block;\n  transition: none;\n}\n.btn-toolbar > i {\n  color: #02baf2;\n  font-size: 16px;\n}\n.btn-toolbar:hover {\n  background: #02baf2;\n  cursor: pointer;\n}\n.btn-toolbar:hover > i {\n  color: white;\n}\n.btn-toolbar-primary {\n  background-color: #009dcd;\n}\n.btn-toolbar-primary.pressed {\n  background-color: #02baf2;\n}\n.btn-toolbar-primary:hover {\n  background-color: #02baf2;\n}\n.btn-toolbar-primary > i {\n  color: white;\n}\n.btn-toolbar-danger {\n  background-color: #cc0000;\n}\n.btn-toolbar-danger.pressed {\n  background-color: #f84545;\n}\n.btn-toolbar-danger:hover {\n  background-color: #f84545;\n}\n.btn-toolbar-danger > i {\n  color: white;\n}\n.btn-toolbar-warning {\n  background-color: #f3bc65;\n}\n.btn-toolbar-warning.pressed {\n  background-color: #fad46b;\n}\n.btn-toolbar-warning:hover {\n  background-color: #fad46b;\n}\n.btn-toolbar-warning > i {\n  color: white;\n}\n.btn-toolbar-info {\n  background-color: #e96300;\n}\n.btn-toolbar-info.pressed {\n  background-color: #f58410;\n}\n.btn-toolbar-info:hover {\n  background-color: #f58410;\n}\n.btn-toolbar-info > i {\n  color: white;\n}\n.btn-toolbar-success {\n  background-color: #28948c;\n}\n.btn-toolbar-success.pressed {\n  background-color: #3eb5ac;\n}\n.btn-toolbar-success:hover {\n  background-color: #3eb5ac;\n}\n.btn-toolbar-success > i {\n  color: white;\n}\n.btn-toolbar-info-o {\n  background-color: #9175bd;\n}\n.btn-toolbar-info-o.pressed {\n  background-color: #a88cd5;\n}\n.btn-toolbar-info-o:hover {\n  background-color: #a88cd5;\n}\n.btn-toolbar-info-o > i {\n  color: white;\n}\n.btn-toolbar-light {\n  background-color: #b2c6cd;\n}\n.btn-toolbar-light.pressed {\n  background-color: #d6e1e5;\n}\n.btn-toolbar-light:hover {\n  background-color: #d6e1e5;\n}\n.btn-toolbar-light > i {\n  color: white;\n}\n.btn-toolbar-dark {\n  background-color: #364347;\n}\n.btn-toolbar-dark.pressed {\n  background-color: #5e696d;\n}\n.btn-toolbar-dark:hover {\n  background-color: #5e696d;\n}\n.btn-toolbar-dark > i {\n  color: white;\n}\n.tool-container {\n  background-color: #5e696d;\n  background-size: 100% 100%;\n  border-radius: 6px;\n  position: absolute;\n}\n.tool-container.tool-top,\n.tool-container.tool-bottom {\n  height: 40px;\n  border-bottom: 0px solid #beb8b8;\n}\n.tool-container.tool-top .tool-item,\n.tool-container.tool-bottom .tool-item {\n  float: left;\n  border-right: 0;\n  border-left: 0;\n}\n.tool-item {\n  height: 100%;\n  display: block;\n  width: 20px;\n  height: 20px;\n  text-align: center;\n  padding: 10px;\n  transition: none;\n}\n.tool-item > .fa {\n  color: #b2c6cd;\n}\n.tool-item.selected,\n.tool-item:hover {\n  background: #02baf2;\n}\n.tool-item.selected > .fa,\n.tool-item:hover > .fa {\n  color: white;\n}\n.tool-top .tool-item:first-child:hover,\n.tool-bottom .tool-item:first-child:hover {\n  border-top-left-radius: 6px;\n  border-bottom-left-radius: 6px;\n}\n.tool-top .tool-item:last-child:hover,\n.tool-bottom .tool-item:last-child:hover {\n  border-top-right-radius: 6px;\n  border-bottom-right-radius: 6px;\n}\n.tool-vertical-top .tool-item:first-child:hover,\n.tool-vertical-bottom .tool-item:first-child:hover,\n.tool-right .tool-item:first-child:hover,\n.tool-left .tool-item:first-child:hover {\n  border-top-left-radius: 6px;\n  border-top-right-radius: 6px;\n}\n.tool-vertical-top .tool-item:last-child:hover,\n.tool-vertical-bottom .tool-item:last-child:hover,\n.tool-right .tool-item:last-child:hover,\n.tool-left .tool-item:last-child:hover {\n  border-bottom-left-radius: 6px;\n  border-bottom-right-radius: 6px;\n}\n.tool-container .arrow {\n  width: 0;\n  height: 0;\n  position: absolute;\n  border-width: 7px;\n  border-style: solid;\n}\n.tool-container.tool-top .arrow {\n  border-color: #5e696d transparent transparent;\n  left: 50%;\n  bottom: -14px;\n  margin-left: -7px;\n}\n.tool-container.tool-bottom .arrow {\n  border-color: transparent transparent #5e696d;\n  left: 50%;\n  top: -14px;\n  margin-left: -7px;\n}\n.tool-container.tool-left .arrow {\n  border-color: transparent transparent transparent #5e696d;\n  top: 50%;\n  right: -14px;\n  margin-top: -7px;\n}\n.tool-container.tool-right .arrow {\n  border-color: transparent #5e696d transparent transparent;\n  top: 50%;\n  left: -14px;\n  margin-top: -7px;\n}\n.toolbar-primary {\n  background-color: #02baf2;\n}\n.toolbar-primary.tool-top .arrow {\n  border-color: #02baf2 transparent transparent;\n}\n.toolbar-primary.tool-bottom .arrow {\n  border-color: transparent transparent #02baf2;\n}\n.toolbar-primary.tool-left .arrow {\n  border-color: transparent transparent transparent #02baf2;\n}\n.toolbar-primary.tool-right .arrow {\n  border-color: transparent #02baf2 transparent transparent;\n}\n.toolbar-primary .tool-item > .fa {\n  color: white;\n}\n.toolbar-primary .tool-item.selected,\n.toolbar-primary .tool-item:hover {\n  background: #009dcd;\n  color: white;\n}\n.toolbar-danger {\n  background-color: #f84545;\n}\n.toolbar-danger.tool-top .arrow {\n  border-color: #f84545 transparent transparent;\n}\n.toolbar-danger.tool-bottom .arrow {\n  border-color: transparent transparent #f84545;\n}\n.toolbar-danger.tool-left .arrow {\n  border-color: transparent transparent transparent #f84545;\n}\n.toolbar-danger.tool-right .arrow {\n  border-color: transparent #f84545 transparent transparent;\n}\n.toolbar-danger .tool-item > .fa {\n  color: white;\n}\n.toolbar-danger .tool-item.selected,\n.toolbar-danger .tool-item:hover {\n  background: #cc0000;\n  color: white;\n}\n.toolbar-warning {\n  background-color: #f3bc65;\n}\n.toolbar-warning.tool-top .arrow {\n  border-color: #f3bc65 transparent transparent;\n}\n.toolbar-warning.tool-bottom .arrow {\n  border-color: transparent transparent #f3bc65;\n}\n.toolbar-warning.tool-left .arrow {\n  border-color: transparent transparent transparent #f3bc65;\n}\n.toolbar-warning.tool-right .arrow {\n  border-color: transparent #f3bc65 transparent transparent;\n}\n.toolbar-warning .tool-item > .fa {\n  color: white;\n}\n.toolbar-warning .tool-item.selected,\n.toolbar-warning .tool-item:hover {\n  background: #fad46b;\n  color: white;\n}\n.toolbar-info {\n  background-color: #e96300;\n}\n.toolbar-info.tool-top .arrow {\n  border-color: #e96300 transparent transparent;\n}\n.toolbar-info.tool-bottom .arrow {\n  border-color: transparent transparent #e96300;\n}\n.toolbar-info.tool-left .arrow {\n  border-color: transparent transparent transparent #e96300;\n}\n.toolbar-info.tool-right .arrow {\n  border-color: transparent #e96300 transparent transparent;\n}\n.toolbar-info .tool-item > .fa {\n  color: white;\n}\n.toolbar-info .tool-item.selected,\n.toolbar-info .tool-item:hover {\n  background: #f58410;\n  color: white;\n}\n.toolbar-success {\n  background-color: #28948c;\n}\n.toolbar-success.tool-top .arrow {\n  border-color: #28948c transparent transparent;\n}\n.toolbar-success.tool-bottom .arrow {\n  border-color: transparent transparent #28948c;\n}\n.toolbar-success.tool-left .arrow {\n  border-color: transparent transparent transparent #28948c;\n}\n.toolbar-success.tool-right .arrow {\n  border-color: transparent #28948c transparent transparent;\n}\n.toolbar-success .tool-item > .fa {\n  color: white;\n}\n.toolbar-success .tool-item.selected,\n.toolbar-success .tool-item:hover {\n  background: #3eb5ac;\n  color: white;\n}\n.toolbar-info-o {\n  background-color: #9175bd;\n}\n.toolbar-info-o.tool-top .arrow {\n  border-color: #9175bd transparent transparent;\n}\n.toolbar-info-o.tool-bottom .arrow {\n  border-color: transparent transparent #9175bd;\n}\n.toolbar-info-o.tool-left .arrow {\n  border-color: transparent transparent transparent #9175bd;\n}\n.toolbar-info-o.tool-right .arrow {\n  border-color: transparent #9175bd transparent transparent;\n}\n.toolbar-info-o .tool-item > .fa {\n  color: white;\n}\n.toolbar-info-o .tool-item.selected,\n.toolbar-info-o .tool-item:hover {\n  background: #a88cd5;\n  color: white;\n}\n.toolbar-light {\n  background-color: #b2c6cd;\n}\n.toolbar-light.tool-top .arrow {\n  border-color: #b2c6cd transparent transparent;\n}\n.toolbar-light.tool-bottom .arrow {\n  border-color: transparent transparent #b2c6cd;\n}\n.toolbar-light.tool-left .arrow {\n  border-color: transparent transparent transparent #b2c6cd;\n}\n.toolbar-light.tool-right .arrow {\n  border-color: transparent #b2c6cd transparent transparent;\n}\n.toolbar-light .tool-item > .fa {\n  color: white;\n}\n.toolbar-light .tool-item.selected,\n.toolbar-light .tool-item:hover {\n  background: #d6e1e5;\n  color: white;\n}\n.toolbar-dark {\n  background-color: #364347;\n}\n.toolbar-dark.tool-top .arrow {\n  border-color: #364347 transparent transparent;\n}\n.toolbar-dark.tool-bottom .arrow {\n  border-color: transparent transparent #364347;\n}\n.toolbar-dark.tool-left .arrow {\n  border-color: transparent transparent transparent #364347;\n}\n.toolbar-dark.tool-right .arrow {\n  border-color: transparent #364347 transparent transparent;\n}\n.toolbar-dark .tool-item > .fa {\n  color: white;\n}\n.toolbar-dark .tool-item.selected,\n.toolbar-dark .tool-item:hover {\n  background: #5e696d;\n  color: white;\n}\n.animate-standard {\n  -webkit-animation: standardAnimate 0.3s 1 ease;\n}\n.animate-flyin {\n  -webkit-animation: rotateAnimate 0.5s 1 ease;\n}\n.animate-grow {\n  -webkit-animation: growAnimate 0.4s 1 ease;\n}\n.animate-flip {\n  -webkit-animation: flipAnimate 0.4s 1 ease;\n}\n.animate-bounce {\n  -webkit-animation: bounceAnimate 0.4s 1 ease-out;\n}\n@-webkit-keyframes rotateAnimate {\n  from {\n    transform: rotate(180deg) translate(-120px);\n    opacity: 0;\n  }\n  to {\n    transform: rotate(0deg) translate(0px);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes standardAnimate {\n  from {\n    transform: translateY(20px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0px);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes growAnimate {\n  0% {\n    transform: scale(0) translateY(40px);\n    opacity: 0;\n  }\n  70% {\n    transform: scale(1.5) translate(0px);\n  }\n  100% {\n    transform: scale(1) translate(0px);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes rotate2Animate {\n  from {\n    transform: rotate(-90deg);\n    transform-origin: 0% 100%;\n    opacity: 0;\n  }\n  to {\n    transform: rotate(0deg);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes flipAnimate {\n  from {\n    transform: rotate3d(2, 2, 2, 180deg);\n    opacity: 0;\n  }\n  to {\n    transform: rotate3d(0, 0, 0, 0deg);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes bounceAnimate {\n  0% {\n    transform: translateY(40px);\n    opacity: 0;\n  }\n  30% {\n    transform: translateY(-40px);\n  }\n  70% {\n    transform: translateY(20px);\n  }\n  100% {\n    transform: translateY(0px);\n    opacity: 1;\n  }\n}\n.hidden {\n  display: none;\n}\n", ""]);
	
	// exports


/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * Toolbar.js
	 *
	 * @fileoverview  jQuery plugin that creates tooltip style toolbars.
	 * @link          http://paulkinzett.github.com/toolbar/
	 * @author        Paul Kinzett (http://kinzett.co.nz/)
	 * @version       1.1.0
	 * @requires      jQuery 1.7+
	 *
	 * @license jQuery Toolbar Plugin v1.1.0
	 * http://paulkinzett.github.com/toolbar/
	 * Copyright 2013 - 2015 Paul Kinzett (http://kinzett.co.nz/)
	 * Released under the MIT license.
	 * <https://raw.github.com/paulkinzett/toolbar/master/LICENSE.txt>
	 */
	
	if ( typeof Object.create !== 'function' ) {
	    Object.create = function( obj ) {
	        function F() {}
	        F.prototype = obj;
	        return new F();
	    };
	}
	
	(function( $, window, document, undefined ) {
	
	    var ToolBar = {
	        init: function( options, elem ) {
	            var self = this;
	            self.elem = elem;
	            self.$elem = $( elem );
	            self.options = $.extend( {}, $.fn.toolbar.options, options );
	            self.metadata = self.$elem.data();
	            self.overrideOptions();
	            self.toolbar = $('<div class="tool-container" />')
	                .addClass('tool-'+self.options.position)
	                .addClass('toolbar-'+self.options.style)
	                .append('<div class="tool-items" />')
	                .append('<div class="arrow" />')
	                .appendTo('body')
	                .css('opacity', 0)
	                .hide();
	            self.toolbar_arrow = self.toolbar.find('.arrow');
	            self.initializeToolbar();
	        },
	
	        overrideOptions: function() {
	            var self = this;
	            $.each( self.options, function( $option ) {
	                if (typeof(self.$elem.data('toolbar-'+$option)) != "undefined") {
	                    self.options[$option] = self.$elem.data('toolbar-'+$option);
	                }
	            });
	        },
	
	        initializeToolbar: function() {
	            var self = this;
	            self.populateContent();
	            self.setTrigger();
	            self.toolbarWidth = self.toolbar.width();
	        },
	
	        setTrigger: function() {
	            var self = this;
	
	            if (self.options.event != 'click') {
	
	                var moveTime;
	                function decideTimeout () {
	                    if (self.$elem.hasClass('pressed')) {
	                        moveTime = setTimeout(function() {
	                            self.hide();
	                        }, 150);
	                    } else {
	                        clearTimeout(moveTime);
	                    };
	                };
	
	                self.$elem.on({
	                    mouseenter: function(event) {
	                        if (self.$elem.hasClass('pressed')) {
	                            clearTimeout(moveTime);
	                        } else {
	                            self.show();
	                        }
	                    }
	                });
	
	                self.$elem.parent().on({
	                    mouseleave: function(event){ decideTimeout(); }
	                });
	
	                $('.tool-container').on({
	                    mouseenter: function(event){ clearTimeout(moveTime); },
	                    mouseleave: function(event){ decideTimeout(); }
	                });
	            }
	
	            if (self.options.event == 'click') {
	                self.$elem.on('click', function(event) {
	                    event.preventDefault();
	                    if(self.$elem.hasClass('pressed')) {
	                        self.hide();
	                    } else {
	                        self.show();
	                    }
	                });
	
	                if (self.options.hideOnClick) {
	                    $('html').on("click.toolbar", function ( event ) {
	                        if (event.target != self.elem &&
	                            self.$elem.has(event.target).length === 0 &&
	                            self.toolbar.has(event.target).length === 0 &&
	                            self.toolbar.is(":visible")) {
	                            self.hide();
	                        }
	                    });
	                }
	            }
	
	            if (self.options.hover) {
	                var moveTime;
	
	                function decideTimeout () {
	                    if (self.$elem.hasClass('pressed')) {
	                        moveTime = setTimeout(function() {
	                            self.hide();
	                        }, 150);
	                    } else {
	                        clearTimeout(moveTime);
	                    };
	                };
	
	                self.$elem.on({
	                    mouseenter: function(event) {
	                        if (self.$elem.hasClass('pressed')) {
	                            clearTimeout(moveTime);
	                        } else {
	                            self.show();
	                        }
	                    }
	                });
	
	                self.$elem.parent().on({
	                    mouseleave: function(event){ decideTimeout(); }
	                });
	
	                $('.tool-container').on({
	                    mouseenter: function(event){ clearTimeout(moveTime); },
	                    mouseleave: function(event){ decideTimeout(); }
	                });
	            }
	
	            $(window).resize(function( event ) {
	                event.stopPropagation();
	                if ( self.toolbar.is(":visible") ) {
	                    self.toolbarCss = self.getCoordinates(self.options.position, 20);
	                    self.collisionDetection();
	                    self.toolbar.css( self.toolbarCss );
	                    self.toolbar_arrow.css( self.arrowCss );
	                }
	            });
	        },
	
	        populateContent: function() {
	            var self = this;
	            var location = self.toolbar.find('.tool-items');
	            var content = $(self.options.content).clone( true ).find('a').addClass('tool-item');
	            location.html(content);
	            location.find('.tool-item').on('click', function(event) {
	                event.preventDefault();
	                self.$elem.trigger('toolbarItemClick', this);
	            });
	        },
	
	        calculatePosition: function() {
	            var self = this;
	                self.arrowCss = {};
	                self.toolbarCss = self.getCoordinates(self.options.position, self.options.adjustment);
	                self.toolbarCss.position = 'absolute';
	                self.toolbarCss.zIndex = self.options.zIndex;
	                self.collisionDetection();
	                self.toolbar.css(self.toolbarCss);
	                self.toolbar_arrow.css(self.arrowCss);
	        },
	
	        getCoordinates: function( position, adjustment ) {
	            var self = this;
	            self.coordinates = self.$elem.offset();
	
	            if (self.options.adjustment && self.options.adjustment[self.options.position]) {
	                adjustment = self.options.adjustment[self.options.position] + adjustment;
	            }
	
	            switch(self.options.position) {
	                case 'top':
	                    return {
	                        left: self.coordinates.left-(self.toolbar.width()/2)+(self.$elem.outerWidth()/2),
	                        top: self.coordinates.top-self.$elem.outerHeight()-adjustment,
	                        right: 'auto'
	                    };
	                case 'left':
	                    return {
	                        left: self.coordinates.left-(self.toolbar.width()/2)-(self.$elem.outerWidth()/2)-adjustment,
	                        top: self.coordinates.top-(self.toolbar.height()/2)+(self.$elem.outerHeight()/2),
	                        right: 'auto'
	                    };
	                case 'right':
	                    return {
	                        left: self.coordinates.left+(self.toolbar.width()/2)+(self.$elem.outerWidth()/2)+adjustment,
	                        top: self.coordinates.top-(self.toolbar.height()/2)+(self.$elem.outerHeight()/2),
	                        right: 'auto'
	                    };
	                case 'bottom':
	                    return {
	                        left: self.coordinates.left-(self.toolbar.width()/2)+(self.$elem.outerWidth()/2),
	                        top: self.coordinates.top+self.$elem.outerHeight()+adjustment,
	                        right: 'auto'
	                    };
	            }
	        },
	
	        collisionDetection: function() {
	            var self = this;
	            var edgeOffset = 20;
	            if(self.options.position == 'top' || self.options.position == 'bottom') {
	                self.arrowCss = {left: '50%', right: '50%'};
	                if( self.toolbarCss.left < edgeOffset ) {
	                    self.toolbarCss.left = edgeOffset;
	                    self.arrowCss.left = self.$elem.offset().left + self.$elem.width()/2-(edgeOffset);
	                }
	                else if(($(window).width() - (self.toolbarCss.left + self.toolbarWidth)) < edgeOffset) {
	                    self.toolbarCss.right = edgeOffset;
	                    self.toolbarCss.left = 'auto';
	                    self.arrowCss.left = 'auto';
	                    self.arrowCss.right = ($(window).width()-self.$elem.offset().left)-(self.$elem.width()/2)-(edgeOffset)-5;
	                }
	            }
	        },
	
	        show: function() {
	            var self = this;
	            self.$elem.addClass('pressed');
	            self.calculatePosition();
	            self.toolbar.show().css({'opacity': 1}).addClass('animate-'+self.options.animation);
	            self.$elem.trigger('toolbarShown');
	        },
	
	        hide: function() {
	            var self = this;
	            var animation = {'opacity': 0};
	
	            self.$elem.removeClass('pressed');
	
	            switch(self.options.position) {
	                case 'top':
	                    animation.top = '+=20';
	                    break;
	                case 'left':
	                    animation.left = '+=20';
	                    break;
	                case 'right':
	                    animation.left = '-=20';
	                    break;
	                case 'bottom':
	                    animation.top = '-=20';
	                    break;
	            }
	
	            self.toolbar.animate(animation, 200, function() {
	                self.toolbar.hide();
	            });
	
	            self.$elem.trigger('toolbarHidden');
	        },
	
	        getToolbarElement: function () {
	            return this.toolbar.find('.tool-items');
	        }
	    };
	
	    $.fn.toolbar = function( options ) {
	        if ($.isPlainObject( options )) {
	            return this.each(function() {
	                var toolbarObj = Object.create( ToolBar );
	                toolbarObj.init( options, this );
	                $(this).data('toolbarObj', toolbarObj);
	            });
	        } else if ( typeof options === 'string' && options.indexOf('_') !== 0 ) {
	            var toolbarObj = $(this).data('toolbarObj');
	            var method = toolbarObj[options];
	            return method.apply(toolbarObj, $.makeArray(arguments).slice(1));
	        }
	    };
	
	    $.fn.toolbar.options = {
	        content: '#myContent',
	        position: 'top',
	        hideOnClick: false,
	        zIndex: 120,
	        hover: false,
	        style: 'default',
	        animation: 'standard',
	        adjustment: 10
	    };
	
	}) ( jQuery, window, document );


/***/ }
/******/ ])
});
;
//# sourceMappingURL=fdn.js.map