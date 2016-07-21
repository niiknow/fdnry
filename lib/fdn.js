(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jQuery"));
	else if(typeof define === 'function' && define.amd)
		define("fdn", ["jQuery"], factory);
	else if(typeof exports === 'object')
		exports["fdn"] = factory(require("jQuery"));
	else
		root["fdn"] = factory(root["jQuery"]);
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
	
	var _jquery = __webpack_require__(1);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	var _feedinary = __webpack_require__(2);
	
	var _feedinary2 = _interopRequireDefault(_feedinary);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var fdn = new _feedinary2.default();
	
	(0, _jquery2.default)("script[src*='/fdn.']").each(function (i, e) {
	  var data = (0, _jquery2.default)(e).data();
	
	  _jquery2.default.each(data, function (k, v) {
	    if (['client', 'theme', 'name', 'url'].indexOf(k) > 0) {
	      if (typeof v === 'string') {
	        fdn.opts[k] = v;
	      }
	    }
	  });
	});
	
	(0, _jquery2.default)(function () {
	  fdn.init();
	});
	exports.default = fdn;
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
	
	var _util = __webpack_require__(3);
	
	var _util2 = _interopRequireDefault(_util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Feedinary = function () {
	  function Feedinary() {
	    _classCallCheck(this, Feedinary);
	
	    this.config = {
	      channel: 'homepage',
	      url: 'http://localhost:3000/api/',
	      header: '<div class="fdn-content">',
	      footer: '',
	      emptyText: '<div class="fdn-content"><div class="fdn-desc"></div></div>'
	    };
	  }
	
	  _createClass(Feedinary, [{
	    key: 'init',
	    value: function init(client, theme, channel, url) {
	      this.config.fdnedit = ((location || {}).search || '').indexOf('fdnedit') > -1;
	      this.config.client = client || this.config.client;
	      this.config.theme = theme || this.config.theme;
	      this.config.channel = channel || this.config.channel;
	      this.config.url = url || this.config.url;
	      this.config.css = '.fdn-content {\n  position: relative;\n}\n.fdn-desc:empty:not(focus):before {\n  content: "[[empty]]";\n  color: #ccc;\n}\n.fdn-desc:hover {\n  cursor: pointer;\n  border: 2px dashed #ccc;\n}\n.fdn-desc:hover:after {\n  content: "tap/click to edit...";\n  padding: 4px 8px;\n  color: #000;\n  position: absolute;\n  left: 0;\n  top: -30px;\n  z-index: 20;\n  white-space: nowrap;\n  -moz-border-radius: 5px;\n  -webkit-border-radius: 5px;\n  border-radius: 5px;\n  -moz-box-shadow: 0px 0px 4px #222;\n  -webkit-box-shadow: 0px 0px 4px #222;\n  box-shadow: 0px 0px 4px #222;\n  background-image: -moz-linear-gradient(top, #eeeeee, #cccccc);\n  background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0, #eeeeee),color-stop(1, #cccccc));\n  background-image: -webkit-linear-gradient(top, #eeeeee, #cccccc);\n  background-image: -moz-linear-gradient(top, #eeeeee, #cccccc);\n  background-image: -ms-linear-gradient(top, #eeeeee, #cccccc);\n  background-image: -o-linear-gradient(top, #eeeeee, #cccccc);\n}';
	
	      (0, _jquery2.default)('[data-fdn-name]').addClass('fdn-container');
	      this.injectStyles('fdn');
	
	      if (this.config.fdnedit) {
	        (0, _jquery2.default)('.fdn-container:empty').html(this.config.emptyText);
	      }
	    }
	  }, {
	    key: 'injectStyles',
	    value: function injectStyles(id, rule) {
	      var rulez = rule || this.config.css;
	      var elId = 'stylez_' + id;
	
	      if ((0, _jquery2.default)(elId).length <= 0) {
	        var $div = '<div id="' + elId + '"><style>' + rulez + '</style></div>';
	
	        (0, _jquery2.default)($div).appendTo('body');
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
	      var el = (0, _jquery2.default)('[data-fdn-name=\'' + myName + '\']');
	
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
	        _jquery2.default.each(pi, function (k, v) {
	          if (v.length > 5) {
	            var vs = v;
	
	            if (v.indexOf('[[') > 0) {
	              vs = vs.replace('[[client]]', that.config.client);
	              vs = vs.replace('[[channel]]', that.config.channel);
	              vs = vs.replace('[[nc]]', new Date().getTime());
	              vs = vs.replace('[[name]]', myName);
	            }
	
	            html += '<img class="fdn-pi" width="1" height="1" border="0" src="' + vs + '" />';
	          }
	        });
	
	        html += '<div class="fdn-desc">' + content.desc + '</div>' + that.config.footer + '</div>';
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
/* 3 */
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
//# sourceMappingURL=fdn.js.map