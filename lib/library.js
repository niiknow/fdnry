(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define("Library", ["jQuery"], factory);
	else if(typeof exports === 'object')
		exports["Library"] = factory(require("jQuery"));
	else
		root["Library"] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _jquery = __webpack_require__(1);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _util = __webpack_require__(2);
	
	var _util2 = _interopRequireDefault(_util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Feedinary = function () {
	  function Feedinary(clientId, theme, apiUrl) {
	    _classCallCheck(this, Feedinary);
	
	    this._clientId = clientId;
	    this._theme = theme;
	    this._apiUrl = apiUrl || 'http://localhost:3000/api/';
	  }
	
	  _createClass(Feedinary, [{
	    key: 'getContent',
	    value: function getContent(opts) {
	      opts.url = opts.url || this._apiUrl;
	      opts.data.client = this._clientId;
	      opts.data.type = 'content';
	      if (this._theme) {
	        opts.data.theme = opts.data.theme || this._theme;
	      }
	
	      var ut = new _util2.default();
	
	      return ut.request(opts);
	    }
	  }, {
	    key: 'renderContent',
	    value: function renderContent(name, title, content) {
	      var cancel = false;
	
	      if (this.onBeforeRender) {
	        cancel = this.onBeforeRender(name, title, content);
	      }
	
	      if (!cancel) {
	        content = content || (this.cache || {})[title];
	        (0, _jquery2.default)('[data-df-name=\'' + name + '\'][data-fd-title=\'' + title + '\']').html('').html(content || '');
	      }
	
	      // trigger on after render
	      if (this.onAfterRender) {
	        this.onAfterRender(name, title, content);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render(name, title) {
	      var $that = this;
	
	      if (!this.cache) {
	        this.getContent({
	          data: { name: name }
	        }).then(function (data) {
	          if (typeof data === 'undefined') {
	            // do nothing
	            $that.cache = {};
	          } else if (typeof data === 'string' && data.indexOf('{') > 0) {
	            $that.cache = JSON.parse(data);
	          } else {
	            $that.cache = data;
	          }
	          if (title) {
	            $that.renderContent(name, title);
	          } else {
	            // loop through and render content
	            for (var k in $that.cache) {
	              $that.renderContent(name, k);
	            }
	          }
	        });
	      }
	    }
	  }]);
	
	  return Feedinary;
	}();
	
	exports.default = Feedinary;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _jquery = __webpack_require__(1);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Util = function () {
	  function Util() {
	    _classCallCheck(this, Util);
	  }
	
	  /**
	   * make request
	   * @param  {[type]} method  method
	   * @param  {[type]} url     url
	   * @param  {[type]} headers header object
	   * @param  {[type]} body    body object
	   * @param  {String} type    response type
	   * @return {[type]}         a promise
	   */
	
	
	  _createClass(Util, [{
	    key: 'request',
	    value: function request(opts) {
	      opts.method = opts.method || 'get';
	      return _jquery2.default.ajax(opts.url, opts);
	    }
	  }]);
	
	  return Util;
	}();
	
	exports.default = Util;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=Library.js.map